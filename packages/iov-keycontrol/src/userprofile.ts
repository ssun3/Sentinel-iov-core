import { AbstractLevelDOWN } from "abstract-leveldown";
import levelup from "levelup";
import { ReadonlyDate } from "readonly-date";
import { MemoryStream } from "xstream";

import { ChainId, FullSignature, Nonce, SignedTransaction, TxCodec, UnsignedTransaction } from "@iov/types";

import { Keyring, KeyringSerializationString, LocalIdentity, PublicIdentity } from "./keyring";
import { DatabaseUtils, DefaultValueProducer } from "./utils";

const storageKeyCreatedAt = "created_at";
const storageKeyKeyring = "keyring";

/**
 * All calls must go though the UserProfile. A newly created UserProfile
 * is unlocked until lock() is called, which removes access to private key
 * material. Once locked, a UserProfile cannot be unlocked anymore since the
 * corresponding storage is not available anymore. Instead, re-create the
 * UserProfile via the UserProfileController to get an unlocked UserProfile.
 */
export class UserProfile {
  public static async loadFrom(storage: AbstractLevelDOWN<string, string>): Promise<UserProfile> {
    const db = levelup(storage);
    const createdAt = new ReadonlyDate(await db.get(storageKeyCreatedAt, { asBuffer: false })); // TODO: add strict RFC 3339 parser
    const keyring = (await db.get(storageKeyKeyring, { asBuffer: false })) as KeyringSerializationString;
    db.close();
    return new UserProfile(createdAt, keyring);
  }

  public readonly createdAt: ReadonlyDate;
  public readonly locked: MemoryStream<boolean>;

  // Never pass the keyring reference to ensure the keyring is not retained after lock()
  // tslint:disable-next-line:readonly-keyword
  private keyring: Keyring | undefined;
  private readonly lockedProducer: DefaultValueProducer<boolean>;

  constructor(createdAt: ReadonlyDate, keyringSerialization: KeyringSerializationString) {
    this.createdAt = createdAt;
    this.keyring = new Keyring(keyringSerialization);
    this.lockedProducer = new DefaultValueProducer<boolean>(false);
    this.locked = MemoryStream.createWithMemory(this.lockedProducer);
  }

  // this will clear everything in storage and create a new UserProfile
  public async storeIn(storage: AbstractLevelDOWN<string, string>): Promise<void> {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const db = levelup(storage);
    await DatabaseUtils.clear(db);

    await db.put(storageKeyCreatedAt, this.createdAt.toISOString());
    await db.put(storageKeyKeyring, this.keyring.serialize());

    await db.close();
  }

  public lock(): void {
    // tslint:disable-next-line:no-object-mutation
    this.keyring = undefined;
    this.lockedProducer.update(true);
  }

  // creates an identitiy in the n-th keyring entry of the primary keyring
  public async createIdentity(n: number): Promise<LocalIdentity> {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const entry = this.keyring.getEntries().find((_, index) => index === n);
    if (!entry) {
      throw new Error("Entry of index " + n + " does not exist in keyring");
    }

    return entry.createIdentity();
  }

  // assigns a new label to one of the identities
  // in the n-th keyring entry of the primary keyring
  public setIdentityLabel(n: number, identity: PublicIdentity, label: string | undefined): void {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const entry = this.keyring.getEntries().find((_, index) => index === n);
    if (!entry) {
      throw new Error("Entry of index " + n + " does not exist in keyring");
    }

    entry.setIdentityLabel(identity, label);
  }

  // get identities of the n-th keyring entry of the primary keyring
  public getIdentities(n: number): ReadonlyArray<LocalIdentity> {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const entry = this.keyring.getEntries().find((_, index) => index === n);
    if (!entry) {
      throw new Error("Entry of index " + n + " does not exist in keyring");
    }

    return entry.getIdentities();
  }

  public async signTransaction(
    n: number,
    identity: PublicIdentity,
    transaction: UnsignedTransaction,
    codec: TxCodec,
    nonce: Nonce,
  ): Promise<SignedTransaction> {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const entry = this.keyring.getEntries().find((_, index) => index === n);
    if (!entry) {
      throw new Error("Entry of index " + n + " does not exist in keyring");
    }

    const bytes = codec.bytesToSign(transaction, nonce);
    const signature: FullSignature = {
      publicKey: identity.pubkey,
      nonce: nonce,
      signature: await entry.createTransactionSignature(identity, bytes, "chain!" as ChainId),
    };

    return {
      transaction: transaction,
      primarySignature: signature,
      otherSignatures: [],
    };
  }

  public async appendSignature(
    n: number,
    identity: PublicIdentity,
    originalTransaction: SignedTransaction,
    codec: TxCodec,
    nonce: Nonce,
  ): Promise<SignedTransaction> {
    if (!this.keyring) {
      throw new Error("UserProfile is currently locked");
    }

    const entry = this.keyring.getEntries().find((_, index) => index === n);
    if (!entry) {
      throw new Error("Entry of index " + n + " does not exist in keyring");
    }

    const bytes = codec.bytesToSign(originalTransaction.transaction, nonce);
    const newSignature: FullSignature = {
      publicKey: identity.pubkey,
      nonce: nonce,
      signature: await entry.createTransactionSignature(identity, bytes, "chain!" as ChainId),
    };

    return {
      transaction: originalTransaction.transaction,
      primarySignature: originalTransaction.primarySignature,
      otherSignatures: [...originalTransaction.otherSignatures, newSignature],
    };
  }
}

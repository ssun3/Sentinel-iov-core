import { Algorithm, FullSignature, FungibleToken, PublicKeyBundle, SignatureBytes } from "@iov/types";
import * as codec from "./codec";

export const encodeToken = (token: FungibleToken) =>
  codec.x.Coin.create({
    // use null instead of 0 to not encode zero fields
    // for compatibility with golang encoder
    whole: token.whole || null,
    fractional: token.fractional || null,
    ticker: token.tokenTicker,
  });

export const encodeFullSig = (sig: FullSignature) =>
  codec.sigs.StdSignature.create({
    sequence: sig.nonce,
    pubKey: encodePubKey(sig.publicKey),
    signature: encodeSignature(sig.publicKey.algo, sig.signature),
  });

export const encodePubKey = (publicKey: PublicKeyBundle) => {
  switch (publicKey.algo) {
    case Algorithm.ED25519:
      return { ed25519: publicKey.data };
    default:
      throw new Error("unsupported algorithm: " + publicKey.algo);
  }
};

// encodeSignature needs the PublicKeyBundle to determine the type
export const encodeSignature = (algo: Algorithm, sigs: SignatureBytes) => {
  switch (algo) {
    case Algorithm.ED25519:
      return { ed25519: sigs };
    default:
      throw new Error("unsupported algorithm: " + algo);
  }
};

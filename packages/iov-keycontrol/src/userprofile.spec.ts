import levelup from "levelup";
import MemDownConstructor, { MemDown } from "memdown";
import { ReadonlyDate } from "readonly-date";

import { Keyring } from "./keyring";
import { UserProfile } from "./userprofile";

describe("UserProfile", () => {
  it("can be constructed", () => {
    const keyringSerializetion = new Keyring().serialize();
    const createdAt = new ReadonlyDate(ReadonlyDate.now());
    const profile = new UserProfile(createdAt, keyringSerializetion);
    expect(profile).toBeTruthy();
  });

  it("can be created in an empty store", done => {
    (async () => {
      const storage: MemDown<string, string> = MemDownConstructor<string, string>();
      await UserProfile.createIn(storage);
      const profile = await UserProfile.loadFrom(storage);
      expect(profile).toBeTruthy();

      done();
    })().catch(error => {
      setTimeout(() => {
        throw error;
      });
    });
  });

  it("flushed store when creating", done => {
    (async () => {
      const storage: MemDown<string, string> = MemDownConstructor<string, string>();

      {
        const db = levelup(storage);
        await db.put("foo", "bar");
        await db.close();
      }

      await UserProfile.createIn(storage);

      {
        const db = levelup(storage);
        await db
          .get("foo")
          .then(() => {
            fail("get 'foo' promise must not reslve");
          })
          .catch(error => {
            expect(error.notFound).toBeTruthy();
          });
        await db.close();
      }

      done();
    })().catch(error => {
      setTimeout(() => {
        throw error;
      });
    });
  });
});

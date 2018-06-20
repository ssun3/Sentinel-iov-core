import { Bip39, EnglishMnemonic } from "./bip39";
import { Encoding } from "./encoding";

const fromHex = Encoding.fromHex;

describe("Bip39", () => {
  it("can encode to mnemonic", () => {
    // Test vectors from
    // https://github.com/trezor/python-mnemonic/blob/b502451a33a440783926e04428115e0bed87d01f/vectors.json
    expect(Bip39.encode(fromHex("00000000000000000000000000000000")).asString()).toEqual("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    expect(Bip39.encode(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f")).asString()).toEqual("legal winner thank year wave sausage worth useful legal winner thank yellow");
    expect(Bip39.encode(fromHex("80808080808080808080808080808080")).asString()).toEqual("letter advice cage absurd amount doctor acoustic avoid letter advice cage above");
    expect(Bip39.encode(fromHex("ffffffffffffffffffffffffffffffff")).asString()).toEqual("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong");
    expect(Bip39.encode(fromHex("000000000000000000000000000000000000000000000000")).asString()).toEqual("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent");
    expect(Bip39.encode(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f")).asString()).toEqual("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will");
    expect(Bip39.encode(fromHex("808080808080808080808080808080808080808080808080")).asString()).toEqual("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always");
    expect(Bip39.encode(fromHex("ffffffffffffffffffffffffffffffffffffffffffffffff")).asString()).toEqual("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when");
    expect(Bip39.encode(fromHex("0000000000000000000000000000000000000000000000000000000000000000")).asString()).toEqual("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art");
    expect(Bip39.encode(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f")).asString()).toEqual("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title");
    expect(Bip39.encode(fromHex("8080808080808080808080808080808080808080808080808080808080808080")).asString()).toEqual("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless");
    expect(Bip39.encode(fromHex("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff")).asString()).toEqual("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote");
    expect(Bip39.encode(fromHex("9e885d952ad362caeb4efe34a8e91bd2")).asString()).toEqual("ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic");
    expect(Bip39.encode(fromHex("6610b25967cdcca9d59875f5cb50b0ea75433311869e930b")).asString()).toEqual("gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog");
    expect(Bip39.encode(fromHex("68a79eaca2324873eacc50cb9c6eca8cc68ea5d936f98787c60c7ebc74e6ce7c")).asString()).toEqual("hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length");
    expect(Bip39.encode(fromHex("c0ba5a8e914111210f2bd131f3d5e08d")).asString()).toEqual("scheme spot photo card baby mountain device kick cradle pact join borrow");
    expect(Bip39.encode(fromHex("6d9be1ee6ebd27a258115aad99b7317b9c8d28b6d76431c3")).asString()).toEqual("horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave");
    expect(Bip39.encode(fromHex("9f6a2878b2520799a44ef18bc7df394e7061a224d2c33cd015b157d746869863")).asString()).toEqual("panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside");
    expect(Bip39.encode(fromHex("23db8160a31d3e0dca3688ed941adbf3")).asString()).toEqual("cat swing flag economy stadium alone churn speed unique patch report train");
    expect(Bip39.encode(fromHex("8197a4a47f0425faeaa69deebc05ca29c0a5b5cc76ceacc0")).asString()).toEqual("light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access");
    expect(Bip39.encode(fromHex("066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad")).asString()).toEqual("all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform");
    expect(Bip39.encode(fromHex("f30f8c1da665478f49b001d94c5fc452")).asString()).toEqual("vessel ladder alter error federal sibling chat ability sun glass valve picture");
    expect(Bip39.encode(fromHex("c10ec20dc3cd9f652c7fac2f1230f7a3c828389a14392f05")).asString()).toEqual("scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump");
    expect(Bip39.encode(fromHex("f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f")).asString()).toEqual("void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold");

    // invalid input length
    expect(() => {
      Bip39.encode(fromHex(""));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("00"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("0000000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("0000000000000000000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("00000000000000000000000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("00000000000000000000000000000000000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
    expect(() => {
      Bip39.encode(fromHex("000000000000000000000000000000000000000000000000000000000000000000"));
    }).toThrowError(/invalid input length/);
  });

  it("can decode from mnemonic", () => {
    expect(Bip39.decode(new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about"))).toEqual(fromHex("00000000000000000000000000000000"));
    expect(Bip39.decode(new EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank yellow"))).toEqual(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"));
    expect(Bip39.decode(new EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage above"))).toEqual(fromHex("80808080808080808080808080808080"));
    expect(Bip39.decode(new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong"))).toEqual(fromHex("ffffffffffffffffffffffffffffffff"));
    expect(Bip39.decode(new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent"))).toEqual(fromHex("000000000000000000000000000000000000000000000000"));
    expect(Bip39.decode(new EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will"))).toEqual(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"));
    expect(Bip39.decode(new EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always"))).toEqual(fromHex("808080808080808080808080808080808080808080808080"));
    expect(Bip39.decode(new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when"))).toEqual(fromHex("ffffffffffffffffffffffffffffffffffffffffffffffff"));
    expect(Bip39.decode(new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art"))).toEqual(fromHex("0000000000000000000000000000000000000000000000000000000000000000"));
    expect(Bip39.decode(new EnglishMnemonic("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title"))).toEqual(fromHex("7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f7f"));
    expect(Bip39.decode(new EnglishMnemonic("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless"))).toEqual(fromHex("8080808080808080808080808080808080808080808080808080808080808080"));
    expect(Bip39.decode(new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote"))).toEqual(fromHex("ffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"));
    expect(Bip39.decode(new EnglishMnemonic("ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic"))).toEqual(fromHex("9e885d952ad362caeb4efe34a8e91bd2"));
    expect(Bip39.decode(new EnglishMnemonic("gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog"))).toEqual(fromHex("6610b25967cdcca9d59875f5cb50b0ea75433311869e930b"));
    expect(Bip39.decode(new EnglishMnemonic("hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length"))).toEqual(fromHex("68a79eaca2324873eacc50cb9c6eca8cc68ea5d936f98787c60c7ebc74e6ce7c"));
    expect(Bip39.decode(new EnglishMnemonic("scheme spot photo card baby mountain device kick cradle pact join borrow"))).toEqual(fromHex("c0ba5a8e914111210f2bd131f3d5e08d"));
    expect(Bip39.decode(new EnglishMnemonic("horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave"))).toEqual(fromHex("6d9be1ee6ebd27a258115aad99b7317b9c8d28b6d76431c3"));
    expect(Bip39.decode(new EnglishMnemonic("panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside"))).toEqual(fromHex("9f6a2878b2520799a44ef18bc7df394e7061a224d2c33cd015b157d746869863"));
    expect(Bip39.decode(new EnglishMnemonic("cat swing flag economy stadium alone churn speed unique patch report train"))).toEqual(fromHex("23db8160a31d3e0dca3688ed941adbf3"));
    expect(Bip39.decode(new EnglishMnemonic("light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access"))).toEqual(fromHex("8197a4a47f0425faeaa69deebc05ca29c0a5b5cc76ceacc0"));
    expect(Bip39.decode(new EnglishMnemonic("all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform"))).toEqual(fromHex("066dca1a2bb7e8a1db2832148ce9933eea0f3ac9548d793112d9a95c9407efad"));
    expect(Bip39.decode(new EnglishMnemonic("vessel ladder alter error federal sibling chat ability sun glass valve picture"))).toEqual(fromHex("f30f8c1da665478f49b001d94c5fc452"));
    expect(Bip39.decode(new EnglishMnemonic("scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump"))).toEqual(fromHex("c10ec20dc3cd9f652c7fac2f1230f7a3c828389a14392f05"));
    expect(Bip39.decode(new EnglishMnemonic("void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold"))).toEqual(fromHex("f585c11aec520db57dd353c69554b21a89b20fb0650966fa0a9d6f74fd989d8f"));

    // tslint:disable:no-unused-expression

    // extra space (leading, middle, trailing)
    expect(() => {
      new EnglishMnemonic(" abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("abandon  abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about ");
    }).toThrowError(/invalid mnemonic format/i);

    // Disallowed letters in words (capital, number, special char)
    expect(() => {
      new EnglishMnemonic("Abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon Abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("route66 abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon route66 abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("lötkolben abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon lötkolben abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid mnemonic format/i);

    // too few and too many words (11, 13, 17, 19, 23, 25)
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid word count(.*)got: 11/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about");
    }).toThrowError(/invalid word count(.*)got: 13/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent");
    }).toThrowError(/invalid word count(.*)got: 17/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent");
    }).toThrowError(/invalid word count(.*)got: 19/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art");
    }).toThrowError(/invalid word count(.*)got: 23/i);
    expect(() => {
      new EnglishMnemonic("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art");
    }).toThrowError(/invalid word count(.*)got: 25/i);

    // invalid checksum (12x, 18x, 24x "zoo")
    expect(() => {
      new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo");
    }).toThrowError(/invalid mnemonic checksum/i);
    expect(() => {
      new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo");
    }).toThrowError(/invalid mnemonic checksum/i);
    expect(() => {
      new EnglishMnemonic("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo");
    }).toThrowError(/invalid mnemonic checksum/i);

    // tslint:enable:no-unused-expression
  });

  it("can calculate seed from mnemonic (trezor test vectors)", () => {
    // only activate first 12 test vectors because mnemonicToSeed is very slow
    // in Chrome at the moment
    expect(Bip39.mnemonicToSeed("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon about", "TREZOR")).toEqual(fromHex("c55257c360c07c72029aebc1b53c05ed0362ada38ead3e3e9efa3708e53495531f09a6987599d18264c1e1c92f2cf141630c7a3c4ab7c81b2f001698e7463b04"));
    expect(Bip39.mnemonicToSeed("legal winner thank year wave sausage worth useful legal winner thank yellow", "TREZOR")).toEqual(fromHex("2e8905819b8723fe2c1d161860e5ee1830318dbf49a83bd451cfb8440c28bd6fa457fe1296106559a3c80937a1c1069be3a3a5bd381ee6260e8d9739fce1f607"));
    expect(Bip39.mnemonicToSeed("letter advice cage absurd amount doctor acoustic avoid letter advice cage above", "TREZOR")).toEqual(fromHex("d71de856f81a8acc65e6fc851a38d4d7ec216fd0796d0a6827a3ad6ed5511a30fa280f12eb2e47ed2ac03b5c462a0358d18d69fe4f985ec81778c1b370b652a8"));
    expect(Bip39.mnemonicToSeed("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo wrong", "TREZOR")).toEqual(fromHex("ac27495480225222079d7be181583751e86f571027b0497b5b5d11218e0a8a13332572917f0f8e5a589620c6f15b11c61dee327651a14c34e18231052e48c069"));
    expect(Bip39.mnemonicToSeed("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon agent", "TREZOR")).toEqual(fromHex("035895f2f481b1b0f01fcf8c289c794660b289981a78f8106447707fdd9666ca06da5a9a565181599b79f53b844d8a71dd9f439c52a3d7b3e8a79c906ac845fa"));
    expect(Bip39.mnemonicToSeed("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal will", "TREZOR")).toEqual(fromHex("f2b94508732bcbacbcc020faefecfc89feafa6649a5491b8c952cede496c214a0c7b3c392d168748f2d4a612bada0753b52a1c7ac53c1e93abd5c6320b9e95dd"));
    expect(Bip39.mnemonicToSeed("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter always", "TREZOR")).toEqual(fromHex("107d7c02a5aa6f38c58083ff74f04c607c2d2c0ecc55501dadd72d025b751bc27fe913ffb796f841c49b1d33b610cf0e91d3aa239027f5e99fe4ce9e5088cd65"));
    expect(Bip39.mnemonicToSeed("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo when", "TREZOR")).toEqual(fromHex("0cd6e5d827bb62eb8fc1e262254223817fd068a74b5b449cc2f667c3f1f985a76379b43348d952e2265b4cd129090758b3e3c2c49103b5051aac2eaeb890a528"));
    expect(Bip39.mnemonicToSeed("abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon abandon art", "TREZOR")).toEqual(fromHex("bda85446c68413707090a52022edd26a1c9462295029f2e60cd7c4f2bbd3097170af7a4d73245cafa9c3cca8d561a7c3de6f5d4a10be8ed2a5e608d68f92fcc8"));
    expect(Bip39.mnemonicToSeed("legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth useful legal winner thank year wave sausage worth title", "TREZOR")).toEqual(fromHex("bc09fca1804f7e69da93c2f2028eb238c227f2e9dda30cd63699232578480a4021b146ad717fbb7e451ce9eb835f43620bf5c514db0f8add49f5d121449d3e87"));
    expect(Bip39.mnemonicToSeed("letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic avoid letter advice cage absurd amount doctor acoustic bless", "TREZOR")).toEqual(fromHex("c0c519bd0e91a2ed54357d9d1ebef6f5af218a153624cf4f2da911a0ed8f7a09e2ef61af0aca007096df430022f7a2b6fb91661a9589097069720d015e4e982f"));
    expect(Bip39.mnemonicToSeed("zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo zoo vote", "TREZOR")).toEqual(fromHex("dd48c104698c30cfe2b6142103248622fb7bb0ff692eebb00089b32d22484e1613912f0a5b694407be899ffd31ed3992c456cdf60f5d4564b8ba3f05a69890ad"));
    /*
    expect(Bip39.mnemonicToSeed("ozone drill grab fiber curtain grace pudding thank cruise elder eight picnic", "TREZOR")).toEqual(fromHex("274ddc525802f7c828d8ef7ddbcdc5304e87ac3535913611fbbfa986d0c9e5476c91689f9c8a54fd55bd38606aa6a8595ad213d4c9c9f9aca3fb217069a41028"));
    expect(Bip39.mnemonicToSeed("gravity machine north sort system female filter attitude volume fold club stay feature office ecology stable narrow fog", "TREZOR")).toEqual(fromHex("628c3827a8823298ee685db84f55caa34b5cc195a778e52d45f59bcf75aba68e4d7590e101dc414bc1bbd5737666fbbef35d1f1903953b66624f910feef245ac"));
    expect(Bip39.mnemonicToSeed("hamster diagram private dutch cause delay private meat slide toddler razor book happy fancy gospel tennis maple dilemma loan word shrug inflict delay length", "TREZOR")).toEqual(fromHex("64c87cde7e12ecf6704ab95bb1408bef047c22db4cc7491c4271d170a1b213d20b385bc1588d9c7b38f1b39d415665b8a9030c9ec653d75e65f847d8fc1fc440"));
    expect(Bip39.mnemonicToSeed("scheme spot photo card baby mountain device kick cradle pact join borrow", "TREZOR")).toEqual(fromHex("ea725895aaae8d4c1cf682c1bfd2d358d52ed9f0f0591131b559e2724bb234fca05aa9c02c57407e04ee9dc3b454aa63fbff483a8b11de949624b9f1831a9612"));
    expect(Bip39.mnemonicToSeed("horn tenant knee talent sponsor spell gate clip pulse soap slush warm silver nephew swap uncle crack brave", "TREZOR")).toEqual(fromHex("fd579828af3da1d32544ce4db5c73d53fc8acc4ddb1e3b251a31179cdb71e853c56d2fcb11aed39898ce6c34b10b5382772db8796e52837b54468aeb312cfc3d"));
    expect(Bip39.mnemonicToSeed("panda eyebrow bullet gorilla call smoke muffin taste mesh discover soft ostrich alcohol speed nation flash devote level hobby quick inner drive ghost inside", "TREZOR")).toEqual(fromHex("72be8e052fc4919d2adf28d5306b5474b0069df35b02303de8c1729c9538dbb6fc2d731d5f832193cd9fb6aeecbc469594a70e3dd50811b5067f3b88b28c3e8d"));
    expect(Bip39.mnemonicToSeed("cat swing flag economy stadium alone churn speed unique patch report train", "TREZOR")).toEqual(fromHex("deb5f45449e615feff5640f2e49f933ff51895de3b4381832b3139941c57b59205a42480c52175b6efcffaa58a2503887c1e8b363a707256bdd2b587b46541f5"));
    expect(Bip39.mnemonicToSeed("light rule cinnamon wrap drastic word pride squirrel upgrade then income fatal apart sustain crack supply proud access", "TREZOR")).toEqual(fromHex("4cbdff1ca2db800fd61cae72a57475fdc6bab03e441fd63f96dabd1f183ef5b782925f00105f318309a7e9c3ea6967c7801e46c8a58082674c860a37b93eda02"));
    expect(Bip39.mnemonicToSeed("all hour make first leader extend hole alien behind guard gospel lava path output census museum junior mass reopen famous sing advance salt reform", "TREZOR")).toEqual(fromHex("26e975ec644423f4a4c4f4215ef09b4bd7ef924e85d1d17c4cf3f136c2863cf6df0a475045652c57eb5fb41513ca2a2d67722b77e954b4b3fc11f7590449191d"));
    expect(Bip39.mnemonicToSeed("vessel ladder alter error federal sibling chat ability sun glass valve picture", "TREZOR")).toEqual(fromHex("2aaa9242daafcee6aa9d7269f17d4efe271e1b9a529178d7dc139cd18747090bf9d60295d0ce74309a78852a9caadf0af48aae1c6253839624076224374bc63f"));
    expect(Bip39.mnemonicToSeed("scissors invite lock maple supreme raw rapid void congress muscle digital elegant little brisk hair mango congress clump", "TREZOR")).toEqual(fromHex("7b4a10be9d98e6cba265566db7f136718e1398c71cb581e1b2f464cac1ceedf4f3e274dc270003c670ad8d02c4558b2f8e39edea2775c9e232c7cb798b069e88"));
    expect(Bip39.mnemonicToSeed("void come effort suffer camp survey warrior heavy shoot primary clutch crush open amazing screen patrol group space point ten exist slush involve unfold", "TREZOR")).toEqual(fromHex("01f5bced59dec48e362f2c45b5de68b9fd6c92c6634f44d6d40aab69056506f0e35524a518034ddc1192e1dacd32c1ed3eaa3c3b131c88ed8e7e54c49a5d0998"));
    */
  });

  it("can calculate seed from mnemonic (no password)", () => {
    // custom test vectors using
    // $ git clone https://github.com/trezor/python-mnemonic.git && cd python-mnemonic
    // $ python3 -m venv venv
    // $ source venv/bin/activate
    // $ pip install wheel bip32utils
    // $ pip install -r requirements.txt
    // patch generate_vectors.py to your needs
    // $ python generate_vectors.py

    // empty password
    expect(Bip39.mnemonicToSeed("robust pipe raise illness symptom crowd trip will slow assault recipe oven", "")).toEqual(fromHex("5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093"));
    expect(Bip39.mnemonicToSeed("pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all", "")).toEqual(fromHex("1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99"));
    expect(Bip39.mnemonicToSeed("allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix", "")).toEqual(fromHex("476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b"));

    // no password
    expect(Bip39.mnemonicToSeed("robust pipe raise illness symptom crowd trip will slow assault recipe oven")).toEqual(fromHex("5539eed11e1096e9d52f69f15ad3d7c6547a40a3865b9517dbcbb03c31f231900622f58616d64d2d1cc0440f31d67fb0b2699a5fc885f796c746e0f844477093"));
    expect(Bip39.mnemonicToSeed("pair ethics august street tornado spare present under capital raise cross current main craft stone clutch tray all")).toEqual(fromHex("1272467e954cec4e0ad720002d037a3aaf795a57ffbeea6aaa0c242d410eb52050292447aa2c68470a07ecc80171edfa9e027793265047be3128d94e867a4f99"));
    expect(Bip39.mnemonicToSeed("allow finger front connect strategy purchase journey distance trouble guitar honey alpha giraffe canal junk vintage chronic blade gate custom soap flip first mix")).toEqual(fromHex("476a41ac016b5bdf9f114456929975a036ae326e2efdca441ac5a0949ef89ab9246dc9e49a5d2d64d1926eb9dbe17576cb010471c2a821b216202acdf3d7a27b"));
  });

  it("can calculate seed from mnemonic (arbitraty input strings)", () => {
    expect(Bip39.mnemonicToSeed("")).toEqual(fromHex("4ed8d4b17698ddeaa1f1559f152f87b5d472f725ca86d341bd0276f1b61197e21dd5a391f9f5ed7340ff4d4513aab9cce44f9497a5e7ed85fd818876b6eb402e"));
    expect(Bip39.mnemonicToSeed("foo")).toEqual(fromHex("5d12c1e43c65846ae89f712e146297ca337a449b775ad25214f823b81675cc1334e5c9a45fc318a047501b58603eaa0408e6f3bc2dc202cb1afc568ea1b90995"));
    expect(Bip39.mnemonicToSeed("foo bar")).toEqual(fromHex("a9c35719c7c9d12428fd82e35e0b9c0e06ab4b1b8f94c53891e7db6af8846e32f5bfcc33c3160e9e76d2c83ba8aa7e3f44fb7ddac398ca0a2303926da380018e"));
    expect(Bip39.mnemonicToSeed("foo!")).toEqual(fromHex("6a759fb696fcafe18339750b82350b048c202f386bfee1c33718929b197b407dcde3fb4391d723578880ff1de2eb8c6948e93707c52437441f124599adfdfe02"));
    expect(Bip39.mnemonicToSeed("foo✓")).toEqual(fromHex("2563718296d7bd1f987ae8c9f85c94d3082cfe2259a0505c14a804cb04ce34cf170777d93df961936a71747c797ee3841cd70345f45ed1f191df2a8bcc34e745"));
    expect(Bip39.mnemonicToSeed("", "passwd")).toEqual(fromHex("ccc3848b6cbbc675b0e5ed78ca7321544f7a1d23c28c0d7734ee67dea9bfa77064c2b271552e7c1376dab2290bb63e38a1526f2d20efbbf599367aff2d5d97e3"));
    expect(Bip39.mnemonicToSeed("foo", "passwd")).toEqual(fromHex("81521f6721fe94e58a38999e02ef345eca269e59eeb7b47456c43a8dfed052b8c3fcf4f403b43e3ed5add3d012847d8803a6ca378ae792b3504701fd40ef3d98"));
    expect(Bip39.mnemonicToSeed("foo bar", "passwd")).toEqual(fromHex("4e09c0b2e155809b6d78028c5dc271838cb9e470e3815c460a4816c55589a1e23a77bdc8b275948a3e1dec00874758cc41306aba18149656cd655f8441bb6f17"));
    expect(Bip39.mnemonicToSeed("foo!", "passwd")).toEqual(fromHex("91add2c90ee99e0abdc38752272b2f10eb9cf582f652cd003213db384c46883b3be4c22fe6610265e5571cdf0ebeed48625a560cc801bf7190fa8bd926ec92ec"));
    expect(Bip39.mnemonicToSeed("foo✓", "passwd")).toEqual(fromHex("d8669d85ba9c993d95f7ca89827e71d86b3dc456256178b6f5c72a7a77c5144ddd9f4b5da0cfc8a9c607e669c2da67e5ce771a97b8d3c9aab6c6e5d1d44ab404"));
  });
});

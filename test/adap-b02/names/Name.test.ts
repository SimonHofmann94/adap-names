import { describe, it, expect } from "vitest";

import { Name } from "../../../src/adap-b02/names/Name";
import { StringName } from "../../../src/adap-b02/names/StringName";
import { StringArrayName } from "../../../src/adap-b02/names/StringArrayName";

describe("Basic StringName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss.fau.de");
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringName("oss.cs.fau.de");
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Basic StringArrayName function tests", () => {
  it("test insert", () => {
    let n: Name = new StringArrayName(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test append", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
  it("test remove", () => {
    let n: Name = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(0);
    expect(n.asString()).toBe("cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new StringName("oss#fau#de", '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    let n: Name = new StringName("oss.cs.fau.de", '#');
    expect(n.getNoComponents()).toBe(1);
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

describe("StringName test constructor and initialization", () => {
  
  it("should throw error when delimiter is escape character", () => {
    expect(() => new StringName("oss.cs.fau.de", "\\")).toThrow();
  });

  it("should throw error when delimiter is not a single character", () => {
    expect(() => new StringName("oss.cs.fau.de", "##")).toThrow();
  });

});

describe("StringName test isEmpty and getNoComponents", () => {

  it("should return true when name is empty", () => {
    let n = new StringName("");
    expect(n.isEmpty()).toBe(false);
  });

  it("should return false when name has components", () => {
    let n = new StringName("oss.cs.fau.de");
    expect(n.isEmpty()).toBe(false);
  });

  it("should correctly count components", () => {
    let n = new StringName("a.b.c.d.e");
    expect(n.getNoComponents()).toBe(5);
  });
  
});

describe("StringName test getComponent", () => {

  it("should get component at index", () => {
    let n = new StringName("oss.cs.fau.de");
    expect(n.getComponent(0)).toBe("oss");
  });

  it("should throw error for negative index", () => {
    let n = new StringName("oss.cs.fau.de");
    expect(() => n.getComponent(-1)).toThrow();
  });

  it("should throw error for index out of bounds", () => {
    let n = new StringName("oss.cs.fau.de");
    expect(() => n.getComponent(4)).toThrow();
  });

});

describe("StringName test setComponent", () => {
  
  it("should set component at index", () => {
    let n = new StringName("oss.cs.fau.de");
    n.setComponent(0, "www");
    expect(n.getComponent(0)).toBe("www");
    expect(n.asString()).toBe("www.cs.fau.de");
  });

});

describe("StringName test insert", () => {
  it("should insert at index", () => {
    let n = new StringName("cs.fau.de");
    n.insert(0, "oss");
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

});

describe("StringName test append", () => {
  it("should append component", () => {
    let n = new StringName("oss.cs.fau");
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("StringName test remove", () => {
  it("should remove component", () => {
    let n = new StringName("oss.cs.fau.de");
    n.remove(1);
    expect(n.asString()).toBe("oss.fau.de");
    expect(n.getNoComponents()).toBe(3);
  });
});

describe("StringName test concat", () => {
  it("should concatenate two StringName instances", () => {
    let n1 = new StringName("oss.cs");
    let n2 = new StringName("fau.de");
    n1.concat(n2);
    expect(n1.asString()).toBe("oss.cs.fau.de");
    expect(n1.getNoComponents()).toBe(4);
  });
});

describe("StringName test asString and asDataString", () => {
  it("should return string with default delimiter", () => {
    let n = new StringName("oss.cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("should handle escaped characters in asString", () => {
    let n = new StringName("oss\\.cs.fau.de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

// StringArrayName Tests

describe("StringArrayName test constructor and initialization", () => {
  it("should create a StringArrayName with array of components", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getNoComponents()).toBe(4);
    expect(n.isEmpty()).toBe(false);
  });
});

describe("StringArrayName test isEmpty and getNoComponents", () => {
  it("should return true/false when array is empty", () => {
    let n = new StringArrayName([]);
    expect(n.isEmpty()).toBe(true);
  });

  it("should correctly count components", () => {
    let n = new StringArrayName(["a", "b", "c", "d", "e"]);
    expect(n.getNoComponents()).toBe(5);
  });
});

describe("StringArrayName test getComponent", () => {
  it("should get component at index", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(3)).toBe("de");
  });
});

describe("StringArrayName test setComponent", () => {
  it("should set component at index", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.setComponent(4, "www");
    expect(n.getComponent(4)).toBe("www");
    expect(n.asString()).toBe("oss.cs.fau.de.www");
  });
});

describe("StringArrayName test insert", () => {
  it("should insert at index", () => {
    let n = new StringArrayName(["cs", "fau", "de"]);
    n.insert(2, "oss");
    expect(n.getNoComponents()).toBe(4);
    expect(n.asString()).toBe("cs.fau.oss.de");
  });
});

describe("StringArrayName test append", () => {
  it("should append component", () => {
    let n = new StringArrayName(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("StringArrayName test remove", () => {
  it("should remove component at index", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"]);
    n.remove(3);
    expect(n.asString()).toBe("oss.cs.fau");
    expect(n.getNoComponents()).toBe(3);
  });
});

describe("StringArrayName test concat", () => {
  it("should concatenate two StringArrayName instances", () => {
    let n1 = new StringArrayName(["oss", "cs"]);
    let n2 = new StringArrayName(["fau", "de"]);
    n1.concat(n2);
    expect(n1.asString()).toBe("oss.cs.fau.de");
    expect(n1.getNoComponents()).toBe(4);
  });
});

describe("StringArrayName test asString and asDataString", () => {

  it("should return string with custom delimiter", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"], "#");
    expect(n.asString("#")).toBe("oss#cs#fau#de");
  });

  it("should return data string with default delimiter", () => {
    let n = new StringArrayName(["oss", "cs", "fau", "de"]);
    expect(n.asDataString()).toBe("oss.cs.fau.de");
  });
});

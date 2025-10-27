import { describe, it, expect } from "vitest";
import { Name } from "../../../src/adap-b01/names/Name";

describe("Basic initialization tests", () => {
  it("test construction 1", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Basic function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"]);
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss.cs.fau.de");
  });
});

describe("Delimiter function tests", () => {
  it("test insert", () => {
    let n: Name = new Name(["oss", "fau", "de"], '#');
    n.insert(1, "cs");
    expect(n.asString()).toBe("oss#cs#fau#de");
  });
});

describe("Escape character extravaganza", () => {
  it("test escape and delimiter boundary conditions", () => {
    // Original name string = "oss.cs.fau.de"
    let n: Name = new Name(["oss.cs.fau.de"], '#');
    expect(n.asString()).toBe("oss.cs.fau.de");
    n.append("people");
    expect(n.asString()).toBe("oss.cs.fau.de#people");
  });
});

// Test asString
describe("asString tests", () => {
  it("can return string with default delimiter", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.asString()).toBe("oss.cs.fau.de");
  });

  it("can return string with custom delimiter", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"], "/");
    expect(n.asString()).toBe("oss/cs/fau/de");
  });

  it("can use different delimiter than constructor", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"], ".");
    expect(n.asString("#")).toBe("oss#cs#fau#de");
  });

  it("can handle empty components", () => {
    let n: Name = new Name(["oss", "", "fau", "de"]);
    expect(n.asString()).toBe("oss..fau.de");
  });
});

// Test getComponent
describe("getComponent tests", () => {
  it("can return correct component", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    expect(n.getComponent(0)).toBe("oss");
  });

  it("can throw error for negative index", () => {
    let n: Name = new Name(["oss", "cs"]);
    expect(() => n.getComponent(-1)).toThrow("Index out of bounds");
  });
});

// Test setComponent
describe("setComponent tests", () => {
  it("sets component at index", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.setComponent(1, "math");
    expect(n.getComponent(1)).toBe("math");
    expect(n.asString()).toBe("oss.math.fau.de");
  });
});

// Test insert
describe("insert tests", () => {
  it("inserts at beginning", () => {
    let n: Name = new Name(["cs", "fau", "de"]);
    n.insert(0, "oss");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
});

// Test append
describe("append tests", () => {
  it("append component to end", () => {
    let n: Name = new Name(["oss", "cs", "fau"]);
    n.append("de");
    expect(n.asString()).toBe("oss.cs.fau.de");
    expect(n.getNoComponents()).toBe(4);
  });
});

// Test remove
describe("remove tests", () => {
  it("remove component at index", () => {
    let n: Name = new Name(["oss", "cs", "fau", "de"]);
    n.remove(1);
    expect(n.asString()).toBe("oss.fau.de");
    expect(n.getNoComponents()).toBe(3);
  });
});
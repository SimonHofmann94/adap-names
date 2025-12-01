import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b04/names/StringName";
import { StringArrayName } from "../../../src/adap-b04/names/StringArrayName";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";

describe("Preconditions", () => {

    it("Constructor invalid delimiter", () => {
        expect(() => new StringName("abc", "::")).toThrow(IllegalArgumentException);
        expect(() => new StringArrayName(["abc"], "")).toThrow(IllegalArgumentException);
        expect(() => new StringName("foo", "\\")).toThrow(IllegalArgumentException);
    });

    it("insert index out of bounds", () => {
        const n = new StringName("a.b");
        expect(() => n.insert(-1, "c")).toThrow(IllegalArgumentException);
        expect(() => n.insert(3, "c")).toThrow(IllegalArgumentException); 
    });

    it("remove index out of bounds", () => {
        const n = new StringName("a.b");
        expect(() => n.remove(-1)).toThrow(IllegalArgumentException);
        expect(() => n.remove(2)).toThrow(IllegalArgumentException);
    });

    it("setComponent index out of bounds", () => {
        const n = new StringName("a.b");
        expect(() => n.setComponent(-1, "c")).toThrow(IllegalArgumentException);
        expect(() => n.setComponent(2, "c")).toThrow(IllegalArgumentException);
    });
});

describe("Postconditions", () => {
    it("insert increase size / place component", () => {
        const n = new StringName("a.b");
        n.insert(1, "c");
        expect(n.getNoComponents()).toBe(3);
        expect(n.getComponent(1)).toBe("c");
    });

    it("remove decrease size", () => {
        const n = new StringName("a.b.c");
        n.remove(1);
        expect(n.getNoComponents()).toBe(2);
        expect(n.getComponent(0)).toBe("a");
        expect(n.getComponent(1)).toBe("c");
    });
});

describe("Invariants", () => {
    it("StringName invariant", () => {
        const n = new StringName("a.b");
        n.append("c");
        expect(n.getNoComponents()).toBe(3);
    });
});

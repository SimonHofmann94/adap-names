import { describe, it, expect } from "vitest";
import { StringName } from "../../../src/adap-b03/names/StringName";
import { StringArrayName } from "../../../src/adap-b03/names/StringArrayName";

describe("AbstractName Constructor & Validation", () => {

    it("should throw error", () => {

        expect(() => new StringName("abc", "::")).toThrow("Delimiter must be a single character");
        expect(() => new StringArrayName(["abc"], "")).toThrow("Delimiter must be a single character");
    });

    it("should throw error", () => {
        expect(() => new StringName("foo", "\\")).toThrow("Delimiter can not be \\");
    });

    it("should accept delimiter", () => {
        const n = new StringName("abc#def", "#");
        expect(n.getDelimiterCharacter()).toBe("#");
    });
});

describe("getHashCode", () => {

    it("should return same hash code", () => {

        const n1 = new StringName("oss.cs.fau.de");
        const n2 = new StringArrayName(["oss", "cs", "fau", "de"]);

        expect(n1.isEqual(n2)).toBe(true);
        expect(n1.getHashCode()).toBe(n2.getHashCode());
    });

    it("should return different hash codes)", () => {

        const n1 = new StringName("oss.cs.fau.de");
        const n2 = new StringName("oss.cs.fau.com");

        expect(n1.getHashCode()).not.toBe(n2.getHashCode());
    });
});

describe("clone", () => {
    it("should clone StringName", () => {

        const original = new StringName("oss.cs.fau.de");
        const clone = original.clone();
        
        expect(clone).not.toBe(original);

        expect(clone.isEqual(original)).toBe(true);

        expect(clone.getDelimiterCharacter()).toBe(original.getDelimiterCharacter());
    });

    it("should clone StringArrayName", () => {

        const original = new StringArrayName(["oss", "cs", "fau", "de"]);
        const clone = original.clone();

        expect(clone).not.toBe(original);
        expect(clone.isEqual(original)).toBe(true);
        
        clone.append("com");
        
        expect(original.getNoComponents()).toBe(4);
        expect(clone.getNoComponents()).toBe(5);
    });
});
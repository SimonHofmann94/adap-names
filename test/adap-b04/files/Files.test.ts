import { describe, it, expect } from "vitest";
import { Directory } from "../../../src/adap-b04/files/Directory";
import { RootNode } from "../../../src/adap-b04/files/RootNode";
import { File } from "../../../src/adap-b04/files/File";
import { IllegalArgumentException } from "../../../src/adap-b04/common/IllegalArgumentException";
import { InvalidStateException } from "../../../src/adap-b04/common/InvalidStateException";

describe("Files Contracts", () => {

    it("File state transitions should throw InvalidStateException", () => {
        const root = new RootNode();
        const file = new File("file", root);

        expect(() => file.read(10)).toThrow(InvalidStateException);
        expect(() => file.close()).toThrow(InvalidStateException);

        file.open();
        expect(() => file.open()).toThrow(InvalidStateException); 

        file.close();
        expect(() => file.read(10)).toThrow(InvalidStateException);
    });
});

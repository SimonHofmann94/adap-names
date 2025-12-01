import { Node } from "./Node";
import { Directory } from "./Directory";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

enum FileState {
    OPEN,
    CLOSED,
    DELETED        
};

export class File extends Node {

    protected state: FileState = FileState.CLOSED;

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    public open(): void {
        InvalidStateException.assert(this.state == FileState.CLOSED, "File is not closed");
        // do something
        this.state = FileState.OPEN;
    }

    public read(noBytes: number): Int8Array {
        InvalidStateException.assert(this.state == FileState.OPEN, "File is not open");
        // read something
        return new Int8Array();
    }

    public close(): void {
        InvalidStateException.assert(this.state == FileState.OPEN, "File is not open");
        // do something
        this.state = FileState.CLOSED;
    }

    protected doGetFileState(): FileState {
        return this.state;
    }

}
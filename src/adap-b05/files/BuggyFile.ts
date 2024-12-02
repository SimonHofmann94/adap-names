import { File } from "./File";
import { Directory } from "./Directory";
import { InvalidStateException } from "../common/InvalidStateException";
import { ServiceFailureException } from "../common/ServiceFailureException";

export class BuggyFile extends File {

    constructor(baseName: string, parent: Directory) {
        super(baseName, parent);
    }

    /**
     * Fault injection for homework
     * @returns base name, here always ""
     */
    protected doGetBaseName(): string {
        this.baseName = "";

        if (this.baseName === "") {
            const invalidStateException = new InvalidStateException("Base name is invalid (empty).");
            throw new ServiceFailureException("Service failed due to invalid state.", invalidStateException);
        }

        return super.doGetBaseName();
    }

}

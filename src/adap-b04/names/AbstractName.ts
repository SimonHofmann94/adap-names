import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        return this.asDataString().split(this.delimiter).join(delimiter);
    }

    public asDataString(): string {
        return this.getComponents().map(component =>
            component.replace(new RegExp(`([${this.delimiter}${ESCAPE_CHARACTER}])`, 'g'), `${ESCAPE_CHARACTER}$1`)
        ).join(this.delimiter);
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public concat(other: Name): void {
        const noOfComponents = other.getNoComponents();
        for (let i = 0; i < noOfComponents; i++) {
            this.append(other.getComponent(i));
        }
    }

    abstract getNoComponents(): number;
    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;
    abstract insert(i: number, c: string): void;
    abstract append(c: string): void;
    abstract remove(i: number): void;

    protected abstract getComponents(): string[];

    public abstract clone(): Name;
    public abstract isEqual(other: Name): boolean;
    public abstract getHashCode(): number;
}
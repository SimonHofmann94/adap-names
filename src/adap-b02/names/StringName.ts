import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";

    // @methodtype initialization-method
    constructor(other: string, delimiter: string = DEFAULT_DELIMITER) {
        this.name = other;
        this.delimiter = delimiter;
    }

    // @methodtype conversion-method
    public asString(delimiter: string = this.delimiter): string {
        return this.name.split(this.delimiter).join(delimiter);
    }

    // @methodtype conversion-method
    public asDataString(): string {
        return this.name.replace(new RegExp(`([${this.delimiter}${ESCAPE_CHARACTER}])`, 'g'), `${ESCAPE_CHARACTER}$1`);
    }

    // @methodtype get-method
    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    // @methodtype get-method
    public isEmpty(): boolean {
        return this.name.length === 0;
    }

    // @methodtype get-method
    public getNoComponents(): number {
        return this.name.length === 0 ? 0 : this.name.split(this.delimiter).length;
    }

    // @methodtype get-method
    public getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[i];
    }

    // @methodtype set-method
    public setComponent(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    // @methodtype command-method
    public insert(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    // @methodtype command-method
    public append(c: string): void {
        if (this.name.length > 0) {
            this.name += this.delimiter;
        }
        this.name += c;
    }

    // @methodtype command-method
    public remove(i: number): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    // @methodtype command-method
    public concat(other: Name): void {
        const components = other.asString(this.delimiter);
        this.name += (this.name.length > 0 ? this.delimiter : '') + components;
    }
}

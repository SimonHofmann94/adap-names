import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";

    constructor(other: string, delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.name = other;
    }

    public getNoComponents(): number {
        return this.name.length === 0 ? 0 : this.name.split(this.delimiter).length;
    }

    public getComponent(i: number): string {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[i] = c;
        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i > components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 0, c);
        this.name = components.join(this.delimiter);
    }

    public append(c: string): void {
        if (this.name.length > 0) {
            this.name += this.delimiter;
        }
        this.name += c;
    }

    public remove(i: number): void {
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components.splice(i, 1);
        this.name = components.join(this.delimiter);
    }

    protected getComponents(): string[] {
        return this.name.split(this.delimiter);
    }

    public clone(): StringName {
        return new StringName(this.name, this.delimiter);
    }

    public isEqual(other: AbstractName): boolean {
        return this.name === other.asString();
    }

    public getHashCode(): number {
        let hash = 0;
        for (let i = 0; i < this.name.length; i++) {
            const char = this.name.charCodeAt(i);
            hash = ((hash << 5) - hash) + char;
            hash |= 0; 
        }
        return hash;
    }
}
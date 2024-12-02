import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailureException } from "../common/MethodFailureException";

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
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.getNoComponents(),
            `Index out of bounds: ${i}`
        );
    
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        return components[i];
    }

    public setComponent(i: number, c: string): void {
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.getNoComponents(),
            `Index out of bounds: ${i}`
        );
        IllegalArgumentException.assertIsNotNullOrUndefined(
            c,
            "Component to set cannot be null or undefined"
        );
    
        const components = this.name.split(this.delimiter);
        if (i < 0 || i >= components.length) {
            throw new Error("Index out of bounds");
        }
        components[i] = c;
        MethodFailureException.assertCondition(
            components[i] === c,
            `Failed to set component at index ${i} to ${c}`
        );
    
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
        IllegalArgumentException.assertIsNotNullOrUndefined(
            c,
            "Component to append cannot be null or undefined"
        );
    
        if (this.name.length > 0) {
            this.name += this.delimiter;
        }
        this.name += c;
    }

    public remove(i: number): void {
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.getNoComponents(),
            `Index out of bounds: ${i}`
        );
    
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

    public assertClassInvariant(): void {
        InvalidStateException.assertIsNotNullOrUndefined(
            this.name,
            "Name string is null or undefined"
        );
    }
}
    

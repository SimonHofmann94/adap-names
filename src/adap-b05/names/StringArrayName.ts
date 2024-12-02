import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";
import { MethodFailedException } from "../common/MethodFailedException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(other: string[], delimiter: string = DEFAULT_DELIMITER) {
        super(delimiter);
        this.components = [...other];
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            `Index out of bounds: ${i}`
        );
    
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        IllegalArgumentException.assertCondition(
            i >= 0 && i < this.components.length,
            `Index out of bounds: ${i}`
        );
    
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components[i] = c;
    }

    public insert(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 0, c);
    }

    public append(c: string): void {
        this.components.push(c);
    }

    public remove(i: number): void {
        if (i < 0 || i >= this.components.length) {
            throw new Error("Index out of bounds");
        }
        this.components.splice(i, 1);
    }

    protected getComponents(): string[] {
        return [...this.components];
    }

    public clone(): StringArrayName {
        return new StringArrayName([...this.components], this.delimiter);
    }

    public isEqual(other: AbstractName): boolean {
        if (this.getNoComponents() !== other.getNoComponents()) {
            return false;
        }
        for (let i = 0; i < this.getNoComponents(); i++) {
            if (this.getComponent(i) !== other.getComponent(i)) {
                return false;
            }
        }
        return true;
    }

    public getHashCode(): number {
        let hash = 0;
        for (const component of this.components) {
            for (let i = 0; i < component.length; i++) {
                const char = component.charCodeAt(i);
                hash = ((hash << 5) - hash) + char;
                hash |= 0;
            }
        }
        return hash;
    }

    public assertClassInvariant(): void {
        this.components.forEach((component, index) => {
            InvalidStateException.assertIsNotNullOrUndefined(
                component,
                `Component at index ${index} is null or undefined`
            );
        });
    }

}
    
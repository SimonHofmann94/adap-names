import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringArrayName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        if (delimiter === ESCAPE_CHARACTER) {
                    throw new Error("Delimmiter can not be \\");
                }
        
        if (delimiter !== undefined) {
            this.delimiter = delimiter;
        }

        this.components = source;
    }

    public asString(delimiter: string = this.delimiter): string {
        const unmaskedComponents: string[] = [];
                
        for (let i = 0; i < this.components.length; i++) {
            let comp = this.components[i];
            let temp: string[] = [];

            for (let j = 0; j < comp.length; j++){

                if (comp[j] === ESCAPE_CHARACTER) {
                    j++;
                }

                temp.push(comp[j]);
            }

            unmaskedComponents.push(temp.join(''));
        }
        return unmaskedComponents.join(delimiter);
    }

    public asDataString(): string {
        return this.components.join(DEFAULT_DELIMITER);
    }

    public getDelimiterCharacter(): string {
        throw new Error("needs implementation or deletion");
    }

    public isEmpty(): boolean {
        return this.components.length === 0;
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        if (i < 0 ||i > this.components.length) {

            throw new Error("Index out of bounds");

        }

        return this.components[i];
    }

    public setComponent(i: number, c: string): void {
        if (i < 0 || i > this.components.length) {

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
        if (i < 0 || i > this.components.length) {

            throw new Error("Index out of bounds");

        }

        this.components.splice(i, 1);
    }

    public concat(other: Name): void {
        for (let i = 0; i < other.getNoComponents(); i++) {
            this.components.push(other.getComponent(i));
        }

    }

}
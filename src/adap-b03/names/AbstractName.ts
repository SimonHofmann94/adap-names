import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {

        if (delimiter === ESCAPE_CHARACTER) {
            throw new Error("Delimiter can not be \\");
        }

        if (delimiter.length !== 1) {
            throw new Error("Delimiter must be a single character");
        }

        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        const noComponents = this.getNoComponents();
        const unmaskedComponents: string[] = [];

        for (let i = 0; i < noComponents; i++) {

            const component = this.getComponent(i);
            unmaskedComponents.push(this.unmaskComponent(component));

        }

        return unmaskedComponents.join(delimiter);
    }

    public toString(): string {
        return this.asDataString();
    }

    public asDataString(): string {
        const noComponents = this.getNoComponents();
        const components: string[] = [];

        for (let i = 0; i < noComponents; i++) {
            components.push(this.getComponent(i));
        }

        return components.join(DEFAULT_DELIMITER);
    }

    public isEqual(other: Object): boolean {        
        const otherName = other as Name;

        if (this.getNoComponents() !== otherName.getNoComponents()) {
            return false;
        }

        for (let i = 0; i < this.getNoComponents(); i++) {

            if (this.getComponent(i) !== otherName.getComponent(i)) {
                return false;
            }

        }

        return true;
    }

    public getHashCode(): number {
        let hash = 0;

        for (let i = 0; i < this.getNoComponents(); i++) {
            const component = this.getComponent(i);

            for (let j = 0; j < component.length; j++) {

                const char = component.charCodeAt(j);
                hash = ((hash << 5) - hash) + char;
                hash |= 0;

            }
        }

        return hash;
    }

    public isEmpty(): boolean {
        return this.getNoComponents() === 0;
    }

    public getDelimiterCharacter(): string {
        return this.delimiter;
    }

    public append(c: string): void {
        this.insert(this.getNoComponents(), c);
    }

    public concat(other: Name): void {

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

    }

    protected unmaskComponent(component: string): string {
        let unmaskedComponent = "";

        for (let i = 0; i < component.length; i++) {

            if (component[i] === ESCAPE_CHARACTER && i + 1 < component.length) {
                unmaskedComponent += component[++i];
            } 
            
            else {
                unmaskedComponent += component[i];
            }
        }

        return unmaskedComponent;
    }
    

    abstract clone(): Object;

    abstract getNoComponents(): number;

    abstract getComponent(i: number): string;
    abstract setComponent(i: number, c: string): void;

    abstract insert(i: number, c: string): void;
    abstract remove(i: number): void;

}
import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";

export abstract class AbstractName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;

    constructor(delimiter: string = DEFAULT_DELIMITER) {
        IllegalArgumentException.assert(delimiter.length == 1, "Delimiter must be a single character");
        IllegalArgumentException.assert(delimiter != ESCAPE_CHARACTER, "Delimiter must not be \\");

        this.delimiter = delimiter;
    }

    public asString(delimiter: string = this.delimiter): string {
        IllegalArgumentException.assert(delimiter.length == 1, "Delimiter must be a single character");
        IllegalArgumentException.assert(delimiter != ESCAPE_CHARACTER, "Delimiter must not be \\");

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
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.getNoComponents();
        this.insert(this.getNoComponents(), c);
        MethodFailedException.assert(this.getNoComponents() == oldNoComponents + 1, "Append failed");
    }

    public concat(other: Name): void {
        IllegalArgumentException.assert(other != null, "Other name must not be null");

        let oldNoComponents = this.getNoComponents();
        let otherNoComponents = other.getNoComponents();

        for (let i = 0; i < other.getNoComponents(); i++) {
            this.append(other.getComponent(i));
        }

        MethodFailedException.assert(this.getNoComponents() == oldNoComponents + otherNoComponents, "Concat failed");
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
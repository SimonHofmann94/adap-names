import { DEFAULT_DELIMITER, ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";

export class StringName implements Name {

    protected delimiter: string = DEFAULT_DELIMITER;
    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {

        if (delimiter === ESCAPE_CHARACTER) {
            throw new Error("Delimmiter can not be \\");
        
        } else if (delimiter !== undefined) {
            this.delimiter = delimiter;

            if (this.delimiter.length !== 1) {
                throw new Error("Delimiter must be a single character");
            }

        }
        
        this.name = source;
        const components = this.parseComponents();
        this.noComponents = components.length;
    }

    public asString(delimiter: string = this.delimiter): string {

        const components = this.parseComponents();
        const unmaskedComponents = [];

        for (const component of components) {

            unmaskedComponents.push(this.unmaskComponent(component));

        }

        return unmaskedComponents.join(delimiter);
    }

    public asDataString(): string {

        const components = this.parseComponents();

        return components.join(DEFAULT_DELIMITER);    
    }

    public getDelimiterCharacter(): string {

        return this.delimiter;

    }

    public isEmpty(): boolean {

        return this.noComponents === 0;

    }

    public getNoComponents(): number {

        return this.noComponents;

    }

    public getComponent(x: number): string {

        if (x < 0 || x >= this.noComponents) {

            throw new Error("Index out of bounds");

        }
        
        const components = this.parseComponents();

        return components[x];
    }

    public setComponent(n: number, c: string): void {

        if (n < 0 || n >= this.noComponents) {

            throw new Error("Index out of bounds");

        }
    
        const components = this.parseComponents();

        components[n] = c;

        this.name = components.join(this.delimiter);
    }

    public insert(n: number, c: string): void {

        if (n < 0 || n > this.noComponents) {

            throw new Error("Index out of bounds");

        }
        
        const components = this.parseComponents();

        components.splice(n, 0, c);

        this.name = components.join(this.delimiter);

        this.noComponents++;
    }

    public append(c: string): void {

        this.insert(this.noComponents, c);

    }

    public remove(n: number): void {

        if (n < 0 || n >= this.noComponents) {

            throw new Error("Index out of bounds");

        }
        
        const components = this.parseComponents();

        components.splice(n, 1);

        this.name = components.join(this.delimiter);

        this.noComponents--;
    }

    public concat(other: Name): void {

        const components: string[] = this.parseComponents();
        

        for (let i = 0; i < other.getNoComponents(); i++) {

            components.push(other.getComponent(i));

        }
        
        this.name = components.join(this.delimiter);
        
        this.noComponents = components.length;
    }

    private parseComponents(): string[] {

        const components: string[] = [];
        let currentComponent = "";
        
        for (let i = 0; i < this.name.length; i++) {

            if (this.name[i] === ESCAPE_CHARACTER && i + 1 < this.name.length) {
                
                currentComponent += this.name[i];
                currentComponent += this.name[++i];

            } 
            
            else if (this.name[i] === this.delimiter) {

                components.push(currentComponent);
                currentComponent = "";

            } 
            
            else {

                currentComponent += this.name[i];

            }
        }

        components.push(currentComponent);
        
        return components;
    }

    private unmaskComponent(component: string): string {

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

}
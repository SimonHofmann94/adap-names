import { ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.parseComponents().length;
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {

        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }

        const components = this.parseComponents();

        return components[i];
    }

    public setComponent(i: number, c: string) {

        if (i < 0 || i >= this.noComponents) {

            throw new Error("Index out of bounds");
        }

        const components = this.parseComponents();

        components[i] = c;

        this.name = components.join(this.delimiter);
    }

    public insert(i: number, c: string) {

        if (i < 0 || i > this.noComponents) {
            throw new Error("Index out of bounds");
        }

        const components = this.parseComponents();

        components.splice(i, 0, c);

        this.name = components.join(this.delimiter);

        this.noComponents++;
    }

    public remove(i: number) {

        if (i < 0 || i >= this.noComponents) {
            throw new Error("Index out of bounds");
        }

        const components = this.parseComponents();

        components.splice(i, 1);

        this.name = components.join(this.delimiter);

        this.noComponents--;
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
}
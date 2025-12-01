import { ESCAPE_CHARACTER } from "../common/Printable";
import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringName extends AbstractName {

    protected name: string = "";
    protected noComponents: number = 0;

    constructor(source: string, delimiter?: string) {
        super(delimiter);
        this.name = source;
        this.noComponents = this.parseComponents().length;
        this.classInvariant();
    }

    public clone(): Name {
        return new StringName(this.name, this.delimiter);
    }

    public getNoComponents(): number {
        return this.noComponents;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "Index out of bounds");

        const components = this.parseComponents();

        return components[i];
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");

        const components = this.parseComponents();

        components[i] = c;

        this.name = components.join(this.delimiter);
        
        this.classInvariant();
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i <= this.noComponents, "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");

        let oldNoComponents = this.noComponents;
        const components = this.parseComponents();

        components.splice(i, 0, c);

        this.name = components.join(this.delimiter);

        this.noComponents++;
        
        this.classInvariant();
        MethodFailedException.assert(this.noComponents == oldNoComponents + 1, "Insert failed");
        MethodFailedException.assert(this.getComponent(i) == c, "Insert failed to insert component");
    }

    public remove(i: number) {
        IllegalArgumentException.assert(i >= 0 && i < this.noComponents, "Index out of bounds");

        let oldNoComponents = this.noComponents;
        const components = this.parseComponents();

        components.splice(i, 1);

        this.name = components.join(this.delimiter);

        this.noComponents--;
        
        this.classInvariant();
        MethodFailedException.assert(this.noComponents == oldNoComponents - 1, "Remove failed");
    }

    private classInvariant() {
        InvalidStateException.assert(this.noComponents == this.parseComponents().length, "Invariant failed");
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
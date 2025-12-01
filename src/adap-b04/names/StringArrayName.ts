import { Name } from "./Name";
import { AbstractName } from "./AbstractName";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";
import { InvalidStateException } from "../common/InvalidStateException";

export class StringArrayName extends AbstractName {

    protected components: string[] = [];

    constructor(source: string[], delimiter?: string) {
        super(delimiter);
        IllegalArgumentException.assert(source != null, "Source must not be null");
        this.components = source;
    }

    public clone(): Name {
        return new StringArrayName(this.components.slice(), this.delimiter);
    }

    public getNoComponents(): number {
        return this.components.length;
    }

    public getComponent(i: number): string {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "Index out of bounds");
        
        return this.components[i];
    }

    public setComponent(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");

        this.components[i] = c;
    }

    public insert(i: number, c: string) {
        IllegalArgumentException.assert(i >= 0 && i <= this.components.length, "Index out of bounds");
        IllegalArgumentException.assert(c != null, "Component must not be null");
        
        let oldNoComponents = this.components.length;
        this.components.splice(i, 0, c);
        
        MethodFailedException.assert(this.components.length == oldNoComponents + 1, "Insert failed");
        MethodFailedException.assert(this.components[i] == c, "Insert failed to insert component");
    }

    public remove(i: number) {
        IllegalArgumentException.assert(i >= 0 && i < this.components.length, "Index out of bounds");

        let oldNoComponents = this.components.length;
        this.components.splice(i, 1);
        
        MethodFailedException.assert(this.components.length == oldNoComponents - 1, "Remove failed");
    }
}
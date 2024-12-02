import { Node } from "./Node";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { InvalidStateException } from "../common/InvalidStateException";

export class Directory extends Node {
    protected childNodes: Set<Node> = new Set();

    constructor(bn: string, parentNode: Directory) {
        super(bn, parentNode);
    }

    // Add a child node to the directory
    public add(child: Node): void {
        IllegalArgumentException.assertIsNotNullOrUndefined(child, "Child node cannot be null or undefined");
        this.childNodes.add(child);
    }

    // Remove a child node from the directory
    public remove(child: Node): void {
        if (!this.childNodes.has(child)) {
            throw new InvalidStateException("Child node does not exist in the directory");
        }
        this.childNodes.delete(child);
    }

    /**
     * Override findNodes to recursively search child nodes.
     * @param bn basename of node being searched for
     */
    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assertIsNotNullOrUndefined(bn, "Base name cannot be null or undefined");

        const result: Set<Node> = super.findNodes(bn); 

        for (const child of this.childNodes) {
            const childResults = child.findNodes(bn);
            childResults.forEach(node => result.add(node));
        }
        return result;
    }

    public getChildNodes(): Set<Node> {
        return this.childNodes;
    }
}
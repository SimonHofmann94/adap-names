import { Node } from "./Node";
import { Directory } from "./Directory";
import { IllegalArgumentException } from "../common/IllegalArgumentException";
import { MethodFailedException } from "../common/MethodFailedException";


export class Link extends Node {

    protected targetNode: Node | null = null;

    constructor(bn: string, pn: Directory, tn?: Node) {
        super(bn, pn);

        if (tn != undefined) {
            this.targetNode = tn;
        }
    }

    public getTargetNode(): Node | null {
        return this.targetNode;
    }

    public setTargetNode(target: Node): void {
        this.targetNode = target;
    }

    public getBaseName(): string {
        const target = this.ensureTargetNode(this.targetNode);
        return target.getBaseName();
    }

    public rename(bn: string): void {
        const target = this.ensureTargetNode(this.targetNode);
        target.rename(bn);
    }

    protected ensureTargetNode(target: Node | null): Node {
        const result: Node = this.targetNode as Node;
        return result;
    }

    public findNodes(bn: string): Set<Node> {
        IllegalArgumentException.assertIsNotNullOrUndefined(bn, "Base name cannot be null or undefined");

        const result: Set<Node> = super.findNodes(bn); // Check if the link itself matches

        // Delegate the search to the target node if it exists
        if (this.targetNode) {
            try {
                const targetResults = this.targetNode.findNodes(bn);
                targetResults.forEach(node => result.add(node));
            } catch (error) {
                throw new MethodFailedException("Failed to find nodes via target.");
            }
        }

        return result;
    }

}
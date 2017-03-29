/**
 * Created by geeku on 27/03/2017.
 */
import Geview from "./Geview";

export class ComManager {
    public components = {};
    constructor () {

    }
    addCom (component: Geview) {
        this.components[component.name] = component;
    }
    hasCom (name: string) {
        return name in this.components;
    }
}
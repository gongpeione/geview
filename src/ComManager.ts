/**
 * Created by geeku on 27/03/2017.
 */
export class ComManager {
    public components = [];
    constructor () {

    }
    addCom (component) {
        this.components.push(component);
    }
}
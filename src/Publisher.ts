/**
 * Created by geeku on 28/03/2017.
 */
import {Watcher} from "./Watcher";
export class Publisher {
    public watcherList = [];
    constructor () {

    }

    addWatcher (watcher: Watcher) {
        this.watcherList.push(watcher);
    }

    notify (oldVal, newVal) {
        this.watcherList.forEach(watcher => {
            watcher.update(oldVal, newVal);
        })
    }
}
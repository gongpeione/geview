/**
 * Created by geeku on 28/03/2017.
 */

export function compiler (el: Element) {
    const fragment = document.createDocumentFragment();
    let child;
    while (el.firstChild) {
        console.log(el);
        fragment.appendChild(el.firstChild);
    }
    console.log(fragment);
}
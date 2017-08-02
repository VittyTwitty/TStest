import { AddArrayService } from '../service/add-array-service';

export class ToggleTree {
    public tree: any;

    constructor() {
        this.tree = new AddArrayService();
    }
    clickToggle() {
        this.tree.changeTree().forEach.call(document.querySelectorAll(".toggle"), function (inner: any) {
            inner.addEventListener("click", function (el: any) {
                let target = el.target;
                target == inner && target.classList.toggle("on-open");
            })
        });      

    }
}
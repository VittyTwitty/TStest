import { AddArrayService } from '../service/add-array-service';

function allowDrop(ev: any) {
    ev.preventDefault();
}
function dragImg(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log('1')
}
function dropImg(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
    console.log('2')
}

export class DragDrop {
    public tree: any;


    constructor() {
        this.tree = new AddArrayService();
    }
    dragDrop() {
        this.tree.changeTree().forEach.call(document.querySelectorAll("li"), function (inner: any) {
            inner.addEventListener('dragstart', dragImg, false);
            // inner.addEventListener('dragenter', handleDragEnter, false);
            // inner.addEventListener('dragleave', handleDragLeave, false);
            inner.addEventListener('dragover', allowDrop, false);
            // inner.addEventListener('dragend', handleDragEnd, false);
            inner.addEventListener('drop', dropImg, false);
        });

    }
}
import {AddArrayService} from '../service/add-array-service';

function allowDrop(ev: any) {
    if (ev.preventDefault) ev.preventDefault();
    return false;
}

function dragElement(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log('1')
}

function dropElement(ev: any) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.style.border = "";
    ev.target.style.color = ""
    for (let i = 0; i < ev.target.childNodes.length; i++) {


    }
    let ul = document.createElement('ul');
    ul.appendChild(document.getElementById(data))
    ev.target.appendChild(ul);

}

function dragEnter(ev: any) {
    ev.preventDefault();

    ev.target.style.border = "1px dotted #F44336";
    ev.target.style.color = "#F44336"
    console.log('red')

}

function dragLeave(ev: any) {
    ev.preventDefault();

    ev.target.style.border = "";
    ev.target.style.color = ""

}

function dragEnd(ev: any) {
    ev.target.style.border = "";
    ev.target.style.color = ""

}

export class DragDrop {
    public tree: any;


    constructor() {
        this.tree = new AddArrayService();
    }

    dragDrop() {
        this.tree.changeTree().forEach.call(document.querySelectorAll("li"), function (inner: any) {
            inner.addEventListener('dragstart', dragElement, false);
            inner.addEventListener('dragenter', dragEnter, false);
            inner.addEventListener('dragleave', dragLeave, false);
            inner.addEventListener('dragover', allowDrop, false);
            inner.addEventListener('dragend', dragEnd, false);
            inner.addEventListener('drop', dropElement, false);
        });

    }
}
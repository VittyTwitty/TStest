import { AddArrayService } from '../service/add-array-service';

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
    for(let i = 0; i<ev.target.childNodes.length; i++) {
        
      
    }
    let ul = document.createElement('ul');
    ul.appendChild(document.getElementById(data))
    ev.target.appendChild(ul);
    // console.log('Вставляю сюда:')
    // console.log(ev);
    // console.log('Вставляю сюда:')
    // console.log(data);
}

function dragEnter(ev: any) {
    ev.preventDefault();

    ev.target.style.border = "3px dotted red";
    console.log('red')

}

function dragLeave(ev: any) {
    ev.preventDefault();

    ev.target.style.border = "";

}
function dragEnd(ev: any) {
    ev.target.style.border = "";

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
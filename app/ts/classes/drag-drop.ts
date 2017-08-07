import {AddArrayService} from '../service/add-array-service';

function allowDrop(ev: any) {
    if (ev.preventDefault) ev.preventDefault();
    return false;
}

function dragElement(ev: any) {
    ev.dataTransfer.setData("text", ev.target.id);
    console.log('1');
}

function dropElement(ev: any) {
    let thisId: any;
    let secondId: any;
    let thisTree: any;
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.style.border = "";
    ev.target.style.color = "";
    let ul = document.createElement('ul');
    ul.appendChild(document.getElementById(data));
    ev.target.appendChild(ul);

    let tree = JSON.parse(localStorage.getItem("tree"));

    if (tree) {
        thisTree = tree;
    } else {
        thisTree = new AddArrayService().changeTree();
    }
    thisId = +(data.slice(4));
    secondId = +((ev.target.id).slice(4));
    let parent;
    thisTree.forEach(function (el: any) {
        if (el['id'] == thisId) {

            parent = secondId;
            el['parent'] = parent;
        }
    });


    let ar = thisTree;
    localStorage.setItem("tree", JSON.stringify(ar))
    console.log(ar)

}

function dragEnter(ev: any) {
    ev.preventDefault();

    ev.target.style.border = "1px dotted #F44336";
    ev.target.style.color = "#F44336"

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
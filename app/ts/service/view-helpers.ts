import { AddArrayService } from "./add-array-service";

export class ViewHelpers {
    firstUl: any;
    tree: any;
    x: any;
    buttonPlus: any;
    buttonMinus: any;
    liParent: any;
    li: any;
    parId: any
    public countId: number;
    ul: any;

    constructor() {
        let tree = JSON.parse(localStorage.getItem("tree"));
        if (tree) {
            this.tree = tree;
        } else {
            this.tree = new AddArrayService().changeTree();
        }
    }
    createButtons() {
        this.buttonMinus = document.createElement('button');
        this.buttonMinus.classList.add('delete-button');
        this.buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

        this.buttonPlus = document.createElement('button');
        this.buttonPlus.classList.add('button-plus');
        this.buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

    }
    
    createLi(index: number) {
        this.firstUl = document.createElement('ul');
        this.x = this.tree;
        this.li = this.tree[index];
        this.parId = `vit_${this.li.parent}`;
        this.liParent = this.firstUl.querySelector(`#${this.parId}`);
        if (!this.liParent) {
            this.liParent = document.createElement('li');
            this.liParent.id = this.parId;
            this.firstUl.appendChild(this.liParent);
        };
    }
    createUl() {
        this.ul = this.liParent.querySelector('ul');
        if (!this.ul) {
            this.liParent.className = 'toggle';
            this.liParent.setAttribute('draggable', 'true');
            this.ul = document.createElement('ul');
            this.liParent.appendChild(this.ul);
        };
    }
    ulAndLiAddIn() {
        let liId = `vit_${this.li.id}`;
        let liText = `${this.li.category}`;
        this.li = this.firstUl.querySelector(`#${liId}`);

        if (!this.li) {
            this.li = document.createElement('li');
            this.li.className = 'toggle';
            this.li.setAttribute('draggable', 'true');
            this.li.id = liId;
        }
        this.countId = +(liId.slice(4));
        this.li.insertBefore(document.createTextNode(liText), this.li.firstChild);
        this.li.insertBefore(this.buttonMinus, this.li.children[0]);
        this.li.insertBefore(this.buttonPlus, this.li.children[1]);
        this.ul.appendChild(this.li);
    }
}
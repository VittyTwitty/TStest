import {AddArrayService} from '../service/add-array-service';
import {ArrayDifService} from "../service/array-dif-service";
import {Helpers} from "../service/helpers";
import {ViewHelpers} from "../service/view-helpers";

export class AddTree {
    viewHelpers: any;
    helpers: Helpers;
    public tree: any;
    public app: any;
    public firstUl: any;
    public button: any;
    public inputCategory: any;
    public inputName: any;
    public countId: number;
    public x: any[];

    public buttonMinus: any;
    public buttonPlus: any;

    constructor() {

        let tree = JSON.parse(localStorage.getItem("tree"));
        if (tree) {
            this.tree = tree;
        } else {
            this.tree = new AddArrayService().changeTree();
        }


        this.helpers = new Helpers();
        this.viewHelpers = new ViewHelpers();

        this.helpers.toggleAddButton();
    }

    writeln() {
        this.app = document.getElementById('app');
        this.firstUl = document.createElement('ul');
        this.button = document.getElementById('buttonAdd');
        this.inputCategory = <HTMLInputElement>document.getElementById('inpCat');
        this.inputName = <HTMLInputElement>document.getElementById('inpName');
        this.defaultAddTree();
        this.firstUl.firstChild.insertBefore(document.createTextNode('AllCategories'),
            this.firstUl.firstChild.firstChild);
        this.app.appendChild(this.firstUl);
        this.addCategory();

        this.viewHelpers.createButtonForNewCat();


    }


    defaultAddTree() {
        for (let i = 0; i < this.tree.length; i++) {
            this.viewHelpers.createButtons();

            this.x = this.tree;
            let li = this.tree[i];
            let parId = `vit_${li.parent}`;
            let liParent = this.firstUl.querySelector(`#${parId}`);
            if (!liParent) {
                liParent = document.createElement('li');
                liParent.id = parId;
                this.firstUl.appendChild(liParent);
            }
            ;
            let ul = liParent.querySelector('ul');
            if (!ul) {
                liParent.className = 'toggle';
                liParent.setAttribute('draggable', 'true');
                ul = document.createElement('ul');
                liParent.appendChild(ul);
            }
            ;
            let liId = `vit_${li.id}`;
            let liText = `${li.category}`;
            li = this.firstUl.querySelector(`#${liId}`);

            if (!li) {
                li = document.createElement('li');
                li.className = 'toggle';
                li.setAttribute('draggable', 'true');
                li.id = liId;
            }
            this.countId = +(liId.slice(4));
            li.insertBefore(document.createTextNode(liText), li.firstChild);
            li.insertBefore(this.viewHelpers.buttonMinus, li.children[0]);
            li.insertBefore(this.viewHelpers.buttonPlus, li.children[1]);
            ul.appendChild(li);
        }

    }

    addCategory() {
        let arrayOfBranches = this.x;
        let self = this;
        let button = document.querySelectorAll(".button-plus")
        arrayOfBranches.forEach.call(button, (elem: any) => {
            self.helpers.keyAps(elem, true);

            self.viewHelpers.addFich(elem);

        });

    }


    deleteBranch() {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        let self = this;
        console.log(this.x);
        let button = document.querySelectorAll(".delete-button")
        arrayOfBranches.forEach.call(button, (elem: any) => {
            self.viewHelpers.deleteFich(elem)
        });
    }
}
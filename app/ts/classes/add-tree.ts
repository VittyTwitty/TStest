import { AddArrayService } from '../service/add-array-service';
import { ToggleTree } from './toggle-tree';
import { Category } from "../models/category.model";
import { ArrayDifService } from "../service/array-dif-service";
import { Helpers } from "../service/helpers";
import { ViewHelpers } from "../service/view-helpers";

export class AddTree {
    viewHelpers: any;
    helpers: Helpers;
    public difArray: ArrayDifService;
    public categoryObj: Category;
    public tree: any;
    public app: any;
    public firstUl: any;
    public button: any;
    public inputCategory: any;
    public inputName: any;
    public countId: number;
    public x: any[];
    public li2: any;
    public ul2: any;
    public customParentId: number;
    public div: any;
    public input2: any;
    public treeLocal: string;

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
        this.viewHelpers = new ViewHelpers()



        this.helpers.toggleAddButton();
    }

    writeln() {
        this.app = document.getElementById('app');
        this.firstUl = document.createElement('ul');
        this.button = document.getElementById('buttonAdd');
        this.inputCategory = <HTMLInputElement>document.getElementById('inpCat');
        this.inputName = <HTMLInputElement>document.getElementById('inpName');
        this.defaultAddTree();
        this.firstUl.firstChild.insertBefore(document.createTextNode('Machines'),
            this.firstUl.firstChild.firstChild);
        this.app.appendChild(this.firstUl);
        this.addCategory();
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
            this.addFich(elem)
        });
    }

    addFich(ele: any) {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        let input;
        let inputCatVal;
        let obj = this.categoryObj;
        let li2, ul2;
        let firstUl = this.firstUl;
        let self = this;

        ele.addEventListener("click", (el: any) => {
            let parrentOfButton = ele.parentNode;
            self.countId++;

            input = <HTMLInputElement>document.getElementById('inpCat');
            let inputCatVal = input.value
            let idOfToggleElement = +(parrentOfButton.id.slice(4));

            obj = {
                'id': self.countId,
                'category': inputCatVal,
                'parent': idOfToggleElement
            };

            arrayOfBranches.push(obj);

            li2 = document.createElement('li');
            li2.setAttribute('draggable', 'true');
            li2.setAttribute('id', `vit_${obj.id}`);
            li2.innerText = `${obj.category}`;


            ul2 = document.createElement('ul');

            let parentLi = firstUl.querySelector(`#vit_${obj.parent}`);
            let buttonMinus;
            let buttonPlus;

            if (parentLi.childElementCount == 2) {
                parentLi.className = 'toggle';
                parentLi.setAttribute('draggable', 'true');
                parentLi.appendChild(ul2);
                parentLi.lastChild.appendChild(li2);
            } else {
                parentLi.lastChild.appendChild(li2);
            }

            this.viewHelpers.createButtons();
            self.deleteFich(this.viewHelpers.buttonMinus);
            self.addFich(this.viewHelpers.buttonPlus);
            li2.appendChild(this.viewHelpers.buttonMinus);
            li2.appendChild(this.viewHelpers.buttonPlus);
            self.helpers.readInputValue(true);

            console.log(arrayOfBranches);
            let ar = arrayOfBranches;
            localStorage.setItem("tree", JSON.stringify(ar))

        })

    }

    deleteFich(ele: any) {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        let self = this;


        ele.addEventListener("click", function () {
            let parrentOfButton = ele.parentNode;
            let idOfToggleElement = +(parrentOfButton.id.slice(4));
            parrentOfButton.remove();
            let arrayOfDeletingId = arr1(arrayOfBranches, idOfToggleElement);
            difArray.difference(arrayOfBranches, arrayOfDeletingId);

            let ar = arrayOfBranches;
            localStorage.setItem("tree", JSON.stringify(ar))
            console.log(localStorage.setItem("tree", JSON.stringify(ar)))
            if (ar.length == 0) {
                localStorage.removeItem('tree')
            }


        });


        function arr1(array: any, id: number) {
            let objIndex: any[] = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == id) {
                    objIndex.push(array[i].id);
                }
                if (array[i].parent == id) {
                    objIndex.push(...arr1(array, array[i].id));
                }
            }
            return objIndex;
        }
    }

    deleteBranch() {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        console.log(this.x);
        let button = document.querySelectorAll(".delete-button")
        arrayOfBranches.forEach.call(button, (elem: any) => {
            this.deleteFich(elem)
        });
    }
}
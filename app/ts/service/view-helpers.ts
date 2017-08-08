import {AddArrayService} from "./add-array-service";
import {ArrayDifService} from './array-dif-service'
import {Category} from "../models/category.model";
import {Helpers} from "../service/helpers";

export class ViewHelpers {
    helpers: Helpers;
    public categoryObj: Category;
    firstUl: any;
    tree: any;
    x: any;
    buttonPlus: any;
    buttonMinus: any;
    buttonAdd: any;
    liParent: any;
    li: any;
    parId: any
    public count: number;
    ul: any;
    parrentOfButton: any;
    parentLi: any;
    c: number;

    constructor() {
        this.helpers = new Helpers();
        this.firstUl = document.createElement('ul');
        let tree = JSON.parse(localStorage.getItem("tree"));
        if (tree) {
            this.tree = tree;
        } else {
            this.tree = new AddArrayService().changeTree();
        }
        this.c = this.arrayIdCounter();

    }

    arrayIdCounter() {
        for (let i = 0; i < this.tree.length; i++) {
            this.count = this.tree[i].id;
        }
        return this.count++;

    }

    createButtonForNewCat() {
        this.firstUl = document.createElement('ul');
        let obj = this.categoryObj;
        let input = document.getElementById('inpCatWrapper');
        let input2;
        let li2, ul2;
        this.buttonAdd = document.createElement('button');
        this.buttonAdd.classList.add('add-new-cat');
        this.buttonAdd.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
        let self = this;
        let c: number = self.arrayIdCounter();
        input.appendChild(this.buttonAdd)
        this.buttonAdd.addEventListener('click', () => {
            input2 = <HTMLInputElement>document.getElementById('inpCat');

            c++;

            let inputCatVal = input2.value
            let idOfToggleElement = 0;

            obj = {
                'id': c,
                'category': inputCatVal,
                'parent': idOfToggleElement
            };

            li2 = document.createElement('li');
            li2.setAttribute('draggable', 'true');
            li2.setAttribute('id', `vit_${obj.id}`);
            li2.innerText = `${obj.category}`;

            ul2 = document.createElement('ul');

            let arrayOfBranches = this.tree;
            let app = this.buttonAdd.parentNode.parentNode.childNodes[1];
            let appChildUl = app.childNodes;
            let appChildLi = appChildUl[0].childNodes[0].childNodes[1];


            arrayOfBranches.push(obj);
            appChildLi.appendChild(li2);
            li2.appendChild(ul2);
            this.createButtons();
            li2.insertBefore(this.buttonMinus, ul2);
            li2.insertBefore(this.buttonPlus, ul2);
            this.addFich(this.buttonPlus);
            this.deleteFich(this.buttonMinus);
            let ar = arrayOfBranches;
            localStorage.setItem("tree", JSON.stringify(ar))

        });

    }


    addFich(ele: any) {
        let arrayOfBranches = this.tree;
        let input;

        let obj = this.categoryObj;
        let li2, ul2;
        let firstUl = this.firstUl;
        let self = this;
        ele.addEventListener("click", (el: any) => {
            this.parrentOfButton = ele.parentNode;
            input = <HTMLInputElement>document.getElementById('inpCat');
            this.c++;
            let inputCatVal = input.value
            let idOfToggleElement = +(this.parrentOfButton.id.slice(4));
            console.log('c: ' + this.c);
            console.log('parent: ' + idOfToggleElement);

            obj = {
                'id': this.c,
                'category': inputCatVal,
                'parent': idOfToggleElement
            };

            li2 = document.createElement('li');
            li2.setAttribute('draggable', 'true');
            li2.setAttribute('id', `vit_${obj.id}`);
            li2.innerText = `${obj.category}`;

            ul2 = document.createElement('ul');

            this.parentLi = document.querySelector(`#vit_${obj.parent}`);
            console.log(document.querySelector(`#vit_${obj.parent}`));
            if (this.parentLi.childElementCount == 2) {
                this.parentLi.className = 'toggle';
                this.parentLi.setAttribute('draggable', 'true');
                this.parentLi.appendChild(ul2);
                this.parentLi.lastChild.appendChild(li2);
            } else {
                this.parentLi.lastChild.appendChild(li2);
            }

            arrayOfBranches.push(obj);

            this.createButtons();
            self.deleteFich(this.buttonMinus);
            self.addFich(this.buttonPlus);
            li2.appendChild(this.buttonMinus);
            li2.appendChild(this.buttonPlus);
            self.helpers.readInputValue(true);

            console.log(arrayOfBranches);
            let ar = arrayOfBranches;
            localStorage.setItem("tree", JSON.stringify(ar))

        })

    }

    deleteFich(ele: any) {
        let arrayOfBranches = this.tree;
        let difArray = new ArrayDifService();

        ele.addEventListener("click", function () {
            let parrentOfButton = ele.parentNode;
            let idOfToggleElement = +(parrentOfButton.id.slice(4));
            parrentOfButton.remove();
            let ar = arrayOfBranches;

            let arrayOfDeletingId = arr1(arrayOfBranches, idOfToggleElement);
            difArray.difference(arrayOfBranches, arrayOfDeletingId);

            localStorage.setItem("tree", JSON.stringify(ar))
            console.log(localStorage.setItem("tree", JSON.stringify(ar)))
            if (ar.length == 0) {
                localStorage.removeItem('tree')
                console.log('pusto virosla kapusta')
                console.log(this.createButtonForNewCat());
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

    createButtons() {
        this.buttonMinus = document.createElement('button');
        this.buttonMinus.classList.add('delete-button');
        this.buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

        this.buttonPlus = document.createElement('button');
        this.buttonPlus.classList.add('button-plus');
        this.buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

    }

}
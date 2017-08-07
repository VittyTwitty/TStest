import { AddArrayService } from '../service/add-array-service';
import { ToggleTree } from './toggle-tree';
import { Category } from "../models/category.model";
import { ArrayDifService } from "../service/array-dif-service";

export class AddTree {
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

    public buttonMinus: any;
    public buttonPlus: any;
    constructor() {
        this.tree = new AddArrayService();

    }

    writeln() {
        this.app = document.getElementById('app');
        this.firstUl = document.createElement('ul');
        this.button = document.getElementById('buttonAdd');
        this.inputCategory = <HTMLInputElement>document.getElementById('inpCat');
        this.inputName = <HTMLInputElement>document.getElementById('inpName');
        this.defaultAddTree();


        this.firstUl.firstChild.insertBefore(document.createTextNode('Machines'), this.firstUl.firstChild.firstChild);
        this.app.appendChild(this.firstUl);
        this.addCategory();
    }

    createButtons() {
        this.buttonMinus = document.createElement('button');
        this.buttonMinus.classList.add('delete-button');
        this.buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

        this.buttonPlus = document.createElement('button');
        this.buttonPlus.classList.add('button-plus');
        this.buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
    }
    defaultAddTree() {
        for (let i = 0; i < this.tree.changeTree().length; i++) {

            this.x = this.tree.changeTree();
            let li = this.tree.changeTree()[i];
            let parId = `vit_${li.parent}`;
            let liParent = this.firstUl.querySelector(`#${parId}`);
            if (!liParent) {
                liParent = document.createElement('li');
                liParent.id = parId;
                this.firstUl.appendChild(liParent);
            };
            let ul = liParent.querySelector('ul');
            if (!ul) {
                liParent.className = 'toggle';
                liParent.setAttribute('draggable', 'true');
                ul = document.createElement('ul');
                liParent.appendChild(ul);
            };
            let liId = `vit_${li.id}`;
            let liText = `${li.category}`;
            li = this.firstUl.querySelector(`#${liId}`);

            if (!li) {
                li = document.createElement('li');

                li.className = 'toggle';
                this.createButtons();

                li.setAttribute('draggable', 'true');
                li.id = liId;
                console.log(li)
            }

            this.countId = +(liId.slice(4));

            li.insertBefore(document.createTextNode(liText), li.firstChild);
            li.appendChild(this.buttonMinus);
            li.appendChild(this.buttonPlus);
            ul.appendChild(li);
        }

    }

    addCategory() {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        let input;
        let inputCatVal;
        let obj = this.categoryObj;
        let li2, ul2;
        let firstUl = this.firstUl;
        let self = this;

        arrayOfBranches.forEach.call(document.querySelectorAll(".button-plus"),
            function (inner: any) {
                inner.addEventListener("click", (el: any) => {
                    let parrentOfButton = inner.parentNode;
                    self.countId++;

                    input = <HTMLInputElement>document.getElementById('inpCat');
                    let inputCatVal = input.value
                    let idOfToggleElement = +(parrentOfButton.id.slice(4));

                    obj = {
                        'id': self.countId,
                        'category': inputCatVal,  //строка
                        'parent': idOfToggleElement// число 
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

                    buttonMinus = document.createElement('button');
                    buttonMinus.classList.add('delete-button');
                    self.deleteFich(buttonMinus)
                    buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';


                    buttonPlus = document.createElement('button');
                    buttonPlus.classList.add('button-plus');
                    buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
                    self.addFich(buttonPlus);

                    li2.appendChild(buttonMinus);
                    li2.appendChild(buttonPlus);
                    console.log(arrayOfBranches)

                })
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
                'category': inputCatVal,  //строка
                'parent': idOfToggleElement// число 
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

            buttonMinus = document.createElement('button');
            buttonMinus.classList.add('delete-button');
            self.deleteFich(buttonMinus);
            buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';


            buttonPlus = document.createElement('button');
            buttonPlus.classList.add('button-plus');
            buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';
            self.addFich(buttonPlus);

            li2.appendChild(buttonMinus);
            li2.appendChild(buttonPlus);
            console.log(arrayOfBranches)

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

            console.log(self.x);

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

        arrayOfBranches.forEach.call(document.querySelectorAll(".delete-button"), addEvLis);
        function addEvLis(inner: any) {
            inner.addEventListener("click", function () {
                console.log(arrayOfBranches)
                let parrentOfButton = inner.parentNode;
                let idOfToggleElement = +(parrentOfButton.id.slice(4));
                parrentOfButton.remove();
                let arrayOfDeletingId = arr1(arrayOfBranches, idOfToggleElement);
                difArray.difference(arrayOfBranches, arrayOfDeletingId);

            });
        }


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
}
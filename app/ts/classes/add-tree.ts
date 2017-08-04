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

    constructor() {
        this.tree = JSON.parse(localStorage.getItem("myKey"));
        if (localStorage) {
            var returnObj = JSON.parse(localStorage.getItem("myKey"));
            this.x = returnObj;
        }
        console.log(returnObj)

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

    defaultAddTree() {
        if(localStorage) {
            console.log(this.x);
            console.log(this.tree);
        } else {
            console.log('Local false')

        }
        for (let i = 0; i < this.tree.length; i++) {

            
            let li = this.tree[i];
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

            let buttonMinus;
            let buttonPlus;
            if (!li) {
                li = document.createElement('li');
                buttonMinus = document.createElement('button');
                buttonMinus.classList.add('delete-button');
                buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

                buttonPlus = document.createElement('button');
                buttonPlus.classList.add('button-plus');
                buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

                li.setAttribute('draggable', 'true');
                li.id = liId;
            }

            this.countId = +(liId.slice(4));

            li.insertBefore(document.createTextNode(liText), li.firstChild);
            li.appendChild(buttonMinus);
            li.appendChild(buttonPlus);
            ul.appendChild(li);
        }

    }


    // addCategory() {
    //     this.button.addEventListener('click', () => {

    //         this.countId++;

    //         let inputCatVal = this.inputCategory.value;
    //         for (let j = 0; j < this.x.length; j++) {
    //             if (inputCatVal == this.x[j].category) {
    //                 this.customParentId = this.x[j].id;
    //                 break;
    //             } else {
    //                 this.customParentId = 0;
    //             }
    //         };
    //         let inputNameVal = this.inputName.value;

    //         this.categoryObj = {
    //             'id': this.countId,
    //             'category': inputNameVal,  //строка
    //             'parent': this.customParentId // число 
    //         };

    //         this.x.push(this.categoryObj);
    //         this.li2 = document.createElement('li');
    //         this.li2.setAttribute('draggable', 'true');
    //         this.li2.setAttribute('id', `vit_${this.categoryObj.id}`);
    //         this.li2.innerText = `${this.categoryObj.category}`;

    //         this.ul2 = document.createElement('ul');

    //         let parentLi = this.firstUl.querySelector(`#vit_${this.categoryObj.parent}`);

    //         if (parentLi.childElementCount == 0) {
    //             parentLi.className = 'toggle';
    //             parentLi.setAttribute('draggable', 'true');
    //             parentLi.appendChild(this.ul2);
    //             parentLi.lastChild.appendChild(this.li2);
    //         } else {
    //             parentLi.lastChild.appendChild(this.li2);

    //         }

    //     });
    // }
    addCategory() {
        let arrayOfBranches = this.x;
        let countId = this.countId;
        let difArray = new ArrayDifService();
        let input;
        let inputCatVal;
        let obj = this.categoryObj;
        let li2, ul2;
        let firstUl = this.firstUl;

        this.x.forEach.call(document.querySelectorAll(".button-plus"),
            function (inner: any) {
                inner.addEventListener("click", (el: any) => {
                    let parrentOfButton = inner.parentNode;
                    countId++;

                    input = <HTMLInputElement>document.getElementById('inpCat');
                    let inputCatVal = input.value
                    let idOfToggleElement = +(parrentOfButton.id.slice(4));

                    obj = {
                        'id': countId,
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
                        console.log('CHILDREN 0')
                        parentLi.className = 'toggle';
                        parentLi.setAttribute('draggable', 'true');
                        parentLi.appendChild(ul2);
                        parentLi.lastChild.appendChild(li2);
                    } else {
                        console.log('CHILDREN SOME')
                        parentLi.lastChild.appendChild(li2);
                    }



                    buttonMinus = document.createElement('button');
                    buttonMinus.classList.add('delete-button');
                    buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

                    buttonPlus = document.createElement('button');
                    buttonPlus.classList.add('button-plus');
                    buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';



                    li2.appendChild(buttonMinus);
                    li2.appendChild(buttonPlus);

                    var serialObj = JSON.stringify(arrayOfBranches)
                    localStorage.setItem('myKey', serialObj)


                })
            });
    }
    deleteBranch() {
        let arrayOfBranches = this.x;
        let difArray = new ArrayDifService();
        this.x.forEach.call(document.querySelectorAll(".delete-button"),
            function (inner: any) {
                inner.addEventListener("click", (el: any) => {
                    let parrentOfButton = inner.parentNode;
                    let idOfToggleElement = +(parrentOfButton.id.slice(4));
                    parrentOfButton.remove();
                    let arrayOfDeletingId = arr1(arrayOfBranches, idOfToggleElement);

                    difArray.difference(arrayOfBranches, arrayOfDeletingId);

                    console.log(arrayOfBranches);
                })
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
























    // delArrBranch(array: any[], label: any) {
    //     for (let i = 0; i < this.tree.changeTree().length; i++) {
    //         let item = this.tree.changeTree()[i];
    //     }

    // }




}

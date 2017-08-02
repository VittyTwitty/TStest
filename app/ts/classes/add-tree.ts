import { AddArrayService } from '../service/add-array-service';
import { ToggleTree } from './toggle-tree';
import { Category } from "../models/category.model";

export class AddTree {

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
            let liText = li.category;
            li = this.firstUl.querySelector(`#${liId}`);
            if (!li) {
                li = document.createElement('li');
                li.setAttribute('draggable', 'true');
                li.id = liId;
            }
            this.countId = +(liId.slice(4));
            li.insertBefore(document.createTextNode(liText), li.firstChild);
            ul.appendChild(li);
        }
    }

    addCategory() {
        this.button.addEventListener('click', () => {
            this.countId++;
            let inputCatVal = this.inputCategory.value;
            for (let j = 0; j < this.x.length; j++) {
                if (inputCatVal == this.x[j].category) {
                    console.log(true)
                    this.customParentId = this.x[j].id;
                    break;
                } else {
                    this.customParentId = 0;
                }
            };
            let inputNameVal = this.inputName.value;

            this.categoryObj = {
                'id': this.countId,
                'category': inputNameVal,  //строка
                'parent': this.customParentId // число 
            };

            console.log(this.categoryObj);
            this.x.push(this.categoryObj);
            this.li2 = document.createElement('li');
            this.li2.setAttribute('draggable', 'true');
            this.li2.setAttribute('id', `vit_${this.categoryObj.id}`);
            this.li2.innerText = `${this.categoryObj.category}`;

            this.ul2 = document.createElement('ul');

            let parentLi = this.firstUl.querySelector(`#vit_${this.categoryObj.parent}`);

            if (parentLi.childElementCount == 0) {
                parentLi.className = 'toggle';
                parentLi.setAttribute('draggable', 'true');
                parentLi.appendChild(this.ul2);
                parentLi.lastChild.appendChild(this.li2);

            } else {
                parentLi.lastChild.appendChild(this.li2);

            }

        });
    }
    deleteCategory() {

        // var element = document.getElementById("vit_5");
        // let button = document.getElementById('but');
        // button.onclick = () => {
        //     while (element.firstChild) {
        //         element.removeChild(element.firstChild);
        //     }

        // }
    }


}


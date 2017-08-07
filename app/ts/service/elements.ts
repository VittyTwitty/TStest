export class Elements {
    button: HTMLElement;
    inputName: HTMLInputElement;
    inputCategory: HTMLInputElement;
    app: HTMLElement;

    public buttonMinus: any;
    public buttonPlus: any;
    public x: any[];
    public firstUl: any;

    createButtons() {
        this.buttonMinus = document.createElement('button');
        this.buttonMinus.classList.add('delete-button');
        this.buttonMinus.innerHTML = '<i class="fa fa-minus-square-o" aria-hidden="true"></i>';

        this.buttonPlus = document.createElement('button');
        this.buttonPlus.classList.add('button-plus');
        this.buttonPlus.innerHTML = '<i class="fa fa-plus-square-o" aria-hidden="true"></i>';

    }
    defaultAddTree(arr: any, counter: any) {
        this.app = document.getElementById('app');
        this.firstUl = document.createElement('ul');
        this.button = document.getElementById('buttonAdd');
        this.inputCategory = <HTMLInputElement>document.getElementById('inpCat');
        this.inputName = <HTMLInputElement>document.getElementById('inpName');
        for (let i = 0; i < arr.length; i++) {
            this.createButtons();

            this.x = arr;
            let li = arr[i];
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

            counter = +(liId.slice(4));

            li.insertBefore(document.createTextNode(liText), li.firstChild);

            li.insertBefore(this.buttonMinus, li.children[0]);
            li.insertBefore(this.buttonPlus, li.children[1]);
            ul.appendChild(li);
        }

    }
}
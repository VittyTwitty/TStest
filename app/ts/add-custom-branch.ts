// import { AddArrayService } from '../service/add-array-service';

// export class AddCustomBranch {

//     public tree: any;
//     constructor() {
//         this.tree = new AddArrayService();
//     }

//     public selectCategory = document.getElementById('category-select');
//     addOptions() {
//         for (let i = 0; i < this.tree.changeTree().length; i++) {
//             let option = document.createElement('option');
//             option.innerText = this.tree.changeTree()[i].category;
//             option.value = this.tree.changeTree()[i].category;
//             this.selectCategory.appendChild(option);
//         }
//         // console.log(this.selectCategory)
//         return this.selectCategory;
//     }
//     addBranch() {
//         let x: any = this.addOptions();

//         let input = <HTMLInputElement>document.getElementById('inpIn');
//         let button = document.getElementById('buttonAdd');
//         let machineElem = document.getElementById('vit_0');


//         // button.onclick = () => {

//         //     for (let i = 0; i < x.childElementCount; i++) {
//         //         if (x.children[i].selected) {
//         //             // console.log(x.children[i].value);
//         //             // console.log(machineElem.children)
//         //             let inputValue = input.value;

//         //             let li = document.createElement('li');
//         //             li.innerText = `${inputValue}`;

//         //             machineElem.children[0].appendChild(li);
//         //             // machineElem.children[0].innerHTML += `<li class="toggle">${inputValue}</li>`;
//         //         }

//         //     }
//         // }

//     }


// }
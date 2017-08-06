import "../scss/style.scss";
import 'normalize.css';
import { data } from "./service/mock-data";


export class AddTree {
    public dataTree = {};

    defaultCreateTree(container: any, arr: any): any {
        container.innerHTML = addTree(arr);
    }
}
function addTree(arr: any): string {
    let li = '';    
    
    for (let i = 0; i < arr.length; i++) {
        li += '<li>' + arr[i]['category'] + '</li>';
        
    }
    if (li) {
        var ul: any = '<ul>' + li + '</ul>'
    }
    return ul || '';
}

var container = document.getElementById('app');



var tree = new AddTree();

tree.defaultCreateTree(container, data);



import '../scss/style.scss';
import 'normalize.css';

import { AddTree } from './classes/add-tree';
import { ToggleTree } from './classes/toggle-tree';
import { DragDrop } from './classes/drag-drop';
// import { AddCustomBranch } from './classes/add-custom-branch';

let tree = new AddTree();
let click = new ToggleTree();
let drag = new DragDrop();
// let add = new AddCustomBranch();

tree.writeln();
tree.deleteCategory();
click.clickToggle();
drag.dragDrop();
// add.addBranch();


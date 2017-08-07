import { mainData } from '../service/mock-data';

export class AddArrayService {
    public dataTree: any[];
    changeTree() {
        this.dataTree = Object.keys(mainData).map(function (key, i) {
            return {
                'id': mainData[key].id,
                'category': mainData[key].category,
                'parent': mainData[key].parent
            };
        });
        return this.dataTree;
    }
}
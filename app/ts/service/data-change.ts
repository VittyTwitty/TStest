import { data } from '../service/mock-data';

export class AddArrayService {

    public dataTree: any[];
    
    changeTree() {
        this.dataTree = Object.keys(data).map(function (key, i) {
            return {
                'id': data[key].id,
                'category': data[key].category,
                'child': data[key].child
            };
        });
        return this.dataTree;
    }
}
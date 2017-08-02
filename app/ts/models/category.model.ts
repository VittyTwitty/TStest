export class Category {
    public id: any;
    public category: string;
    public parent: number;

    constructor(data: any) {
        this.id = data.id;
        this.category = data.category;
        this.parent = data.parent;
    }

}
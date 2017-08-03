        function arr1(array: any, id: number) {
            let objIndex: any[] = [];
            for (let i = 0; i < array.length; i++) {
                if (array[i].id == id) {
                    objIndex.push(array[i]);
                }
                if (array[i].parent == id) {
                    objIndex.push(...arr1(array, array[i].id));                                        
                }
                
            }
            console.log(objIndex)
            return objIndex;
        }
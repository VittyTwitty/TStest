export class ArrayDifService {

    difference(arr1: any[], arr2: any[]) {
        for (let i = arr1.length - 1; i >= 0; i--) {

            for (let k = 0; k < arr2.length; k++) {

                if (arr1[i].id == arr2[k]) {
                    arr1.splice(i, 1);
                    break;
                }


            }
        }
    }

}
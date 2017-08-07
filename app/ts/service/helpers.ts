import { ArrayDifService } from "./array-dif-service";

export class Helpers {
    public input2: any;
    findAllButtons() {
        let buttons = document.querySelectorAll(".button-plus");
        for (var i = 0; i < buttons.length; i++) {
            var el = buttons[i];
            console.log(this.input2.value.length)
            if (this.input2.value.length == 0) {
                this.keyAps(el, true);
            } else {
                this.keyAps(el, false);
            }
        }

    }

    keyAps(but: any, toggle: boolean) {
        but.disabled = toggle;
    }
    
    toggleAddButton() {
        this.input2 = <HTMLInputElement>document.getElementById('inpCat');
        this.input2.addEventListener('keyup', () => {
            console.log('toggle')
            let buttons = document.querySelectorAll(".button-plus");
            this.findAllButtons()
        });
    }

    readInputValue(par: any) {
        let input = <HTMLInputElement>document.getElementById('inpCat');
        if (par) {
            input.value = '';
            this.findAllButtons()
            return;
        }
        return input.value;
    }
}
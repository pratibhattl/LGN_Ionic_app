import { AbstractControl, ValidationErrors } from "@angular/forms";

export class SpaceValidatior {
    static cannotContainSpace(control: AbstractControl): ValidationErrors | null {
        let lastVal = (control.value).at(-1);
        // console.log((control.value).indexOf(' '), (/\s/g).test(lastVal));
        if ((control.value).indexOf(' ') == 0 || (/\s/g).test(lastVal)) {
            return { cannotContainSpace: true }
        }
        return null;
    }
}
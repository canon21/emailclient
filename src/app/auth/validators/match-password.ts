import { FormGroup, ValidationErrors, Validator } from "@angular/forms";
import { Injectable } from "@angular/core";

//Attivando la dipendency Injection
@Injectable({
    providedIn:'root'
})

export class MatchPassword implements Validator{

    validate(formGroup : FormGroup) {

        const {password, passwordConfirmation} = formGroup.value;

        if(password === passwordConfirmation) {
            return null;
        }
        
        return {passwordDontMatch:true};
    }
}

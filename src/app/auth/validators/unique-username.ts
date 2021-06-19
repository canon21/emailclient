import { AsyncValidator, FormControl, ValidationErrors } from "@angular/forms";
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { map, catchError } from 'rxjs/operators';

//enable dependency injection.
@Injectable({
    providedIn: 'root'
})
export class UniqueUsername implements AsyncValidator {

    constructor(private http: HttpClient) { }

    validate = (control: FormControl): Observable<ValidationErrors> => {

        const { value } = control;

        return this.http.post<any>('https://api.angular-email.com/auth/username', {
            username: value
        }).pipe(
            //solo se la chiamata API ha una risposta OK esegue la pipe.
            map(value => { 
                return null; 
            }),
            //of crea una nuovo observable
            catchError(err => {
                console.log(err);
                if (err.error.username) {
                    return of({ nonUniqueUsername: true })
                }
                else {
                    return of ({noConnection: true})
                }
            })
        );
    }
}

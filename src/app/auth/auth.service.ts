import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface UsernameAvailableResponse {
  available:true;
}

interface SignupCredentials {
  username: string,
  password: string,
  passwordConfirmation: string
}

interface SignupResponse {
  username: string
}

interface SignedInResponse {
  authenticated: boolean,
  username: string
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath: string = 'https://api.angular-email.com';
  //$ per convenzione -> è un observable o come un observable.
  signedin$ = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<UsernameAvailableResponse>(this.basePath + '/auth/username', {
      username: username
  });
  }

  //Aggiungiamo le options nella chiamata e con withCredentials true diciamo di salvare i cookies, così da essere inviati
  //in chiamate successive.
  signup(credentials: SignupCredentials){
     return this.http.post<SignupResponse>(this.basePath + '/auth/signup', credentials/*, { withCredentials:true } */)
     .pipe(
       tap(() => {
         console.log("TAP PIPE")
         this.signedin$.next(true);
       }));
  }

  //Aggiungiamo le options nella chiamata e con withCredentials true diciamo di salvare i cookies, così da essere inviati
  //in chiamate successive.
  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.basePath}/auth/signedin` /*, {withCredentials:true}*/)
    .pipe(
      tap(({ authenticated }) => {
        this.signedin$.next(authenticated);
      }
    ));
  }

  signout() {
    return this.http.post(`${this.basePath}/auth/signout`, {})
    .pipe(
      tap( () => this.signedin$.next(false))
    );
  }
  
}

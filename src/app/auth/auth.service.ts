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

interface SigninCredentials {
  username: string,
  password: string
}

interface SigninResponse {
  username: string,
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath: string = 'https://api.angular-email.com';
  //$ per convenzione -> è un observable o come un observable.
  signedin$ = new BehaviorSubject(null);
  username: string = '';

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
       tap(({username}) => {
         console.log("TAP PIPE")
         this.signedin$.next(true);
         this.username = username;
       }));
  }

  //Aggiungiamo le options nella chiamata e con withCredentials true diciamo di salvare i cookies, così da essere inviati
  //in chiamate successive.
  checkAuth() {
    return this.http.get<SignedInResponse>(`${this.basePath}/auth/signedin` /*, {withCredentials:true}*/)
    .pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      }
    ));
  }

  signout() {
    return this.http.post(`${this.basePath}/auth/signout`, {})
    .pipe(
      tap( () => this.signedin$.next(false))
    );
  }
  
  signin(credentials: SigninCredentials) {
      return this.http.post<SigninResponse>(`${this.basePath}/auth/signin`, credentials)
      .pipe(
        //non viene eseguito in caso di errore. Es credenziali errate.
        tap(({username}) => { 
          this.signedin$.next(true);
          this.username = username;
        })
      );
  }
}

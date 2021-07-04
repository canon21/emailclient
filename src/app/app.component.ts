import { Component } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  //signedin: boolean = false;

  //Alternative sintax. Vedi app.component.html -> la pipe async si mette in ascolto in automatico.
  //Entrambi gli approcci sono equivalenti.
  signedin$ : BehaviorSubject<boolean>;

  constructor(private authService: AuthService){
    this.signedin$ = this.authService.signedin$;
  }

  /*
  ngOnInit(){
    //quando parte si mette in ascolto dell'observable signedin$. Ma non viene eseguito più volte il metodo ngOnInit.
    //sottoscrizione all'observable.
    this.authService.signedin$.subscribe( signedin => {
      console.log("APP COMPONENT ngOnInit");
      this.signedin = signedin;
    });
    console.log("SignedIn:" + this.signedin);
  } */

  ngOnInit(){
    //per vedere se l'utente è già loggato.
    this.authService.checkAuth().subscribe(() => {});
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.css']
})
export class EmailShowComponent implements OnInit {

  emailSelected = "";

  constructor(private route: ActivatedRoute, private emailService: EmailService) { }

  ngOnInit(): void {
    //urlParam contiene i parametri con chiave uguale a placeholder utilizzato per mappare l'url
    //vedi InboxRoutingModule.
    /*
    this.route.params.subscribe(urlParam => {
      let { id } = urlParam;
      if(id) {
        this.emailService.getEmailById(id).subscribe((email) => {
          console.log(email);
        });
      }
    });
    */
   //SwitchMap interrompe il fluso nel caso in cui arrivi un'altra richiesta prima che la precedente sia completa.
    this.route.params.pipe(
      switchMap( ({id}) => {
        return this.emailService.getEmailById(id);
      })
    ).subscribe( (email) => {
      console.log("Email: ");
      console.log(email);
    } )
  }

}

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { Email } from './email';
import { EmailService } from './email.service';
import { catchError } from 'rxjs/operators';
import { EMPTY } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmailResolverService implements Resolve<Email>{

  constructor(private emailService: EmailService, private router: Router ) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Email | Observable<Email> | Promise<Email> {

    const { id } = route.params;
    return this.emailService.getEmailById(id)
      .pipe(
        catchError( () => {
          this.router.navigateByUrl('/inbox/not-found');
          return EMPTY;
        })
      );
  }

}

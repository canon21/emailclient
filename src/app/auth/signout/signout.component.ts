import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    //chiamo il metodo e mi sotto scrivo all'observable.
    this.authService.signout().subscribe(() => {
      // Navigate the user in signin page.
      setTimeout(() => this.router.navigateByUrl(`/`), 2000);     
    })
  }

}

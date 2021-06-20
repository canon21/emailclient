import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';
import { UniqueUsername } from '../validators/unique-username';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('',
      //secondo argomento di formControl
      [Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/)
      ],
      //terzo argomento di formControl
      [this.uniqueUsername.validate]
    ),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  },
    //secondo argomento del formGroup
    { validators: [this.matchPassword.validate] }
  );

  //dependency injection.
  constructor(private matchPassword: MatchPassword, private uniqueUsername: UniqueUsername, private authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(){
    if(this.authForm.invalid){
      return;
    }
    this.authService.signup(this.authForm.value)
    .subscribe((response) => {
      console.log(response);
    })
  }
}

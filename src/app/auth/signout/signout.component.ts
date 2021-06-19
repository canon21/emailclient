import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatchPassword } from '../validators/match-password';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.css']
})
export class SignoutComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(20), Validators.pattern(/^[a-z0-9]+$/)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]),
    passwordConfirmation: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(20)])
  },
  //secondo argomento del formGroup
  { validators: [this.matchPassword.validate]}
  );

  constructor(private matchPassword: MatchPassword) { }

  ngOnInit(): void {
  }

}

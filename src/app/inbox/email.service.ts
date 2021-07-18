import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


interface EmailSummary {
  id: string,
  subject: string,
  from: string,

}

interface Email {
  id: string,
  subject: string,
  from: string,
  text: string,
  to: string,
  html: string
}

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  basePath: string = 'https://api.angular-email.com';

  constructor(private http: HttpClient) { }

  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.basePath}/emails`, {
      //adding cookies
      withCredentials:true
    });
  }

  getEmailById(id: string) {
    return this.http.get<Email>(`${this.basePath}/emails/${id}`, {
      //adding cookies
      withCredentials:true
    });
  }

}

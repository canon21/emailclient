import { Component, OnInit, Input } from '@angular/core';
import { Email } from '../email';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.css']
})
export class EmailReplyComponent{

  showModal = false;

  @Input() email: Email;
    
  constructor(private emailService: EmailService) { }

  ngOnChanges(): void {
    console.log("ON CHANGE");
    console.log(this.email);
    const text = this.email.text ? this.email.text.replace(/\n/gi, '\n> ') : "Image or HTML style";
    this.email = {
      ...this.email,
      to: this.email.from,
      from: this.email.to,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n--------------   ${this.email.from} wrote this: \n\n> ${text}`
    }
  }

  onSubmit(email: Email){
      this.emailService.sendEmail(email).subscribe(() => {
        this.showModal=false;
      })
  }

}

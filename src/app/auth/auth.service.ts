import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface UsernameAvailableResponse {
  available:true;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  basePath: string = 'https://api.angular-email.com/auth'
  constructor(private http: HttpClient) { }

  usernameAvailable(username: string){
    return this.http.post<UsernameAvailableResponse>(this.basePath+'/username', {
      username: username
  });
  }

  signup(credentials: any){
     return this.http.post<any>(this.basePath+ '/signup', credentials);
  }
}

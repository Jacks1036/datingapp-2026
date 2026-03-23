import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RegisterCreds, User } from '../../types/user';
import { tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  private httpClient= inject(HttpClient);
  currentUser=signal<User | null>(null);
  baseUrl='https://localhost:5001/api/';

  register(creds:any){
    console.log(creds)
    return this.httpClient.post<User>(this.baseUrl+'account/register',creds).pipe(
      tap(user=>{
        if(user){
         this.setCurrentUser(user);
        }
      })
    )

  }

  login(creds:any){
    
    return this.httpClient.post<User>(this.baseUrl+'account/login',creds).pipe(
      tap(user=>{
        if(user){
         this.setCurrentUser(user);
        }
      })
    )
  }

  setCurrentUser( user:User)
  {
 localStorage.setItem('user',JSON.stringify(user))
          this.currentUser.set(user)
  }
  logout()
  {
    this.currentUser.set(null);
    localStorage.removeItem('user');
  }
}

import { Component, inject, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AccountService } from '../../core/services/account-service';
import { LoginCreds } from '../../types/user';
import { Router, RouterLink, RouterLinkActive } from "@angular/router";
import { ToastService } from '../../core/services/toast-service';

@Component({
  selector: 'app-nav',
  imports: [FormsModule, RouterLink, RouterLinkActive],
  templateUrl: './nav.html',
  styleUrl: './nav.css',
})
export class Nav {

  protected accountService=inject(AccountService)
  private router=inject(Router);
  private toast=inject(ToastService);
  protected creds={} as LoginCreds;
    // protected creds: any={}
    protected loggedIn=signal(false)

  login()
  {
    this.accountService.login(this.creds).subscribe({
      next:()=>{
        this.router.navigateByUrl('/members');
        this.toast.success('Logged in Successfully');
        this.creds={} as LoginCreds;
      },
      error:error=>{
        console.log(error);
        this.toast.error(error.error);
      }
    })
  }

  loggedOut()
  {
    this.toast.success('Logged out successfully');
    this.accountService.logout();
    this.router.navigateByUrl('/');
  }
}

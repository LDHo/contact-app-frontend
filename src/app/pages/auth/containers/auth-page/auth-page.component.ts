import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from '../../services';
import { routes } from '../../../../consts';

@Component({
  selector: 'app-auth-page',
  templateUrl: './auth-page.component.html',
  styleUrls: ['./auth-page.component.scss']
})
export class AuthPageComponent {
  public todayDate: Date = new Date();
  public routers: typeof routes = routes;

  constructor(
    private service: AuthService,
    private router: Router
  ) { }

  public sendLoginForm(value): void {
    const {email, password} = value;
    this.service.login(email, password);
    this.router.navigate([this.routers.DASHBOARD]).then();
  }

  public async sendSignForm(value) {
    const { email, password } = value;
    this.service.sign(email, password);
    this.router.navigate([this.routers.DASHBOARD]).then();
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { UserStorageKey } from '../../models/storage.key';
import { LocalStorageService } from '../../services/local-storage.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  @Output() sendLoginForm = new EventEmitter<void>();
  public form: FormGroup;
  public flatlogicEmail = 'admin@flatlogic.com';
  public flatlogicPassword = 'admin';

  constructor(
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {

  }

  public ngOnInit(): void {
    this.form = new FormGroup({
      email: new FormControl(this.flatlogicEmail, [Validators.required, Validators.email]),
      password: new FormControl(this.flatlogicPassword, [Validators.required])
    });
  }

  public login(): void {
    if (this.form.valid) {
      const { email, password } = this.form.value;
      console.log(this.form.value);
      this.userService.login(email, password).subscribe(response => {
        console.log('response :: ', response);
        // get token
        this.localStorage.set(UserStorageKey.CURRENT_USER_SESSION_TOKEN, response.token);
        this.sendLoginForm.emit(this.form.value);
      });
    }
  }
}

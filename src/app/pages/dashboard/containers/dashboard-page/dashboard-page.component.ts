import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ErrorHandler } from 'src/app/shared/services/error.handler';
import { UserService } from 'src/app/shared/services/user.service';
import { LocalStorageService } from 'src/app/pages/auth/services/local-storage.service';
import { UserStorageKey } from 'src/app/pages/auth/models/storage.key';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent {

  form: FormGroup;
  errors: any = {};

  constructor(
    private fb: FormBuilder,
    private errorHandler: ErrorHandler,
    private userService: UserService,
    private localStorage: LocalStorageService
  ) {
  }

  public ngOnInit(): void {
    this.initializeForm();
    this.errorHandler.handleErrors(this.form, this.errors);
    this.userService.getProfile().subscribe(response => {
      this.form.controls['email'].setValue(response.email);
    });
  }

  initializeForm() {
    this.form = this.fb.group({
      lastName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      firstName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(50)
      ]),
      email: new FormControl({ value: '', disabled: true}, [
        Validators.required,
        Validators.email
      ]),
      birthday: new FormControl('', [
        Validators.required
      ]),
      socialSecurityNumber: new FormControl('', [
        Validators.required,
        Validators.pattern("^(?!666|000|9\\d{2})\\d{3}-(?!00)\\d{2}-(?!0{4})\\d{4}$")
      ])
    })
  }


  submit() {
    console.log(this.form.value);
    if (this.form.valid) {
      let {lastName, firstName, birthday, socialSecurityNumber} = this.form.value;
      const payload = {
        lastName,
        firstName,
        birthday,
        ssn: socialSecurityNumber
      }
      const userId: string = this.localStorage.get(UserStorageKey.USER_ID);
      this.userService.updateUserProfile(userId, payload).subscribe(response => {
        console.log(response);
      });
    }
  }

}

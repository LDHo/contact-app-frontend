import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ErrorHandler } from 'src/app/shared/services/error.handler';
import { UserService } from 'src/app/shared/services/user.service';
import { ConfirmedValidator } from 'src/app/shared/services/validator';

@Component({
  selector: 'app-sign-form',
  templateUrl: './sign-form.component.html',
  styleUrls: ['./sign-form.component.scss']
})
export class SignFormComponent implements OnInit {
  @Output() sendSignForm = new EventEmitter<void>();

  public form: FormGroup;
  errors: any = {};

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private errorHandler: ErrorHandler
  ) {

  }

  public ngOnInit(): void {
    this.initializeForm();
    this.errorHandler.handleErrors(this.form, this.errors);
  }


  initializeForm() {
    this.form = this.fb.group({
      email: new FormControl('', [
        Validators.required,
        Validators.maxLength(255),
        Validators.minLength(3),
        Validators.email
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
        Validators.maxLength(200)
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
      ])
    }, {
      validator: ConfirmedValidator('password', 'confirmPassword')
    });
  }


  public sign(): void {
    if (this.form.valid) {
      this.sendSignForm.emit(this.form.value);
    }
  }
}

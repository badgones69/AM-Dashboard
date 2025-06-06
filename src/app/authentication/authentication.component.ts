import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import {
  FormGroup,
  Validators,
  FormsModule,
  FormBuilder,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ToastrModule } from 'ngx-toastr';
import { NotificationService } from '../shared/services/notification.service';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import {
  getAuthenticationFormTitle,
  getSubmitButtonLabel,
  getErrorModalMessage,
} from '../shared/labels/forms/authentication-form';
import {
  getPasswordInputLabel,
  getResetButtonIcon,
  getResetButtonLabel,
  getResetButtonType,
} from '../shared/labels/commons/form-common';
import { getLoginLabel } from '../shared/labels/commons/user-common';
import { User } from '../shared/models/User';
import { UserMapper } from '../shared/mappers/UserMapper';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { APP_LANGUAGE_STORAGE_NAME } from '../shared/constants/storage-constants';
import { FRENCH } from '../shared/constants/language-constants';
import { ADD_FORM_MODE } from '../shared/constants/forms-constants';

@Component({
  selector: 'authentication',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ToastrModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './authentication.component.html',
  styleUrl: '../shared/styles/forms.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AuthenticationComponent implements OnInit {
  /* Form properties */
  public authenticationForm!: FormGroup;
  public authenticationFormTitle: string = '';
  public showPassword: boolean = false;

  /* Form fields identifiers */
  public loginFieldIdentifier: string = 'login';
  public passwordFieldIdentifier: string = 'password';

  /* Form fields labels */
  public loginInputLabel: string = '';
  public passwordInputLabel: string = '';

  /* Buttons labels */
  public submitButtonLabel: string = '';
  public resetButtonLabel: string = '';
  public resetButtonIcon: string = '';
  public resetButtonType: string = '';

  public userMapper: UserMapper = new UserMapper();

  constructor(
    readonly formBuilder: FormBuilder,
    readonly router: Router,
    readonly userService: UserService,
    readonly notificationService: NotificationService,
  ) {
    // Form fields creation and constraints definition
    this.authenticationForm = this.formBuilder.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // App default language definition
    sessionStorage.setItem(APP_LANGUAGE_STORAGE_NAME, FRENCH);

    /* Form title, fields and buttons labels initialization */
    this.authenticationFormTitle = getAuthenticationFormTitle();
    this.loginInputLabel = getLoginLabel();
    this.passwordInputLabel = getPasswordInputLabel();
    this.submitButtonLabel = getSubmitButtonLabel();
    this.resetButtonLabel = getResetButtonLabel(ADD_FORM_MODE);
    this.resetButtonIcon = getResetButtonIcon(ADD_FORM_MODE);
    this.resetButtonType = getResetButtonType(ADD_FORM_MODE);

    /* Already authenticated commons => redirection to home page */
    this.userService.user.subscribe((user) => {
      if (user) {
        this.router.navigate(['home']);
      }
    });
  }

  // Password showing toggle listener
  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  // Password field validation
  isPasswordFieldValid(): boolean {
    return (
      (this.authenticationForm.get(this.passwordFieldIdentifier)?.invalid &&
        (this.authenticationForm.get(this.passwordFieldIdentifier)?.dirty ||
          this.authenticationForm.get(this.passwordFieldIdentifier)
            ?.touched)) ??
      true
    );
  }

  // Form submit
  submitAuthenticationForm() {
    // User verification
    this.userService
      .authenticateUser(
        this.authenticationForm.value.login,
        this.authenticationForm.value.password,
      )
      .subscribe((userFound) => {
        // If commons doesn't exists
        if (userFound === null) {
          // Error modal showing
          this.notificationService.showError(
            `${this.authenticationFormTitle.toUpperCase()}`,
            `${getErrorModalMessage()} !`,
            true,
          );
        } else {
          // User mapping
          const user: User = this.userMapper.userFromDB(userFound);
          // Session opening
          this.userService.connectUser(user);
          // Redirection to home page
          this.router.navigate(['home']);
        }
      });
  }
}

import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { User } from '../../../shared/models/User';
import { UserMapper } from '../../../shared/mappers/UserMapper';
import {
  ADD_FORM_MODE,
  REQUIRED_ERROR,
  NOT_IDENTICAL_PASSWORDS_ERROR,
  PASSWORD_PATTERN,
  PATTERN_ERROR,
} from '../../../shared/constants/forms-constants';
import { notIdenticalPasswordsValidator } from '../../../shared/forms-validators/user-form-validators';
import {
  getPasswordInputLabel,
  getRequiredFieldErrorMessage,
  getResetButtonIcon,
  getResetButtonLabel,
  getResetButtonType,
} from '../../../shared/labels/commons/form-common';
import {
  getPasswordFieldFormatErrorMessage,
  getRepeatedPasswordFieldFormatErrorMessage,
  getRepeatedPasswordInputLabel,
} from '../../../shared/labels/forms/user-form';
import {
  getGivenNameLabel,
  getLoginLabel,
  getProfileLabel,
  getSurnameLabel,
} from '../../../shared/labels/commons/user-common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import {
  getResetUserPasswordFormSuccessNotificationMessage,
  getResetUserPasswordFormTitle,
  getSubmitButtonLabel,
} from '../../../shared/labels/forms/reset-user-password-form';
import { UserService } from '../../../shared/services/user.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'reset-user-password',
  imports: [
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    ToastrModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
  ],
  templateUrl: './reset-user-password.component.html',
  styleUrl: '../../../shared/styles/forms.scss',
})
export class ResetUserPasswordComponent {
  public userId!: string;
  public user!: User;
  public userMapper: UserMapper = new UserMapper();

  /* Form properties */
  public resetUserPasswordForm!: FormGroup;
  public resetUserPasswordFormTitle: string = '';
  public showPassword: boolean = false;
  public showRepeatedPassword: boolean = false;

  /* Form fields identifiers */
  public givenNameFieldIdentifier: string = 'givenName';
  public surnameFieldIdentifier: string = 'surname';
  public passwordFieldIdentifier: string = 'password';
  public repeatedPasswordFieldIdentifier: string = 'repeatedPassword';

  /* Form fields labels */
  public givenNameInputLabel: string = '';
  public surnameInputLabel: string = '';
  public loginInputLabel: string = '';
  public passwordInputLabel: string = '';
  public repeatedPasswordInputLabel: string = '';
  public profileInputLabel: string = '';

  /* Buttons labels and icons */
  public submitButtonLabel: string = '';
  public resetButtonLabel: string = '';
  public resetButtonIcon: string = '';
  public resetButtonType: string = '';

  constructor(
    readonly formBuilder: FormBuilder,
    readonly userService: UserService,
    readonly notificationService: NotificationService,
    readonly route: ActivatedRoute,
    readonly router: Router,
  ) {
    // Form fields creation and constraints definition
    this.resetUserPasswordForm = this.formBuilder.group(
      {
        givenName: [''],
        surname: [''],
        password: [
          '',
          [
            Validators.required,
            Validators.pattern(new RegExp(PASSWORD_PATTERN)),
          ],
        ],
        repeatedPassword: ['', Validators.required],
      },
      {
        validators: [
          notIdenticalPasswordsValidator(
            this.passwordFieldIdentifier,
            this.repeatedPasswordFieldIdentifier,
          ),
        ],
        updateOn: 'change',
      },
    );
  }

  ngOnInit(): void {
    /* Form title, fields + buttons labels and icons initialization */
    this.resetUserPasswordFormTitle = getResetUserPasswordFormTitle(false);
    this.givenNameInputLabel = getGivenNameLabel();
    this.surnameInputLabel = getSurnameLabel();
    this.loginInputLabel = getLoginLabel();
    this.passwordInputLabel = getPasswordInputLabel();
    this.repeatedPasswordInputLabel = getRepeatedPasswordInputLabel();
    this.profileInputLabel = getProfileLabel();
    this.submitButtonLabel = getSubmitButtonLabel();
    this.resetButtonLabel = getResetButtonLabel(ADD_FORM_MODE);
    this.resetButtonIcon = getResetButtonIcon(ADD_FORM_MODE);
    this.resetButtonType = getResetButtonType(ADD_FORM_MODE);

    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.userService.findUser(this.userId).subscribe((userFromDB) => {
      this.user = this.userMapper.userFromDB(userFromDB);
      this.resetUserPasswordForm.patchValue({
        givenName: this.user?.givenName,
        surname: this.user?.surname,
      });
    });
  }

  // Password showing toggle listener
  showPasswordToggle() {
    this.showPassword = !this.showPassword;
  }

  // Repeated password showing toggle listener
  showRepeatedPasswordToggle() {
    this.showRepeatedPassword = !this.showRepeatedPassword;
  }

  // Password field validation
  isPasswordFieldInvalid(): boolean {
    let passwordFormField: any = this.resetUserPasswordForm.get(
      this.passwordFieldIdentifier,
    );
    return (
      (passwordFormField?.invalid &&
        (passwordFormField?.dirty || passwordFormField?.touched)) ??
      true
    );
  }

  // Repeated password field validation
  isRepeatedPasswordFieldInvalid(): boolean {
    let repeatedPasswordFormField: any = this.resetUserPasswordForm.get(
      this.repeatedPasswordFieldIdentifier,
    );

    return (
      ((repeatedPasswordFormField?.invalid ||
        this.resetUserPasswordForm.hasError(NOT_IDENTICAL_PASSWORDS_ERROR)) &&
        (repeatedPasswordFormField?.dirty ||
          repeatedPasswordFormField?.touched)) ??
      true
    );
  }

  // Password field error message(s) display
  displayPasswordErrorMessage(): string {
    if (
      this.resetUserPasswordForm
        .get(this.passwordFieldIdentifier)
        ?.hasError(REQUIRED_ERROR)
    ) {
      return getRequiredFieldErrorMessage();
    } else if (
      this.resetUserPasswordForm
        .get(this.passwordFieldIdentifier)
        ?.hasError(PATTERN_ERROR)
    ) {
      return getPasswordFieldFormatErrorMessage();
    }
    return '';
  }

  // Repeated password field error message(s) display
  displayRepeatedPasswordErrorMessage(error: string): string {
    if (
      error === REQUIRED_ERROR &&
      this.resetUserPasswordForm
        .get(this.repeatedPasswordFieldIdentifier)
        ?.hasError(REQUIRED_ERROR)
    ) {
      return getRequiredFieldErrorMessage();
    } else if (
      error === NOT_IDENTICAL_PASSWORDS_ERROR &&
      this.resetUserPasswordForm.hasError(NOT_IDENTICAL_PASSWORDS_ERROR)
    ) {
      return getRepeatedPasswordFieldFormatErrorMessage();
    }
    return '';
  }

  // Form submit
  submitUserForm() {
    const userToDB = {
      ...this.resetUserPasswordForm.value,
      id: this.userId,
      login: this.user.login,
      profile: this.user.profile,
    };

    let userToResetPassword = this.userMapper.userToDB(userToDB);
    console.log(userToResetPassword);

    // this.userService.resetUserPassword(userToResetPassword).subscribe(() => {
    this.notificationService.showSuccess(
      `${getResetUserPasswordFormTitle(true)}`,
      `${getResetUserPasswordFormSuccessNotificationMessage()}`,
    );
    this.router.navigate(['users', 'list']);
    // });
  }
}

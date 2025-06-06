import { Component, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { Router } from '@angular/router';
import { UserService } from '../../../shared/services/user.service';
import { User } from '../../../shared/models/User';
import { UserFormComponent } from '../../form-component/user-form.component';
import { ADD_FORM_MODE } from '../../../shared/constants/forms-constants';
import { getFormModeLabel } from '../../../shared/labels/commons/form-common';
import {
  getUserFormSuccessNotificationMessage,
  getUserFormTitle,
} from '../../../shared/labels/forms/user-form';
import { ForbiddenComponent } from '../../../shared/components/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../../shared/components/unauthorized/unauthorized.component';

@Component({
  selector: 'add-user',
  standalone: true,
  imports: [UserFormComponent, ForbiddenComponent, UnauthorizedComponent],
  templateUrl: './add-user.component.html',
  styleUrls: [],
})
export class AddUserComponent implements OnInit {
  public authenticatedUser!: User;

  public initUserToAdd!: User;
  public formMode: string = ADD_FORM_MODE;

  constructor(
    readonly userService: UserService,
    readonly notificationService: NotificationService,
    readonly router: Router,
  ) {}

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.authenticatedUser = JSON.parse(user.toString());
      }
    });
  }

  addUser(user: any): void {
    this.userService.createUser(user).subscribe(() => {
      this.notificationService.showSuccess(
        `${getFormModeLabel(this.formMode)} ${getUserFormTitle()}`,
        `${getUserFormSuccessNotificationMessage(this.formMode)}`,
      );
      this.router.navigate(['users', 'list']);
    });
  }
}

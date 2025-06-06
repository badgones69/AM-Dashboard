import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user.service';
import { NotificationService } from '../../../shared/services/notification.service';
import { EDIT_FORM_MODE } from '../../../shared/constants/forms-constants';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../../../shared/models/User';
import { UserFormComponent } from '../../form-component/user-form.component';
import { UserMapper } from '../../../shared/mappers/UserMapper';
import { getFormModeLabel } from '../../../shared/labels/commons/form-common';
import {
  getUserFormSuccessNotificationMessage,
  getUserFormTitle,
} from '../../../shared/labels/forms/user-form';
import { ForbiddenComponent } from '../../../shared/components/forbidden/forbidden.component';
import { UnauthorizedComponent } from '../../../shared/components/unauthorized/unauthorized.component';
import { AuthenticatedUserUneditableComponent } from '../authenticated-user-uneditable/authenticated-user-uneditable.component';

@Component({
  selector: 'edit-user',
  standalone: true,
  imports: [
    UserFormComponent,
    ForbiddenComponent,
    UnauthorizedComponent,
    AuthenticatedUserUneditableComponent,
  ],
  templateUrl: './edit-user.component.html',
  styleUrls: [],
})
export class EditUserComponent implements OnInit {
  public authenticatedUser!: User;

  public userId!: string;
  public userMapper: UserMapper = new UserMapper();

  public initUserToEdit!: User;
  public formMode: string = EDIT_FORM_MODE;

  constructor(
    readonly userService: UserService,
    readonly notificationService: NotificationService,
    readonly route: ActivatedRoute,
    readonly router: Router,
  ) {
    this.userId = this.route.snapshot.paramMap.get('id') ?? '';
    this.userService.findUser(this.userId).subscribe((user) => {
      this.initUserToEdit = this.userMapper.userFromDB(user);
    });
  }

  ngOnInit(): void {
    this.userService.user.subscribe((user) => {
      if (user) {
        this.authenticatedUser = JSON.parse(user.toString());
      }
    });
  }

  editUser(user: any): void {
    user.userID = this.userId;
    this.userService.updateUser(user).subscribe(() => {
      this.notificationService.showSuccess(
        `${getFormModeLabel(this.formMode)} ${getUserFormTitle()}`,
        `${getUserFormSuccessNotificationMessage(this.formMode)}`,
      );
      this.router.navigate(['users', 'list']);
    });
  }
}

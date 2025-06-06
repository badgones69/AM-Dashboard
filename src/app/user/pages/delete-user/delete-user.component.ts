import { Component, Input, OnInit } from '@angular/core';
import { NotificationService } from '../../../shared/services/notification.service';
import { UserService } from '../../../shared/services/user.service';
import { DELETE_FORM_MODE } from '../../../shared/constants/forms-constants';
import { CONFIRMATION_DIALOG_MODE } from '../../../shared/constants/dialogs-constants';
import {
  getUserDeleteDialogMessage,
  getUserFormSuccessNotificationMessage,
  getUserFormTitle,
} from '../../../shared/labels/forms/user-form';
import { DialogComponent } from '../../../shared/components/dialog/dialog.component';
import { getConfirmationDialogTitleLabel } from '../../../shared/labels/commons/dialog-common';
import { getFormModeLabel } from '../../../shared/labels/commons/form-common';

@Component({
  templateUrl: '../../pages/delete-user/delete-user.component.html',
  standalone: true,
  imports: [DialogComponent],
})
export class DeleteUserComponent implements OnInit {
  @Input() public userId!: string;

  public deleteUserFormTitle!: string;
  public deleteUserDialogTitle!: string;
  public deleteUserDialogMode!: string;
  public deleteUserDialogMessage!: string;

  constructor(
    readonly userService: UserService,
    readonly notificationService: NotificationService,
  ) {
    this.deleteUserFormTitle = `${getFormModeLabel(DELETE_FORM_MODE)} ${getUserFormTitle()}`;
  }

  ngOnInit(): void {
    this.deleteUserDialogTitle = `${this.deleteUserFormTitle} ${getConfirmationDialogTitleLabel()}`;
    this.deleteUserDialogMode = CONFIRMATION_DIALOG_MODE;
    this.deleteUserDialogMessage = getUserDeleteDialogMessage();
  }

  deleteUser(response: boolean) {
    if (response) {
      this.userService.deleteUser(this.userId).subscribe();
      this.notificationService.showSuccess(
        this.deleteUserFormTitle,
        getUserFormSuccessNotificationMessage(DELETE_FORM_MODE),
      );
    }
  }
}

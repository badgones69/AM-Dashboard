import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  constructor(readonly toastrService: ToastrService) {}

  public showSuccess(
    title: string,
    message: string,
    disableTimeOut?: boolean,
  ): void {
    this.toastrService.success(message, title, {
      positionClass: 'toast-bottom-center',
      closeButton: true,
      timeOut: 7000,
    });
  }

  public showInfo(
    title: string,
    message: string,
    disableTimeOut?: boolean,
  ): void {
    this.toastrService.info(message, title, {
      positionClass: 'toast-bottom-center',
      closeButton: true,
      timeOut: 7000,
    });
  }

  public showError(
    title: string,
    message: string,
    disableTimeOut?: boolean,
  ): void {
    this.toastrService.error(message, title, {
      positionClass: 'toast-bottom-center',
      closeButton: true,
      timeOut: 7000,
    });
  }

  public showWarning(
    title: string,
    message: string,
    disableTimeOut?: boolean,
  ): void {
    this.toastrService.warning(message, title, {
      positionClass: 'toast-bottom-center',
      closeButton: true,
      timeOut: 7000,
    });
  }
}

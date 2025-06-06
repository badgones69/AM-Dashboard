import { Component, OnInit } from '@angular/core';
import { getAuthenticatedUserUneditableMessage } from '../../../shared/labels/access-errors';

@Component({
  selector: 'authenticated-user-uneditable',
  standalone: true,
  imports: [],
  templateUrl: './authenticated-user-uneditable.component.html',
  styleUrls: [
    '../../../shared/styles/errors.scss',
    '../../../app.component.scss',
  ],
})
export class AuthenticatedUserUneditableComponent implements OnInit {
  public message: string = '';

  ngOnInit(): void {
    this.message = getAuthenticatedUserUneditableMessage();
  }
}

import { Component, OnInit } from '@angular/core';
import { getForbiddenMessage } from '../../labels/access-errors';

@Component({
  selector: 'forbidden',
  standalone: true,
  imports: [],
  templateUrl: './forbidden.component.html',
  styleUrls: ['../../styles/errors.scss', '../../../app.component.scss'],
})
export class ForbiddenComponent implements OnInit {
  public message: string = '';

  ngOnInit(): void {
    this.message = getForbiddenMessage();
  }
}

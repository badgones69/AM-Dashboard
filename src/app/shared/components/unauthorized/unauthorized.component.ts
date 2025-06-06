import { Component, OnInit } from '@angular/core';
import { getUnauthorizedMessage } from '../../labels/access-errors';

@Component({
  selector: 'unauthorized',
  standalone: true,
  imports: [],
  templateUrl: './unauthorized.component.html',
  styleUrls: ['../../styles/errors.scss', '../../../app.component.scss'],
})
export class UnauthorizedComponent implements OnInit {
  public message: string = '';

  ngOnInit(): void {
    this.message = getUnauthorizedMessage();
  }
}

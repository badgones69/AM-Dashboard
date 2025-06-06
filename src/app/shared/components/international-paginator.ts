import { MatPaginatorIntl } from '@angular/material/paginator';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import {
  getItemsPerPageLabel,
  getFirstPageLabel,
  getPreviousPageLabel,
  getNextPageLabel,
  getLastPageLabel,
  getCurrentPageLabel,
} from '../labels/paginator';

@Injectable()
export class InternationalPaginator implements MatPaginatorIntl {
  changes = new Subject<void>();
  itemsPerPageLabel = `${getItemsPerPageLabel()} :`;
  firstPageLabel = getFirstPageLabel();
  previousPageLabel = getPreviousPageLabel();
  nextPageLabel = getNextPageLabel();
  lastPageLabel = getLastPageLabel();

  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return getCurrentPageLabel(1, 1);
    } else {
      return getCurrentPageLabel(page + 1, Math.ceil(length / pageSize));
    }
  }
}

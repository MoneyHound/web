import { signal, computed } from '@angular/core';

export interface PaginationState {
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export class PaginationService {
  private readonly _page = signal(1);
  private readonly _pageSize = signal(10);
  private readonly _totalPages = signal(1);
  private readonly _hasMore = signal(true);

  readonly page = this._page.asReadonly();
  readonly pageSize = this._pageSize.asReadonly();
  readonly totalPages = this._totalPages.asReadonly();
  readonly hasMore = this._hasMore.asReadonly();

  /** Calculate skip offset from current page/pageSize */
  readonly skip = computed(() => (this._page() - 1) * this._pageSize());

  /** Generate page numbers with ellipsis (-1) for display */
  readonly pages = computed(() => {
    const total = this._totalPages();
    const current = this._page();
    const result: number[] = [];

    if (total <= 7) {
      for (let i = 1; i <= total; i++) result.push(i);
    } else {
      result.push(1);
      if (current > 3) result.push(-1);
      for (let i = Math.max(2, current - 1); i <= Math.min(total - 1, current + 1); i++) {
        result.push(i);
      }
      if (current < total - 2) result.push(-1);
      result.push(total);
    }

    return result;
  });

  /** Update pagination state after a successful page fetch */
  update(response: { has_more: boolean }, requestedPage: number, requestedPageSize: number): void {
    this._page.set(requestedPage);
    this._pageSize.set(requestedPageSize);
    this._hasMore.set(response.has_more);
    this._totalPages.set(response.has_more ? requestedPage + 1 : requestedPage);
  }

  /** Set a new page size and reset to page 1 */
  setPageSize(size: number): void {
    this._pageSize.set(size);
    this._page.set(1);
  }

  /** Reset all pagination state to defaults */
  reset(defaultPageSize: number = 10): void {
    this._page.set(1);
    this._pageSize.set(defaultPageSize);
    this._totalPages.set(1);
    this._hasMore.set(true);
  }
}
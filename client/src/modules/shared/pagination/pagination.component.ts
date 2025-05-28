import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { faAngleLeft, faAngleRight, faAngleDoubleLeft, faAngleDoubleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { PaginatedResult } from '../../../models/paginated-result.model';

@Component({
  selector: 'app-pagination',
  imports: [CommonModule, FormsModule, FontAwesomeModule],
  templateUrl: './pagination.component.html',
})
export class PaginationComponent {
  @Input() paginatedData: PaginatedResult<any> | null = null;
  @Output() pageChanged = new EventEmitter<number>();
  @Output() pageSizeChanged = new EventEmitter<number>();

  currentPage: number = 1;
  totalPages: number = 1;
  totalCount: number = 0;
  pageSize: number = 10;
  visiblePages: number[] = [];

  faAngleLeft = faAngleLeft;
  faAngleRight = faAngleRight;
  
  ngOnInit() {
    this.updatePaginationData();
  }

  ngOnChanges() {
    this.updatePaginationData();
  }

  private updatePaginationData() {
    if (this.paginatedData) {
      this.currentPage = this.paginatedData.pageNumber;
      this.totalPages = this.paginatedData.totalPages;
      this.totalCount = this.paginatedData.totalCount;
      this.pageSize = this.paginatedData.pageSize;
      this.calculateVisiblePages();
    }
  }

  private calculateVisiblePages() {
    const delta = 2; // Number of pages to show on each side of current page
    const range = [];
    const rangeWithDots = [];

    for (let i = Math.max(2, this.currentPage - delta); 
         i <= Math.min(this.totalPages - 1, this.currentPage + delta); 
         i++) {
      range.push(i);
    }

    if (this.currentPage - delta > 2) {
      rangeWithDots.push(2, -1);
    } else {
      rangeWithDots.push(2);
    }

    rangeWithDots.push(...range);

    if (this.currentPage + delta < this.totalPages - 1) {
      rangeWithDots.push(-1, this.totalPages - 1);
    } else {
      rangeWithDots.push(this.totalPages - 1);
    }

    this.visiblePages = range;
  }

  get startItem(): number {
    return (this.currentPage - 1) * this.pageSize + 1;
  }

  get endItem(): number {
    return Math.min(this.currentPage * this.pageSize, this.totalCount);
  }

  get shouldShowFirstPage(): boolean {
    return this.totalPages > 1 && !this.visiblePages.includes(1);
  }

  get shouldShowLastPage(): boolean {
    return this.totalPages > 1 && !this.visiblePages.includes(this.totalPages);
  }

  get shouldShowLeftEllipsis(): boolean {
    return this.visiblePages.length > 0 && this.visiblePages[0] > 2;
  }

  get shouldShowRightEllipsis(): boolean {
    return this.visiblePages.length > 0 && 
           this.visiblePages[this.visiblePages.length - 1] < this.totalPages - 1;
  }

  getPageButtonClass(page: number): string {
    const baseClass = 'hover:bg-gray-50';
    if (page === this.currentPage) {
      return `${baseClass} bg-blue-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600`;
    }
    return `${baseClass} text-gray-900`;
  }

  onPageChange(page: number) {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage) {
      this.pageChanged.emit(page);
    }
  }

  onPageSizeChange(event: any) {
    const newPageSize = parseInt(event.target.value);
    this.pageSizeChanged.emit(newPageSize);
  }
}

export class PaginatedResult<T> {
    public pageNumber: number = 1;
    public pageSize: number = 10;
    public totalCount: number = 0;
    public totalPages: number = 0;
    public items: T[] = [];
}
export interface DataResponse<T> {
  success: boolean;
  data: T | null;
  message: string | null;
}

export interface PageResponse<T> {
  success: boolean;
  data: T[] | null;
  message: string | null;
  skip: number;
  limit: number;
  has_more: boolean;
}
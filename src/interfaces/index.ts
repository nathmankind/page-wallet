declare global {
  type DateString = string;
  type Nullable<T> = T | null;
}

export interface IApiResponse<T> {
  data: T;
  message: string;
  status: string;
  meta?: {
    count: number;
    totalPages: number;
  };
}

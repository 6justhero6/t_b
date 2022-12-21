export interface IResponse<U> {
  status: 'success' | 'error';
  data: U;
}

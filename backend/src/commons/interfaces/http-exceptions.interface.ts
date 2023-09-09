export interface IExceptionFilter {
  statusCode: number;
  message: string | object;
  timestamp: string;
}

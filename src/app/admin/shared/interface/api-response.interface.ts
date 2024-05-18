export interface ApiResponse<TResponse> {
  response: TResponse;
  success: boolean;
  errors: Error[];
}

export interface Error {
  message: string;
  code: number;
}


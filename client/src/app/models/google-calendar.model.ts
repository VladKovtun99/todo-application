export interface GoogleEventDetails {
  summary: string;
  description: string;
  email: string;
  startTime: string;
  endTime: string;
  location?: string;
}

export interface GoogleApiResponse {
  htmlLink?: string;
  error?: any;
}

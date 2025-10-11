export interface ErrorClientType extends Error {
  type: string;
  success: boolean;
  message: string;
  details?: string;
}

import { ErrorInfo } from './state';

export function renderError(error: Error): ErrorInfo {
  return { message: error.message };
}

export function deleteProperty(values: any, key: string): any {
  const { [key]: _, ...newValue } = values;
  return newValue;
}

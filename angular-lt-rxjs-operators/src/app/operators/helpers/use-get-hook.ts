import { HttpClient } from '@angular/common/http';
import { inject } from '@angular/core';

export function useGet() {
  const http = inject(HttpClient);

  return <T>(url: string) => http.get<T>(url);
}

import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_EXAMPLE_CONFIG } from '../api-config';
import { Example } from '../models';

export class ExampleService {
  private _http = inject(HttpClient);
  private _config = inject(API_EXAMPLE_CONFIG);

  getExamples(): Observable<Example[]> {
    return this._http.get<Example[]>(`${this._config.baseUrl}/examples`);
  }
}
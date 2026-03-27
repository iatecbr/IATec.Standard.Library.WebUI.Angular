import { InjectionToken } from '@angular/core';

export interface ApiExampleConfig {
  baseUrl: string;
}

export const API_EXAMPLE_CONFIG = new InjectionToken<ApiExampleConfig>('API_EXAMPLE_CONFIG');
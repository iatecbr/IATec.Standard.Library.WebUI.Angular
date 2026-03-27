import {
    ApplicationConfig,
    isDevMode,
    provideBrowserGlobalErrorListeners,
    provideZoneChangeDetection
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideTransloco } from "@jsverse/transloco";
import { provideHttpClient, withFetch } from "@angular/common/http";
import { providePrimeNG } from "primeng/config";

import Aura from '@primeuix/themes/lara';
import { ConfirmationService, MessageService } from "primeng/api";
import { provideAnimations } from "@angular/platform-browser/animations";
import { API_EXAMPLE_CONFIG, ApiExampleConfig } from '@services/example';

const API_EXAMPLE_CONFIG_VALUE: ApiExampleConfig = {
    baseUrl: 'http://localhost:3000/api'
};

export const appConfig: ApplicationConfig = {
    providers: [
        provideZoneChangeDetection({eventCoalescing: true}),
        provideBrowserGlobalErrorListeners(),
        provideAnimations(),
        provideRouter(routes),
        provideHttpClient(withFetch()),
        provideTransloco({
            config: {
                availableLangs: ['pt-BR', 'en-US', 'es-ES'],
                defaultLang: localStorage.getItem('lang') ?? 'en-US',
                reRenderOnLangChange: true,
                prodMode: !isDevMode(),
            },
        }),
        providePrimeNG({
            theme: {
                preset: Aura,
                options: {
                    darkModeSelector: '.app-dark'
                }
            }
        }),
        MessageService,
        ConfirmationService,
        { provide: API_EXAMPLE_CONFIG, useValue: API_EXAMPLE_CONFIG_VALUE }
    ]
};

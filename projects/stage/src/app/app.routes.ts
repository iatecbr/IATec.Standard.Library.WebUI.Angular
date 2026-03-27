import { Routes } from '@angular/router';
import { NephosTemplateComponent } from './templates/nephos/component/nephos-template.component';
import { provideTranslocoScope } from '@jsverse/transloco';
import { exampleCoreTranslationLoader } from '@services/example';

export const routes: Routes = [
    {
        path: '',
        component: NephosTemplateComponent,
        loadChildren: () => import('@services/example').then((m) => m.routes),
        providers: [
            provideTranslocoScope({
                scope: 'example',
                loader: exampleCoreTranslationLoader,
            }),
        ],
    },
];

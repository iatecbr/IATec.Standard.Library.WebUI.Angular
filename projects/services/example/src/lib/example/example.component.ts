import { Component } from '@angular/core';
import { TranslocoPipe } from "@jsverse/transloco";

@Component({
    selector: 'ett-cor-example',
    imports: [
        TranslocoPipe
    ],
    templateUrl: './example.component.html',
    styles: ``,
})
export class ExampleComponent {
}

import {Component} from '@angular/core';
import 'rxjs/add/operator/map';

@Component({
    selector: 'app',
    template: `
        <navigation></navigation>
        <div class="container">
            <router-outlet></router-outlet>
        </div>
    `
})
export class AppComponent { }

import { Component } from '@angular/core';
import { VERSION } from '@angular/core';

@Component({
    selector: 'my-app',
    template: `<div>{{name}}</div>
  <my-grid>
  </my-grid>
  `,
})
export class AppComponent {
    private name = 'Grid Demo';
    constructor() {
        console.log('angular version: ' + VERSION.full);
    }
}

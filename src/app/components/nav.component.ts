import { Component } from '@angular/core';

@Component({
  selector: 'navigation',
  template: `
    <nav>
      <div class="logo">
        <img src="{{logo}}" alt="Logo">
      </div>
    </nav>
  `
})
export class NavComponent {
    logo = require('../assets/images/logo.jpg');
}

import { Component } from '@angular/core';

interface NavItem {
  commands: any[];
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  navItems: NavItem[] = [
    {
      commands: ['/vehicles'],
      text: 'Vehicles'
    },
    {
      commands: ['/showrooms'],
      text: 'Showrooms'
    }
  ];
}

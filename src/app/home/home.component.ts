import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  template: `
    <p>home works!</p>
  `,
})
export default class HomeComponent implements OnInit {
  ngOnInit() {}
}

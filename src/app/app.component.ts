import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { GuestNavComponent } from "./shared/guest-nav/guest-nav.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, GuestNavComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {



}

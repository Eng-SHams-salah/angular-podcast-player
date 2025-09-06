import { Component } from '@angular/core';
import { PodcastPlayerComponent } from "./podcast-player/podcast-player.component";

@Component({
  selector: 'app-root',
  imports: [PodcastPlayerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

}

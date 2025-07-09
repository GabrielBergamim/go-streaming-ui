import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoPlayerComponent } from '../../components/video-player/video-player';

@Component({
  selector: 'app-theater',
  templateUrl: './theater.html',
  imports: [
    VideoPlayerComponent
  ],
})
export class TheaterComponent implements OnInit {

  activedRoute = inject(ActivatedRoute);
  videoId = '';

  ngOnInit() {
    const params = this.activedRoute.snapshot.params;
    this.videoId = params['videoId'] || '';
  }
}


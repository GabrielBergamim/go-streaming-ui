import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { environment } from '../../../environments/environment';
import Hls from 'hls.js';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayerComponent implements AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  @Input() videoId!: string;

  player!: any;

  hls!: Hls;

  private baseUrl = `${environment.apiUrl}/video`;

  ngAfterViewInit() {
    const video = this.videoPlayer.nativeElement as HTMLVideoElement;

    if (Hls.isSupported()) {
      this.hls = new Hls({
        enableWebVTT: true,
        enableCEA708Captions: true,
      });
      this.hls.loadSource(`${this.baseUrl}/${this.videoId}/video.m3u8`);
      this.hls.attachMedia(video);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((error: any) => {
          console.error('Error attempting to play:', error);
        });
      });
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = `${this.baseUrl}/${this.videoId}/video.m3u8`;
      video.addEventListener('canplay', () => video.play());
    }
  }

  get subtitleUrl(): string {
    return `${this.baseUrl}/${this.videoId}/pt-BR.vtt`;
  }
}


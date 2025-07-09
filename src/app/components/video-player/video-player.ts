import { AfterViewInit, Component, ElementRef, Input, ViewChild } from '@angular/core';
import videojs from 'video.js';
import 'videojs-hls-quality-selector';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.html',
  styleUrl: './video-player.scss',
})
export class VideoPlayerComponent implements AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;

  @Input() videoId!: string;

  player!: any;

  private baseUrl = 'http://go.streaming/api/video';

  ngAfterViewInit() {
    this.player = videojs(this.videoPlayer.nativeElement, {
      controls: true,
      fluid: true,
      autoplay: false,
      responsive: true,
      controlBar: {
        children: this.getControlBar()
      },
      sources: this.getVideoSource(),
      tracks: this.getTracks()
    });
  }

  private getTracks() {
    return [
      {
        kind: 'captions',
        src: `${this.baseUrl}/${this.videoId}/pt-BR.vtt`,
        srclang: 'pt-BR',
        label: 'Portuguese',
        default: true
      }
    ];
  }

  private getVideoSource() {
    return [
      {
        src: `${this.baseUrl}/${this.videoId}/video.m3u8`,
        type: 'application/x-mpegURL',
      }
    ];
  }

  private getControlBar(): string[] {
    return [
      'playToggle',
      'volumePanel',
      'currentTimeDisplay',
      'timeDivider',
      'durationDisplay',
      'progressControl',
      'subsCapsButton',
      'fullscreenToggle',
    ];
  }
}


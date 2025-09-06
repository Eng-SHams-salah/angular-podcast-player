import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Episode {
  title: string;
  hosts: string;
  cover: string;
  audio: string;
}

@Component({
  selector: 'app-podcast-player',
  imports: [FormsModule, CommonModule],
  templateUrl: './podcast-player.component.html',
  styleUrls: ['./podcast-player.component.scss']
})
export class PodcastPlayerComponent {
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  episodes: Episode[] = [
    {
      title: 'Stop hiring junior engineers because of AI',
      hosts: 'Beyond Coding Podcast',
      cover: '/assets/covers/podcast-cover.jpg',
      audio: '/assets/audio/Stop_Hiring_Junior_Engineers_Because_of_AI_(256k).mp3'
    },
    {
      title: 'How to Get a Remote or International Tech Job Complete Guide',
      hosts: 'Beyond Coding Podcast',
      cover: '/assets/covers/podcast-cover.jpg',
      audio: '/assets/audio/How_to_Get_a_Remote_or_International_Tech_Job__Complete_Guide_(256k).mp3'
    },
    {
      title: 'The simple daily habit that unlocks your productivity',
      hosts: 'Beyond Coding Podcast',
      cover: '/assets/covers/podcast-cover.jpg',
      audio: '/assets/audio/The_Simple_Daily_Habit_That_Unlocks_Your_Productivity(256k).mp3'
    }
  ];

  currentIndex = 0;
  currentEpisode: Episode = this.episodes[0];

  isPlaying = false;
  progress = 0;
  duration = 0;
  currentTime = '0:00';
  totalTime = '0:00';

  // play / pause
  togglePlay() {
    const audio = this.audioPlayer.nativeElement;
    if (this.isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    this.isPlaying = !this.isPlaying;
  }

  updateProgress() {
    const audio = this.audioPlayer.nativeElement;
    this.progress = audio.currentTime;
    this.currentTime = this.formatTime(audio.currentTime);
  }

  loadMeta() {
    const audio = this.audioPlayer.nativeElement;
    this.duration = audio.duration;
    this.totalTime = this.formatTime(audio.duration);
  }

  seekAudio(event: Event) {
    const input = event.target as HTMLInputElement;
    const audio = this.audioPlayer.nativeElement;
    audio.currentTime = Number(input.value);
  }

  // next / prev
  nextEpisode() {
    this.currentIndex = (this.currentIndex + 1) % this.episodes.length;
    this.selectEpisode(this.currentIndex);
  }

  prevEpisode() {
    this.currentIndex =
      (this.currentIndex - 1 + this.episodes.length) % this.episodes.length;
    this.selectEpisode(this.currentIndex);
  }

  // select episode mn el playlist
  selectEpisode(index: number) {
    this.currentIndex = index;
    this.currentEpisode = this.episodes[index];

    const audio = this.audioPlayer.nativeElement;

    audio.pause();
    audio.currentTime = 0;

    audio.src = this.currentEpisode.audio;
    audio.load();

    if (this.isPlaying) {
      const playOnCanPlay = () => {
        audio.play().catch(err => console.error('Error playing new episode:', err));
        audio.removeEventListener('canplay', playOnCanPlay);
      };
      audio.addEventListener('canplay', playOnCanPlay);
    }
  }

  private formatTime(sec: number): string {
    const minutes = Math.floor(sec / 60);
    const seconds = Math.floor(sec % 60).toString().padStart(2, '0');
    return `${minutes}:${seconds}`;
  }
}

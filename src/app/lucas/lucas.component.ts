import { Component, OnDestroy, OnInit } from '@angular/core';

const LOAD_TIME_MS = 800;
const START_OFFSET_MS = 200;

@Component({
  selector: 'app-lucas',
  templateUrl: './lucas.component.html',
  styleUrls: ['./lucas.component.scss']
})
export class LucasComponent implements OnInit, OnDestroy {
  letters = 'Lucas Miller';
  count = 0;
  private timeouts: number[] = [];

  ngOnInit() {
    this.animateLetters();
  }

  ngOnDestroy() {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
  }

  animateLetters = () => {
    this.count = 0;
    const timeoutMs = LOAD_TIME_MS / this.letters.length;
    for (let i = 0; i < this.letters.length; i++) {
      const timeout = setTimeout(() => {
        this.count++;
      }, i * timeoutMs + START_OFFSET_MS) as unknown as number;
      this.timeouts.push(timeout);
    }
  }

  mapLettersToHTML = () => this.letters.split('').map((letter: string) => letter === ' ' ? '&nbsp;' : letter);

  isTriggeredClass = (i: number) =>
    i < this.count ? 'lucas__triggered' : 'lucas__notTriggered'
}

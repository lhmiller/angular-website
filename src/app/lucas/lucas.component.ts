import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-lucas',
  templateUrl: './lucas.component.html',
  styleUrls: ['./lucas.component.scss']
})
export class LucasComponent implements OnInit, OnDestroy {
  letters = 'Lucas Miller'.split('');
  count = 0;
  private timeouts: number[] = [];

  ngOnInit() {
    for (let i = 0; i < this.letters.length; i++) {
      const timeout = setTimeout(() => {
        this.count++;
      }, i * 200) as unknown as number;
      this.timeouts.push(timeout);
    }
  }

  ngOnDestroy() {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
  }

  mapLettersToHTML = () => this.letters.map((letter: string) => letter === ' ' ? '&nbsp;' : letter);

  isTriggeredClass = (i: number) =>
    i <= this.count ? 'lucas__triggered' : 'lucas__notTriggered'
}

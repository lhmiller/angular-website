import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { TitleService } from '../shared/title.service';

const LOAD_TIME_MS = 800;
const START_OFFSET_MS = 200;

@Component({
  selector: 'app-lucas',
  templateUrl: './lucas.component.html',
  styleUrls: ['./lucas.component.scss']
})
export class LucasComponent implements OnInit, OnDestroy {
  @ViewChild('canvas', { static: true }) canvasElement: ElementRef<HTMLCanvasElement>;
  letters = 'Lucas Miller';
  buttons = [
    {
      name: 'Resume',
      // TODO add pdf viewer
      link: 'pdfjs/web/viewer.html?file=/assets/doc/Resume.pdf',
    },
    {
      name: 'LinkedIn',
      link: 'https://www.linkedin.com/in/lucasmiller1',
    },
    {
      name: 'Github',
      link: 'https://www.github.com/lhmiller',
    },
    {
      name: 'Portfolium',
      link: 'https://portfolium.com/lucasmiller1',
    },
    {
      name: 'Email',
      link: 'mailto:lhmiller@calpoly.edu',
    },
  ];
  private lettersCount = 0;
  private canvas: CanvasRenderingContext2D;
  private timeouts: number[] = [];

  constructor(private titleService: TitleService) {}

  ngOnInit() {
    this.canvas = this.canvasElement.nativeElement.getContext('2d');
    this.updateCanvas();
    this.animateLetters();
    this.titleService.setTitle('Lucas Miller');
    window.addEventListener('resize', this.updateCanvas);
  }

  ngOnDestroy() {
    for (const timeout of this.timeouts) {
      clearTimeout(timeout);
    }
    window.removeEventListener('resize', this.updateCanvas);
  }

  animateLetters = () => {
    this.lettersCount = 0;
    const timeoutMs = LOAD_TIME_MS / this.letters.length;
    for (let i = 0; i < this.letters.length; i++) {
      const isLast = i === this.letters.length - 1;
      const timeout = setTimeout(() => {
        this.lettersCount++;
        if (isLast) {
          for (const oldTimeout of this.timeouts) {
            clearTimeout(oldTimeout);
          }
        }
      }, i * timeoutMs + START_OFFSET_MS) as unknown as number;
      this.timeouts.push(timeout);
    }
  }

  mapLettersToHTML = () => this.letters.split('').map((letter: string) => letter === ' ' ? '&nbsp;' : letter);

  isTriggeredClass = (i: number) =>
    `lucas__${i < this.lettersCount ? 'triggered' : 'notTriggered'}`

  private updateCanvas = () => {
    const {
      clientWidth: viewportWidth,
      clientHeight: viewportHeight,
    } = document.documentElement;
    this.canvasElement.nativeElement.width = viewportWidth;
    this.canvasElement.nativeElement.height = viewportHeight;

    // gray background
    this.canvas.fillStyle = 'rgb(200,200,200)';
    this.canvas.fillRect(0, 0, viewportWidth, viewportHeight);

    // "stars"
    for (let i = 0; i < 20; i++) {
      const minPadding = 10;
      const x = Math.floor(Math.random() * (viewportWidth - 2 * minPadding) + minPadding);
      const y = Math.floor(Math.random() * (viewportHeight - 2 * minPadding) + minPadding);
      const radius = Math.floor(Math.random() * 2 + 5);
      this.canvas.beginPath();
      this.canvas.arc(x, y, radius, 0, 2 * Math.PI);
      this.canvas.fillStyle = 'white';
      this.canvas.fill();
    }
  }
}

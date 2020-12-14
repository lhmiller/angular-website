import { Injectable } from '@angular/core';

@Injectable()
export class TitleService {
  setTitle = (title: string) => {
    document.title = title;
  }
}

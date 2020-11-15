import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {
  get = (key: string) => {
    const rawValue = localStorage.getItem(key);
    return JSON.parse(rawValue);
  }

  set = (key: string, value: unknown) => {
    const formattedValue = JSON.stringify(value);
    localStorage.setItem(key, formattedValue);
  }

  remove = (key: string) => {
    localStorage.removeItem(key);
  }

  clear = () => {
    localStorage.clear();
  }

  length = () => {
    return localStorage.length;
  }
}

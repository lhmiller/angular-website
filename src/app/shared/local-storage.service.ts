export class LocalStorageService {
  get = (key: string) => {
    const rawValue = localStorage.getItem(key);
    return JSON.parse(rawValue);
  }

  set = (key: string, value: unknown) => {
    let formattedValue: string;
    switch (typeof value) {
      case 'string':
        formattedValue = value;
        break;
      default:
        formattedValue = JSON.stringify(value);
        break;
    }
    localStorage.setItem(key, formattedValue);
  }

  remove = (key: string) => {
    localStorage.removeItem(key);
  }

  clear = () => {
    localStorage.clear();
  }
}

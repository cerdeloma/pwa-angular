import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor() { }

  addToSession(chave: string, valor: any) {
    return window.sessionStorage.setItem(chave, valor);
  }

  getToSession(chave: string) {
    if (chave) {
      return window.sessionStorage.getItem(chave);
    }
    console.log(`a chave ${chave} não foi encontrada`);
    return null;
  }

  removeToSession(chave: string) {
    if (chave) {
      return window.sessionStorage.removeItem(chave);
    }
  }
}

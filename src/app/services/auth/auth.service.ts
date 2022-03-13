import { SessionStorageService } from './../session-storage/session-storage.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth,
    private router: Router,
    private ss: SessionStorageService
    ) {
  }

  async cadastrar(email: string, password: string) {
    try{
      return await this.angularFireAuth.createUserWithEmailAndPassword(email, password);
    } catch(err) {
      console.log('erro ao logar', err);
      return null;
    }
  }

  // async login(email: string, password: string) {
  //   try{
  //     return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
  //   } catch(err) {
  //     console.log('erro ao logar', err);
  //     return null;
  //   }
  // }

  login(email: string, password: string): any {
    return this.angularFireAuth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.reload();
      this.router.navigate(['home'])
    });
  }

  async loginWithGoogle(email: string, password: string) {
    try{
      return await this.angularFireAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    } catch(err) {
      console.log('erro ao logar com google', err);
      return null;
    }
  }

  obterUsuarioLogado() {
    return this.angularFireAuth.authState.subscribe((res: any) => {
      if (res) {
        this.ss.addToSession('token', res?.uid);
        this.ss.addToSession('email', res?.email);
      }
      return null;
    });
  }

  get logado() {
    return this.ss.getToSession('token') ? true : false;
  }

  logout() {
    this.angularFireAuth.signOut().then(() => {
      this.ss.removeToSession('token');
      this.ss.removeToSession('email');
      window.location.reload();
      this.router.navigate(['login']);
    });
  }

}

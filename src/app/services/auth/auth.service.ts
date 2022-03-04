import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private angularFireAuth: AngularFireAuth
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

  async login(email: string, password: string) {
    try{
      return await this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch(err) {
      console.log('erro ao logar', err);
      return null;
    }
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
    return this.angularFireAuth.authState.subscribe(
      (res: any) => {
        if (res?.uid) {
          window.sessionStorage.setItem('idToken', res.uid);
          window.sessionStorage.setItem('emailUser', res.email);
        }
      }
    );
  }

  logout() {
    this.angularFireAuth.signOut();
  }

}

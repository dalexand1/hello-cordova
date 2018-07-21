import { Injectable } from '@angular/core';

@Injectable()
export class CordovaService {

  protected hasBegunInitialization: boolean = false;

  constructor() {}

  public initialize(): void {
    // listen for 'deviceready' event in case it hasn't
    // already been fired during application bootstrap
    document.addEventListener('deviceready', () => {
      window['isDeviceReady'] = true;
      this.init();
      console.log('deviceready fired after bootstrap finish');
    }, false);

    // check if 'deviceready' has already fired during
    // application bootstrap.
    if (window['isDeviceReady'] === true) {
      this.init();
      console.log('deviceready fired before bootstrap finish');
    }
  }

  protected init(): void {

    // lock initialization
    if (this.hasBegunInitialization) {
      return;
    }

    this.hasBegunInitialization = true;

    // do init stuff here
  }
}

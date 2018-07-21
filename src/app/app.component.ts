import { Component, OnInit } from '@angular/core';
import { CordovaService } from './service/cordova.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'app';

  constructor(protected _cordovaService: CordovaService) {}

  public ngOnInit(): void {
    this._cordovaService.initialize();
  }
}

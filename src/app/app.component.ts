import { Component, OnInit } from "@angular/core";
import { JwtHelperService } from "@auth0/angular-jwt";
import { CordovaService } from "./service/cordova.service";

declare var cordova: any;
declare var device;

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  title = "app";
  isLoggedIn: boolean;
  email = "";

  constructor(protected _cordovaService: CordovaService) {
    console.log("AppComponent:constructor");
    this.email = "";
    this.isLoggedIn = false;
    localStorage.setItem("email", "");
    localStorage.setItem("isLoggedIn", "false");
  }

  public ngOnInit(): void {
    console.log("AppComponent:ngOnInit");

    //this._cordovaService.initialize();
    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady() {
      alert(device.platform);
    }

    this.email = localStorage.getItem("email");
    this.isLoggedIn = this.toBoolean(localStorage.getItem("isLoggedIn"));
  }

  toBoolean(str): boolean {
    if (typeof str === "undefined" || str === null) {
      return false;
    } else if (typeof str === "string") {
      switch (str.toLowerCase()) {
        case "false":
        case "no":
        case "0":
        case "":
          return false;
        default:
          return true;
      }
    } else if (typeof str === "number") {
      return str !== 0;
    } else {
      return true;
    }
  }

  signIn(): any {
    console.log("signIn()");
    var ref = (<any>window).cordova.InAppBrowser.open(
      "https://dave.lab.idmintegration.com:8443/jspsample/dologin.jsp",
      "_blank",
      "location=no,clearsessioncache=yes,clearcache=yes"
    );
    ref.addEventListener("loadstop", function(event) {
      if (event.url.indexOf("?jwt=") !== -1) {
        // User now logged in!
        var token = event.url.match(/jwt=(.*)$/)[1];
        const helper = new JwtHelperService();
        const jwtDecoded = helper.decodeToken(token);
        console.log("jwt:" + token);
        console.log("decoded:" + JSON.stringify(jwtDecoded));
        var emailAddress = JSON.stringify(jwtDecoded.email, ["email"]);
        ref.close();
      }
      console.log("email: " + emailAddress);
      localStorage.setItem("email", emailAddress);
      localStorage.setItem("isLoggedIn", "true");
      document.getElementById("email").innerHTML =
        "Email Address: " + emailAddress;
      document.getElementById("sign-in").style.display = "none";
    });
  }
}

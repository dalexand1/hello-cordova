Angular6 + Cordova inAppBrowser SAML Authentication Example
===========================================================

```
cd hello-cordova
npm install
cd cordova
cordova platform add android
cordova plugin add cordova-plugin-inappbrowser
cd ..
ng build --prod --base-href . --output-path .\cordova\www
cd cordova
cordova build android
```

If cordova.js is not referenced in the cordova\wwww\index.html, you will need to add <script src="cordova.js"></script>, otherwise the Angular app will not bootstrap Cordova.

The Cordova App is only intended to work in an emulator and has only been tested on Android.

An external SAML Service Provider is required.  In this demo, the SAML Service Provider has been customized to package the SAML attributes in a JSON Web Token that is tacked on to the location as a parameter.  The Cordova inAppBrowser checks for the JWT to signal a successful login to the Service Provider.

If the SAML SP or IdP is using self-signed SSL certs, then you need to modify the inAppBrowser java code (see http://ivancevich.me/articles/ignoring-invalid-ssl-certificates-on-cordova-android-ios/).

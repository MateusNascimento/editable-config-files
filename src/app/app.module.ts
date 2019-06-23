import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppRoutingModule } from './app-routing.module';
import { APP_INITIALIZER } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MsAdalAngular6Module, MsAdalAngular6Service, AuthenticationGuard } from 'microsoft-adal-angular6';
import { NgModule } from '@angular/core';
import { InsertAuthTokenInterceptor } from './insert-auth-token-interceptor';

let adalConfig: any;
export function msAdalAngular6ConfigFactory() {
  return adalConfig;
}

export function initializeApp(appConfig: AppConfig) {
  const promise = appConfig.load().then(() => {
    adalConfig = {
      tenant: AppConfig.settings.adalConfig.tenant,
      clientId: AppConfig.settings.adalConfig.clientId,
      redirectUri: window.location.origin,
      endpoints: AppConfig.settings.adalConfig.endpoints,
      navigateToLoginRequestUrl: false,
      cacheLocation: AppConfig.settings.adalConfig.cacheLocation
    };
  });
  return () => promise;
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    HttpClientModule,
    HttpModule,
    MsAdalAngular6Module
    /*MsAdalAngular6Module.forRoot({
      tenant: '<tenant>',
      clientId: '<clientId>',
      redirectUri: 'http://localhost:4200/',
      endpoints: {
        'http://localhost:4200/': '<clientId>'},
      navigateToLoginRequestUrl: false,
      cacheLocation: 'localStorage'
    })*/
  ],
  providers: [
    AppConfig,
    { provide: APP_INITIALIZER, useFactory: initializeApp, deps: [AppConfig], multi: true },
    MsAdalAngular6Service,
    { provide: 'adalConfig', useFactory: msAdalAngular6ConfigFactory, deps: [] },
    AuthenticationGuard,
    { provide: HTTP_INTERCEPTORS, useClass: InsertAuthTokenInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

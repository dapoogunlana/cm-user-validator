import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MarketingModule } from './main/marketing/marketing.module';
import { CoachModule } from './main/coaches/coach.module';
import { ProtegeeModule } from './main/protegees/protegee.module';
import { AuthModule } from './main/auth/auth.module';

import { JWTInterceptor } from './app-support/interceptors/jwtinterceptor';
import { NotificationInterceptor } from './app-support/interceptors/notificationinterceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MarketingModule,
    CoachModule,
    ProtegeeModule,
    AuthModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(),
    HttpClientModule,
  ],
  // providers: [JWTInterceptor, NotificationInterceptor],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms'; 
import {TimeAgoPipe} from 'time-ago-pipe';
import { AppComponent } from './app.component';
import { TradewindComponent } from './tradewind/tradewind.component';
import { ROUTING } from './app.routing';
import { RouterModule } from '@angular/router';
import { MicroblogComponent } from './microblog/microblog.component';
import {HttpModule} from '@angular/http';

@NgModule({
  declarations: [
    AppComponent,
    TimeAgoPipe,
    TradewindComponent,
    MicroblogComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    ROUTING,
    HttpModule  
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

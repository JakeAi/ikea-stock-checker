import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { Ng2DeepSearchPipe } from './search.pipe';

@NgModule({
  declarations: [AppComponent,Ng2DeepSearchPipe],
  imports: [BrowserModule, HttpClientModule, FormsModule, Ng2SearchPipeModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

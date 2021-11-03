import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutComponent } from './components/about/about.component';


import { HttpClientModule } from '@angular/common/http';
import { PaintingsSectionComponent } from './components/paintings-section/paintings-section.component';
import { PaintingsSearchBarComponent } from './components/paintings-search-bar/paintings-search-bar.component';
import { PaintingsGridComponent } from './components/paintings-grid/paintings-grid.component';
import {PaintingsDataService} from './shared/services/paintings-data.service';
import { NewsComponent } from './pages/news/news.component';
import { ContactComponent } from './pages/contact/contact.component';
import { HomeComponent } from './pages/home/home.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { FooterComponent } from './components/footer/footer.component';
import { SearchFilterPipe } from './shared/pipes/search-filter.pipe';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    AboutComponent,
    PaintingsSectionComponent,
    PaintingsSearchBarComponent,
    PaintingsGridComponent,
    NewsComponent,
    ContactComponent,
    HomeComponent,
    PaintingDetailsComponent,
    FooterComponent,
    SearchFilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [PaintingsDataService, SearchFilterPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

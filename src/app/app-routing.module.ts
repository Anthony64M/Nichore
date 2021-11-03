import { PaintingsGridComponent } from './components/paintings-grid/paintings-grid.component';
import { PaintingDetailsComponent } from './components/painting-details/painting-details.component';
import { ContactComponent } from './pages/contact/contact.component';
import { NewsComponent } from './pages/news/news.component';
import { HeaderComponent } from './components/header/header.component';
import {HomeComponent} from './pages/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ActivatedRoute } from '@angular/router';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {
    path: 'paintings',
    pathMatch: 'full',
    component: PaintingsGridComponent,
  },
  {path: 'paintings/:id', component: PaintingDetailsComponent},
  {path: 'news', component: NewsComponent},
  {path: 'contact', component: ContactComponent},
  {path: '**', component: HomeComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

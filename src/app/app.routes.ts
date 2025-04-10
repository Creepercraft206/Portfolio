import { Routes } from '@angular/router';
import {ContactComponent} from "./contact/contact.component";
import {ContentComponent} from "./content/content.component";

export const routes: Routes = [
  { path: '', component: ContentComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: '', pathMatch: 'full' }
];

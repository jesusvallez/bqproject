import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent }   from './app.component';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'projects', redirectTo: '', pathMatch: 'full' },
  { path: 'explore', redirectTo: '', pathMatch: 'full' },
  { path: 'learn', redirectTo: '', pathMatch: 'full' },
  { path: 'help', redirectTo: '', pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}

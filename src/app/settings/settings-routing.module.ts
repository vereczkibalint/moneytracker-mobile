import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';
import {PreferencesPage} from "./preferences/preferences.page";

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: '/preferences',
    component: PreferencesPage
  },
  {
    path: 'preferences',
    loadChildren: () => import('./preferences/preferences.module').then( m => m.PreferencesPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}

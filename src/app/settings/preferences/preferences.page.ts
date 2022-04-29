import { Component, OnInit } from '@angular/core';
import {Storage} from "@ionic/storage";

interface Preferences {
  transactionLimit: number;
}

@Component({
  selector: 'app-preferences',
  templateUrl: './preferences.page.html',
  styleUrls: ['./preferences.page.scss'],
})
export class PreferencesPage implements OnInit {
  PREFERENCES_KEY: string = 'preferences';
  currentPreferences: Preferences;

  constructor(private storage: Storage) {
    this._setDefaultPreferences();
    console.log('default settings set')
  }

  ngOnInit() {
    Promise.all([
      this._loadPreferences()
    ]).then((results) => {
      if(results && results[0]) {
        this.currentPreferences = results[0];
      }
    });
  }

  _loadPreferences() {
    return this.storage.get(this.PREFERENCES_KEY);
  }

  _setNewTransactionLimit(newLimit: number) {
    const newPreference: Preferences = {
      transactionLimit: newLimit
    };
    this.storage.set(this.PREFERENCES_KEY, newPreference).then((newData) => {
      this.currentPreferences = newData;
    });
  }

  _setDefaultPreferences() {
    this.currentPreferences = {
      transactionLimit: 5
    }
    console.log(this.currentPreferences);
  };
}

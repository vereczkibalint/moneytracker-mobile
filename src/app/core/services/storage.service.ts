import { Injectable } from '@angular/core';
import {Storage} from "@ionic/storage";

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor(private storage: Storage) { }

  async getKey(key: string) {
    return await this.storage.get(key);
  }

  async setKey(key: string, value: any) {
    return await this.storage.set(key, value);
  }

  async removeKey(key: string) {
    return await this.storage.remove(key);
  }
}

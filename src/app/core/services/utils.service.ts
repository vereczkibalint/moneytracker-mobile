import { Injectable } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { TyperService } from './typer.service';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private typerService: TyperService,
    private loadingController: LoadingController
  ) { }

  createLoadingIndicator(message?: string) {
    return this.loadingController.create({
      message: this.typerService.isUndefined(message) ? 'Please wait...' : message
    });
  }
}

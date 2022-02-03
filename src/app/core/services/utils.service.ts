import { Injectable } from '@angular/core';
import { LoadingController, PopoverController } from '@ionic/angular';
import { TyperService } from './typer.service';
import { MorePopoverComponent } from '../../home/more-popover/more-popover.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private typerService: TyperService,
    private loadingController: LoadingController,
    private popoverController: PopoverController
  ) { }

  createLoadingIndicator(message?: string) {
    return this.loadingController.create({
      message: this.typerService.isUndefined(message) ? 'Please wait...' : message
    });
  }

  async createMoreOptionsPopover(event, selectionHandler) {
    return await this.popoverController.create({
      component: MorePopoverComponent,
      componentProps: {
        selectionHandler: () => selectionHandler()
      },
      animated: false,
      translucent: true,
      showBackdrop: false,
      mode: 'md',
      event
    });
  }
}

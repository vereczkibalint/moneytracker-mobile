import {Injectable} from '@angular/core';
import {LoadingController, ModalController, PopoverController} from '@ionic/angular';
import {TyperService} from './typer.service';
import {MorePopoverComponent} from '../../home/more-popover/more-popover.component';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private typerService: TyperService,
    private loadingController: LoadingController,
    private popoverController: PopoverController,
    private modalController: ModalController
  ) { }

  createLoadingIndicator(message?: string) {
    return this.loadingController.create({
      message: message ? message : 'Please wait...'
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

  async createModal(modalComponent, props: object) {
    return await this.modalController.create({
      component: modalComponent,
      componentProps: {
        ...props
      }
    });
  }
}

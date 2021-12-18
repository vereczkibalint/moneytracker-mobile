import { Component, OnInit } from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private loadingController: LoadingController) { }

  ngOnInit() {
  }

  async handleRegister(event: any) {
    const loading = await this.loadingController.create({
      message: 'Creating your account...',
      duration: 2000
    });

    await loading.present();
  }
}

import {Component, OnInit} from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {Router} from "@angular/router";
import {Storage} from "@ionic/storage";
import {IonRouterOutlet} from "@ionic/angular";
import {AnimationOptions} from "ngx-lottie";

@Component({
  selector: 'app-intro',
  templateUrl: './intro.page.html',
  styleUrls: ['./intro.page.scss'],
})
export class IntroPage implements OnInit {
  LOTTIE_ANIMATION_OPTIONS: AnimationOptions[] = [
    {
      path: 'assets/animations/intro_1.json'
    },
    {
      path: 'assets/animations/intro_2.json'
    },
    {
      path: 'assets/animations/intro_3.json'
    }
  ];
  ONBOARD_KEY: string = 'onboarded';

  constructor(private storage: Storage, private router: Router, private ionRouterOutlet: IonRouterOutlet) {
    this.storage.get(this.ONBOARD_KEY).then((onboarded) => {
      if(onboarded) {
        this._navigateToAuth();
      }
    })
  }

  ngOnInit() {
    this.ionRouterOutlet.swipeGesture = false;
  }

  redirectToAuth() {
    this.storage.set(this.ONBOARD_KEY, true).then(() => {
      this._navigateToAuth();
    });
  }

  _navigateToAuth() {
    this.router.navigateByUrl('/auth');
  }
}

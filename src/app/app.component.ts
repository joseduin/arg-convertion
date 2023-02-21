import { Component } from '@angular/core';
import { Storages } from './store/storage';
import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@capacitor/splash-screen'

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private storage: Storages,
    private platform: Platform,
    private navController: NavController,
  ) {
    this.platform.ready().then(this.initializeApp.bind(this))
  }

  private initializeApp(): void {
		this.storage.create().then(
			this.configApp.bind(this)
		)
  }

  private configApp(): void {
    this.navController.navigateRoot(['/']).then(this.hideSplash.bind(this))
  }

  private hideSplash(): Promise<void> {
		if (this.platform.is('cordova')) {
      return SplashScreen.hide()
		}
		return Promise.resolve()
	}
}

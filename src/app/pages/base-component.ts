import { inject } from '@angular/core';
import { ToastController } from '@ionic/angular';

export class BaseComponent {
  protected toastController: ToastController = inject(ToastController);

  constructor() {}

  async presentToast(
    message: string,
    duration: number = 2000,
    color: string = 'primary'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      color,
    });
    toast.present();
  }

  async presentToastWithAnchor(
    message: string,
    position: 'top' | 'bottom',
    positionAnchor: string,
    duration: number = 2000,
    color: string = 'primary'
  ) {
    const toast = await this.toastController.create({
      message,
      duration,
      position,
      positionAnchor,
      color,
    });
    toast.present();
  }

  async presentErrorToast(message: string, duration: number = 2000) {
    await this.presentToast(message, duration, 'danger');
  }

  async presentErrorToastFromResponse(response: any, duration: number = 2000) {
    const errorMessage = `Error ${response.status}: ${response.error.error.message}`;
    await this.presentErrorToast(errorMessage, duration);
  }
}

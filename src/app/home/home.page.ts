import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router, public toastController: ToastController) {}
  ngOnInit() {
    console.log(sessionStorage.getItem('email'))
    if(!sessionStorage.getItem('email')) {
    
    this.router.navigateByUrl("/inscription");
    }

  }
  deconnecter() {
    sessionStorage.removeItem('email');
    this.decon();
    this.router.navigateByUrl("/inscription");


  }
  async decon() {
    let toast = await this.toastController.create({

      message: 'Vous êtes déconnecté.e.s',
      color: 'success',
      duration: 4000,
      position: 'bottom',
      buttons: [{
        role: "cancel",
        icon: 'close'

      }]

    });
    toast.present();
  }

}

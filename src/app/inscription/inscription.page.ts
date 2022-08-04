import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
})
export class InscriptionPage implements OnInit {


  email_user: string;
  password: string;
  ionicForm: FormGroup;
  isSubmitted = false;

  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController, private router: Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
  
      email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,  Validators.pattern(/[A-Z]+.*[0-9]+.*[^\w]+|[A-Z]+.*[^\w]+.*[0-9]+|[0-9]+.*[A-Z]+.*[^\w]+|[0-9]+.*[^\w]+.*[A-Z]+|[^\w]+.*[A-Z]+.*[0-9]+|[^\w]+.*[0-9]+.*[A-Z]+/), Validators.minLength(8)]]
    })

  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
   
    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      console.log('Remplissez les champs requis')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.apiService.createUser(this.ionicForm.value).subscribe((res) => {
        this.valider();
        console.log("SUCCES ===", res);
        if(res==false){
this.uniqueMail();

        }
      })

      this.isSubmitted = false;
    }

    this.ionicForm.reset();
  }

  async valider() {
    let toast = await this.toastController.create({

      message: 'Inscription effectuée avec succès',
      color: 'success',
      duration: 3000,
      position: 'middle',
      buttons: [{
        role: "cancel",
        icon: 'close'

      }]

    });
    toast.present();
  }

  async uniqueMail() {
    let toast = await this.toastController.create({

      message: 'Adresse mail déjà existante',
      color: 'danger',
      duration: 3000,
      position: 'middle',
      buttons: [{
        role: "cancel",
        icon: 'close'

      }]

    });
    toast.present();
  }

  async echec() {
    let toast = await this.toastController.create({

      message: 'Mot de passe ou identifiant invalide',
      color: 'danger',
      duration: 3000,
      position: 'middle',
      buttons: [{
        role: "cancel",
        icon: 'close'

      }]

    });
    toast.present();
  }


verifier(){
  this.isSubmitted = true;

  if (!this.ionicForm.valid) {
    console.log('Remplissez les champs requis')
    return false;
  } else {
    console.log(this.ionicForm.value)
    this.apiService.verif(this.ionicForm.value).subscribe((res) => {
      
      console.log("SUCCES ===", res);
      if (res==true) {
        // this.echec();
         this.router.navigateByUrl("/home");
      } else {
        this.echec();
        // this.router.navigateByUrl("/inscription");
      }

    })

    this.isSubmitted = false;
  }

  this.ionicForm.reset();

}



}

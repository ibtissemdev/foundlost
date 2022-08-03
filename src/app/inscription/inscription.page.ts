import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';


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

  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
  
      email_user: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]],
      password: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,20}$")]],
    })

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





}

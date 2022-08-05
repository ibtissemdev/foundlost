import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';
import { getCurrencySymbol } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  description: string;
  status: number;
  date: Date;
  location: string;
  firstname: string;
  lastname: string;
  email: string;
  ionicForm: FormGroup;
  isSubmitted = false;


  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController,private router: Router) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      status:['1'],
      description: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,20}$")]],
      date: [null, Validators.required],
      location: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      firstname: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      lastname: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
    })
    console.log(sessionStorage.getItem('email'))
if(!sessionStorage.getItem('email')) {

this.router.navigateByUrl("/inscription");
}
  }



  get errorControl() {
    return this.ionicForm.controls;
  }

  submitForm() {
   
    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.apiService.submitForm(this.ionicForm.value).subscribe((res) => {
        this.valider();
        console.log("SUCCES ===", res);
      })

      this.isSubmitted = false;
    }

    this.ionicForm.reset();
  }

  async valider() {
    let toast = await this.toastController.create({

      message: 'Objet ajouté dans la liste des objets trouvés',
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

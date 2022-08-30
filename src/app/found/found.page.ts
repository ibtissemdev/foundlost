import { Component, OnInit } from '@angular/core'; //import de bibliothèque de méthodes
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { ToastController } from '@ionic/angular';

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

//Injection de dépendances
  constructor(public apiService: UserService, public formBuilder: FormBuilder, public toastController: ToastController,private router: Router) { 

    if(!sessionStorage.getItem('email')) {

      this.router.navigateByUrl("/inscription");
      }
  }

  ngOnInit() {
    //this : l'objet que l'on manipule dans la classe où l'on est
    this.ionicForm = this.formBuilder.group({
      status:['1'],
      description: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,20}$")]],
      date: [null, Validators.required],
      location: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      firstname: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      lastname: ['', [Validators.required,  Validators.pattern("^[0-9a-zA-Z- éè']{3,10}$")]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')]]
    })
    // console.log(sessionStorage.getItem('email'))

  }



  get errorControl() {//Affiche les erreurs pour chaque input en vérifiant les conditions plus haut
    return this.ionicForm.controls;
  }

  submitForm() {
   
    this.isSubmitted = true;//une fois la méthode appélé on passe a true 

    if (!this.ionicForm.valid) {// Si le formulaire n'est pas valide
      console.log('Remplissez tous les champs requis !')
      return false;
    } else {
      console.log(this.ionicForm.value)
      //On envoie une promesse - objet observable /
      this.apiService.submitForm(this.ionicForm.value).subscribe((res) => {
        this.valider(); 
        // console.log("SUCCES ===", res);
      })

      this.isSubmitted = false; // On remet le flag à false car l'action est terminée
    }

    this.ionicForm.reset();// On réinitialise le formulaire
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
   console.log(toast.present()) ;
  }

}

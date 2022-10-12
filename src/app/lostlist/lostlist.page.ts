import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-lostlist',
  templateUrl: './lostlist.page.html',
  styleUrls: ['./lostlist.page.scss'],
})
export class LostlistPage implements OnInit {

  // Créer deux propriétés
  // URL du serveur backend
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php';
  // Un tableau
  entryData = [];

  // Récupérer le service par injection de dépendance

  constructor(public http : HttpClient,private router: Router,public toastController: ToastController ) { 
    this. getEntry()
    console.log(this.entryData)
  }

  ngOnInit() {
    console.log(sessionStorage.getItem('email'))
    if(!sessionStorage.getItem('email')) {
    
    this.router.navigateByUrl("/inscription");
    }


  }
   getEntry() {
    this.readAPI(this.bdUrl).subscribe((data) => {

    for (let i=0; i<Object.keys(data).length; i++) {
    
   this.entryData[i] = {
    "id": data[i].id_object,
    "status": data[i].status,
    "description": data[i].description,
    "date": data[i].date,
    "location": data[i].location,
    "firstname": data[i].firstname,
    "lastname": data[i].lastname,
    "email": data[i].email};
    
    } // fin boucle for

     }); // fin subscribe

     }


    readAPI(URL: string) {
     
    return this.http.get(URL);
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

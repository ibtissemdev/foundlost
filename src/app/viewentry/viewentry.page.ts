import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  // Créer deux propriétés
  // URL du serveur backend
  bdUrl = 'http://localhost/ionicserver/retrieve-data.php/?id=2';
  // Un tableau
  entryData = [];

  // Récupérer le service par injection de dépendance

  constructor(public http : HttpClient) { 
    this. getEntry()
    // console.log(this.entryData[2].id)
  }

  ngOnInit() {
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


}

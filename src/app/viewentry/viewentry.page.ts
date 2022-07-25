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
  // entryData = [];
 
  foundData = {
    id:'',
    status: 1,
    description: '',
    location: '',
    date: ''};
  // Récupérer le service par injection de dépendance

  constructor(public http : HttpClient) { 
    this. getEntry(this.foundData.id)
    //  console.log(this.entryData[1])
  }

  ngOnInit() {
  }
  getEntry(id) {
    this.readAPI(this.bdUrl).subscribe((data) => {


    
  
// console.log(data);
this.foundData.id = id;
this.foundData.status = data['status'];
this.foundData.description = data['description'];
this.foundData.location = data['location'];
this.foundData.date = data['date'];

     }); // fin subscribe

     }


    readAPI(URL: string) {

    return this.http.get(URL);
    }


}

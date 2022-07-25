import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {
  
  // Un tableau
  // entryData = [];
 
  viewData = {
    id:'',
    status: 1,
    description: '',
    location: '',
    date: ''};
  // Récupérer le service par injection de dépendance

  constructor(public http : HttpClient) { 
    this.getOneEntry()
    //  console.log(this.entryData[1])     
     
        
  }

  ngOnInit() {
  }
  getOneEntry() {
    var urlcourante = document.location.href; 
    var urlcourante = urlcourante.replace(/\/$/, "");
    // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
    var queue_url = urlcourante.substring (urlcourante.lastIndexOf( "/" )+1 );
     
      console.log(queue_url);
        // URL du serveur backend
    this.readAPI('http://localhost/ionicserver/retrieve-data.php/?id='+queue_url).subscribe((data) => {



// this.viewData.id = id;
this.viewData.status = data['status'];
this.viewData.description = data['description'];
this.viewData.location = data['location'];
this.viewData.date = data['date'];

     }); // fin subscribe

     }


    readAPI(URL: string) {

    return this.http.get(URL);
    }


}

import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserService } from '../api/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-viewentry',
  templateUrl: './viewentry.page.html',
  styleUrls: ['./viewentry.page.scss'],
})
export class ViewentryPage implements OnInit {

  // Un tableau
  // entryData = [];

  viewData = {
    id: '',
    status: '',
    description: '',
    location: '',
    date: ''
  };
  // Récupérer le service par injection de dépendance

  constructor(public http: HttpClient, public apiService: UserService, private router: Router) {
    this.getOneEntry()
    //  console.log(this.entryData[1])     


  }

  ngOnInit() {

    console.log(sessionStorage.getItem('email'))
    if(!sessionStorage.getItem('email')) {
    
    this.router.navigateByUrl("/inscription");
    }

  }
  getOneEntry() {
    var urlcourante = document.location.href;
    var urlcourante = urlcourante.replace(/\/$/, "");
    // Gardons dans la variable queue_url uniquement la portion derrière le dernier slash de urlcourante
    var queue_url = urlcourante.substring(urlcourante.lastIndexOf("/") + 1);

    console.log(queue_url);
    // URL du serveur backend
    this.readAPI('http://localhost/ionicserver/retrieve-data.php/?id=' + queue_url).subscribe((data) => {



      // this.viewData.id = id;
      this.viewData.status = data['status'];
      this.viewData.description = data['description'];
      this.viewData.location = data['location'];
      this.viewData.date = data['date'];
      this.viewData.id = data['id_object'];
    }); // fin subscribe

  }


  readAPI(URL: string) {

    return this.http.get(URL);
  }

  deleteObject(viewData: any) {


    this.apiService.delete(this.viewData.id).subscribe(res => {
      // this.getOneEntry();
      console.log(res)
    });
    this.router.navigateByUrl("/home");
  }
  updateObject(viewData: any) {


    this.apiService.update(this.viewData.id).subscribe(res => {
      // this.getOneEntry();
     
      console.log(res)
    });
    console.log(this.viewData.status)
      this.router.navigateByUrl("/home");
  }



}

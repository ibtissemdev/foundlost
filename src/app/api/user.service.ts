import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
// On définit une propriété de type HttpHeaders qui représente les options de configuration d’un entête d'une requête http (la requête vers le serveur)
 headers: HttpHeaders;
  // HttpClient représente une requête html. Le service est récupéré par injection de dépendance dans le constructeur
  constructor(public http: HttpClient) {
// On instancie le service
this.headers = new HttpHeaders();
// On définit les options de configuration et la CORS policy
this.headers.append('Accept', 'application/json');
this.headers.append('Content-Type', 'application/json');
this.headers.append('Access-Control-Allow-Origin', '*');
this.headers.append('Access-Control-Allow-Headers', 'Content-Type');

   }
// On définit la méthode qui envoie les données du formulaire au serveur backend.
 submitForm(data) {
 return this.http.post("http://localhost/ionicserver/manage-data.php?key=create", data);
 }
  
}
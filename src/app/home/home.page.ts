import { Component } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(private router: Router) {}
  ngOnInit() {
    console.log(sessionStorage.getItem('email'))
    if(!sessionStorage.getItem('email')) {
    
    this.router.navigateByUrl("/inscription");
    }

  }
  deconnecter() {
    sessionStorage.removeItem('email');
    this.router.navigateByUrl("/inscription");
  }
  

}

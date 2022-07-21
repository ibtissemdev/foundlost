import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';

@Component({
  selector: 'app-found',
  templateUrl: './found.page.html',
  styleUrls: ['./found.page.scss'],
})
export class FoundPage implements OnInit {
  description:string;
  status:number;
  date:Date;
  location:string;
  firstname:string;
  lastname:string;
  email:string;
  constructor(public apiService: UserService) { }

  ngOnInit() {
  }

  submitForm() {

    let data = {
      description:this.description,
      status:1,
      date:this.date,
      location:this.location,
      firstname:this.firstname,
      lastname:this.lastname,
      email: this.email

    }
    console.log(data)

    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
    })
  }

}

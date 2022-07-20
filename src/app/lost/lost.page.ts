import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';


@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
 description:string;
 statut:number;
 date:Date;
 location:string;
 firstname:string;
 lastname:string;
 email:string;

  constructor(public apiService: UserService) {

  }

  ngOnInit() {

  }

  submitForm() {
    let data = {
      description:this.description,
      status:0,
      date:"",
      location:"",
      firstname:"",
      lastname: "",
      email: ""

    }

    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
    })
  }

}

import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { NgForm} from '@angular/forms';

@Component({
  selector: 'app-lost',
  templateUrl: './lost.page.html',
  styleUrls: ['./lost.page.scss'],
})
export class LostPage implements OnInit {
 description:string;
 status:number;
 date:Date;
 location:string;
 firstname:string;
 lastname:string;
 email:string;


  constructor(public apiService: UserService) {

  }

  ngOnInit() {

  }

  submitForm(form:NgForm) {

console.log(this.description);
    let data = {
      description:this.description,
      status: 0,
      date:this.date,
      location:this.location,
      firstname:this.firstname,
      lastname:this.lastname,
      email: this.email,

    }

   console.log(data)

    this.apiService.submitForm(data).subscribe((res) => {
      console.log("SUCCES ===", res);
   
    })
  
  form.resetForm();
  }


}

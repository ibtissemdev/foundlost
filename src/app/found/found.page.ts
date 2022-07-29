import { Component, OnInit } from '@angular/core';
import { UserService } from '../api/user.service';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

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
  ionicForm: FormGroup;
  isSubmitted = false;


  constructor(public apiService: UserService, public formBuilder: FormBuilder) { }

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      description: ['', [Validators.required, Validators.minLength(2)]],
      date: [null,Validators.required],
      location: ['', [Validators.required, Validators.minLength(2)]],
      firstname:['', [Validators.required, Validators.minLength(2)]],
      lastname:['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,3}$')]]
   })

  }
  get errorControl() {
    return this.ionicForm.controls;
  }


//   getDate(e) {
//     let date = new Date(e.target.value).toISOString().substring(0, 10);
//     this.ionicForm.get('dob').setValue(date, {
//        onlyself: true
//     })
//  }


  submitForm() {
    //  console.log(this.ionicForm.value)
    // let data = {
    //   description:this.description,
    //   status:1,
    //   date:this.date,
    //   location:this.location,
    //   firstname:this.firstname,
    //   lastname:this.lastname,
    //   email: this.email

    // }
    // console.log(data)

    // this.apiService.submitForm(data).subscribe((res) => {
    //   console.log("SUCCES ===", res);
    // })
    this.isSubmitted = true;

    if (!this.ionicForm.valid) {
      console.log('Please provide all the required values!')
      return false;
    } else {
      console.log(this.ionicForm.value)
      this.apiService.submitForm(this.ionicForm.value).subscribe((res) => {
       console.log("SUCCES ===", res);})
       this.isSubmitted = false;
    }
  }
  

  }

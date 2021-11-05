import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { FormBuilder,FormGroup,Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  form!: FormGroup
  constructor(private router: Router,private formBuilder:FormBuilder,private http:HttpClient) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
  }

}
//   onSubmit();void{
//   this.http.post('https://allart.herokuapp.com/api/login', this.form.value).subscribe(()=>{
//     if(['success']){
//       this.router.navigate(['/home']);
//     }
//   })
// }
import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private snackBar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }
loginForm=this.fb.group({
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.required,Validators.minLength(6)]]
})
login(){
this.userService.loginUser(this.loginForm.value.email).then((res:any)=>{
  console.log(res);
  if(res.length == 0){
    this.snackBar.open("Account doesn't exist","ok")
  }else{
    if(res[0].password === this.loginForm.value.password){
      // this.snackBar.open("Login Successful",'ok');
      this.userService.user=res[0];
      localStorage.setItem('user',JSON.stringify(res[0]))
      this.router.navigate(['/home']);

    }else{
      this.snackBar.open("This password is incorrect",'ok')
    }
  }
}).catch((err)=>{
  console.log(err);
})
}
}

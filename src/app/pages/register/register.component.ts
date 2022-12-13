import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:UserService, private router:Router) { }

  ngOnInit(): void {
  }
registerForm=this.fb.group({
  email:['',[Validators.required, Validators.email]],
  password:['',[Validators.required, Validators.minLength(6)]],
  username:['',[Validators.required,Validators.maxLength(15)]]
});
create(){
  this.userService.createNewUser(this.registerForm.value).then((res:any)=>{
    console.log(res)
    this.userService.user=res;
    localStorage.setItem('user', JSON.stringify(res))
    this.router.navigate(['/login'])
  })
  
  .catch((err)=>{
    console.log(err);
  })
}
}

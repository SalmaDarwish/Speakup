import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.css']
})
export class TopBarComponent implements OnInit {
  isLogin=false

  constructor(private userService:UserService, private router:Router, private _activatedRoute:ActivatedRoute) {
    // if(this.userService.user==undefined){
    //   this.isLogin=false
    // }else{
    //   this.isLogin=true
    // }
   }
// loginOr(){
//   if(localStorage.getItem('user')){
//     this.isLogin=true
//   }else{
//     this.isLogin=false
//   }
// }
  ngOnInit(): void {
    // this.userService.user.subscribe({
    //   next:(res:any)=>{
    //     if(this.userService.user.getValue()){
    //       this.isLogin=true
    //     }else{
    //       this.isLogin=false
    //     }
    //   }
    // })
    // this.loginOr()
   
   
  }
  logOut()
  {
    this.userService.user=undefined;
    this.router.navigate(['/login'])
    localStorage.clear();
  }

}

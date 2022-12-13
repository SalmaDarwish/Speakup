import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _http:HttpClient) { }
user:any;
  public createNewUser(dataObj:any){
    return new Promise ((resolve, reject)=>{
      this._http.post('http://localhost:3000/user', dataObj).subscribe(
        (res)=>{  
          resolve(res);
        },
      
        (err)=> {
          reject(err)
        }
        
      );
    });
  }
  public loginUser(email:any){
    return new Promise((resolve, reject)=>{
      this._http.get('http://localhost:3000/user?email='+ email).subscribe(
        (res)=>{
          resolve(res);

        },
        (err)=>{
          reject(err);
        }
      )
    })
  }
  
}

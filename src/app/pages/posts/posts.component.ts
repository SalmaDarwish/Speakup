import { Component, OnInit } from '@angular/core';
import { AngularFireStorage, AngularFireStorageModule } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { finalize } from 'rxjs/operators';
import { PostService } from 'src/app/services/post.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit {
selectedFile:any;
text:string=""
posts:Array<any>=[];
commentText:Array<string>=[]
likes=[]
  constructor(public userService:UserService, private router:Router, private storage:AngularFireStorage, private _post:PostService, private snackBar:MatSnackBar) { }

  ngOnInit(): void {
    if(this.userService.user==undefined|| this.userService.user==null){
      let user=localStorage.getItem('user');
      if(user != null){
        this.userService.user=JSON.parse(user);
      }else{
        this.router.navigate(['/login']);

      }

    }
    this._post.getPosts().then((res:any)=>{
      this.posts=res;
      for(let post of this.posts){
        this.commentText.push("");
      }
    }).catch((err)=>{
      console.log(err)
    })
  }

  uploadImage(){
    return new Promise ((resolve, reject)=>{
      let n = Date.now();
      const file =this.selectedFile;
      const filePath=`images/${n}`
      const fileRef=this.storage.ref(filePath);
      const task=this.storage.upload(`images/${n}`,file);
      task.snapshotChanges().pipe(
        finalize(()=>{
          let imageURL=fileRef.getDownloadURL();
          imageURL.subscribe((url:any)=>{
            if(url){
              console.log(url);
              resolve(url)
            }
          });
        })
      ).subscribe((url)=>{
        if(url){
          console.log(url);
        }
      })

    })
  }
  onFileSelected(event:any){
    this.selectedFile=event.target.files[0];
  }
  post(){
  this.snackBar.open('Posting ...','',{duration:1000})
    if(this.selectedFile !=undefined || this.selectedFile != null){
      this.uploadImage().then((imageURL)=>{
        console.log(imageURL);
        let postObj={
          username:this.userService.user.username,
          text:this.text,
          imageURL:imageURL,
          likes:[],
          comments:[]
        };
        this.posts.push(postObj)
        this._post.saveNewPost(postObj).then((res)=>{
          this.snackBar.open('Posted Successfully','',{duration:1000})
        console.log(res);
        }).catch((err)=>{
          console.log(err)
        })
        this.selectedFile=undefined
      }).catch((err)=>{
        console.log(err);
      })
    }else{
      let postObj={
        username:this.userService.user.username,
        text:this.text,
        imageURL:"",
        likes:[],
        comments:[]
      };
      this.posts.push(postObj)
      this._post.saveNewPost(postObj).then((res)=>{
      console.log(res);
      this.snackBar.open('Posted Successfully','',{duration:1000})

      }).catch((err)=>{
        console.log(err)
      })
    }
    this.text=""
  }
  like(postId:any, likeIndex:any){
    for(let i =0;i<this.posts.length;i++){
      if(this.posts[i].id == postId){
        if(this.posts[i].likes.indexOf(this.userService.user.username)>=0){
          this.posts[i].likes.splice(this.posts[i].likes.indexOf(this.userService.user.username),1)
        }else{
           this.posts[i].likes.push(this.userService.user.username)

        }
        this._post.updateLikes(this.posts[i]).then((res)=>{
          console.log(res)
        }).catch((err)=>{
          console.log(err)
        })
      }

    }
  }
  comment(postId:any, commentIndex:any){
    for(let i =0;i<this.posts.length;i++){
      if(this.posts[i].id == postId){
      let commentObj={
        username:this.userService.user.username,
        comment:this.commentText[commentIndex]
      }
      this.posts[i].comments.push(commentObj);
      this._post.updateComments(this.posts[i]);
      this.commentText[commentIndex]=""
      }

    }

  }
  // delete(postId:any,index:any){
  //   for(let i =0;i<this.posts.length;i++){
  //     if(this.posts[i].id == postId){
  //       let postObj={
  //         username:this.userService.user.username,
  //         text:this.text,
  //         imageURL:""||undefined,
  //         likes:[],
  //         comments:[]
  //       };
  //       this.posts.splice(this.posts[i],1)
  //       this._post.updatePosts(this.posts)

  //     }

  //   }
  // }
  postSchema={
    username:'',
    imageURL:'',
    text:'',
    likes:[],
    comment:[{username:'',comment:''}]
  }

}

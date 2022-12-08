import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { LoginService } from 'src/app/services/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{


  loginData={
    username:'',
    password:''
  };

  constructor(private snack: MatSnackBar, private login: LoginService){

  }

  ngOnInit(): void {

  }

  formSubmit(){
    console.log("ogin button clicked");

    if(this.loginData.username.trim() == '' || this.loginData.username == null){
      this.snack.open("username is required !!",'ok',{duration:3000});
      return;
    }

    if(this.loginData.password.trim() == '' || this.loginData.password == null){
      this.snack.open("password is required !!",'ok',{duration:3000});
      return;
    }

    // requesting server for token generation

    this.login.generateToken(this.loginData).subscribe(
      (data:any) => {
        console.log("Success");
        console.log(data);

        // login 

        this.login.loginuser(data.token);
        this.login.getCurrentuser().subscribe(
          (user:any)=>{
            this.login.setUser(user);
            console.log(user);

            if(this.login.getUserRole()=="admin"){
              window.location.href='/admin'
              this.login.loginStatusSubject.next(true);
            }else if(this.login.getUserRole()=="NORMAL"){
              window.location.href='/user-dashboard'
              this.login.loginStatusSubject.next(true);
            }else{
              this.login.logout();
            }



          },
          (error)=>{
            console.log("error in login")
            this.snack.open("Invalid Details! Try again",'ok',{
              duration:3000,
            })
          }
        )

      },
      (error)=>{
        console.log("Error !!");
        console.log(error);

      }
    )

  }
  
}

import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  constructor(private userService: UserService, private snack: MatSnackBar){ }

  public user = {
    username: '',
    password: '',
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    profile: ''
  }
 
  formSubmit(){
    // alert("submit");
    console.log(this.user)
    if(this.user.username=='' || this.user.username==null){
      this.snack.open("username is required!",'ok', {duration:3000, verticalPosition:'top'})
      return;
    }
    // add user using userservice

    this.userService.addUser(this.user).subscribe(
      (data:any) => {
        console.log(data);
        // alert("success");
        Swal.fire('Success registered!!', 'User id :' + data.id,'success'); 
      },(error)=>{
        console.log(error);
        // alert("something went wrong");
        this.snack.open("something went wrong!! ",'ok',{duration:3000})
      }
    ) 

  }

}

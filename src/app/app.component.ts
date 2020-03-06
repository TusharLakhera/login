import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { FormBuilder } from '@angular/forms';
import { ForbiddenNameValidator } from './shared/user-name.validator';
import { PasswordValidator } from './shared/password.validator';
import { EnrollmentService } from './enrollment.service';
import { AuthService } from './auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  registrationForm: FormGroup;
  http: any;

  isLoading: boolean;
  isLoginMode: any;
  error: any;
 
  constructor(private fb: FormBuilder, private _registrationService: EnrollmentService,private authService: AuthService) { }
 
  ngOnInit() {
    this.registrationForm = this.fb.group({
      userName: ['', [Validators.required, Validators.minLength(3), ForbiddenNameValidator(/password/)]],
      password: ['',Validators.minLength(8)],
      confirmPassword: [''],
      email: ['', Validators.email],
       gender:['male', Validators.nullValidator],
       country:['India'],
      subscribe: [false],
     
      
    }, { validator: PasswordValidator });

    
  }

  get userName() {
    return this.registrationForm.get('userName');
  }

  get email() {
    return this.registrationForm.get('email');
  }
   get gender(){
   return this.registrationForm.get('gender');

   }
   get country()
   {
    return this.registrationForm.get('country');
   }
 loadAPIData() {
 

    this.registrationForm.patchValue({
      userName: 'Bruce',
      password: 'test',
      confirmPassword: 'test',
      gender: 'male',
      country: 'India'
    });
  }

  onSubmit() {
    if (!this.registrationForm.valid) {
      return;
    }
    const email = this.registrationForm.value.email;
    const password = this.registrationForm.value.password;

    this.isLoading = true;
    if (this.isLoginMode) {
      // ...
    } else {
      this.authService.signup(email, password).subscribe(
        resData => {
          console.log(resData);
          this.isLoading = false;
        },
        errorMessage => {
          console.log(errorMessage);
          this.error = errorMessage;
          this.isLoading = false;
        }
      );
    }

    // this.registrationForm.reset();
  


    console.log(this.registrationForm.value);
   
    this._registrationService.register(this.registrationForm.value)
      .subscribe(
        response => console.log('Success!', response),
        error => console.error('Error!', error)
      );
      this.registrationForm.reset()
  }

}
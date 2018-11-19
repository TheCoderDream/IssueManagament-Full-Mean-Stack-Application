import {Component, OnInit} from "@angular/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{

  singUpForm: FormGroup;

  constructor(
    private authService: AuthService,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.singUpForm = this.fb.group(
      {
        name: ['', Validators.required],
        email: ['', Validators.required],
        password: ['', Validators.required]
      }
    )
  }

  onSignIn() {
    this.authService.signUp(this.singUpForm.value)
      .subscribe(res => {
        console.log(res);
      })
  }
}

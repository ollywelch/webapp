import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  hide = true;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm): void {
    if (form.invalid){
      return;
    }
    this.authService.createUser(
      form.value.username,form.value.email,form.value.password
      ).subscribe();  
  }

}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  username: string = '';
  email: string = '';
  password: string = '';
  confirmPassword: string = '';
  registrationSuccess: boolean = false;

  constructor(private authService: AuthService,
              private router: Router
  ) {}

  onRegister() {
    this.registrationSuccess = false;

    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const userData = {
      username: this.username,
      email: this.email,
      password: this.password
    };

    this.authService.register(userData).subscribe({
      next: res => {
        console.log('Registered successfully');
        this.registrationSuccess = true;
        return this.router.navigate(['/login'])
      },
      
    
      error: err => {
        console.error('Registration failed', err);
        alert('Registration failed. Please try again.');
      }
    });
  }
}

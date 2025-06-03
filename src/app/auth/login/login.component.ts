import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  loginSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  onLogin() {
    if (this.password !== this.confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    const credentials = {
      username: this.username,
      password: this.password
    };

    this.authService.login(credentials).subscribe({
      next: res => {
        console.log('Login successful!');
        this.loginSuccess = true;

        // Delay optional: to show success message briefly
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 3000); // Redirect after 1 second
      },
      error: err => {
        console.error('Login failed', err);
        alert('Login failed. Please check your credentials.');
      }
    });
  }
}

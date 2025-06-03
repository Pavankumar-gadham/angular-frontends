import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  cartCount: number = 0;
  

constructor(private cartService: CartService,
  private router: Router, public authService: AuthService
    
  ) {}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']); 
  }

  ngOnInit(): void {
    this.cartService.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }

}

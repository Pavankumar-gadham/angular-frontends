import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{

  // cartCount: number = 0;
  searchTerm: string = '';

  constructor(private cartService: CartService,
     private router: Router
  ) {}


  ngOnInit(): void {
    
  }

  onSearch() {
    if (this.searchTerm.trim()) {
      this.router.navigate(['/search'], {
        queryParams: { query: this.searchTerm },
      });
    }
  }

}

// cart.component.ts
import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  getSubtotal(): number {
  return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
}


  removeItem(item: any) {
    this.cartService.removeItem(item);
    this.cartItems = this.cartService.getItems();
  }

  increaseQuantity(item: any) {
    this.cartService.increaseQuantity(item);
    this.cartItems = this.cartService.getItems();
  }

  decreaseQuantity(item: any) {
    this.cartService.decreaseQuantity(item);
    this.cartItems = this.cartService.getItems();
  }
}

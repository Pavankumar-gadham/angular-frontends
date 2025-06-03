// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable();

  constructor() {
    // Load items from localStorage on service initialization
    const savedCart = localStorage.getItem('cartItems');
    this.cartItems = savedCart ? JSON.parse(savedCart) : [];
    this.cartCount.next(this.getItemCount());
  }

  private updateCart(items: any[]) {
    this.cartItems = items;
    this.saveCart();
    this.cartCount.next(this.getItemCount()); // Emit new count
  }

  getItems() {
    return this.cartItems;
  }

  addToCart(item: any) {
    const existingItem = this.cartItems.find(i => i.id === item.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ ...item, quantity: 1 });
    }
    this.saveCart();
    this.cartCount.next(this.getItemCount());
  }


  removeItem(item: any) {
    this.cartItems = this.cartItems.filter(i => i.id !== item.id);
    this.saveCart();
  }

  clearCart() {
    this.cartItems = [];
    this.saveCart();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  getItemCount(): number {
    return this.cartItems.reduce((count, item) => count + item.quantity, 0);
  }

  private saveCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  increaseQuantity(item: any) {
  const found = this.cartItems.find(i => i.id === item.id);
  if (found) {
    found.quantity++;
    this.saveCart();
  }
}

decreaseQuantity(item: any) {
  const found = this.cartItems.find(i => i.id === item.id);
  if (found && found.quantity > 1) {
    found.quantity--;
    this.saveCart();
  }
}

}

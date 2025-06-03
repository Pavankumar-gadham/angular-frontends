import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { OrderService } from 'src/app/services/order.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  deliveryCharge: number = 50;
  selectedPayment: string = 'COD';

  deliveryAddress: string = '';  
  cardHolderName: string = '';
  cardNumber: string = '';
  expiry: string = '';
  cvv: string = '';
  selectedBank: string = '';

  constructor(private cartService: CartService, 
    private orderService: OrderService,
    private router: Router) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getItems();
  }

  getSubtotal(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  placeOrder() {
    if (!this.deliveryAddress.trim()) {
      alert('Please enter your delivery address.');
      return;
    }

    if (!this.selectedPayment) {
      alert('Please select a payment method!');
      return;
    }

    if ((this.selectedPayment === 'Debit Card' || this.selectedPayment === 'Credit Card') &&
        (!this.cardHolderName || !this.cardNumber || !this.expiry || !this.cvv)) {
      alert('Please fill in all card details.');
      return;
    }

    if (this.selectedPayment === 'Net Banking' && !this.selectedBank) {
      alert('Please select a bank.');
      return;
    }

        const orderPayload = {
          address: this.deliveryAddress,
          item_data: this.cartItems.map(item => ({
          item: item.id,
          quantity: item.quantity
        
      }))
      
    };
    console.log(orderPayload);


    this.orderService.placeOrder(orderPayload).subscribe({
      next: (response: any) => {
        console.log('Order placed successfully', response);
        alert(`Order placed successfully using ${this.selectedPayment}!`);
        this.cartService.clearCart();
        this.cartItems = [];

        this.deliveryAddress = '';
        this.cardHolderName = '';
        this.cardNumber = '';
        this.expiry = '';
        this.cvv = '';
        this.selectedBank = '';
        this.selectedPayment = 'COD';
        return this.router.navigate(['/my-orders'])
      },
      error: (error: any) => {
        console.error('Failed to place order', error);
        alert('Failed to place order. Please try again.');
      }
    });
  }
}

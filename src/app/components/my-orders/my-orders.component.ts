import { Component, OnInit } from '@angular/core';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private orderService: OrderService) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe({
      next: (data: any) => {
        this.orders = data;
      },
      error: (error: any) => {
        console.error('Failed to fetch orders', error);
      }
    });
  }

  getOrderTotal(order: any): number {
    return order.items.reduce((sum: number, item: any) => {
      return sum + (item.item.price * item.quantity);
    }, 0);
  }

  getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case 'pending':
      return '#f0ad4e'; // orange
    case 'confirmed':
      return '#0275d8'; // blue
    case 'delivered':
      return '#5cb85c'; // green
    case 'cancelled':
      return '#d9534f'; // red
    default:
      return '#999'; // gray
  }
}

}



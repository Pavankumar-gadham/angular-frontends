import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';
import { MenuService } from 'src/app/services/menu.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  menuItems: any[] = [];
  successMessage = '';


  constructor(private route: ActivatedRoute, private menuService: MenuService, private cartService: CartService) {}

    ngOnInit(): void {
    const restaurantId = this.route.snapshot.paramMap.get('id');
    
    if (restaurantId) {
      this.menuService.getMenusByRestaurantId(+restaurantId).subscribe(data => {
        this.menuItems = data;
      });
    } else {
      // Fetch all menu items
      this.menuService.getAllMenus().subscribe(data => {
        this.menuItems = data;
      });
    }
  }

  addToCart(item: any) {
  this.cartService.addToCart(item);
  this.successMessage = '✅ Item added to cart successfully!';

  setTimeout(() => {
    this.successMessage = '';
  }, 2000);

  }

}

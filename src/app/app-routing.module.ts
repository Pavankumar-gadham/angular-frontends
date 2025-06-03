import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { RestaurantListComponent } from './components/restaurant-list/restaurant-list.component';
import { CartComponent } from './components/cart/cart.component';
import { MyOrdersComponent } from './components/my-orders/my-orders.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { SearchComponent } from './components/search/search.component';
import { AboutusComponent } from './components/aboutus/aboutus.component';
import { FooterComponent } from './components/footer/footer.component';
import { authGuard } from './auth.guard';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'restaurants-list', component: RestaurantListComponent },
  { path: 'restaurants-list/:id/menus', component: MenuComponent },
  { path: 'cart', component: CartComponent, canActivate: [authGuard], },
  { path: 'checkout', component: CheckoutComponent },
  { path: 'my-orders', component: MyOrdersComponent, canActivate: [authGuard], },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'search', component: SearchComponent },
  { path: 'aboutus', component: AboutusComponent },
  { path: 'footer', component: FooterComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' }
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

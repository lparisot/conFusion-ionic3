import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
import { DishProvider } from '../../providers/dish/dish';
import { DishdetailPage } from '../dishdetail/dishdetail';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the MenuPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html',
})
export class MenuPage implements OnInit {
  dishes: Dish[];
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    private dishService: DishProvider,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private baseURL) { }

  ngOnInit() {
    this.dishService
      .getDishes()
      .subscribe(dishes => this.dishes = dishes,
                 errmess => this.errMess = <any>errmess);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MenuPage');
  }

  dishSelected(event, dish) {
    this.navCtrl.push(DishdetailPage, { dish: dish });
  }

  addToFavorites(dish: Dish) {
    if (!this.favoriteService.isFavorite(dish.id)) {
      console.log('Adding to favorites', dish.id);
      if (this.favoriteService.addFavorite(dish)) {
        this.toastController
          .create({
            message: 'Dish ' + dish.name + ' added as a favorite successfully',
            duration: 3000})
          .present();
      }
    }
  }
}

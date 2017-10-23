import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding } from 'ionic-angular';

import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';

/**
 * Generated class for the FavoritesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-favorites',
  templateUrl: 'favorites.html',
})

export class FavoritesPage implements OnInit {
  favorites: Dish[];
  errMess: string;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private baseURL) { }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    this.favoriteService
      .getFavorites()
      .subscribe(favorites => this.favorites = favorites,
                 errmess => this.errMess = errmess);
  }

  deleteFavorite(item: ItemSliding, id: number) {
    console.log('delete', id);
    this.favoriteService
      .deleteFavorite(id)
      .subscribe(favorites => this.favorites = favorites,
                 errmess => this.errMess = errmess);
    item.close();
  }
}

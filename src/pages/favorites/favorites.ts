import { Component, OnInit, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ItemSliding,
         ToastController, LoadingController, AlertController } from 'ionic-angular';

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
    private toastController: ToastController,
    private loadingController: LoadingController,
    private alertController: AlertController,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private baseURL) { }

  ionViewDidLoad() {
    console.log('inViewDidLoad FavoritesPage');
  }

  ngOnInit() {
    this.favoriteService
      .getFavorites()
      .subscribe(favorites => this.favorites = favorites,
                 errmess => this.errMess = errmess);
  }

  deleteFavorite(item: ItemSliding, dish: Dish) {
    console.log('delete', dish.id);

    let alert = this.alertController.create({
      title: 'Confirm Delete',
      message: 'Do you want to delete favorite dish ' + dish.name,
      buttons: [
        {
          text: 'Cancel',
          role: 'Cancel',
          handler: () => {
            console.log('Delete cancelled');
          }
        },
        {
          text: 'Delete',
          handler: () => {
            let loading = this.loadingController.create({
              content: 'Deleting ...'
            });
            let toast = this.toastController
              .create({message: 'Dish ' + dish.name + ' deleted successfully', duration: 3000});

            loading.present();
            this.favoriteService
              .deleteFavorite(dish.id)
              .subscribe(favorites => {
                            this.favorites = favorites;
                            loading.dismiss();
                            toast.present();
                         },
                         errmess => {
                            this.errMess = errmess;
                            loading.dismiss();
                         });
          }
        }
      ]
    });

    alert.present();

    item.close();
  }
}

import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams,
         ToastController, Platform, ActionSheetController } from 'ionic-angular';

import { Dish } from '../../shared/dish';
//import { Comment } from '../../shared/comment';
import { FavoriteProvider } from '../../providers/favorite/favorite';

/**
 * Generated class for the DishdetailPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})

export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public toastController: ToastController,
    public platform: Platform,
    public actionSheetController: ActionSheetController,
    private favoriteService: FavoriteProvider,
    @Inject('BaseURL') private baseURL) {

    this.dish = navParams.get('dish');
    this.numcomments = this.dish.comments.length;
    let total = 0;
    this.dish.comments.forEach(comment => total += comment.rating );
    this.avgstars = (total/this.numcomments).toFixed(2);
    this.favorite = this.favoriteService.isFavorite(this.dish.id);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    if (!this.favorite) {
      console.log('Adding to favorites ', this.dish.id);
      this.favorite = this.favoriteService.addFavorite(this.dish.id);
      if (this.favorite) {
        this.toastController
          .create({
            message: 'Dish ' + this.dish.name + ' added as a favorite successfully',
            position: 'middle',
            duration: 3000})
          .present();
      }
    }
  }

  openActionSheet() {
    let actionSheet = this.actionSheetController.create({
      title: 'Select Actions',
      buttons: [
          {
            text: 'Add to Favorites',
            icon: !this.platform.is('ios') ? 'heart-outline' : null,
            handler: () => {
              this.addToFavorites();
            }
          },
          {
            text: 'Add a Comment',
            icon: !this.platform.is('ios') ? 'paper' : null,
            handler: () => {

            }
          },
          {
            text: 'Cancel',
            role: 'cancel',
            icon: !this.platform.is('ios') ? 'close' : null
          }
      ]
    });

    actionSheet.present();
  }
}

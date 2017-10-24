import { Component } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { Comment } from '../../shared/comment';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {
  comment: FormGroup;
  range = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public viewController: ViewController,
    private formBuilder: FormBuilder) {

      this.comment = this.formBuilder.group({
        rating: [3, Validators.required],
        author: ['', Validators.required],
        comment: ['', Validators.required]
      });
      this.range = {
        min: 1,
        max: 5,
        value: 5,
        step: 1,
        pin: true,
        snaps: true
      };
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewController.dismiss();
  }

  onSubmit() {
    console.log(this.comment.value);

    let newComment: Comment = this.comment.value;
    newComment.date = new Date().toISOString();

    this.viewController.dismiss(newComment);
  }
}

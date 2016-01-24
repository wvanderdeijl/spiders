import { Modal, NavController, NavParams, Page } from 'ionic-framework/ionic';
import { Spider } from '../types';
import SpiderEditPage from './spider-edit.page';
import JpgDataUriPipe from '../pipes/jpg-data-uri.pipe';

@Page({
    templateUrl: 'build/pages/spider-detail.page.html',
    pipes: [JpgDataUriPipe]
})
export default class SpiderDetailPage {

    public model: Spider = <any>{};

    constructor(
        private _nav: NavController,
        _params: NavParams
    ) {
        console.log('SpiderDetailPage constructor');
        this.model = _params.get('data');
    }

    editSpider() {
        let modal = Modal.create(SpiderEditPage, { data: this.model });
        this._nav.present(modal);
    }

}

import { Modal, NavController, Page } from 'ionic-framework/ionic';
import { Spider } from '../types';
import SpiderDetailPage from './spider-detail.page.ts';
import SpiderEditPage from './spider-edit.page.ts';
import SpiderStorageService from '../services/spider-storage.service';

@Page({ templateUrl: 'build/pages/spider-list.page.html' })
export default class SpiderListPage {

    public model: Spider[];

    constructor(
        private _nav: NavController,
        private _storage: SpiderStorageService
    ) { }

    onPageLoaded() {
        return this._storage.get().then(spiders => this.model = spiders);
    }

    gotoAddSpider() {
        let modal = Modal.create(SpiderEditPage);
        this._nav.present(modal);
    }

    imgurl(spider: Spider) {
        return spider.img && `data:image/jpeg;base64,${spider.img}`;
    }

    gotoDetails(spider: Spider) {
        this._nav.push(SpiderDetailPage, { data: spider }, {}, undefined);
    }

}

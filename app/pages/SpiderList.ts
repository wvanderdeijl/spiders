import { Modal, NavController, Page } from 'ionic-framework/ionic';
import { Spider } from '../types';
import SpiderDetailPage from './SpiderDetail.ts';
import SpiderStorageService from '../services/SpiderStorageService';

@Page({ templateUrl: 'build/pages/SpiderList.html' })
export default class SpiderListPage {

    public model: Spider[];

    constructor(
        private nav: NavController,
        private storage: SpiderStorageService
    ) { }

    onPageLoaded() {
        this.storage.data$.subscribe(spiders => this.model = spiders);
    }

    gotoAddSpider() {
        let modal = Modal.create(SpiderDetailPage, { mode: 'create' });
        // modal.onDismiss(data => {
        //     if (data) {
        //         this.excludeTracks = data;
        //         this.updateSchedule();
        //     }
        // });
        this.nav.present(modal);
    }

    imgurl(spider: Spider) {
        return spider.img && `data:image/jpeg;base64,${spider.img}`;
    }

    gotoDetails(spider: Spider) {
        this.nav.push(SpiderDetailPage, { mode: 'view', data: spider }, {}, undefined);
    }

}

import { Modal, NavController, Page } from 'ionic-framework/ionic';
import { Spider } from '../types';
import SpiderDetailPage from './spider-detail.page.ts';
import SpiderEditPage from './spider-edit.page.ts';
import SpiderStorageService from '../services/spider-storage.service';

@Page({ templateUrl: 'build/pages/spider-list.page.html' })
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
        let modal = Modal.create(SpiderEditPage);
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
        this.nav.push(SpiderDetailPage, { data: spider }, {}, undefined);
    }

}

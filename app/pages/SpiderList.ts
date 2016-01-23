import { Page, NavController } from 'ionic-framework/ionic';
import { Spider } from '../types';
import AddSpiderPage from './SpiderAdd.ts';
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

    addSpiderTapped() {
        this.nav.push(AddSpiderPage, {}, {}, undefined);
    }

    imgurl(spider: Spider) {
        return spider.img && `data:image/jpeg;base64,${spider.img}`;
    }

}

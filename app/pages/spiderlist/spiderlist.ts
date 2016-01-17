import { Page, NavController } from 'ionic-framework/ionic';
import { AddSpiderPage } from '../addspider/addspider.ts';

@Page({ templateUrl: 'build/pages/spiderlist/spiderlist.html' })
export class SpiderListPage {

    constructor(private nav: NavController) { }

    addSpiderTapped(event) {
        this.nav.push(AddSpiderPage, {}, {}, undefined);
    }

}

/// <reference path='../typings/tsd.d.ts'/>
import { App, Platform, Config } from 'ionic-framework/ionic';
import { TabsPage } from './pages/tabs/tabs';
import { SpiderListPage } from './pages/spiderlist/spiderlist';

@App({
    template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
    // Check out the config API docs for more info
    // http://ionicframework.com/docs/v2/api/config/Config/
    config: {}
})
export class MyApp {

    public root = SpiderListPage;

    constructor(platform: Platform) {
        platform.ready().then(() => {
            // Do any necessary cordova or native calls here now that the platform is ready
        });
    }
}

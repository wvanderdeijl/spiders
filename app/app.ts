/// <reference path='../typings/tsd.d.ts'/>
import { App, Platform, Config } from 'ionic-framework/ionic';
import SpiderListPage from './pages/spider-list.page';
import CameraService from './services/camera.service';
import SpiderStorageService from './services/spider-storage.service';
import SpeciesStorageService from './services/species-storage.service';

@App({
    template: '<ion-nav id="nav" [root]="root" #content></ion-nav>',
    providers: [CameraService, SpiderStorageService, SpeciesStorageService],
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

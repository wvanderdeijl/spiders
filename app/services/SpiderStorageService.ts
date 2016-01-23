import { Platform } from 'ionic-framework/ionic';
import { Injectable } from 'angular2/core';
import StorageService from './StorageService';

declare let resolveLocalFileSystemURL: any;

@Injectable()
export default class SpiderStorageService extends StorageService<Spider> {

    constructor(platform: Platform) {
        super('spiders.json', platform);
    }

    defaultValue(): Spider[] {
        return [];
    }

}

export class Spider {
    name: string;
    genus: string;
    species: string;
    img: string;
}

import { Platform } from 'ionic-framework/ionic';
import { Injectable } from 'angular2/core';
import { Spider } from '../types';
import StorageService from './storage.service';

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



import { Platform } from 'ionic-framework/ionic';
import { Injectable } from 'angular2/core';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
require('rxjs/add/operator/share');

declare let resolveLocalFileSystemURL: any;

abstract class StorageService<T> {

    // TODO: isn't this a BehaviorSubject ??
    public data$: Observable<T[]>;
    private _data: T[];
    private _subscriber: Subscriber<T[]>;

    constructor(private filename: string, private platform: Platform) {
        this.data$ = new Observable<T[]>((subscriber: Subscriber<T[]>) => {
            this._subscriber = subscriber;
            return () => { console.log('StorageService observable disposed'); };
        }).share();
    }

    add(element: T) {
        this._data.push(element);
        this._subscriber.next(this._data);
        this.persist();
    }

    abstract defaultValue(): T[];

    public read() {
        this.findFile()
            .then((entry: any) => new Promise((resolve, reject) => entry.file(resolve, reject)))
            .then((file: any) => new Promise((resolve, reject) => {
                let reader = new FileReader();
                reader.onload = resolve;
                reader.onerror = reject;
                reader.readAsText(file);
            }))
            .then((event: any) => {
                let txt = event.target.result;
                this._data = txt && JSON.parse(txt) || this.defaultValue().slice();
                // console.log('data read', JSON.stringify(this._data));
                this._subscriber.next(this._data);
            })
            // TODO: better error handling
            .catch((err: any) => { console.log('promise error', err); });
    }

    private persist() {
        this.findFile()
            .then((entry: any) => new Promise((resolve, reject) => entry.createWriter(resolve, reject)))
            .then((writer: any) => new Promise((resolve, reject) => {
                writer.onwrite = resolve;
                writer.onerror = reject;
                console.log('persisting data', JSON.stringify(this._data));
                writer.write(JSON.stringify(this._data));
            }))
            // TODO: better error handling
            .catch((err: any) => { console.log('promise error', err); });
    }

    private findFile() {
        return this.platform.ready()
            .then(() => new Promise((resolve, reject) => { resolveLocalFileSystemURL(cordova.file.syncedDataDirectory, resolve, reject); }))
            .then((entry: any) => new Promise((resolve, reject) => entry.getFile(this.filename, { create: true }, resolve, reject)));
    }

}

export default StorageService;

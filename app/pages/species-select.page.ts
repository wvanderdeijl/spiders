import { ItemSliding, NavController, NavParams, Page } from 'ionic-framework/ionic';
import { Genus, Species, Spider } from '../types';
import SpeciesStorageService from '../services/species-storage.service';
import FilterSpeciesPipe from '../pipes/species-filter.pipe';

@Page({
    templateUrl: 'build/pages/species-select.page.html',
    pipes: [FilterSpeciesPipe]
})
export default class SpeciesSelectPage {

    public model: Species[];
    public queryText = '';

    // TODO: modal output parameter
    private _spider: Spider; // input param where we need to set genus/species on

    constructor(
        private _nav: NavController,
        private _storage: SpeciesStorageService,
        _params: NavParams
    ) {
        this._spider = _params.get('spider');
    }

    onPageLoaded() {
        console.log('SpeciesSelect page loaded');
        return this._storage.get().then(species => this.model = species);
    }

    selectSpecies(genus: Genus, species: string) {
        this._spider.genus = genus.name;
        this._spider.species = species;
        this._nav.pop();
    }

    deleteSpecies(slidingItem: ItemSliding, genus: Genus, species: string) {
        slidingItem.close();
        return this._storage.get()
            .then(store => {
                for (let idx = 0; idx < store.length; idx++) {
                    if (store[idx].genus === genus.name && store[idx].name === species) {
                        return this._storage.remove(idx);
                    }
                }
                return Promise.reject('species not found');
            })
            .then(() => this._storage.get())
            // FIXME: without cloning the array, angular doesn't detect changes
            // with cloning, an exception is thrown (sometimes)
            .then(s => this.model = s.slice());
    }

    addSpecies() {
        throw new Error('not yet implemented');
    }

}

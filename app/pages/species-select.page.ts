import { ItemSliding, NavController, NavParams, Page } from 'ionic-framework/ionic';
import { Spider, Species } from '../types';
import SpeciesStorageService from '../services/species-storage.service';


@Page({ templateUrl: 'build/pages/species-select.page.html' })
export default class SpeciesSelectPage {

    public model: Genus[];
    public queryText = '';

    private _alldata: Species[];
    private _spider: Spider;

    constructor(
        private _nav: NavController,
        private _storage: SpeciesStorageService,
        _params: NavParams
    ) {
        this._spider = _params.get('spider');
    }

    onPageLoaded() {
        console.log('SpeciesSelect page loaded');
        this._storage.data$.subscribe(species => {
            this._alldata = species;
            this.search();
        });
    }

    selectSpecies(genus: Genus, species: string) {
        this._spider.genus = genus.name;
        this._spider.species = species;
        this._nav.pop();
    }

    deleteSpecies(slidingItem: ItemSliding, genus: Genus, species: string) {
        slidingItem.close();
        this._storage.data$.subscribe(store => {
            store.forEach((s, idx) => {
                if (s.genus === genus.name && s.name === species) {
                    this._storage.remove(idx);
                }
            });
        }).unsubscribe();
    }

    search() {
        this.model = this._alldata
            .filter(s => !this.queryText ||
                s.genus.toLowerCase().indexOf(this.queryText.toLowerCase()) !== -1 ||
                s.name.toLowerCase().indexOf(this.queryText.toLowerCase()) !== -1)
            .reduce((g, s) => {
                if (g.length === 0 || g.slice(-1)[0].name !== s.genus) {
                    g.push({ name: s.genus, species: [s.name] });
                } else {
                    g.slice(-1)[0].species.push(s.name);
                }
                return g;
            }, <Genus[]>[]);
    }

    addSpecies() {
        throw new Error('not yet implemented');
    }

}

// grouped species as we expose them to the view
interface Genus {
    name: string;
    species: string[];
}

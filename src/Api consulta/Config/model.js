import loadFile from "../csvFileLoader/parser.js";

export default async function createModel () {
    const results = await loadFile();

    return new Model(results);
}

class Model {
    constructor(results){
        this.results = results;
    }

    normalizer(string) {
        return string.normalize('NFD').replace(/[\u0300-\u036f]/g, "");
    }

    paramsHandler = (param) => {
        if(/[^A-Z0-9 ]/gi.test(param)){
            return true;
        }
        return false;
    }
    
    ggremParamHandler = (param) => {
        if(/[^0-9]/gi.test(param) || param.length != 15){
            return true
        }
        return false
    }

    eanParamHandler = (param) => {
        if(/[^0-9]/gi.test(param) || param.length != 13){
            return true;
        }
        return false;
    }
    

    async searchSubs(subs) {
        const regex = new RegExp(subs,"gi");

        let result = this.results.filter(e => this.normalizer(e.substancia).search(regex) >= 0);
        
        return result;
    }

    async searchName(name) {
        const regex = new RegExp(name, "gi");

        let result = this.results.filter(e => this.normalizer(e.produto).search(regex) >= 0);

        return result;
    }

    async searchGgrem(ggrem) {;
        let result = this.results.filter(e => e.codigo_ggrem == ggrem)

        return result;
    }

    async searchEan(ean) {
        let result = this.results.filter(e => (e.ean_1 == ean || e.ean_2 == ean || e.ean_3 == ean));

        return result;
    }

}
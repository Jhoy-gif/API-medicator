import fs from 'fs';
import csv from "csv-parser"

let headers = ['substancia', 'cnpj', 'laboratorio', 'codigo_ggrem', 'registro', 'ean_1', 'ean_2', 'ean_3', 'produto', 'apresentacao', 'classe_terapeutica',
'tipo_produto', 'regime_preco', 'pf_sem_imposto', 'pf_0', 'pf_12', 'pf_17', 'pf_17_alc', 'pf_17_5', 'pf_17_5_alc', 'pf_18','pf_18_alc','pf_20','pmc_0','pmc_12','pmc_17','pmc_17_alc','pmc_17_5','pmc_17_5_alc','pmc_18','pmc_18_alc','pmc_20',
'restricao_hospitalar','cap','confaz_87','icms_0','analise_recursal','concessao_tributario','comercializacao_2019','tarja']

export default function loadFile() {

    const result = [];

    return new Promise ((res,rej) => {
        fs.createReadStream('./csvFileLoader/medicamentos_teste.csv')
            .pipe(csv({separator: ',', headers: headers, skipLines: 1}))
            .on('data', (data) => (result.push(data)))
            .on('end', () => { res(result) });
    })

}


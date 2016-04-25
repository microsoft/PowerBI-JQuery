import * as pbi from 'powerbi-client';

interface JQuery {
    powerbi(options: pbi.IEmbedOptions): JQuery;
}
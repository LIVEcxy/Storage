
'use strict'

import Util from '../util/util';

export default class Cookie extends Util {

    constructor() {

        if(!window) return console.warn('not window');

        super('session');
        console.log(`cookie init, Version:${this.Version} Autor:${this.Autor}`);

    }

}
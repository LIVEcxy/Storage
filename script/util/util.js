'use strict'

export default class util {

    Autor   = 'liusm';
    Version = '1.0.0'

    constructor(sign){
        console.log(`util Version:${this.Version}`);
    }

    getType(value = undefined) {

        const types = Object.prototype.toString.call(value);

        if (types) return types.slice(8, -1);
        throw `unknown type: ${types}, value:${value}`;

    }

    checkParmas(params){
        if(params.length < 2){
            console.warn('key and value is not defined',params)
            return false
        }

        console.log('log-38',params[0],this.getType(params[0]))

        if(this.getType(params[0]) !== 'String'){
            console.warn('key is not String ',params[0])
            return false
        }

        if(this.getType(params[0]) === 'Undefined' || this.getType(params[1]) === 'Undefined'){
            console.warn('key or value is Undefined',params)
            return false
        }

        return true
    }
}
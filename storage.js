'use strict'

const _private = Symbol('private');
const _getType = Symbol('getType');
const _checkParams = Symbol('checkParams');

export default class Storage {

    Autor   = 'liusm';
    Version = '1.0.1';

    constructor() {
        if(!window) return console.warn('not window')
    }

    [_getType](value = undefined) {

        if (typeof value !== `object`) {
            return typeof value;
        } else {
            const types = Object.prototype.toString.call(value);

            if (types) return types.slice(8, -1);
            throw `unknown type: ${types}, value:${value}`;
        }

    }

    [_checkParams](value) {

        if(value.length < 2){
            console.warn('key and value  is not defined')
            return false
        }

        if(this[_getType](value[0]) !== 'String'){
            console.warn('key is not String')
            return false
        }

        return true

    }

    modify(object, modifyKey, key, value, type) {

        if(this[_getType](object) !== 'Object' && this[_getType](object) !== 'Array') {
            throw "modify's item not object or Array";
        }else{
            object[key] = value;
        }

        switch(type) {
            case 'l':
                this.setLocal(modifyKey, object)
            break;
            case 's':
                this.setSession(modifyKey, object)
            break;
        }

    }

    setLocal(key, value, option) {
        const that = this;

        if(!this[_checkParams](option)) return 'parmas Error'

        if(option[2] && option[2].sync === true){

            return new Promise((resolve, reject) => {
                localStorage.setItem(option[0], JSON.stringify(option[1]));

                if(that.getSession(option[0])){
                    resolve(that.getSession(option[0]))
                }else{
                    reject(`${option[0]} set Error`)
                }
            })

        }else{
            return localStorage.setItem(option[0], JSON.stringify(option[1]));
        }
    }

    getLocal(key) {
        return JSON.parse(localStorage.getItem(key));
    }

    modifyLocal(modifyKey, key, value) {
        let modifyObj = this.getSession(modifyKey);
        this.modify(modifyObj, modifyKey, key, value, 'l')
    }

    removeLocal(key) {
        localStorage.removeItem(key);
    }

    clearLocal() {
        localStorage.clear();
    }



    setSession(...option) {
        const that = this;

        if(!this[_checkParams](option)) return 'parmas Error'

        if(option[2] && option[2].sync === true){

            return new Promise((resolve, reject) => {
                sessionStorage.setItem(option[0], JSON.stringify(option[1]));

                if(that.getSession(option[0])){
                    resolve(that.getSession(option[0]))
                }else{
                    reject(`${option[0]} set Error`)
                }
            })

        }else{
            return sessionStorage.setItem(option[0], JSON.stringify(option[1]));
        }

    }

    getSession(key) {
        this[_private]();
        return JSON.parse(sessionStorage.getItem(key));
    }

    modifySession(modifyKey, key, value) {
        let modifyObj = this.getSession(modifyKey);
        this.modify(modifyObj, modifyKey, key, value, 's')
    }

    removeSession(key) {
        sessionStorage.removeItem(key);
    }

    clearSession() {
        sessionStorage.clear();
    }

    [_private]() {
        console.log('private!')
    }

}

// export { Storage }
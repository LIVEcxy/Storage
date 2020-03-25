/*
 * @Description: local和session工具
 * @Version: 1.0
 * @Autor: liusm
 * @Date: 2020-03-16 15:50:11
 * @LastEditors: liusm
 * @LastEditTime: 2020-03-25 09:04:01
 */
'use strict'

export default class Storage {

    constructor() {
        if(!window) return console.warn('not window')
    }

    static getType(value = undefined) {
        if (typeof value !== `object`) {
            return typeof value;
        } else {
            const types = Object.prototype.toString.call(value);

            if (types) return types.slice(8, -1);
            throw `unknown type: ${types}, value:${value}`;
        }
    }

    modify(object, modifyKey, key, value, type) {

        if(Storage.getType(object) !== 'Object' && Storage.getType(object) !== 'Array') {
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

    setLocal(key,value) {
        localStorage.setItem(key, JSON.stringify(value))
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

    


    setSession(key, value) {
        sessionStorage.setItem(key, JSON.stringify(value))
    }

    getSession(key) {
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



}

// export { Storage }
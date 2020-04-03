'use strict'

// import util from 'util/util.js'

// const util = new util;
const _getType = Symbol('getType');
const _checkParams = Symbol('checkParams');

export default class Storage {

    Autor   = 'liusm';
    Version = '1.0.2';
    Descripttion = '支持两种语法的同步存储';

    constructor() {
        if(!window) return console.warn('not window')
    }

    [_getType](value = undefined) {

        const types = Object.prototype.toString.call(value);

        if (types) return types.slice(8, -1);
        throw `unknown type: ${types}, value:${value}`;

    }

    [_checkParams](params) {

        if(params.length < 2){
            console.warn('key and value is not defined',params)
            return false
        }

        if(this[_getType](params[0]) !== 'String'){
            console.warn('key is not String ',params[0])
            return false
        }

        if(this[_getType](params[0]) === 'Undefined' || this[_getType](params[1]) === 'Undefined'){
            console.warn('key or value is Undefined',params)
            return false
        }

        return true

    }

    modify(...option) {

        if(this[_getType](option[0]) !== 'Object' && this[_getType](option[0]) !== 'Array') {
            throw "modify's item not object or Array";
        }else{
            option[0][option[2]] = option[3];
        }

        switch(option[4]) {
            case 'l':
                this.setLocal(option[1], option[0])
            break;
            case 's':
                this.setSession(option[1], option[0])
            break;
        }

    }

    setLocal(...option) {
        const that = this;

        if(!this[_checkParams](option)) return 'parmas Error'

        if(option[2] && option[2].sync === true){
            return this.setLocalSync(option[0],option[1])

        }else{
            return localStorage.setItem(option[0], JSON.stringify(option[1]));
        }

    }

    setLocalAsyn(...option) {
        const that = this;

        that.setLocal(option[0],option[1]);

        return new Promise((resolve, reject) => {

            if(that.getLocal(option[0])){
                resolve(that.getLocal(option[0]))
            }else{
                let timerNum = 0;
                let timer = setInterval(() => {
                    if(that.getLocal(option[0])){
                        clearInterval(timer);
                        resolve(that.getLocal(option[0]));
                    }else{
                        timerNum ++;
                        if(timerNum >= 20){
                            clearInterval(timer);
                            reject(`${option[0]} set Error`);
                        }
                    }
                },250)

            }

        })

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
            return this.setSessionSync(option[0],option[1])

        }else{
            return sessionStorage.setItem(option[0], JSON.stringify(option[1]));
        }

    }

    setSessionAsyn(...option) {
        const that = this;

        that.setSession(option[0],option[1]);

        return new Promise((resolve, reject) => {

            if(that.getSession(option[0])){
                resolve(that.getSession(option[0]))
            }else{
                let timerNum = 0;
                let timer = setInterval(() => {
                    if(that.getSession(option[0])){
                        clearInterval(timer);
                        resolve(that.getSession(option[0]));
                    }else{
                        timerNum ++;
                        if(timerNum >= 20){
                            clearInterval(timer);
                            reject(`${option[0]} set Error`);
                        }
                    }
                },250)

            }

        })

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

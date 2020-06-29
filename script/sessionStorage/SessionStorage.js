/*
 * @Description:
 * @Version: 1.0
 * @Autor: liusm
 * @Date: 2020-04-07 15:32:14
 * @LastEditors: liusm
 * @LastEditTime: 2020-06-29 18:29:34
 */


import Util from '../util/util';

const _getType = Symbol('getType');
const _checkParams = Symbol('checkParams');

export default class Storage extends Util{

    // Autor   = Autor;
    // Version = Version;
    // Descripttion = Descripttion;

    constructor() {

        if(!window) return console.warn('not window');

        super('session');
        console.log(`Storage init, Version:${this.Version} Autor:${this.Autor}`);

    }

    [_getType](...params) {
        return super.getType(params[0]);
    }

    [_checkParams](params) {
        return super.checkParmas(params);
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
                this.set(option[1], option[0])
            break;
        }

    }

    set(...option) {
        const that = this;

        if(!this[_checkParams](option)) return 'parmas Error'

        if(option[2] && option[2].asyn === true){
            return this.setAsyn(option[0],option[1])
        }else{
            return sessionStorage.setItem(option[0], JSON.stringify(option[1]));
        }

    }

    setAsyn(...option) {
        const that = this;

        setTimeout(() => {
            that.set(option[0],option[1]);
        },1)

        return new Promise((resolve, reject) => {

            if(that.get(option[0]) === option[1]){
                resolve(that.get(option[0]))
            }else{
                let timerNum = 0;
                let timer = setInterval(() => {
                    if(that.get(option[0]) === option[1]){
                        clearInterval(timer);
                        resolve(that.get(option[0]));
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

    get(key) {
        return JSON.parse(sessionStorage.getItem(key));
    }

    // modify(modifyKey, key, value) {
    //     let modifyObj = this.get(modifyKey);
    //     this.modify(modifyObj, modifyKey, key, value, 's')
    // }

    remove(key) {
        sessionStorage.removeItem(key);
    }

    clear() {
        sessionStorage.clear();
    }

}
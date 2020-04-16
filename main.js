/*
 * @Description: 
 * @Version: 1.0
 * @Autor: liusm
 * @Date: 2020-04-01 13:57:13
 * @LastEditors: liusm
 * @LastEditTime: 2020-04-14 11:51:41
 */

import { Session, Local } from './script/storage.js'


console.log('log-6',Session)
window.Session = new Session;
window.Local = new Local;
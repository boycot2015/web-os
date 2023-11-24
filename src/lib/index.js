// place files you want to import through the `$lib` alias in this folder.
import { baseApiUrl } from './request/base'
const week = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
/**
 * 对一个对象进行深拷贝
 * @param object
 * @returns {*}
 *
 */
export const deepClone = (object) => {
    let str
    let newobj = object.constructor === Array ? [] : {}
    if (typeof object !== 'object') {
        return object
    } else if (window.JSON) {
        str = JSON.stringify(object)
        newobj = JSON.parse(str)
    } else {
        for (const i in object) {
            if (Object.prototype.hasOwnProperty.call(object, i)) {
                newobj[i] = typeof object[i] === 'object' ? deepClone(object[i]) : object[i]
            }
        }
    }
    return newobj
}

export {
    week,
    baseApiUrl
}

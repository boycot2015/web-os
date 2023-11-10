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
            if (object.hasOwnProperty(i)) {
                newobj[i] = typeof object[i] === 'object' ? deepClone(object[i]) : object[i]
            }
        }
    }
    return newobj
}
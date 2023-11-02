// 导入mockjs
import mall from './mall/index'
export const handleResponse = (/**@type any*/ data) => {
    return {
        code: 200,
        message: '操作成功',
        data
    }
}
export default [
    ...mall || []
]
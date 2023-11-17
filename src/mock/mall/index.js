// 导入mockjs
import Mock from 'mockjs'
import { handleResponse } from '../index'
// 获取 mock.Random 对象
const Random = Mock.Random
function likeBrandsCates () {
  let list = []
  for (let i = 0; i < 16; i++) {
    let object = {
      name: Random.ctitle(5, 8),
      subName: Random.ctitle(3, 8),
      color: Random.color(),
      cover: Random.image('750x450', Random.color(), Random.ctitle(1,2)),
      logo: Random.image('100x100', Random.color(), Random.ctitle(1,2)),
      // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
      createdTime: Random.date()
    }
    list.push(object)
  }
  return list
}
function likeBrandsList () {
    let list = []
    for (let i = 0; i < 20; i++) {
      let object = {
        name: Random.ctitle(5, 8),
        color: Random.color(),
        logo: Random.image('100x100', Random.color(), Random.ctitle(1,2)),
        desc: Random.csentence(10, 16),
        // Random.date()指示生成的日期字符串的格式,默认为yyyy-MM-dd
        createdTime: Random.date()
      }
      list.push(object)
    }
    return list
}
function topBrands () {
    let data = likeBrandsCates().map(el => {
        el.list = likeBrandsList()
        return el
    })
    return data
}
function decorationModels () {
    let types = [{
        code: 1001,
        count: 6,
    },
    {
        code: 1002,
        count: 6,
    },
    {
        code: 1003,
        count: 6,
    },
    {
        code: 1004,
        count: 6,
    },
    {
        code: 1005,
        count: 1
    }] // 1001 轮播图，1002 静态轮播图，1003 滚动轮播图，1004 列表，1005 图片
    let data = likeBrandsCates().slice(0, 6).map(el => {
        let current = types[Math.floor(Math.random() * types.length)]
        el.type = current.code
        el.list = likeBrandsList().slice(0, current.count)
        .map(val => ({ ...val, logo: current.code == 1005 ? Random.image('400x180', Random.color(), Random.ctitle(8)) : val.logo }))
        return el
    })
    return data
}
export default [
    {
        url: '/brand/like/cate',
        method: 'get',
        response: () => {
            return handleResponse(likeBrandsCates())
        }
    },
    {
        url: '/brand/like/list',
        method: 'get',
        response: () => {
            return handleResponse(likeBrandsList())
        }
    },
    {
        url: '/brand/top',
        method: 'get',
        response: () => {
            return handleResponse(topBrands())
        }
    },
    {
        url: '/brand/models',
        method: 'get',
        response: () => {
            return handleResponse(decorationModels())
        }
    }
]
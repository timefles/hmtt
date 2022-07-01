/* eslint-disable camelcase */
import request from '@/utils/request'
/**
 * 我的频道
 * @returns
 */
export const getMyChannels = () => {
  return request({
    url: 'user/channels'
  })
}

/**
 * 获取文章内容
 * @param {*} param0
 * @returns
 */
export const getArticleList = ({ channel_id, timestamp }) => {
  return request({
    url: 'articles',
    params: {
      channel_id,
      timestamp
    }
  })
}

/**
 * 获取所有的频道列表数据
 * @returns
 */
export const getAllArticleList = () => {
  return request({
    url: 'channels'
  })
}

/**
 * 频道数据持久化
 * @param {*}channel
 * @returns
 */
export const saveChannels = (channels) => {
  return request({
    url: 'user/channels',
    method: 'PUT',
    data: {
      channels
    }
  })
}

// 传参
// get,delete -> params
// post,put  -> data

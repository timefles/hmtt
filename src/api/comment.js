import request from '@/utils/request'

/**
 * 评论列表
 * @param {*} param0
 * @returns
 */
export const getCommentList = ({ type, source, offset, limit }) => {
  return request({
    url: 'comments',
    params: {
      type,
      source,
      offset,
      limit
    }
  })
}

/**
 * 点赞
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const addLike = (target) => {
  return request({
    method: 'POST',
    url: 'comment/likings',
    data: {
      target
    }
  })
}

/**
 *取消点赞
 * @param {要取消点赞的评论id或评论回复id} target
 * @returns
 */
export const delLike = (target) => {
  return request({
    method: 'DELETE',
    url: `comment/likings/${target}`
  })
}

/**
 * target 文章的id或者评论的id
 * content内容
 * art_id 文章id,对评论内容发表回复时,需要传递此参数,表明所属文章id, 对文章进行评论,不要传此参数
 * @param {*} data
 * @returns
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: 'comments',
    data
  })
}

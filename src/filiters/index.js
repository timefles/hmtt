// 批量创建过滤器
// 好处:创新新的过滤器
// 代码会变得简单 只要写一个普普通通的函数并且按需要导出就行了
import dayjs from 'dayjs'
import 'dayjs/locale/zh-cn'
import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.locale('zh-cn')
dayjs.extend(relativeTime)
export const dateformat = (time) => {
  return dayjs(time).fromNow()
}

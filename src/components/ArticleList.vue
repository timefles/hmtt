/* eslint-disable no-const-assign */
<template>
  <van-cell-group>
    <van-pull-refresh
      v-model="refreshing"
      @refresh="onRefresh"
      ref="pullrefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
      >
        <!-- <van-cell
          v-for="(item, index) in articleList"
          :key="index"
          :title="item.title"
          value="内容1"
          label="描述信息"
        /> -->
        <ArticleItem
          v-for="(item, index) in articleList"
          :key="index"
          :article="item"
        ></ArticleItem>
      </van-list>
    </van-pull-refresh>
  </van-cell-group>
</template>

<script>
import ArticleItem from './ArticleItem.vue'
import { getArticleList } from '@/api/home'
let ele = null // 全局
let scrollTop = 0
export default {
  name: 'ArticleList',
  created () {
    this.ArticleList()
  },
  mounted () { // 给有滚动条的pull-refresh绑定滚动事件  在滚动的时候记住最新的滚动的位置
    // 组件最终渲染成html dom ,$el就是渲染好的根标签
    ele = this.$refs.pullrefresh.$el
    this.$refs.pullrefresh.$el.addEventListener('scroll', function () {
      scrollTop = this.scrollTop
    })
  },
  activated () { // 在每次进入home页面的时候,把滚动条从最上面滚动到上一次记录的位置
    ele.scrollTop = scrollTop
  },
  props: {
    id: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      timestamp: Date.now(),
      articleList: [],
      loading: false,
      finished: false
    }
  },
  methods: {
    async getArticleList () {
      if (this.refreshing) {
        this.articleList = []
        this.refreshing = false
      }
      try {
        const res = await getArticleList({ channel_id: this.id, timestamp: this.timestamp })
        console.log(res)
        this.timestamp = res.data.data.pre_timestamp
        // 若数据已经全部加载完毕,则直接将finished设置成true
        if (this.timestamp === null) {
          this.finished = true
        }
        this.articleList.push(...res.data.data.results)
        // 数据更新完毕后,将loading设置成false
        this.loading = false
      } catch (err) {
        console.log(err)
      }
    },
    onLoad () {
      this.getArticleList()
    },
    onRefresh () {
      console.log('下拉刷新触发了')
      // 清空列表数据
      this.finished = false // 防止用户把加载更多搞结束了
      this.loading = true // 重新加载页面
      this.timestamp = Date.now()
      this.getArticleList()
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {
    ArticleItem
  }
}
</script>

<style scoped lang='less'>
.van-cell-group {
  margin-top: 174px;
}
</style>

<template>
  <div>
    <van-nav-bar title="登录" @click-left="$router.back()">
      <!-- 简单写法,vue2可以用,vue3不行要报错,已废弃 -->
      <van-icon name="cross" slot="left" />
      <!-- 标准写法  最新 -->
      <!-- <template slot="left">
        <van-icon name="cross" />
      </template> -->
    </van-nav-bar>

    <van-form @submit="onSubmit" ref="form">
      <van-field
        v-model.trim="mobile"
        name="mobile"
        placeholder="请输入手机号"
        :rules="[
          { required: true, message: '请输入手机号' },
          { pattern: /^(?:(?:\+|00)86)?1\d{10}$/, message: '不符合手机的格式' },
        ]"
      >
        <i class="toutiao toutiao-shouji" slot="left-icon"></i>
      </van-field>
      <van-field
        v-model.trim="code"
        type="password"
        name="code"
        placeholder="验证码"
        :rules="[
          { required: true, message: '请填写验证吗' },
          { pattern: /^\d{6}$/, message: '验证码长度必须要6位' },
        ]"
      >
        <i class="toutiao toutiao-yanzhengma" slot="left-icon"></i>
        <template #button>
          <van-count-down
            v-if="isCountDownShow"
            :time="time"
            format="ss s"
            @finish="isCountDownShow = false"
          />
          <van-button
            @click="onSendSms"
            v-else
            size="small"
            class="yzm"
            native-type="button"
            >发送验证码</van-button
          >
        </template>
      </van-field>
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          >提交</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script>
import { getSmsCode, login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      mobile: '15257492433', // 手机号
      code: '246810', // 短信验证码
      time: 5 * 1000,
      isCountDownShow: false
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        // token有效期2个小时  两种思路 让用户重新登录
        this.$store.commit('setUser', res.data.data)
        this.$router.push({ name: 'my' }) // 登录页面跳转我的页面
      } catch (err) {
        console.log(err)
      }
    },
    async onSendSms () {
      try {
        await this.$refs.form.validate('mobile')
        // console.log('校验通过')
        this.isCountDownShow = true // 显示倒计时
        try {
          await getSmsCode(this.mobile)
          this.$toast.success('发送成功')
        } catch (err) {
          console.log(err)
          this.$toast.fail('发送失败')
        }
      } catch (err) {
        console.log(err)
        console.log('校验失败')
        // 轻提示
        this.$toast.fail('手机格式不对')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.toutiao {
  font-size: 37px;
}
.yzm {
  width: 152px;
  height: 46px;
  line-height: 46px;
  background-color: #ededed;
  border-radius: 23px;
  font-size: 22px;
  color: #666;
  .van-button__text {
    zoom: 0.96;
  }
}
.login-btn {
  width: 694px;
  height: 88px;
  background-color: #6db4fb;
  border-radius: 10px;
  font-size: 30px;
  color: #fff;
}
.van-count-down {
  position: fixed;
  right: 18px;
}
.yzm {
  position: fixed;
  right: 10px;
}
</style>

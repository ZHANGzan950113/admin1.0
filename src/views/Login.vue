<template>
  <div class="cantainer login" :style="{'background-image': `url(${require('@/assets/image/background_1.jpg')})`}">
    <div class="login_form">
      <div class="title">系统</div>
      <formCom :formInfo="formInfo" :form="form" :rules="rules" :formName="'loginForm'" ref="LoginForm" :validate="validate"></formCom>
    <div class="button">
      <span @click="handleLogin">登录</span>
    </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  components: {
    formCom: () => import("@/components/formCom"),
  },
  data() {
    return {
      // 表单信息
      formInfo: {
        layout: {
          class:'layout_1'
        },
        data: [
          [
            {
              type: 'input',
              name: 'account',
              placeholder: '请输入账号',
              icon: {
                prefix:'el-icon-user-solid'
              }
            },
            {
              type: 'input',
              name: 'password',
              placeholder: '请输入密码',
              password:true,
              icon: {
                prefix:'el-icon-unlock'
              }
            }
          ]
        ]
      },
      // 表单参数
      form: {
        account: '',
        password: ''
      },
      // 表单验证规则
      rules: {
        account: [
          {required: true,message: '请输入账号', tiggir:'blur'}
        ],
        password: [
          {required: true, message: '请输入密码', tiggir:'blur'}
        ]
      },
      redirect: undefined,
      otherQuery: {}

    }
  },
  methods: {
    handleLogin() {
      this.$refs.LoginForm.submitForm()
    },
    validate(form) {
      form.validate(valid => {
        if (valid) {
          // md5 password
          this.$store.dispatch('user/login',this.form).then( () => {
            this.$router.push({ path: this.redirect || '/', query: this.otherQuery }).catch(()=> {
              
            })
          }).catch(() => {
            console.log('error')
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login {
  background-image: url('/image/background_1.jpg');
  height: 100%;
  box-sizing: border-box;
  padding-bottom: 200px;
  background-size:100% 100%;
  background-repeat:no-repeat;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .login_form {
    width: 500px;
    height: 300px;
    background-color: rgba(255, 255, 255, 0.3);
    border-radius: 10px;
    box-shadow: 3px 39px 10px rgba(0,0,0,0.1);
    // 高斯模糊
    backdrop-filter: blur(3px);
    text-align: center;
    box-sizing: border-box;
    padding: 20px 50px 0;
    .title {
      color: #fff;
      font-size: 35px;
      font-weight: bolder;
      margin-bottom: 20px;
    }
    .button {
      display: flex;
      justify-content: center;
      align-items: center;
      span {
        color: #fff;
        background-color: rgba(255,255,255,0.1);
        font-size: 26px;
        font-weight: bolder;
        cursor: pointer;
        padding: 10px 20px;
      }
    }
  }
}
</style>
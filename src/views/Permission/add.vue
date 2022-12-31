<template>
  <div>
    <formCom :formInfo="formInfo" :form="form" :rules="rules" :formName="'routeForm'" ref="routeForm"></formCom>
  </div>
</template>

<script>
export default {
  name: 'PermissionAdd',
  components: {
    formCom: () => import("@/components/formCom"),
  },
  data() {
    return {
      formInfo: {
        layout: {
          labelWidth: '80px'
        },
        data: [
          [
            {
              type: 'input',
              name: 'name',
              label: '路由名称',
            },
            {
              type: 'input',
              name: 'path',
              label: '路由路径',
            },
            {
              type: 'input',
              name: 'parent',
              label: '父级路由',
            },
            {
              type: 'input',
              name: 'component',
              label: '组件路径',
            },
          ]
        ]
      },
      // 表单参数
      form: {
        name: '',
      },
      // 表单验证规则
      rules: {
        name: [
          {required: true,message: '请输入路由名称', tiggir:'blur'}
        ],
        path: [
          {required: true,message: '请输入路由路径', tiggir:'blur'}
        ],
        parent: [
          {required: true,message: '请输入父级名称', tiggir:'blur'}
        ],
        component: [
          {required: true,message: '请输入组件路径', tiggir:'blur'}
        ]
      },
    }
  },
}
</script>

<style>

</style>
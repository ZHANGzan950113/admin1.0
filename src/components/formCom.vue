<template>
  <div class="container">
    <el-form
      class="formCom"
      :class="formInfo.layout && formInfo.layout.class ? formInfo.layout.class :null"
      :label-width="
        formInfo.layout && formInfo.layout.labelWidth ? formInfo.layout.labelWidth : null
      "
      :rules="rules"
      :model="form"
      :ref="formName"
    >
      <div
        class="column"
        v-for="(column, columnIndex) in formInfo.data"
        :key="columnIndex"
      >
        <el-form-item
          v-for="(item, index) in column"
          :key="index"
          :label="item.label"
          :prop="item.name"
        >
          <!-- slot -->
          <slot v-if="item.type === 'slot'" :name="item.name"></slot>
          <!-- 输入框 -->
          <el-input v-if="item.type === 'input'" v-model="form[item.name]" :placeholder="item.placeholder" :prefix-icon="item.icon && item.icon.prefix ? item.icon.prefix : null" :suffix-icon="item.icon && item.icon.suffix ? item.icon.suffix : null" :show-password = 'item.password'>
            <template v-if="item.slot" :slot="item.slot">{{
              item.slotName
            }}</template>
          </el-input>
          <!-- 选项栏 -->
          <el-select
            v-model="form[item.name]"
            v-if="item.type === 'select'"
            :placeholder="item.placeholder"
          >
            <el-option
              v-for="(optionItem, optionIndex) in item.options"
              :key="optionIndex"
              :value="optionItem.value"
              :label="optionItem.label"
            ></el-option>
          </el-select>
          <!-- 单选项 -->
          <el-radio-group
            v-model="form[item.name]"
            v-if="item.type === 'radio'"
          >
            <el-radio
              v-for="(optionItem, optionIndex) in item.options"
              :key="optionIndex"
              :label="optionItem.value"
            >
              {{ optionItem.label }}
            </el-radio>
          </el-radio-group>
          <!-- 多选项 -->
          <el-checkbox-group
            v-model="form[item.name]"
            v-if="item.type === 'checkBox'"
          >
            <el-checkbox
              v-for="(optionItem, optionIndex) in item.opitons"
              :key="optionIndex"
              :label="optionItem.label"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
export default {
  name: "FormCom",
  mounted() {},
  props: {
    formInfo: {
      type: Object,
      default: () => {},
    },
    form: {
      type: Object,
    },
    rules: {
      type: Object,
    },
    formName: String,
    // 表单验证函数
    validate: {
      type: Function
    }
  },
  data() {
    return {
      localForm: {
        name: "",
        sex: null,
        select: "",
        checkBox: [],
      },
    };
  },

  methods: {
    // 整个表单验证
    submitForm() {
        this.validate(this.$refs[this.formName])
    },
    // 重置表单数据
    resetForm() {
      this.$refs[this.formName].resetFields();
    },
  },
};
</script>

<style lang="scss" scoped>
.formCom {
  display: flex;
  width: 100%;
  .column {
    flex: 1;
  }
}
</style>

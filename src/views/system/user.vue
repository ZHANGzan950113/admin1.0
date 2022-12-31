<template>
  <div>
    <div class="search">
      <el-form inline size="small">
        <el-form-item label="用户名称：">
          <el-input placeholder="请输入用户名称"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：">
          <el-input placeholder="请输入手机名号码"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input placeholder="用户状态"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation">
      <el-button size="small" type="primary" @click="addUser('add')" v-hasBtn="'userAdd'">新增</el-button>
      <el-button size="small" type="danger" @click="handleDelMultiple" :disabled="multipleId.length === 0">删除
      </el-button>
      <el-button size="small" type="info">导出</el-button>
      <el-button size="small" type="info">导入</el-button>
    </div>

    <div class="table">
      <el-table border :data="list" row-key="id" @select="handleSelect">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" align="center">
          <template slot-scope="{row}">

            <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
              :title="row.status? '是否停用该用户': '是否启用该用户'" :active-value="1" :inactive-value="0" v-if="item.slot === 'status'" @confirm="handleStatus(row,'comfirm')" @cancel="handleStatus(row,'cancel')">
              <el-switch v-model="row[item.prop]" active-color="#13ce66" @change="(val) => {switchBtn(val,row)}"
                 inactive-color="#ff4949" slot="reference" :active-value="1" :inactive-value="0">
              </el-switch>
            </el-popconfirm>
            
            
            <span v-else>
              {{ row[item.prop] }}
            </span>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button size="small" type="primary" @click="handleEdit(row)">修改</el-button>
            <el-button size="small" type="danger" @click="handleDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <el-dialog :title="title" :visible.sync="dialogShow" width="50%">
      <el-form label-width="100px" label-position="right" :model="form" ref="form">
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户昵称：" prop="name">
              <el-input placeholder="请输入用户昵称" v-model="form.name" >
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="手机号码：" prop="phone">
              <el-input placeholder="请输入手机号码" v-model="form.phone">
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户账号：" prop="account">
              <el-input placeholder="请输入用户账号" v-model="form.account">
              </el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="用户密码：" prop="password">
              <el-input placeholder="请输入用户密码" type="password" v-model="form.password" show-password>
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="用户性别：" prop="sex">
              <el-select v-model="form.sex">
                <el-option :value="1" label="女"></el-option>
                <el-option :value="2" label="男"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item label="状态：" prop="status">
              <el-radio-group v-model="form.status">
                <el-radio :label="1">正常</el-radio>
                <el-radio :label="0">停用</el-radio>
              </el-radio-group>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="12">
            <el-form-item label="角色：" prop="role">
              <el-select v-model="form.role" multiple collapse-tags placeholder="请选择角色">
                <el-option v-for="item in role" :key="item.id" :value="item.id" :label="item.name"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24">
            <el-form-item label="备注：" prop="remark">
              <el-input type="textarea" placeholder="请输入内容" v-model="form.remark"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="formCancel">取 消</el-button>
        <el-button type="primary" @click="handleDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getRole } from "@/api/role";
import { addUser, delUser, editUser, getUser } from "@/api/user";
export default {
  name: "User",
  data() {
    return {
      list: [],
      column: [
        {
          prop: "id",
          label: "编号",
        },
        {
          prop: "account",
          label: "账号",
        },
        {
          prop: "name",
          label: "用户昵称",
        },
        {
          prop: "phone",
          label: "电话号码",
        },
        {
          prop: "status",
          label: "状态",
          slot: "status",
        },
      ],
      // dialog
      dialogShow: false,
      title: "添加角色",
      type: "add",
      // form
      form: {
        name: '',
        account: '',
        password: '',
        phone: '',
        role: [],
        sex: 1,
        status: null,
        remark: '',
      },
      // role
      role: [],
      defaultProps: {
        children: "children",
        label: "label",
      },
      multipleId: [],
    };
  },
  mounted() {
    this.getUser();
    getRole().then((res) => {
      this.role = res.data;
    });
  },
  methods: {
    getUser() {
      getUser().then((res) => {
        res.data.sort((a, b) => {
          if (a.sort < b.sort) {
            return -1;
          } else if (a.sort > b.sort) {
            return 1;
          } else {
            return 0;
          }
        });
        this.list = res.data;
        console.log("roleList=>", this.list);
      });
    },
    handleDialog() {
      // this.form.permission = this.$refs.menu.getCheckedKeys().concat(this.$refs.menu.getHalfCheckedKeys())
      this.dialogShow = false;
      if (this.type === "add") {
        addUser(this.form).then((res) => {
          this.$message.success(res.msg);
          this.getUser();
        });
      } else {
        this.form.status = Number(this.form.status)
        editUser(this.form).then((res) => {
          this.$message.success(res.msg);
          this.getUser();
        });
      }
      this.$refs.form.resetFields()
    },
    addUser(type) {
      this.dialogShow = true;
      this.type = type;
      this.title = "添加用户";
    },
    handleEdit(row) {
      this.type = "edit";
      this.title = "修改用户";
      
      this.dialogShow = true;
      
      this.$nextTick(()=> {
        Object.assign(this.form, row)
      })
    },
    handleDel(row) {
      this.$confirm("确定删除该角色吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(row.id)
            .then((res) => {
              this.getUser();
              this.$message({
                type: "success",
                message: res.msg,
              });
            })
            .catch((err) => {
              this.$message({
                type: "success",
                message: err,
              });
            });
        })
        .catch(() => { });
    },
    handleDelMultiple() {
      this.$confirm("确定删除选中的角色吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser(this.multipleId)
            .then((res) => {
              this.getUser();
              this.$message({
                type: "success",
                message: res.msg,
              });
            })
            .catch((err) => {
              this.$message({
                type: "success",
                message: err,
              });
            });
        })
        .catch(() => { });
    },
    handleSelect(selection) {
      // console.log("选中项=>",selection, row)
      this.multipleId = [];
      selection.map((item) => {
        this.multipleId.push(item.id);
      });
    },
    formCancel() {
      this.dialogShow = false
      this.$refs.form.resetFields()
    },
    handleStatus(row, type) {
      if(type === 'cancel') {
        return
      } else {
        row.status = Number(!row.status)
        editUser(row).then(res => {
          this.$message.success(res.msg)
        })
      } 
    },
    switchBtn(val,row) {
      if(val) {
        row.status = 0
      } else {
        row.status = 1
      }
    }
  },
};
</script>

<style lang="scss" scoped>
.operation {
  margin-bottom: 20px;
}

// form
.el-form {
  .el-select {
    width: 100%;
  }
}
</style>
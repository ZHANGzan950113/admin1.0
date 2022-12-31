<template>
  <div>
    <div class="search">
      <el-form inline size="small">
        <el-form-item label="角色名称：">
          <el-input placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item label="状态：">
          <el-input placeholder="请输入角色名称"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">搜索</el-button>
          <el-button>重置</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="operation">
      <el-button size="small" type="primary" @click="addRole('add')">新增</el-button>
      <el-button size="small" type="danger" @click="handleDelMultiple" :disabled="multipleId.length === 0">删除
      </el-button>
      <el-button size="small" type="info">导出</el-button>
    </div>

    <div class="table">
      <el-table border :data="roleList" row-key="id" @select="handleSelect">
        <el-table-column type="selection" align="center"></el-table-column>
        <el-table-column v-for="item in column" :key="item.prop" :prop="item.prop" :label="item.label" align="center">
          <template slot-scope="{row}">
            <el-popconfirm confirm-button-text='好的' cancel-button-text='不用了' icon="el-icon-info" icon-color="red"
              :title="row.status ? '是否停用该角色' : '是否启用该角色'" v-if="item.slot === 'status'"
              @confirm="handleStatus(row, 'comfirm')" @cancel="handleStatus(row, 'cancel')">
              <el-switch v-model="row[item.prop]" active-color="#13ce66" :active-value="1" :inactive-value="0"
                @change="(type) => {handleSwitch(type,row)}" inactive-color="#ff4949" slot="reference">
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

    <el-dialog :title="title" :visible.sync="dialogShow" width="30%">
      <el-form label-width="100px" label-position="right" :model="roleForm" ref="form">
        <el-form-item label="角色名称：" prop="name">
          <el-input placeholder="请输入角色名称" v-model="roleForm.name"></el-input>
        </el-form-item>
        <el-form-item label="角色顺序：" prop="sort">
          <el-input-number v-model="roleForm.sort" controls-position="right" :min="1" :max="10"></el-input-number>
        </el-form-item>
        <el-form-item label="状态：" prop="status">
          <el-radio-group v-model="roleForm.status">
            <el-radio :label="1">正常</el-radio>
            <el-radio :label="0">停用</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="菜单权限：" prop="permission">
          <div class="menu_wrap">
            <el-tree ref="menu" :data="menu" show-checkbox node-key="id" :props="defaultProps">
            </el-tree>
          </div>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="roleForm.remark">
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">取 消</el-button>
        <el-button type="primary" @click="handleDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getMenu } from '@/api/menu'
import { addRole, delRole, editRole, getRole } from '@/api/role'
export default {
  name: 'Role',
  data() {
    return {
      roleList: [],
      column: [
        {
          prop: 'id',
          label: '编号'
        },
        {
          prop: 'name',
          label: '角色名称'
        },
        {
          prop: 'sort',
          label: '显示顺序'
        },
        {
          prop: 'status',
          label: '状态',
          slot: 'status'
        }
      ],
      // dialog
      dialogShow: false,
      title: '添加角色',
      type: 'add',
      // form
      roleForm: {
        name: '',
        sort: 0,
        status: 1,
        // permission: [],
        remark: ''
      },
      // menu
      menu: [],
      defaultProps: {
        children: 'children',
        label: 'label'
      },
      multipleId: []
    }
  },
  mounted() {
    this.getRole()
    getMenu().then(res => {
      this.menu = res.data
    })
  },
  methods: {
    getRole() {
      getRole().then(res => {
        res.data.sort((a, b) => {
          if (a.sort < b.sort) {
            return -1
          } else if (a.sort > b.sort) {
            return 1
          } else {
            return 0
          }
        })
        this.roleList = res.data
      })
    },
    handleDialog() {
      this.roleForm.permission = this.$refs.menu.getCheckedKeys().concat(this.$refs.menu.getHalfCheckedKeys())
      this.dialogShow = false
      if (this.type === 'add') {
        addRole(this.roleForm).then(res => {
          this.$message.success(res.msg)
          this.getRole()
        })
      } else {
        editRole(this.roleForm).then(res => {
          this.$message.success(res.msg)
          this.getRole()
        })
      }
    },
    addRole(type) {
      this.dialogShow = true
      this.type = type
      this.title = '添加角色'
    },
    handleEdit(row) {
      this.type = 'edit'
      this.title = '修改角色'
      this.dialogShow = true;

      this.$nextTick(() => {
        this.$refs.menu.setCheckedKeys(row.permission);
        Object.assign(this.roleForm, row)
      })
    },
    handleDel(row) {
      this.$confirm("确定删除该角色吗", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(row.id).then(res => {
          this.getRole()
          this.$message({
            type: 'success',
            message: res.msg
          });
        }).catch(err => {
          this.$message({
            type: 'success',
            message: err
          });
        })
      }).catch(() => { });
    },
    handleDelMultiple() {
      this.$confirm("确定删除选中的角色吗", '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        delRole(this.multipleId).then(res => {
          this.getRole()
          this.$message({
            type: 'success',
            message: res.msg
          });
        }).catch(err => {
          this.$message({
            type: 'success',
            message: err
          });
        })
      }).catch(() => { });
    },
    handleSelect(selection) {
      // console.log("选中项=>",selection, row)
      this.multipleId = []
      selection.map(item => {
        this.multipleId.push(item.id)
      })
    },
    handleStatus(row, type) {
      if (type === 'cancel') {
        return
      } else {
        row.status = Number(!row.status)
        editRole(row).then(res => {
          this.$message.success(res.msg)
        })
      }
    },
    handleCancel() {
      this.roleForm = {}
      this.dialogShow = false
      this.$refs.form.resetFields()
    },
    handleSwitch(type,row) {
        if(type) {
          row.status = 0
        } else {
          row.status = 1
        }
    }
  }
}
</script>

<style lang="scss" scoped>
.operation {
  margin-bottom: 20px;
}

.menu_wrap {
  height: 200px;
  overflow-y: auto;
  border: 1px solid #ccc;
}
</style>
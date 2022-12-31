<template>
  <div>
    <div class="search_wrap">
      <el-form label-position="left" label-width="100px" inline size="small">
        <el-form-item label="菜单名称：">
          <el-input placeholder="请输入菜单名称" />
        </el-form-item>
      </el-form>
      <div class="form_btn">
        <el-button type="primary" size="small">搜索</el-button>
        <el-button size="small">重置</el-button>
      </div>
    </div>
    <div class="operator_wrap">
      <el-button type="primary" size="small" @click="handleDialog">新增</el-button>
    </div>
    <div class="table_wrap">
      <el-table
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children'}">

        <el-table-column v-for="item in table_column" :key="item.prop" :prop="item.prop" :label="item.label" align="center"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="{row}">
            <el-button @click="handleClick(row)" type="primary" size="mini">编辑</el-button>
            <el-button type="danger" size="mini" @click="handleDel(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 弹窗 -->

    <el-dialog title="添加菜单" :visible.sync="addDialog">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="上级菜单：">
          <treeselect v-model="addForm.parentId" :multiple="false" :options="tableData" />
        </el-form-item>
        <el-form-item label="菜单类型：">
          <el-radio-group v-model="addForm.type">
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
            <el-radio :label="3">按钮</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-col :span="12">
          <el-form-item label="菜单图标：" v-if="addForm.type !== 3">
            <el-input></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="title：" v-if="addForm.type !== 3">
            <el-input v-model="addForm.title"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单名称：">
            <el-input placeholder="请输入菜单名称" v-model="addForm.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示排序：">
            <el-input-number v-model="addForm.sort" controls-position="right" :min="1" :max="100"></el-input-number>
          </el-form-item>
        </el-col>
        <el-col :span="12"  v-if="addForm.type !== 3">
          <el-form-item label="是否外链：">
            <el-radio-group v-model="addForm.link">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="路由地址：" v-if="addForm.type !== 3">
            <el-input placeholder="请输入路由地址" v-model="addForm.path"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="addForm.type === 2">
          <el-form-item label="组件路径：">
            <el-input placeholder="请输入组件路径：" v-model="addForm.component"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12" v-if="addForm.type === 2">
          <el-form-item label="路由参数：">
            <el-input placeholder="请输入路由参数" v-model="addForm.params"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="显示状态：" v-if="addForm.type !== 3">
            <el-radio-group v-model="addForm.hidden">
              <el-radio :label="1">显示</el-radio>
              <el-radio :label="0">隐藏</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="菜单状态：" v-if="addForm.type !== 3">
            <el-radio-group v-model="addForm.status">
              <el-radio :label="1">正常</el-radio>
              <el-radio :label="0">停用</el-radio>
            </el-radio-group>
          </el-form-item>
        </el-col>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addDialog = false">取 消</el-button>
        <el-button type="primary" @click="handleMenu">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { addMenu, delMenu, editMenu, getMenu } from '@/api/menu'
import Treeselect from '@riophae/vue-treeselect'
import '@riophae/vue-treeselect/dist/vue-treeselect.css'
export default {
  name: 'Menu',
  components: {
    Treeselect
  },
  data() {
    return {
      table_column:[
        {
          prop:'name',
          label:'菜单名称',
        },
        {
          prop:'icon',
          label:'图标'
        },
        {
          prop:'sort',
          label:'排序'
        },
        {
          prop: 'component',
          label: "组件路径"
        }
      ],
      tableData: [],
      addDialog: false,
      
      addForm: {
        name: '',
        parentId: null,
        type: 1,
        link:0,
        path:'',
        hidden: 1,
        status: 1,
        params: '',
        component: '',
        sort: null,
      },
      dialogType: 'add'
    }
  },
  methods: {
    handleDialog() {
      this.addDialog = true
    },
    handleMenu() {
      this.addDialog = false
      
      if(this.dialogType === 'add') {
        addMenu(this.addForm).then(res=> {
          if(res.code === 200) {
            this.getMenu()
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
      } else if(this.dialogType === 'edit') {
        editMenu(this.addForm).then(res=> {
          if(res.code === 200) {
            this.getMenu()
            this.$message({
              message: res.msg,
              type: 'success'
            });
          }
        })
      }
    },
    handleClick(row) {
      this.addDialog = true
      this.dialogType = 'edit'
      for (const key in row) {
        if(key === 'parentId' && row[key] === 0) continue
        this.addForm[key] = row[key]
      }
    },
    handleDel(row) {
      this.$confirm('确定删除该菜单及其所有子菜单吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          delMenu(row.id).then(res => {
            this.getMenu()
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
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
    },
    getMenu() {
      getMenu().then(res => {
        this.tableData = res.data
      })
    }
  },
  mounted() {
    this.getMenu()
  }
}
</script>

<style lang="scss" scoped>
.search_wrap {
  display: flex;
}
.operator_wrap {
  margin-bottom: 20px;
}
</style>
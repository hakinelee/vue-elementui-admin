<!-- 用户 -->
<template>
  <div class="manage">
    <!-- 新增 -->
    <el-dialog
      title="新增用户"
      :visible.sync="dialogVisible"
      width="50%"
      :before-close="handleClose"
    >
      <!-- 用户的表单信息 -->
      <el-form ref="form" :rules="rules" :model="form" label-width="80px">
        <el-form-item label="工号" prop="number">
          <el-input placeholder="请输入工号" v-model="form.number"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input placeholder="请输入姓名" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-select v-model="form.department" placeholder="请选择部门">
            <el-option label="财务" value="财务"></el-option>
            <el-option label="教务" value="教务"></el-option>
            <el-option label="学工" value="学工"></el-option>
            <el-option label="图书" value="图书"></el-option>
            <el-option label="后勤" value="后勤"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="领域" prop="field">
          <el-select v-model="form.field" placeholder="请选择领域">
            <el-option label="普通" value="普通"></el-option>
            <el-option label="工程" value="工程"></el-option>
            <el-option label="服务" value="服务"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="联系方式" prop="phoneNumber">
          <el-input
            placeholder="请填写联系方式"
            v-model="form.phoneNumber"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </span>
    </el-dialog>

    <!-- 头部按钮 -->
    <div class="manage-header">
      <!-- 增加 -->
      <el-button @click="handleAdd" type="primary"> + 新增 </el-button>
      <!-- 搜索 -->
      <!-- 可在此处添加搜索框 -->
    </div>

    <!-- 数据展示 -->
    <div class="common-table">
      <el-table :data="tableData" height="440" style="width: 100%">
        <el-table-column prop="number" label="工号"> </el-table-column>
        <el-table-column prop="name" label="姓名" width="150">
        </el-table-column>
        <el-table-column prop="department" label="部门" width="150">
        </el-table-column>
        <el-table-column prop="field" label="领域（专业）" width="150">
        </el-table-column>
        <el-table-column
          prop="phoneNumber"
          label="手机号"
          width="170"
        ></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="handleEdit(scope.row)"
              >编辑</el-button
            >
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <!-- 分页 -->
    <div class="pager" style="float: right">
      <el-pagination
        layout="prev, pager, next"
        :total="total"
        @current-change="handlePage"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script>
// import { getData } from "../api";
import { reactive } from "vue";
import { getUser, addUser, editUser, delUser } from "@/api/index";
export default {
  data() {
    return {
      dialogVisible: false,
      form: {
        // 工号
        number: "",
        // 姓名
        name: "",
        // 部门
        department: "",
        // 领域（专业）
        field: "",
        // 手机号
        phoneNumber: "",
        oldNumber: "",
      },
      tableData: [],
      total: 0, //当前数据条数，默认为0
      modalType: 0, //0表示新增弹窗，1表示编辑
      pageData: {
        page: 1,
        limit: 10,
      },
      rules: {
        number: [
          { required: true, message: "请输入工号", trigger: "blur" },
          {
            min: 5,
            max: 19,
            message: "长度在 5 到 15 个字符",
            trigger: "blur",
          },
        ],
        name: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
        department: [
          { required: true, message: "请选择部门", trigger: "change" },
        ],
        field: [
          { required: true, message: "请输入领域或专业", trigger: "change" },
        ],
        phoneNumber: [
          { required: true, message: "请填写联系方式", trigger: "blur" },
          { min: 10, max: 12, message: "长度为 11 个字符", trigger: "blur" },
        ],
      },
    };
  },
  mounted() {
    // 页面首次加载时调用getList
    this.getList();
    //   // getData().then(({ data }) => {
    //   //   // console.log(data)
    //   //   const { tableData } = data.data;
    //   //   // console.log(tableData);
    //   //   this.tableData = tableData;
    //   // });

    // 这里属于公共方法，在下面进行封装
    //   getUser().then(({ data }) => {
    //     // 获取列表数据
    //     console.log(data);
    //     this.tableData = data.list;
    //   });
  },
  methods: {
    // 提交用户表单
    submit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          console.log(this.form, "form");
          if (this.modalType === 0) {
            addUser(this.form).then(() => {
              // 先调新增接口接口，插入数据，然后再调获取列表的接口，更新数据
              // 重新获取列表的接口
              this.getList();
            });
          } else {
            editUser(this.form).then(() => {
              // 重新获取列表的接口
              this.getList();
            });
          }
          // 后续对表单数据的处理
          // 清空表单的数据
          this.$refs.form.resetFields();

          // 关闭弹窗
          this.dialogVisible = false;
        }
      });
    },
    // 弹窗关闭的时候
    handleClose() {
      this.$refs.form.resetFields();
      this.dialogVisible = false;
    },
    cancel() {
      this.handleClose();
    },
    // 编辑按钮
    handleEdit(row) {
      // console.log(index, row);
      this.modalType = 1;
      this.dialogVisible = true;
      // 注意需要对当前数据进行深拷贝，否则会出错
      this.form = JSON.parse(JSON.stringify(row));
      this.form.oldNumber = row.number;
    },
    // 删除按钮
    handleDelete(row) {
      // console.log(row);
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          delUser({ number: row.number }).then(() => {
            this.$message({
              type: "success",
              message: "删除成功!",
            });
            // 重新获取列表的接口
            this.getList();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    // 新增按钮
    handleAdd() {
      this.modalType = 0;
      this.dialogVisible = true;
    },
    // 公共方法，再次封装
    // 专门用于获取列表的数据
    getList() {
      getUser({ params: this.pageData }).then(({ data }) => {
        // 获取列表数据
        console.log(data);
        this.tableData = data;
        this.total = data.count || 0;
      });
    },
    // 选择页码的回调函数
    handlePage(val) {
      // console.log(val,'val')
      this.pageData.page = val;
      this.getList();
    },
  },
};
</script>
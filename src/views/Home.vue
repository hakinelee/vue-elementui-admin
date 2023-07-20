<!-- 主页 -->
<template>
  <div class="">
    <el-form ref="form" :rules="rules" :model="form" label-width="80px">
      <h1
        style="
          text-align: center;
          font-size: 2em;
          margin: auto;
          margin-bottom: 0.3em;
        "
      >
        项目评标系统
      </h1>

      <el-form-item label="名称" prop="projectName">
        <el-input
          v-model="form.projectName"
          placeholder="请填写项目名称"
          style="max-width: 50%"
        ></el-input>
      </el-form-item>

      <el-form-item label="财务" prop="finance">
        <el-select
          v-model="form.finance"
          placeholder="请选择人数"
          @change="generateInputFields1($event.value)"
          style="float: left"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>

        <div
          v-for="(input, index) in inputFields1"
          :key="index"
          ref="myInput"
          style="
            max-width: 18%;
            float: left;
            margin-left: 1em;
            margin-right: 1em;
          "
        >
          <el-input
            type="text"
            :placeholder="'请输入财务人员' + (index + 1) + '姓名'"
            v-model="inputFields1[index]"
            v-if="showInput"
            style="float: left"
          />
        </div>
      </el-form-item>

      <el-form-item label="使用" prop="use">
        <el-select
          v-model="form.use"
          placeholder="请选择人数"
          @change="generateInputFields2($event.value)"
          style="float: left"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>
        <div
          v-for="(input, index) in inputFields2"
          :key="index"
          style="
            max-width: 18%;
            float: left;
            margin-left: 1em;
            margin-right: 1em;
          "
        >
          <el-input
            type="text"
            :placeholder="'请输入使用人员' + (index + 1) + '姓名'"
            v-model="inputFields2[index]"
            v-if="showInput"
            style="float: left"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item label="经办" prop="handle">
        <el-select
          v-model="form.handle"
          placeholder="请选择人数"
          @change="generateInputFields3($event.value)"
          style="float: left"
        >
          <el-option label="1" value="1"></el-option>
          <el-option label="2" value="2"></el-option>
          <el-option label="3" value="3"></el-option>
        </el-select>

        <div
          v-for="(input, index) in inputFields3"
          :key="index"
          style="
            max-width: 18%;
            float: left;
            margin-left: 1em;
            margin-right: 1em;
          "
        >
          <el-input
            type="text"
            :placeholder="'请输入经办人员' + (index + 1) + '姓名'"
            v-model="inputFields3[index]"
            v-if="showInput"
            style="float: left"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item label="专家领域" prop="field">
        <el-select v-model="form.field" placeholder="请选择专业或领域">
          <el-option label="普通" value="普通"></el-option>
          <el-option label="服务" value="服务"></el-option>
          <el-option label="工程" value="工程"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item label="专家" prop="ExpertNum">
        <el-tooltip
          class="item"
          effect="light"
          content="专家人数"
          placement="top"
        >
          <el-select
            v-model="form.ExpertNum"
            placeholder="请选择人数"
            @change="generateInputFields4($event.value)"
            style="float: left"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="5" value="5"></el-option>
          </el-select>
        </el-tooltip>

        <div
          v-for="(input, index) in inputFields4"
          :key="index"
          style="
            max-width: 11%;
            float: left;
            margin-left: 1em;
            margin-right: 1em;
          "
        >
          <el-input
            type="text"
            :placeholder="'专家 ' + (index + 1)"
            style="float: left"
            v-model="inputFields4[index]"
            v-if="showInput"
            :disabled="true"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item label="备用专家" prop="preExpertNum">
        <el-tooltip
          class="item"
          effect="light"
          content="备用人员数量"
          placement="top"
        >
          <el-select
            v-model="form.preExpertNum"
            placeholder="请选择备用人数"
            @change="generateInputFields5($event.value)"
            style="float: left"
          >
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
          </el-select>
        </el-tooltip>

        <div
          v-for="(input, index) in inputFields5"
          :key="index"
          style="
            max-width: 15%;
            float: left;
            margin-left: 1em;
            margin-right: 1em;
          "
        >
          <el-input
            type="text"
            :placeholder="'备用专家 ' + (index + 1)"
            style="float: left"
            v-model="inputFields5[index]"
            v-if="showInput"
            :disabled="true"
          ></el-input>
        </div>
      </el-form-item>

      <el-form-item style="margin-top: 0.1em">
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
        <el-button @click="resetForm('form')">取消</el-button>
        <el-tooltip
          class="item"
          effect="light"
          content="随机选取专家"
          placement="top"
        >
          <el-button @click="getExpert()">随机选取</el-button>
        </el-tooltip>
        <el-button type="primary" @click="getFile()">导出</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import axios from "axios";
import { commitData } from "@/api/index";
import { exportWordDocx } from "@/utils/outword";
export default {
  data() {
    return {
      form: {
        projectName: "",
        finance: "",
        use: "",
        handle: "",
        field: "",
        ExpertNum: "",
        preExpertNum: "",
      },
      inputFields1: [],
      inputFields2: [],
      inputFields3: [],
      inputFields4: [],
      inputFields5: [],
      showInput: false,
      rules: {
        projectName: [
          { required: true, message: "请输入活动名称", trigger: "blur" },
          {
            min: 3,
            max: 10,
            message: "长度在 3 到 10 个字符",
            trigger: "blur",
          },
        ],
        finance: [
          { required: true, message: "请选择财务人数", trigger: "change" },
        ],
        use: [{ required: true, message: "请选择使用人数", trigger: "change" }],
        handle: [
          { required: true, message: "请选择经办人数", trigger: "change" },
        ],
        field: [
          { required: true, message: "请选择专家领域", trigger: "change" },
        ],
        ExpertNum: [
          { required: true, message: "请选择专家人数", trigger: "change" },
        ],
        preExpertNum: [
          { required: true, message: "请选择备用专家人数", trigger: "change" },
        ],
      },
    };
  },
  // computed: {
  //   // verifyInput() {
  //   //   // 检查 inputFields1 是否为空
  //   //   const input1Filled = this.inputFields1.every(
  //   //     (value) => value.trim() !== ""
  //   //   );
  //   //   // 检查 inputFields2 是否为空
  //   //   const input2Filled = this.inputFields2.every(
  //   //     (value) => value.trim() !== ""
  //   //   );
  //   //   // 检查 inputFields3 是否为空
  //   //   const input3Filled = this.inputFields3.every(
  //   //     (value) => value.trim() !== ""
  //   //   );
  //   //   // 检查 inputFields4 是否为空
  //   //   const input4Filled = this.inputFields4.every(
  //   //     (value) => value.trim() !== ""
  //   //   );
  //   //   // 检查 inputFields5 是否所有值都不为空
  //   //   const input5Filled = this.inputFields5.every(
  //   //     (value) => value.trim() !== ""
  //   //   );

  //   //   // 返回所有字段是否填写的验证结果
  //   //   return (
  //   //     input1Filled &&
  //   //     input2Filled &&
  //   //     input3Filled &&
  //   //     input4Filled &&
  //   //     input5Filled
  //   //   );
  //   // },
  // },
  methods: {
    generateInputFields1() {
      const numFields = parseInt(this.form.finance);
      this.inputFields1 = Array(numFields).fill("");
      this.showInput = true;
    },
    generateInputFields2() {
      const numFields = parseInt(this.form.use);
      this.inputFields2 = Array(numFields).fill("");
      this.showInput = true;
    },
    generateInputFields3() {
      const numFields = parseInt(this.form.handle);
      this.inputFields3 = Array(numFields).fill("");
      this.showInput = true;
    },
    generateInputFields4() {
      const numFields = parseInt(this.form.ExpertNum);
      if (numFields <= 5) {
        this.inputFields4 = Array(numFields).fill("");
        this.showInput = true;
      } else {
        this.inputFields4 = Array(5).fill("");
        this.showInput = true;
      }
    },
    generateInputFields5() {
      const numFields = parseInt(this.form.preExpertNum);
      if (numFields <= 3) {
        this.inputFields5 = Array(numFields).fill("");
        this.showInput = true;
      } else {
        this.inputFields5 = Array(3).fill("");
        this.showInput = true;
      }
    },
    // 检查一个输入字段数组是否所有值都不为空
    isFieldsFilled(inputFields) {
      return inputFields.every((value) => value.trim() !== "");
    },
    // for循环遍历验证数组中所存储的字段
    verifyInput() {
      const fieldsToCheck = [
        this.inputFields1,
        this.inputFields2,
        this.inputFields3,
        this.inputFields4,
        this.inputFields5,
      ];

      // 使用循环验证所有字段是否填写
      for (const field of fieldsToCheck) {
        if (!this.isFieldsFilled(field)) {
          return false;
        }
      }
      return true;
    },
    // 立即创建按钮
    onSubmit(form) {
      const formData = {
        projectName: this.form.projectName,
        finance: this.inputFields1,
        use: this.inputFields2,
        handle: this.inputFields3,
        expert: this.inputFields4,
        preExpert: this.inputFields5,
      };
      // // 处理提交逻辑，将formData发送到服务器或进行其他处理
      console.log(JSON.stringify(formData));
      const isInputFilled = this.verifyInput();
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (isInputFilled) {
            commitData(formData);
            alert("submit!");
            this.$refs.form.resetFields();
            this.resetForm();
          } else {
            alert("提交失败，请填写完整！");
          }
        } else {
          console.log("error submit!!!");
          return false;
        }
      });
    },
    // 重置
    resetForm(form) {
      this.$refs.form.resetFields();
      this.inputFields1 = [];
      this.inputFields2 = [];
      this.inputFields3 = [];
      this.inputFields4 = [];
      this.inputFields5 = [];
    },
    // 随机抽取按钮
    getExpert() {
      if (!this.form.field || !this.form.ExpertNum || !this.form.preExpertNum) {
        alert("请选择专家领域、专家人数和备用专家人数");
        return;
      }
      const loading = this.$loading({
        //这里有一个等待过程
        lock: true,
        text: "Loading",
        spinner: "el-icon-loading",
        background: "rgba(0, 0, 0, 0.7)",
      });
      axios
        .post(
          "http://localhost:8082/expert/random",
          {
            field: this.form.field,
            ExpertNum: this.form.ExpertNum,
            preExpertNum: this.form.preExpertNum,
          },
          {
            headers: {
              "Content-Type": "application/json",
              // "Content-Type":"application/x-www-form-urlencoded;charset=UTF-8"
            },
          }
        )
        .then((res) => {
          console.log(res.data);
          const data = res.data;
          // 获取数据的元素数量
          // const numData = data.length;
          // 专家人数
          const numExpert = parseInt(this.form.ExpertNum);
          // 更新 inputFields4 数组的值
          this.inputFields4 = data.slice(0, numExpert);
          // 更新 inputFields5 数组的值
          this.inputFields5 = data.slice(numExpert);
          loading.close();
        })
        .catch((err) => {
          loading.close();
          console.log(err);
        });
    },
    // 导出word
    getFile(form) {
      const exportData = {
        projectName: this.form.projectName,
        financeNum: this.form.finance,
        finance0: this.inputFields1[0],
        finance1: this.inputFields1[1],
        finance2: this.inputFields1[2],
        useNum: this.form.use,
        use0: this.inputFields2[0],
        use1: this.inputFields2[1],
        use2: this.inputFields2[2],
        handleNum: this.form.handle,
        handle0: this.inputFields3[0],
        handle1: this.inputFields3[1],
        handle2: this.inputFields3[2],
        field: this.form.field,
        expertNum: this.form.ExpertNum,
        expert0: this.inputFields4[0],
        expert1: this.inputFields4[1],
        expert2: this.inputFields4[2],
        expert3: this.inputFields4[3],
        expert4: this.inputFields4[4],
        preExpertNum: this.form.preExpertNum,
        preExpert0: this.inputFields5[0],
        preExpert1: this.inputFields5[1],
        preExpert2: this.inputFields5[2],
      };
      const isInputFilled = this.verifyInput();
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (isInputFilled) {
            alert("导出成功!");
            exportWordDocx("test.docx", exportData);
            // this.$refs.form.resetFields();
            // this.resetForm();
          } else {
            alert("导出失败，请填写完整！");
          }
        } else {
          console.log("error export!!!");
          return false;
        }
      });
    },
  },
};
</script>
<style lang="less" scoped>
.el-form-item {
  margin-bottom: 18px;
}
.inputExpert {
  max-width: 75%;
  float: left;
}
.in {
  float: left;
  max-width: 100px;
  margin-left: 0.7em;
}
</style>
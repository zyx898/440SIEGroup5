<template>
  <div>
    <el-card class="box-card">
      <h2>Sign Up</h2>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="80px"
        class="demo-ruleForm"
      >
        <el-form-item label="Username" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item label="Confirm Password" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button type="primary" @click="submitForm('ruleForm')"
          >Submit</el-button
        >
        <el-button @click="resetForm('ruleForm')">Reset</el-button>
        <el-button @click="goBack">Back</el-button>
      </div>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Password'))
      } else {
        if (this.ruleForm.checkPass !== '') {
          this.$refs.ruleForm.validateField('checkPass')
        }
        callback()
      }
    }
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('The Password does not match!'))
      } else {
        callback()
      }
    }
    return {
      ruleForm: {
        uname: '',
        pass: '',
        password: ''
      },
      rules: {
        uname: [
          {
            required: true,
            message: 'The Username can not be empty!',
            trigger: 'blur'
          }
        ],
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 400px;
}
.login-from {
  margin: auto auto;
}
</style>

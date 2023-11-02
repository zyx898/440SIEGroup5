<template>
  <div>
    <el-card class="box-card">
      <h2>Login</h2>
      <div
        v-if="showDialog"
        class="dialog"
        :class="{
          'success-dialog': dialogType === 'success',
          'error-dialog': dialogType === 'error'
        }"
      >
        {{ dialogMessage }}
      </div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-position="left"
        label-width="150px"
        class="login-from"
      >
        <el-form-item label="Username" prop="uname">
          <el-input v-model="ruleForm.uname"></el-input>
        </el-form-item>
        <el-form-item label="Password" prop="password">
          <el-input
            type="password"
            v-model="ruleForm.password"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div class="btnGroup">
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-loading="loading"
          >Login</el-button
        >
        <router-link to="/register">
          <el-button style="margin-left: 10px">Sign Up</el-button>
        </router-link>
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      ruleForm: {
        uname: '',
        password: ''
      },
      showDialog: false,
      dialogMessage: '',
      dialogType: 'success', // Can be 'success' or 'error'
      rules: {
        uname: [
          {
            required: true,
            message: 'Username can not be empty',
            trigger: 'blur'
          }
        ],
        password: [
          {
            required: true,
            message: 'Password can not be empty',
            trigger: 'blur'
          }
        ]
      },
      loading: false
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.loading = true
          axios({
            url: 'http://66.11.119.83:8423/login',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              username: this.ruleForm.uname,
              password: this.ruleForm.password // Assuming this is the correct password field
            }
          })
            .then((response) => {
              this.loading = false
              if (response.status === 200) {
                //convert response.data to json
                //store token in local storage
                // localStorage.setItem('userInfo', JSON.response.data)
                //store json in local storage
                console.log(response.data)
                localStorage.setItem('userInfo', JSON.stringify(response.data))
                //log out the userInfo
                //set login to true
                localStorage.setItem('LogedIn', true)

                this.dialogType = 'success'
                this.dialogMessage = 'Login successful!'
                this.showDialog = true
                setTimeout(() => {
                  this.showDialog = false // Hide the dialog
                  this.$router.push('/') // Redirect
                }, 2000)
              } else {
                this.dialogType = 'error'
                this.dialogMessage =
                  'Error during Login: ' +
                  (response.data.msg || 'Unknown error')
                this.showDialog = true
                // Optionally hide the dialog after some time
                setTimeout(() => {
                  this.showDialog = false
                }, 2000)
              }
            })
            .catch((error) => {
              this.loading = false
              this.dialogType = 'error'
              this.dialogMessage = 'Error during Login. Please try again.'
              this.showDialog = true
              this.resetForm(formName)
              // Optionally hide the dialog after some time
              setTimeout(() => {
                this.showDialog = false
              }, 2000)
            })
        } else {
          this.loading = false
          // Handle validation error, set an error message in a similar way
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style scoped>
.box-card {
  margin: auto auto;
  width: 500px;
}
.login-from {
  margin: auto auto;
}
.dialog {
  /* styles for your dialog */
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 20px;
  border: 1px solid #ccc;
  background-color: white;
  z-index: 1000;
}
.success-dialog {
  border-color: green;
}
.error-dialog {
  border-color: red;
}
</style>

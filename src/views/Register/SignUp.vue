<template>
  <div>
    <el-card class="box-card">
      <h2>Sign Up</h2>
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
        <el-button
          type="primary"
          @click="submitForm('ruleForm')"
          v-loading="loading"
          >Submit</el-button
        >
      </div>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Password'))
      } else {
        if (this.ruleForm.password !== '') {
          // Assuming 'password' is the prop for the confirm password field
          // and 'pass' is the prop for the password field
          this.$refs.ruleForm.validateField('password')
        }
        callback()
      }
    }

    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('Please enter Password again'))
      } else if (value !== this.ruleForm.pass) {
        callback(new Error('The Password does not match'))
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
        pass: [{ required: true, validator: validatePass, trigger: 'blur' }],
        password: [
          { required: true, validator: validatePass2, trigger: 'blur' }
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
            url: 'http://66.11.119.83:8423/register',
            method: 'post',
            headers: {
              'Content-Type': 'application/json'
            },
            data: {
              username: this.ruleForm.uname,
              password: this.ruleForm.pass // Assuming this is the correct password field
            }
          })
            .then((response) => {
              this.loading = false
              if (response.status === 200) {
                this.dialogType = 'success'
                this.dialogMessage = 'Registration successful!'
                this.showDialog = true
                setTimeout(() => {
                  this.showDialog = false // Hide the dialog
                  this.$router.push('/') // Redirect
                }, 2000)
              } else {
                this.dialogType = 'error'
                this.dialogMessage =
                  'Error during registration: ' +
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
              this.dialogMessage =
                'Error during registration. Please try again.'
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

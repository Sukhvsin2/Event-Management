<template>
  <v-app>
      <v-container class="align-center">
          <v-container>
              <h3>LOGIN</h3>
          </v-container>
          <v-form ref="loginform" v-model="valid" lazy-validation>
              <v-col>
                  <v-text-field :autofocus="true" @keyup.enter="submit" :rules="emailRules" aria-autocomplete="off" v-model="email" type="email" label="Email"></v-text-field>
                  <v-text-field @keyup.enter="submit" :rules="requiredRule" v-model="password" label="Password" @click:append="visible = !visible" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"></v-text-field>
                  <v-row>
                      <v-btn class="mx-auto my-4" @click="submit" :loading="loading">Login</v-btn>
                  </v-row>
              </v-col>
              
          </v-form>
            <v-alert v-if="errorActive" type="error">
                {{errorMsg}}
            </v-alert>
      </v-container>
  </v-app>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
            loading: false,
            valid: true,
            email: '',
            password: '',
            valid: false,
            visible: false,
            requiredRule: [
                v => !!v || 'required'
            ],
            emailRules: [
                v => !!v || 'required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            errorActive: false,
            errorMsg: 'Server error!'
        }
    },
    methods: {
        async submit(){
            if(this.$refs.loginform.validate()){
                this.loading = true;
                var check = await this.$store.dispatch('login', {email: this.email, password: this.password})
                if(check){
                    this.errorActive = check;
                    this.errorMsg = 'Email or password are wrong!!'
                }
            }
        }
    }

}
</script>

<style>

</style>
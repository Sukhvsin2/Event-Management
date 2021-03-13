<template>
  <v-app>
      <v-container class="align-center">
          <v-container>
              <h3>LOGIN</h3>
          </v-container>
          <v-form ref="loginform" lazy-validation v-bind="valid">
              <v-col>
                  <v-text-field @keyup.enter="submit" :rules="emailRules" aria-autocomplete="off" v-model="email" type="email" label="Email"></v-text-field>
                  <v-text-field @keyup.enter="submit" :rules="requiredRule" v-model="password" label="Password" @click:append="visible = !visible" :append-icon="visible ? 'mdi-eye' : 'mdi-eye-off'" :type="visible ? 'text' : 'password'"></v-text-field>
                  <v-row>
                      <v-btn class="mx-auto my-4" @click="submit">Login</v-btn>
                  </v-row>
              </v-col>
          </v-form>
      </v-container>
  </v-app>
</template>

<script>
export default {
    name:'Login',
    data(){
        return{
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
        }
    },
    methods: {
        async submit(){
            if(this.$refs.loginform.validate()){
                try {
                    const data = {
                        'email': this.email,
                        'password': this.password
                    }
                    const res = await this.$axios.post('/auth/login', data);
                    // authStore.login(res.data.tokens.access);
                    console.log(res);
                    this.$router.push({path: '/'})
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }

}
</script>

<style>

</style>
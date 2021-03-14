const authstore = {
    saveUser(data) {
        localStorage.setItem('email', data.email)
        localStorage.setItem('token', data.tokens.access)
        localStorage.setItem('username', data.username)
    },

    getToken() {
        return localStorage.getItem('token') == null ? false : true
    }
}

export default authstore;

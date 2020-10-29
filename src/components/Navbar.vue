<template>
  <div class="navbar-box">
    <div class="navbar-page container">
      <router-link to="/"><img src="../assets/img/logo.png" alt="logo"></router-link>
      <div class="login-regbtn">
        <div class="need-login" v-if="!token">
          <div class="dropdown">
            <button class="btn btn-register" id="dropdownMenuButton2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Daftar</button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton2">
              <a class="dropdown-item" href="/register">Talent</a>
              <a class="dropdown-item" href="/regisrekrut">Hiring</a>
            </div>
          </div>
          <router-link to="/login"><button class="btn btn-log">Masuk</button></router-link>
        </div>
        <div class="after-login" v-else>
          <img src="../assets/img/notiff.png" alt="bell">
          <router-link to="/chat"><img src="../assets/img/chat.png" alt="chat"></router-link>
          <div class="dropdown">
            <button class="drop-style" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <div class="navbar-profile ml-1">
                <span></span>
              </div>
            </button>
            <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
              <router-link to="/home" class="dropdown-item">Home</router-link>
              <div>
                <button class="dropdown-item" @click="sendId" v-if="userData.role === 0">Profile</button>
                <button class="dropdown-item" v-else @click="moveToProfile">Profile</button>
              </div>
              <button class="dropdown-item" @click="logOut">Logout</button>
              <router-link to="/profile" class="dropdown-item" v-if="userData.role === 0">Edit Profile</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Navbar',
  computed: {
    ...mapGetters({
      users: 'auth/getDetailUser'
    })
  },
  data () {
    return {
      token: localStorage.getItem('token'),
      userData: JSON.parse(localStorage.getItem('datauser'))
    }
  },
  methods: {
    logOut () {
      localStorage.removeItem('token')
      localStorage.removeItem('datauser')
      localStorage.removeItem('userapplicant')
      localStorage.removeItem('datadetail')
      window.location = '/'
    },
    sendId () {
      this.$router.push({ path: '/portofolio', query: { id: this.userData.id } })
    },
    moveToProfile () {
      window.location = '/profilerecrut'
    }
  }
}
</script>

<style scoped>
.navbar-box {
  background-color: #fff;
}
.navbar-page {
  padding: 15px;
}
.navbar-page {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.navbar-page img {
  width: 127px;
  height: 35px;
}
.need-login {
  display: flex;
}
.need-login button {
  font-weight: bold;
}
.need-login .btn-register {
  border: 2px solid #5E50A1;
  color: #5E50A1;
}
.need-login .btn-register:hover {
  background-color: #5E50A1;
  color: white;
}
.need-login .btn-log {
  background-color: #5E50A1;
  color: white;
  border: 2px solid #5E50A1;
  margin-left: 15px;
}
.need-login .btn-log:hover {
  background-color: transparent;
  color: #5E50A1;
}

.after-login {
  /* background-color: pink; */
  display: flex;
  justify-content: space-between;
  width: 130px;

}
.after-login img {
  width: 27px;
  height: 27px;
}
.navbar-profile {
  width: 35px;
  height: 35px;
  margin-top: -4px;
  background-size: cover;
  background-image: url(../assets/img/udin.jpg);
  border-radius: 18px;
}
.drop-style {
  border: none;
  outline: none;
  background-color: #fff;
}

@media screen and (max-width: 567px) {
  .navbar-page {
    position: fixed;
    bottom: 0;
    background-color: #fff;
    z-index: 2;
    box-shadow: 0px -6px 20px rgba(175, 175, 175, 0.25);
    border-radius: 30px 30px 0px 0px;
  }
}
</style>

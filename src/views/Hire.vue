<template>
  <div style="background: #f6f7f8">
    <Navbar />
    <div class="container pt-4">
      <b-row class="no-gutters">
        <b-col lg="5" class="mt-3">
          <UserCard />
        </b-col>
        <b-col lg="7" class="mt-3 formSize">
          <div class="divHire">
            <h2 style="font-weight: bold">Hubungi {{dataApplicant.name_user}}</h2>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Recusandae, voluptatibus?</p>

            <b-form @submit.prevent="onHire()">
              <b-form-text>Tujuan tentang posisi ini</b-form-text>

              <div>
                <b-form-select
                  v-model="projectPoint"
                  class="mb-3"
                >
                  <template v-slot:first>
                    <b-form-select-option :value="null" disabled>Project</b-form-select-option>
                  </template>
                  <b-form-select-option value="Web Developer">Web Developer</b-form-select-option>
                  <b-form-select-option value="Mobile Dev">Mobile Dev</b-form-select-option>
                  <b-form-select-option value="Project Manager">Project Manager</b-form-select-option>
                  <b-form-select-option value="DevOps Engginer">DevOps Engginer</b-form-select-option>
                  <b-form-select-option value="Lainnya">Lainnya</b-form-select-option>
                </b-form-select>
              </div>
              <b-form-text>Nama Lengkap</b-form-text>
              <b-input
                type="text"
                placeholder="Masukan nama lengkap"
                autofocus
                class="mb-4"
                v-model="user"
                required
              ></b-input>
              <b-form-text>Email</b-form-text>
              <b-input
                type="email"
                placeholder="Masukan email"
                class="mb-4"
                v-model="email"
                required
              ></b-input>
              <b-form-text>No Handphone</b-form-text>
              <b-input
                type="number"
                class="mb-4"
                placeholder="Masukan no handphone"
                v-model="noHp"
                required
              ></b-input>
              <b-form-text>Deskripsi</b-form-text>
              <b-form-textarea
                placeholder="Deskripsikan jelaskan lebih detail"
                rows="8"
                v-model="chatContent"
                required
              ></b-form-textarea>
              <button class="mt-4 p-2" block type="submit">Hire</button>
            </b-form>
          </div>
        </b-col>
      </b-row>
    </div>
    <Footer />
  </div>
</template>

<script>
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import UserCard from '../components/UserCard'
import io from 'socket.io-client'
import { url } from '../helper/env'
import { mapActions } from 'vuex'

export default {
  components: {
    Navbar,
    Footer,
    UserCard
  },
  data () {
    return {
      projectPoint: null,
      email: null,
      user: null,
      noHp: null,
      chatContent: null,
      dataApplicant: JSON.parse(localStorage.getItem('userapplicant')),
      dataUser: JSON.parse(localStorage.getItem('datauser')),
      socket: io(`${url}`)
    }
  },
  methods: {
    ...mapActions({
      insertFriend: 'auth/newFriend'
    }),
    onHire () {
      const form = {
        Position: this.projectPoint,
        email: this.email,
        name: this.user,
        hp: this.noHp,
        chat: this.chatContent
      }
      const data = {
        type_chat: 2,
        sender: this.dataUser.email,
        receiver: this.dataApplicant.email,
        message: JSON.stringify(form)
      }
      this.socket.emit('send-message-hire', data)
      const datafriend = {
        id_user: this.dataUser.id,
        id_friend: this.dataApplicant.id_user
      }
      this.insertFriend(datafriend)
    }
  },
  mounted () {
    this.socket.on('res-hire', (payload) => {
      this.$swal('success hire talent')
      this.$router.push('/chat')
    })
  }
}
</script>

<style scoped>
.formSize {
  margin-bottom: 20%;
}
.userCard {
  margin-left: 10%;
}
button {
  background: #fbb017;
  border-radius: 4px;
  border-color: #ffffff;
  width: 100%;
}
button:hover {
  background: #ffffff;
  color: #fbb017;
  border-color: #fbb017;
}
.divHire {
  margin-right: 110px;
}
.buttonSkill button {
  pointer-events: none;
  background: rgba(251, 176, 23, 0.6);
  border: 1px solid #fbb017;
  box-sizing: border-box;
  border-radius: 4px;
}
.profileHire {
  background: #ffffff;
  margin: 0px 80px 0px 100px;
  padding: 50px 0 20px 20px;
}
.profileHire img {
  width: 150px;
  height: 150px;
  margin-left: 90px;
}
@media screen and (max-width: 365px) {
  .Tets {
    background: olivedrab;
    width: 20%;
  }
  .divHire {
    margin-left: 25px;
    margin-right: 25px;
  }

  .custom-select {
    position: relative;
    font-family: Arial;
  }

  .custom-select select {
    display: none; /*hide original SELECT element:*/
  }

  .select-selected {
    background-color: DodgerBlue;
  }

  /*style the arrow inside the select element:*/
  .select-selected:after {
    position: absolute;
    content: "";
    top: 14px;
    right: 10px;
    width: 0;
    height: 0;
    border: 6px solid transparent;
    border-color: #fff transparent transparent transparent;
  }

  /*point the arrow upwards when the select box is open (active):*/
  .select-selected.select-arrow-active:after {
    border-color: transparent transparent #fff transparent;
    top: 7px;
  }

  /*style the items (options), including the selected item:*/
  .select-items div,
  .select-selected {
    color: #ffffff;
    padding: 8px 16px;
    border: 1px solid transparent;
    border-color: transparent transparent rgba(0, 0, 0, 0.1) transparent;
    cursor: pointer;
    user-select: none;
  }

  /*style items (options):*/
  .select-items {
    position: absolute;
    background-color: DodgerBlue;
    top: 100%;
    left: 0;
    right: 0;
    z-index: 99;
  }

  /*hide the items when the select box is closed:*/
  .select-hide {
    display: none;
  }

  .select-items div:hover,
  .same-as-selected {
    background-color: rgba(0, 0, 0, 0.1);
  }
}
</style>

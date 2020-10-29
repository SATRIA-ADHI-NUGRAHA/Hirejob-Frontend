<template>
  <div class="user-card">
    <div class="user-box">
      <div class="profile-image" :style="`background-image: url(http://54.160.81.6:3002/${usersData.image});`">
        <form class="form-image" enctype="multipart/form-data" @change.prevent="updateImage">
          <label class="custom-file-upload">
            <input type="file" @change="upload($event)"/>
          </label>
        </form>
      </div>
      <p class="text-secondary mt-3 text-center" style="margin-left: -15px;"><b-icon icon="pencil-fill" class="mr-1"></b-icon> Edit</p>
    </div>
    <div class="user-data mt-3">
      <div class="user-name">
        <h5 class="font-weight-bold" style="margin-bottom: 0;">{{usersData.name_user}}</h5>
        <p>{{usersData.job_desk}}</p>
      </div>
      <div>
        <p class="text-secondary" style="margin-bottom: 0;"><img src="../assets/img/map-pin.png" alt="mappin">{{usersData.address}}</p>
        <p class="text-secondary">{{usersData.job_type}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  name: 'UserCard',
  data () {
    return {
      usersData: JSON.parse(localStorage.getItem('datadetail'))
    }
  },
  methods: {
    ...mapActions({
      updateDataImage: 'auth/updateImage'
    }),
    upload (event) {
      this.image = event.target.files[0]
    },
    updateImage () {
      const dataimage = {
        image: this.image,
        iduser: this.usersData.id_user

      }
      this.updateDataImage(dataimage).then(result => {
        if (result === 'File must be png/jpg/jpeg, max size 1mb') {
          this.$swal('File must be png/jpg/jpeg, max size 1mb')
        } else if (result === 'Ukuran File terlalu besar') {
          this.$swal('max file 1mb')
        } else {
          window.location = '/'
        }
      })
    }
  }
}
</script>

<style scoped>
.user-card {
  width: 320px;
  /* height: 100%; */
  background: #FFFFFF;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px;
}
.profile-image {
  width: 130px;
  background-size: cover;
  height: 130px;
  border-radius: 70px;
}
.user-data {
  width: 100%;
}
.custom-file-input::-webkit-file-upload-button {
  cursor: pointer;
  height: 78px;
  width: 78px;
}
.form-image {
  height: 100%;
  border-radius: 30px;
  transition: all .3s ease;
  display: flex;
  justify-content: center;
  align-items: center;
}
.form-image:hover {
  background-color: rgba(5, 5, 5, 0.3);
}
.custom-file-upload input[type="file"] {
  display: none;
  border-radius: 10px;
  font-weight: bold;
  padding: 8px;
  margin: 20px auto;
}
.custom-file-upload {
  color: white;
  padding: 25px 20px;
  opacity: 0;
}
.custom-file-upload:hover {
  opacity: 1;
}
@media screen and (max-width: 576px){
  .user-card{
    width: 100%;
  }
  .profile-image{
    margin-top: -50px;
  }
  .custom-file-upload {
  color: white;
  padding: 0px;
  opacity: 0;
}
}
</style>

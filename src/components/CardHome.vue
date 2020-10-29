<template>
  <div>
    <div class="my-2 card-page">
      <b-card class="card-home" v-for="(item, index) in allUsers" :key="index" @click="seeProfile(item)">
        <div class="img-card" :style="`background-image: url(http://54.160.81.6:3002/${item.image});`">
          <span class="img"></span>
        </div>
        <b-card-text class="mt-3">
          <h4 class="font-weight-bold">{{item.name_user}}</h4>
          <div>
            <p class="job-desk text-secondary" v-if="item.job_desk === null">No Data</p>
            <p class="job-desk text-secondary" v-else>{{item.job_desk}}</p>
          </div>
          <img src="../assets/img/map-pin (4) 1.svg" class="map" />
          {{item.address}}
        </b-card-text>
        <div class="skill-list">
          <div v-for="(item2, index1) in skillsData.data[index]" :key="index1">
            <button class="btn text-white">{{item2}}</button>
          </div>
        </div>
        <p class="ml-2 font-weight-bold text-secondary p-1" style="border-radius: 5px; background-color: #f6f7f8; float: right; margin-top: -35px;">{{skillsData.total[index]}} +</p>
      </b-card>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
  name: 'CardUser',
  computed: {
    ...mapGetters({
      allUsers: 'auth/getAllUser',
      skillsData: 'auth/getAllSkills'
    })
  },
  methods: {
    ...mapActions({
      getDataUser: 'auth/getAllUser'
    }),
    seeProfile (value) {
      localStorage.setItem('userapplicant', JSON.stringify(value))
      this.$router.push({ path: '/portofolio', query: { id: value.id_user } })
    }
  },
  mounted () {
    const data = {
      search: '',
      sort: '',
      page: 1
    }
    this.getDataUser(data)
  }
}
</script>

<style scoped>
.skill-list .btn {
  background: rgba(251, 176, 23, 0.6);
  border: 1px solid #fbb017;
  box-sizing: border-box;
  border-radius: 4px;
  height: 100%;
  margin-right: 10px;
}

.skill-list {
  display: flex;
  width: 100%;
}

.card-home {
  background: #ffffff;
  border-radius: 4px;
  padding-left: 4px;
}
.img-card {
  width: 100px;
  height: 100px;
  background-size: cover;
  margin-left: 10px;
  border-radius: 10px;
}
.card-home:hover {
  opacity: 0.7;
  cursor: pointer;
}
.card-page {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(170px, 300px));
  gap: 16px;
  justify-content: center;
}
@media only screen and (max-width: 576px) {
  .card-home {
    text-align: left;
  }
  h3 {
    padding-left: 35px;
    font-size: 23px;
  }
  .job-desk {
    padding-left: 35px;
  }
  .img-card {
    margin-left: 65px;
  }
  .map {
    padding-left: 50px;
  }
}
</style>

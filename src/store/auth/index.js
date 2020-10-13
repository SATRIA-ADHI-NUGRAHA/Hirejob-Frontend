import axios from 'axios'
import { url } from '../../helper/env'

const state = () => {
  return {
    token: localStorage.getItem('token') || null,
    detailUser: [],
    dataPorfolio: []
  }
}
const getters = {
  isLogin (state) {
    if (state.token !== null) {
      return true
    } else {
      return false
    }
  },
  getDetailUser (state) {
    const data1 = state.detailUser
    const skill1 = `${data1.skill}`
    const skill2 = skill1.split(',')
    data1.skill = skill2
    return data1
  },
  getPortfolio (state) {
    return state.dataPorfolio
  }
}

const mutations = {
  SET_DETAIL_USER: (state, payload) => {
    state.detailUser = payload
  },
  SET_PORTFOLIO: (state, payload) => {
    state.dataPorfolio = payload
  }
}

const actions = {
  login (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/v1/user/login`, payload)
        .then((result) => {
          resolve(result.data.message)
          localStorage.setItem('token', result.data.data.token)
          localStorage.setItem('datauser', JSON.stringify(result.data.data))
        })
        .catch((err) => {
          console.log(err.message)
        })
    })
  },
  logout (context) {
    return new Promise((resolve) => {
      localStorage.removeItem('token')
      resolve()
    })
  },
  register (context, payload) {
    return new Promise((resolve, reject) => {
      axios.post(`${url}/v1/user/register`, {
        name: payload.nama,
        email: payload.email,
        handphone: payload.handphone,
        password: payload.password,
        role: payload.role
      })
        .then((result) => {
        //   alert('Success Sign Up, please Log In')
        //   resolve(result.data.message)
        //   window.location = '/'
          console.log(result)
        })
        .catch((err) => {
          console.log(err.message)
        })
    })
  },
  getOneUser (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/v1/user/${payload}`).then(result => {
        context.commit('SET_DETAIL_USER', result.data.data[0])
        resolve(result.data.data[0])
        // console.log(result.data.data[0])
      }).catch(err => {
        console.log(err)
      })
    })
  },
  findPortfolio (context, payload) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/v1/portfolio/findone/${payload}`).then(result => {
        context.commit('SET_PORTFOLIO', result.data.data)
        // console.log(result)
      }).catch(err => {
        console.log(err)
      })
    })
  },
  updateProfileTalent (context, payload) {
    return new Promise((resolve, reject) => {
      const skill = payload.dataSkill
      let skill2 = null
      if (skill[0] === '...') {
        skill.slice(1)
        skill2 = skill
      } else {
        skill2 = skill
      }
      axios.patch(`${url}/v1/user/edit/${payload.id}`, {
        name_user: payload.fullnameApplicant,
        job_desk: payload.jobdescApplicant,
        workplace: payload.placeWorkApplicant,
        address: payload.domApplicant,
        description: payload.bioApplicant,
        skill: skill2.join(',')
      }).then(result => {
        resolve(result.data.message)
      }).catch((err) => {
        console.log(err)
      })
    })
  },
  addPortfolio (context, payload) {
    return new Promise((resolve, reject) => {
      const fd = new FormData()
      fd.append('name_app', payload.namePortfolio)
      fd.append('id_user', payload.id)
      fd.append('type_portfolio', payload.portfolioType)
      fd.append('image_port', payload.imagePortfolio)
      fd.append('repository_link', payload.linkRepository)
      axios.post(`${url}/v1/portfolio/insertone`, fd).then((result) => {
        resolve(result.data.message)
      }).catch((err) => {
        console.log(err)
      })
    })
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations,
  getters
}

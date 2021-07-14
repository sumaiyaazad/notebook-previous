const state = {
  password:''
};
const mutations = {
  'SET_PASSWORD'(state,password){
    state.password = password;
  }
};

const actions = {
  setPassword: ({commit},password)=>{
    commit('SET_PASSWORD',password);
  }
};

const getters = {
  password: state =>{
    return state.password;
  }
};

export default {
  state,
  mutations,
  actions,
  getters
}

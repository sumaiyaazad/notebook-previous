const state = {
    notification:''
};
const mutations = {
    'SET_NOTIFICATION'(state,notification){
        state.notification = notification;
    }
};

const actions = {
    setNotification: ({commit},notification)=>{
        commit('SET_NOTIFICATION',notification);
    }
};

const getters = {
    notification: state =>{
        return state.notification;
    }
};

export default {
    state,
    mutations,
    actions,
    getters
}

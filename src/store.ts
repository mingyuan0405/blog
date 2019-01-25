import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  	state: {
  		SocketRes:{areas:[]}
  	},
  	mutations: {
  		restSock(state, data) {
		    state.SocketRes = data;
	  	}
  	},
  	actions: {

  	},
});

import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';
Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		tesData: [],
		autoCompFreg: [],
		searchResult: [],
		page: 1,
		position: { lat: 41.24234, lng: -8.525947 },
		api: process.env.VUE_APP_REST_API,
		//msg: ''
	},
	getters: {
		fregs: (state) => state.autoCompFreg,
		page: (state) => state.page
	},

	mutations: {
		setFregs(state, fregs) {
			state.autoCompFreg = fregs;
		},
		newFreg(state, fregs) {
			state.autoCompFreg.push(fregs);
		},
		setPage(state) {
			state.page = 1;
		},
		addData(state, newData) {
			state.tesData.push(newData);
		},
		/*
		changeMsg(state, newMsg) {
			state.msg = newMsg;
			console.log(state.msg);
		}
		*/
	},
	actions: {
		async fetchFregs({ commit }) {
			try {
				const response = await axios.get(this.state.api + '/freg');
				commit('setFregs', response.data);
			} catch (error) {
				console.error(error);
			}
		}
	}
});

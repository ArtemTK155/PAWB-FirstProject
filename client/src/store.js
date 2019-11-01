import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		count: 0,
		tesData: [],
		dummy: 'hello',
		autoCompEmpNames: [],
		autoCompFreg: [],
		namesAdded: false,
		searchResult: []
	},
	getters: {
		names: (state) => state.autoCompEmpNames,
		fregs: (state) => state.autoCompFreg
	},

	mutations: {
		setNames(state, names) {
			state.autoCompEmpNames = names;
		},
		newName(state, names) {
			state.autoCompEmpNames.push(names);
		},
		setFregs(state, fregs) {
			state.autoCompFreg = fregs;
		},
		newFreg(state, fregs) {
			state.autoCompFreg.push(fregs);
		},

		increment() {
			this.state.count++;
		},
		addData(state, newData) {
			// console.log("Mutatuing in store")
			state.tesData.push(newData);
			//console.log(state.tesData)
		},
		addDataEmpNames(state, newData) {
			console.log('Mutatuing in store');
			state.autoCompEmpNames.push(newData);
			console.log(state.autoCompEmpNames);
		},
		async getEmpNames(state) {
			try {
				const response = await axios.get('http://localhost:4000/empresas/name');
				state.autoCompEmpNames = response;
			} catch (error) {
				console.error(error);
			}
		},
		async addDataFreg(state) {
			try {
				const response = await axios.get('http://localhost:4000/empresas/freg');
				state.autoCompFreg = response;
			} catch (error) {
				console.error(error);
			}
		},
		add(state) {
			console.log('added');
			state.autoCompEmpNames.push();
		}
	},
	actions: {
		async fetchNames({ commit }) {
			try {
				const response = await axios.get('http://localhost:4000/empresas/name');
				console.log('action');
				commit('setNames', response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async fetchFregs({ commit }) {
			try {
				const response = await axios.get('http://localhost:4000/empresas/freg');
				console.log('action');
				commit('setFregs', response.data);
			} catch (error) {
				console.error(error);
			}
		},
		async addNames({ commit }) {
			try {
				const response = await axios.get('http://localhost:4000/empresas/name');
				commit('newName', response.data);
			} catch (error) {
				console.error(error);
			}
		}
	}
});

import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
	state: {
		loadedMeetups: [
			{ imageUrl: 'https://lh3.googleusercontent.com/-x65BJuAWLjU/VRWeJLUocoI/AAAAAAAAAgc/PCC76OygIfs/w530-h353-n/527919_10151019808207611_605840515_n_zpsb7525882.jpg', 
				id: 'asdkfjasdklfjeksjaf345', 
				title: 'Reunion en santa cruz bolivia',
				date: '2018-10-01'
			},
			{ imageUrl: 'https://www.lavocedireggioemilia.it/wp-content/uploads/2017/03/s-francisco.jpg', 
				id: 'dlafkjdslafkkdjslkjd32', 
				title: 'reunion en san francisco usa',
				date: '2018-10-12'
			}
		],
		user: {
			id: 'dlsafjdlk1',
			registeredMeetups: ['asdfkdjslkafj23']
		}
	},
	mutations: {
		createMeetup (state, payload) {
			state.loadedMeetups.push(payload)
		}
	},
	actions: {
		createMeetup ({commit}, payload) {
			const meetup = {
				title: payload.title,
				location: payload.location,
				imageUrl: payload.imageUrl,
				description: payload.description,
				date: payload.date,
				id: 'dlafjdasf23'

			}
			// Reach out to firebase and store it
			commit('createMeetup', meetup)
		}
	},
	getters: {
		loadedMeetups (state) {
			return state.loadedMeetups.sort((meetupA, meetupB) => {
				return meetupA.date > meetupB.date
			})
		},
		featuredMeetups (state, getters) {
			return getters.loadedMeetups.slice(0, 5)
		},
		loadedMeetup (state) {
			return (meetupId) => {
				return state.loadedMeetups.find((meetup) => {
					return meetup.id === meetupId
				})
			}
		}
	}
})
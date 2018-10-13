<template>
	<v-container>
		<v-layout row>
			<v-flex xs12 sm6 offset-sm3>
				<h1 class="brown--text">Crear una reunión</h1>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex xs12>
				<form @submit.prevent="onCreateMeetup">
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="title"
								label="Título"
								id="title"
								v-model="title"
								required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="location"
								label="Lugar"
								id="location"
								v-model="location"
								required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="imageUrl"
								label="Ruta de la imagen"
								id="imageUrl"
								v-model="imageUrl"
								required></v-text-field>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" height="150">
						</v-flex>
					</v-layout>
<!-- 					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-text-field
								name="description"
								label="Descripción"
								id="description"
								multi-line
								v-model="description"
								required></v-text-field>
						</v-flex>
					</v-layout> -->
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<h3>Elige una fecha y hora</h3>
						</v-flex>
					</v-layout>
					<v-layout row class="mb-2">
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date"></v-date-picker>
							<p>{{ date }}</p>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-time-picker v-model="time"></v-time-picker>
							<p>{{ time }}</p>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-btn 
								color="error" 
								:disabled="!formIsValid"
								type="submit">Crear Reunión</v-btn>
						</v-flex>
					</v-layout>
				</form>
								{{submittableDateTime}}
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
	export default {
		data () {
			return {
				title: '',
				location: '',
				imageUrl: '',
				description: '',
				date: null,
				time: null
			}
		},
		computed: {
			formIsValid () {
				return this.title !== '' && 
					this.location !== '' && 
					this.imageUrl !== '' && 
					this.description !== ''
			},
			submittableDateTime () {
				const date = new Date(this.date)
				if (typeof this.time === 'string') {
					let hours = this.time.match(/^(\d+)/)[1]
					const minutes = this.time.match(/:(\d+)/)[1]
					date.setHours(hours)
					date.setMinutes(minutes)	
				} else {
					// date.setHours(this.time.getHours())
					// date.setMinutes(this.time.getMinutes())
				}
				console.log(date)
				return date
			}
		},
		methods: {
			onCreateMeetup () {
				if (!this.formIsValid) {
					return
				}
				const meetupData = {
					title: this.title,
					location: this.location,
					imageUrl: this.imageUrl,
					description: this.description,
					date: new Date()
				}
				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/reuniones')
			}
		}
	}
</script>
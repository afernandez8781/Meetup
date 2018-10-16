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
							
							<v-btn raised color="error" @click="onPickFile">Subir Imagen</v-btn>
							<input 
								type="file" 
								style="display: none" 
								ref="fileInput" 
								accept="image/*"
								@change="onFilePicked">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<img :src="imageUrl" height="150">
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-textarea
								name="description"
								label="Descripción"
								id="description"
								multi-line
								v-model="description"
								required></v-textarea>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<h3>Elige una fecha y hora</h3>
						</v-flex>
					</v-layout>
					<v-layout row class="mb-2">
						<v-flex xs12 sm6 offset-sm3>
							<v-date-picker v-model="date" locale="es"></v-date-picker>
						</v-flex>
					</v-layout>
					<v-layout row>
						<v-flex xs12 sm6 offset-sm3>
							<v-time-picker v-model="time" format="24hr"></v-time-picker>
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
				time: null,
				image: null
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
				} 
				// else {
				// 	date.setHours(this.time.getHours())
				// 	date.setMinutes(this.time.getMinutes())
				// }
				return date
			}
		},
		methods: {
			onCreateMeetup () {
				if (!this.formIsValid) {
					return
				}
				if (!this.image) {
					return
				}
				const meetupData = {
					title: this.title,
					location: this.location,
					image: this.image,
					description: this.description,
					date: this.submittableDateTime
				}

				this.$store.dispatch('createMeetup', meetupData)
				this.$router.push('/reuniones')
			},
			onPickFile () {
				this.$refs.fileInput.click()
			},
			onFilePicked (event) {
				const files = event.target.files
				let filename = files[0].name
				if (filename.lastIndexOf('.') <= 0) {
					return alert('por favor suba una imagen valida')
				}
				const fileReader = new FileReader()
				fileReader.addEventListener('load', () => {
					this.imageUrl = fileReader.result
				})
				fileReader.readAsDataURL(files[0])
				this.image = files[0]
			}
		}
	}
</script>
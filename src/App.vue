<template>
  <v-app>

    <v-navigation-drawer dark class="brown darken-1" temporary v-model="sideNav" absolute>
      <v-list>
        <v-list-tile 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-list-tile-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>{{ item.title }}</v-list-tile-content>
        </v-list-tile>

        <v-list-tile 
          v-if="userIsAuthenticated"
          @click="onLogout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>Cerrar sesión</v-list-tile-content>
        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    
    <v-toolbar dark class="brown darken-1">
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-sm-and-up "></v-toolbar-side-icon>
      <v-toolbar-title>
        <router-link to="/" tag="span" style="cursor: pointer">Meetup</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-xs-only">
        <v-btn 
          flat 
          v-for="item in menuItems" 
          :key="item.title"
          :to="item.link">
          <v-icon >{{ item.icon }}</v-icon>
        {{ item.title }}
      </v-btn>

      <v-btn 
          v-if="userIsAuthenticated"
          flat
          @click="onLogout">
          <v-icon dark>exit_to_app</v-icon>
        Cerrar sesón
      </v-btn>

      </v-toolbar-items>
    </v-toolbar>

    
    <main>
      <router-view></router-view>
    </main>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      sideNav: false,
    }
  },
  computed: {
    menuItems () {
      let menuItems = [
        { icon: 'face', title: 'Regístrate', link: '/registrate' },
        { icon: 'lock_open', title: 'registrarse', link: '/registrarse' },
      ]
      if (this.userIsAuthenticated) {
        menuItems = [
          { icon: 'supervisor_account', title: 'Ver reunión', link: '/reuniones' },
          { icon: 'room', title: 'Organizar reunión', link: '/reunion/nuevo' },
          { icon: 'person', title: 'Perfil', link: '/perfil'},
        ]
      }
      return menuItems
    },
    userIsAuthenticated () {
      return this.$store.getters.user !== null && this.$store.getters.user !== undefined
    }
  },
  methods: {
    onLogout () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<style>
  .custom-loader {
    animation: loader 1s infinite;
    display: flex;
  }
  @-moz-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-webkit-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @-o-keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
  @keyframes loader {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }
</style>
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
        {{ item.title }}</v-btn>
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
      menuItems: [
        { icon: 'supervisor_account', title: 'Ver reunión', link: '/reuniones' },
        { icon: 'room', title: 'Organizar reunión', link: '/reunion/nuevo' },
        { icon: 'person', title: 'Perfil', link: '/perfil'},
        { icon: 'face', title: 'Regístrate', link: '/registrate' },
        { icon: 'lock_open', title: 'registrarse', link: '/registrarse' },
      ]
    }
  },
  name: 'App'
}
</script>

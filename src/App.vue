<template>
  <v-app>
    <v-navigation-drawer app v-model="openMenu">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="title">Menu</v-list-item-title>
          <v-list-item-subtitle>subtext</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list dense nav>
        <v-list-item v-for="item in menuItems" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" :elevate-on-scroll="true">
      <v-app-bar-nav-icon @click="openMenu=!openMenu"></v-app-bar-nav-icon>

      <v-toolbar-title>KING QUEEN VOTING</v-toolbar-title>

      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    openMenu: false,
    menuItems : [
      {  icon:"", title:"Home", to:"/"},
      {  icon:"", title:"Selection", to:"/selection"}
    ]
  })
};
</script>

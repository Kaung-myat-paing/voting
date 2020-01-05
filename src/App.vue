<template>
  <v-app>
    <v-navigation-drawer app v-model="openMenu">
      <!-- <v-list-item>
        <v-list-item-avatar>
          <v-img src="@/assets/itclub-iconlogo.png" contain></v-img>
        </v-list-item-avatar>

        <v-list-item-content>
          <v-list-item-title>Menu</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>-->

      <v-list dense nav>
        <v-list-item v-for="item in menuItems" :key="item.title" link :to="item.to">
          <v-list-item-icon>
            <v-avatar v-if="item.to=='/aboutUs'" size="26">
              <v-img src="@/assets/itclub-iconlogo.png" contain></v-img>
            </v-avatar>

            <v-icon v-else>{{item.icon}}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-app-bar app color="white" :elevate-on-scroll="true">
      <v-app-bar-nav-icon @click="openMenu=!openMenu"></v-app-bar-nav-icon>
      <v-toolbar-title></v-toolbar-title>
      <v-spacer></v-spacer>
    </v-app-bar>
    <v-content>
      <router-view></router-view>
    </v-content>
    <v-footer>
      <v-flex xs12 md12 lg12 sm12 text-xs-center text-md-center text-sm-center text-lg-center pa-2>
        Powered by
        <img src="@/assets/itclub-iconlogo.png" alt="IT Club - UCS Maubin" width="30" />
        IT Club - UCS Maubin
      </v-flex>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: "App",

  components: {},

  data: () => ({
    openMenu: false,
    menuItems: [
      { icon: "home", title: "Home", to: "/" },
      { icon: "person", title: "Selection", to: "/selection" },
      { icon: "", title: "About Us", to: "/aboutUs" }
    ]
  })
};
</script>

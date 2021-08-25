<template>
  <!-- Add menu with this tutorial: https://vuetifyjs.com/en/components/app-bars/#menu -->
  <v-menu left bottom>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on" v-on:click="LoggedIn()" >
        <!-- TODO: Add here user icon -->
        <v-icon>mdi-account-circle</v-icon>
      </v-btn>
    </template>

   <v-list dense rounded nav v-if="!isLogged">
      <v-list-item 
     
        v-for="item in items"
        :key="item.title"
        router
        :to="item.route"
        
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
    </v-list >
    <v-list dense rounded nav v-if="isLogged">
      <v-list-item 
     
        v-for="item in items2" 
        
        :key="item.title"
        router
        :to="item.route"
        
      >
        <v-list-item-icon>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-item-icon>
        <v-list-item-content>
          <v-list-item-title>{{ item.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      
    </v-list>
  </v-menu>
</template>

<script>
export default {
  name: "UserIcon",
  data: () => ({
    items: [
      
      { title: "Login", route: "/user/login", icon: "mdi-login"  },
      { title: "Register", route: "/user/register", icon: "mdi-account-plus",   },
      
    ],
    items2:[
/* TODO: Show only if logged. */
      { title: "Account", route: "/user/profile", icon: "mdi-account" },
      { title: "Logout", route: "/user/logout", icon: "mdi-logout" },
      /*ps: l'account pubblico*/ 
    ],
    isLogged:false,
  }),

  methods: {
  LoggedIn() {
    if(localStorage.getItem('jwt') != null){
      this.isLogged=true
    }else{
      this.isLogged=false

    }
    
  }
}

};
</script>
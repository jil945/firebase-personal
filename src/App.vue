<template>
    <v-app v-bind:dark="dark">
        <v-navigation-drawer absolute
                            overlfow
                            app
                            v-model="showDrawer">
            <v-list>
                <v-list-tile v-for="item in drawerItems" 
                             v-bind:key="item.title"
                v-bind:to="item.route">
                    <v-list-tile-action>
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-tile-action>

                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-navigation-drawer>
        <v-toolbar app absolute>
            <v-toolbar-side-icon v-on:click.stop="showDrawer = !showDrawer"></v-toolbar-side-icon>
            <v-toolbar-title>jimlee.dev</v-toolbar-title>
            
            <v-spacer></v-spacer>
            
            <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                    <v-btn icon
                            v-on="on"
                    v-on:click.stop="dark = !dark">
                        <v-icon>{{ dark ? "brightness_low" : "brightness_4" }}</v-icon>
                    </v-btn>
                </template>
                <span>Dark Mode</span>
            </v-tooltip>
        </v-toolbar>

        <v-content>
            <v-container>
                <router-view></router-view>
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
import store from "./store";
import { mapState } from "vuex";

export default {
    name: "App",
    data () {
        return {
            showDrawer: false,
            drawerItems: [{
                title: "Home",
                icon: "home",
                route: { name: "Home" }
            }, {
                title: "About",
                icon: "help",
                route: { name: "About" }
            }]
        };
    },
    computed: {
        dark: {
            get() {
                return store.state.settings.dark; 
            },
            set(o){
                store.commit("setSettings", { field: "dark", value: !!o }); 
            }
        }
    },
    beforeCreate() {
        store.dispatch("fetchSettings");
    }
};
</script>

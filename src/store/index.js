import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

const SETTINGS_KEY = key => `store.state.settings.${key}`;

export default new Vuex.Store({
    state: {
        settings: {
            dark: false,
        }
    },
    mutations: {
        setSettings: (state, { field, value }) => {
            if (field in state.settings) {
                state.settings[field] = value;
                window.localStorage.setItem(
                    SETTINGS_KEY(field),
                    JSON.stringify(value)
                );
            }
        }
    },
    actions: {
        fetchSettings: ({ commit, state }) => {
            console.log("Fetch settings");
            for (let field in state.settings) {
                let storageValue = window.localStorage.getItem(SETTINGS_KEY(field));
                if (storageValue && storageValue.length > 0) {
                    let value = JSON.parse(storageValue);
                    commit("setSettings", { field, value });
                }
            }
        }
    }
});
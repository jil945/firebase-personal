import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const router =  new Router({
    mode: "history",
    base: process.env.BASE_URL,
    routes: [{
        path: "/",
        redirect: { name: "Home" }
    }, {
        path: "/home",
        name: "Home",
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import( /* webpackChunkName: "about" */ "./views/Home.vue")
    }, {
        path: "/about",
        name: "About",
        component: () => import( "./views/About.vue")
    }]
});

router.beforeEach((to, from , next) => {
    document.title = to.name + " \u2013 jimlee.dev";
    next();
});

export default router;
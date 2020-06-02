import Vue from "vue";
import VueRouter from "vue-router";
import Top from "@/components/Top.vue";
import Prefectures from "@/components/Prefectures.vue";
import TotalStats from "@/components/TotalStats.vue";
import Detail from "@/components/Detail.vue";
import JMap from "@/components/JMap.vue";
Vue.use(VueRouter);

const routes = [{
        path: "/",
        name: "Top",
        component: Top
    },
    {
        path: "/detail/:id",
        name: "Detail",
        component: Detail
    },
    {
        path: "/jmap",
        name: "JMap",
        component: JMap
    },
    {
        path: "/prefectures",
        name: "Prefectures",
        component: Prefectures
    },
    {
        path: "/stats",
        name: "Stats",
        component: TotalStats
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;
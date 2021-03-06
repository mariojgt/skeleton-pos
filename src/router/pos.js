// import the middleware to check if the user is logged in
import * as auth from "../boot/middleware/auth";

export default [
    // Users routes
    {
        path: "/user",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            {
                path: "profile",
                component: () => import("src/pages/user/View.vue"),
                parameters: { user: String },
            },
        ],
        beforeEnter: [auth.checkAuth]
    },
    // The main page need to be login to access
    {
        path: "/pos",
        component: () => import("layouts/MainLayout.vue"),
        children: [
            { path: "", component: () => import("src/pages/pos/Index.vue") },
        ],
        beforeEnter: [auth.checkAuth]
    }
];

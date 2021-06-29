import React from "react"

const PublicRoutes = [
  {
    path: '/login',
    exact: true,
    component: <p>hello</p>
  },
  {
    path: '/chat',
    exact: true,
    component: React.lazy(() => import("../pages/chatpage/ChatPage")),
  },
  {
    path: '/home',
    exact: true,
    component: React.lazy(() => import("../pages/homepage/HomePage")),
  },
  {
    path: '/about',
    exact: true,
    component: React.lazy(() => import("../pages/aboutpage/AboutPage")),
  },
];

const PrivateRoutes = [];

export { PublicRoutes, PrivateRoutes };
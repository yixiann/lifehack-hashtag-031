import React from "react"

const PublicRoutes = [
  {
    path: '/login',
    exact: true,
    component: React.lazy(() => import("../pages/loginpage/LoginPage"))
  },
];

const PrivateRoutes = [
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
  {
    path: '/lessondata',
    exact: true,
    component: React.lazy(() => import("../pages/lessondatapage/LessonDataPage")),
  }
];

export { PublicRoutes, PrivateRoutes };
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
    path: '/teacher/dashboard',
    exact: true,
    component: React.lazy(() => import("../pages/homepage/TeacherHomePage")),
  },
  {
    path: '/student/dashboard',
    exact: true,
    component: React.lazy(() => import("../pages/homepage/StudentHomePage")),
  },
  {
    path: '/teacher/about',
    exact: true,
    component: React.lazy(() => import("../pages/aboutpage/AboutPage")),
  },
  {
    path: '/student/about',
    exact: true,
    component: React.lazy(() => import("../pages/aboutpage/AboutPage")),
  },
];

export { PublicRoutes, PrivateRoutes };
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
    path: '/teacher/schedule',
    exact: true,
    component: React.lazy(() => import("../pages/schedule/TeacherSchedulePage")),
  },
  {
    path: '/student/schedule',
    exact: true,
    component: React.lazy(() => import("../pages/schedule/SchedulePage")),
  },
  {
    path: '/lessondata',
    exact: true,
    component: React.lazy(() => import("../pages/lessondatapage/LessonDataPage")),
  },
  {
    path: '/lessondata/livedata',
    exact: true,
    component: React.lazy(() => import("../pages/lessondatapage/LiveDataPage")),
  },
  {
    path: '/lessondata/reviewdata',
    exact: true,
    component: React.lazy(() => import("../pages/lessondatapage/ReviewDataPage")),
  },
];

export { PublicRoutes, PrivateRoutes };
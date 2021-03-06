import { Children } from "react";

const RoutePaths = {
  'login' : {
    path: '/login',
    sider: false,
  },
  'home' : {
      path: '/home',
      sider: true,
      siderName: 'Home',
  },
  'chat' : {
    path: '/chat',
    sider: true,
    siderName: 'Chat',
  },
  'about' : {
    path: '/about',
    sider: true,
    siderName: 'About',
  },
  'lessonData' : {
    path: '/lessondata',
    sider: true,
    siderName: 'Lesson Data',
  },
};

export { RoutePaths };

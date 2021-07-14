import Card from "./components/CardView/Card";
import SignUp from "./components/CardView/SignUp";
import SignIn from "./components/CardView/SignIn";
import Settings from "./components/CardView/Settings";
import Notes from "./components/NoteView/Notes";
import NoteList from "./components/NoteView/NoteList";
import NoteEdit from "./components/NoteView/NoteEdit";
export const routes = [
  { path: '/app', name: 'cardroute',components: {
      'app-body': Card
    },children: [
      {path: '/app/signup', name: 'signup',component: SignUp},
      {path: '/app/signin', name:'signin',component: SignIn},
      {path: '/app/settings',name:'settings',component: Settings},
    ]},
  { path: '/note',name: 'noteroute',components: {
      'app-body': Notes
    },children: [
      {path: '/note/home',name:'home',component: NoteList},
      {path: '/note/edit',name:'edit',component: NoteEdit}
    ]},
  {
    path: '',redirect: '/app/signin'
  }
];

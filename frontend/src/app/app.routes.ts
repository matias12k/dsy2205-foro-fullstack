import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login.component';
import { RegisterComponent } from './pages/register.component';
import { RecoverPasswordComponent } from './pages/recover-password.component';
import { ProfileComponent } from './pages/profile.component';
import { ForumComponent } from './pages/forum.component';
import { TopicDetailComponent } from './pages/topic-detail.component';
import { TopicCreateComponent } from './pages/topic-create.component';
import { AdminComponent } from './pages/admin.component';
export const routes:Routes=[
 {path:'login',component:LoginComponent},{path:'register',component:RegisterComponent},{path:'recover-password',component:RecoverPasswordComponent},
 {path:'profile',component:ProfileComponent},{path:'forum',component:ForumComponent},{path:'topics/new',component:TopicCreateComponent},
 {path:'topics/:id',component:TopicDetailComponent},{path:'admin',component:AdminComponent},{path:'',redirectTo:'forum',pathMatch:'full'}
];

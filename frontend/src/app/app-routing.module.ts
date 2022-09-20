import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { LoginComponent } from './login/login.component';
import { ModComponent } from './mod/mod.component';
import { RegisterComponent } from './register/register.component';
import { UserComponent } from './user/user.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ChangeComponent } from './change/change.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { BorrowedComponent } from './borrowed/borrowed.component';
import { HistoryComponent } from './history/history.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';

const routes: Routes = [
  {path:'', component:HomepageComponent},
  {path:'login', component: LoginComponent},
  {path:'user', component: UserComponent},
  {path:'admin', component: AdminComponent},
  {path:'mod', component: ModComponent},
  {path:'register', component: RegisterComponent},
  {path:'menu', component: MenuComponent},
  {path:'adminlogin', component: AdminloginComponent},
  {path:'change', component: ChangeComponent},
  {path:'profile', component: ProfileComponent},
  {path:'search', component: SearchComponent},
  {path:'book', component: BookComponent},
  {path:'borrowed', component: BorrowedComponent},
  {path:'history', component: HistoryComponent},
  {path:'updateuser', component:UpdateuserComponent},
  {path:'adduser', component:AdduserComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

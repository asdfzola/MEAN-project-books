import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { ModComponent } from './mod/mod.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomepageComponent } from './homepage/homepage.component';
import { MenuComponent } from './menu/menu.component';
import { AdminloginComponent } from './adminlogin/adminlogin.component';
import { ChangeComponent } from './change/change.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchComponent } from './search/search.component';
import { BookComponent } from './book/book.component';
import { BorrowedComponent } from './borrowed/borrowed.component';
import { HistoryComponent } from './history/history.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';
import { AdduserComponent } from './adduser/adduser.component';




@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    UserComponent,
    ModComponent,
    RegisterComponent,
    LoginComponent,
    HomepageComponent,
    MenuComponent,
    AdminloginComponent,
    ChangeComponent,
    ProfileComponent,
    SearchComponent,
    BookComponent,
    BorrowedComponent,
    HistoryComponent,
    UpdateuserComponent,
    AdduserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

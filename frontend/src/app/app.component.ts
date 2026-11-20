import { Component,inject } from '@angular/core';
import { Router,RouterLink,RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ForumService } from './forum.service';
@Component({
 selector:'app-root',standalone:true,imports:[CommonModule,RouterLink,RouterOutlet],
 template:`<nav class="navbar navbar-expand-md navbar-dark bg-primary shadow-sm">
 <div class="container"><a class="navbar-brand" routerLink="/forum">Foro Cloud</a>
 <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#nav"><span class="navbar-toggler-icon"></span></button>
 <div class="collapse navbar-collapse" id="nav"><div class="navbar-nav ms-auto">
 <a class="nav-link" routerLink="/forum">Temas</a>
 <a class="nav-link" routerLink="/topics/new" *ngIf="session$|async">Nuevo tema</a>
 <a class="nav-link" routerLink="/admin" *ngIf="(session$|async)?.role==='ADMINISTRADOR'">Administración</a>
 <a class="nav-link" routerLink="/profile" *ngIf="session$|async">Perfil</a>
 <a class="nav-link" routerLink="/login" *ngIf="!(session$|async)">Entrar</a>
 <button class="nav-link btn btn-link text-white" *ngIf="session$|async" (click)="logout()">Salir</button>
 </div></div></div></nav><main class="content-shell"><router-outlet/></main>`
})
export class AppComponent{private forum=inject(ForumService);private router=inject(Router);session$=this.forum.session;logout(){this.forum.logout();this.router.navigate(['/login'])}}

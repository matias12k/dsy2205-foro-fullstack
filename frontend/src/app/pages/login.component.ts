import { Component,inject } from '@angular/core'; import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms'; import { Router,RouterLink } from '@angular/router'; import { ForumService } from '../forum.service';
@Component({standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],template:`<div class="container py-4 py-md-5"><div class="row justify-content-center"><div class="col-12 col-md-10 col-lg-7 auth-shell">
 <section class="card p-3 p-md-4"><h1 class="h3 mb-4">Inicio de sesión</h1><form [formGroup]="form" (ngSubmit)="submit()" novalidate>
 <div class="mb-3"><label class="form-label" for="email">Correo electrónico</label><input id="email" class="form-control" type="email" formControlName="email"><small class="text-danger" *ngIf="form.controls.email.touched&&form.controls.email.invalid">Ingrese un correo válido.</small></div>
 <div class="mb-3"><label class="form-label" for="password">Contraseña</label><input id="password" class="form-control" type="password" formControlName="password"><small class="text-danger" *ngIf="form.controls.password.touched&&form.controls.password.invalid">La contraseña es obligatoria.</small></div>
 <div class="alert alert-danger" *ngIf="error">Credenciales incorrectas o usuario inexistente.</div><button class="btn btn-primary w-100" [disabled]="form.invalid">Ingresar</button>
 </form><div class="d-flex justify-content-between mt-3 small"><a routerLink="/recover-password">Recuperar contraseña</a><a routerLink="/register">Crear cuenta</a></div></section></div></div></div>`})
export class LoginComponent{private fb=inject(FormBuilder);private forum=inject(ForumService);private router=inject(Router);error=false;
 form=this.fb.nonNullable.group({email:['',[Validators.required,Validators.email]],password:['',[Validators.required,Validators.minLength(8),Validators.maxLength(20)] ]});
 submit(){if(this.form.invalid)return;const v=this.form.getRawValue();const u=this.forum.login(v.email,v.password);if(u){this.error=false;this.router.navigate([u.role==='ADMINISTRADOR'?'/admin':'/forum'])}else this.error=true}
}

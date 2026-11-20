import { Component,inject } from '@angular/core'; import { CommonModule } from '@angular/common';
import { ReactiveFormsModule,FormBuilder,Validators } from '@angular/forms'; import { Router,RouterLink } from '@angular/router'; import { ForumService } from '../forum.service'; import { passwordStrength } from '../password.validators';
@Component({standalone:true,imports:[CommonModule,ReactiveFormsModule,RouterLink],template:`<div class="container py-4"><div class="row justify-content-center"><div class="col-12 col-md-10 col-lg-8"><section class="card p-3 p-md-4"><h1 class="h3">Registro</h1>
 <form [formGroup]="form" (ngSubmit)="submit()" novalidate><div class="row g-3">
 <div class="col-12 col-md-6"><label class="form-label">Nombre completo</label><input class="form-control" formControlName="name"><small class="text-danger" *ngIf="form.controls.name.touched&&form.controls.name.invalid">Nombre obligatorio (2-100 caracteres).</small></div>
 <div class="col-12 col-md-6"><label class="form-label">Correo</label><input class="form-control" type="email" formControlName="email"><small class="text-danger" *ngIf="form.controls.email.touched&&form.controls.email.invalid">Correo válido obligatorio.</small></div>
 <div class="col-12"><label class="form-label">Contraseña</label><input class="form-control" type="password" formControlName="password"><div class="small mt-1" *ngIf="form.controls.password.errors?.['passwordStrength'] as r">Debe tener 8-20 caracteres, mayúscula, minúscula, número y carácter especial.</div></div>
 </div><div class="alert alert-danger mt-3" *ngIf="error">El correo ya está registrado.</div><button class="btn btn-primary mt-3 w-100" [disabled]="form.invalid">Registrarme</button></form><a class="d-block mt-3" routerLink="/login">Ya tengo cuenta</a></section></div></div></div>`})
export class RegisterComponent{private fb=inject(FormBuilder);private forum=inject(ForumService);private router=inject(Router);error=false;
 form=this.fb.nonNullable.group({name:['',[Validators.required,Validators.minLength(2),Validators.maxLength(100)]],email:['',[Validators.required,Validators.email]],password:['',[Validators.required,passwordStrength]]});
 submit(){if(this.form.invalid)return;const v=this.form.getRawValue();if(!this.forum.register({name:v.name,email:v.email,password:v.password,role:'USUARIO'})){this.error=true;return}this.router.navigate(['/login'])}
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Category,Comment,Topic,User } from './models';

@Injectable({providedIn:'root'})
export class ForumService {
 private readonly categoriesSeed:Category[]=[
  {id:1,name:'Desarrollo Web',description:'Frontend, backend y arquitecturas web'},
  {id:2,name:'Inteligencia Artificial',description:'Machine learning e IA generativa'},
  {id:3,name:'Ciberseguridad',description:'Seguridad ofensiva y defensiva'},
  {id:4,name:'Gaming & Hardware',description:'Videojuegos y componentes'},
  {id:5,name:'Base de Datos',description:'Modelado, SQL y administración'}
 ];
 private readonly usersSeed:User[]=[
  {id:1,name:'Admin Foro',email:'admin@foro.cl',password:'Admin123!',role:'ADMINISTRADOR'},
  {id:2,name:'Ana Usuario',email:'ana@foro.cl',password:'Ana1234!',role:'USUARIO'},
  {id:3,name:'Luis Usuario',email:'luis@foro.cl',password:'Luis1234!',role:'USUARIO'}
 ];
 private readonly topicsSeed:Topic[]=[
  {id:1,title:'Angular y señales',content:'¿Cómo migrarían una aplicación actual a señales?',categoryId:1,author:'Ana Usuario',hidden:false,comments:[
   {id:1,content:'Empezaría de forma gradual.',author:'Luis Usuario',hidden:false}]},
  {id:2,title:'Modelos locales',content:'Experiencias ejecutando modelos en hardware local.',categoryId:2,author:'Luis Usuario',hidden:false,comments:[]},
  {id:3,title:'Hardening de API',content:'Buenas prácticas para proteger APIs REST.',categoryId:3,author:'Ana Usuario',hidden:false,comments:[]},
  {id:4,title:'Consejos de refrigeración',content:'Configuraciones para una GPU más silenciosa.',categoryId:4,author:'Luis Usuario',hidden:false,comments:[]},
  {id:5,title:'Diseño con particiones',content:'¿Cuándo conviene particionar una tabla?',categoryId:5,author:'Ana Usuario',hidden:false,comments:[]}
 ];
 private readonly users$=new BehaviorSubject<User[]>([...this.usersSeed]);
 private readonly session$=new BehaviorSubject<User|null>(null);
 private readonly categories$=new BehaviorSubject<Category[]>([...this.categoriesSeed]);
 private readonly topics$=new BehaviorSubject<Topic[]>([...this.topicsSeed]);
 readonly users=this.users$.asObservable(); readonly session=this.session$.asObservable();
 readonly categories=this.categories$.asObservable(); readonly topics=this.topics$.asObservable();
 get currentUser(){return this.session$.value}
 login(email:string,password:string):User|null{const u=this.users$.value.find(x=>x.email===email&&x.password===password)||null;if(u)this.session$.next(u);return u}
 logout(){this.session$.next(null)}
 register(user:Omit<User,'id'>):boolean{if(this.users$.value.some(x=>x.email===user.email))return false;const u={...user,id:Math.max(...this.users$.value.map(x=>x.id))+1};this.users$.next([...this.users$.value,u]);return true}
 updateProfile(id:number,changes:Partial<User>){this.users$.next(this.users$.value.map(u=>u.id===id?{...u,...changes}:u));if(this.session$.value?.id===id)this.session$.next({...this.session$.value,...changes})}
 createTopic(topic:Omit<Topic,'id'|'hidden'|'comments'>){const id=Math.max(...this.topics$.value.map(t=>t.id))+1;this.topics$.next([...this.topics$.value,{...topic,id,hidden:false,comments:[]}])}
 addComment(topicId:number,comment:Omit<Comment,'id'|'hidden'>){this.topics$.next(this.topics$.value.map(t=>t.id===topicId?{...t,comments:[...t.comments,{...comment,id:Date.now(),hidden:false}]}:t))}
 setTopicHidden(id:number,hidden:boolean){this.topics$.next(this.topics$.value.map(t=>t.id===id?{...t,hidden}:t))}
 setCommentHidden(topicId:number,commentId:number,hidden:boolean){this.topics$.next(this.topics$.value.map(t=>t.id===topicId?{...t,comments:t.comments.map(c=>c.id===commentId?{...c,hidden}:c)}:t))}
 getTopic(id:number){return this.topics$.value.find(t=>t.id===id)}
 resetPassword(email:string,newPassword:string):boolean{const u=this.users$.value.find(x=>x.email===email);if(!u)return false;this.updateProfile(u.id,{password:newPassword});return true}
}

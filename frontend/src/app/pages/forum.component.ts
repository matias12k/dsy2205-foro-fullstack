import { Component,inject } from '@angular/core'; import { CommonModule } from '@angular/common'; import { ReactiveFormsModule,FormControl } from '@angular/forms'; import { BehaviorSubject,combineLatest,map,startWith } from 'rxjs'; import { ForumService } from '../forum.service'; import { TopicCardComponent } from '../components/topic-card.component';
@Component({standalone:true,imports:[CommonModule,ReactiveFormsModule,TopicCardComponent],template:`<div class="container py-4"><div class="row g-3">
<aside class="col-12 col-md-3 col-lg-3"><div class="card p-3 sticky-top" style="top:1rem"><h1 class="h5">Categorías</h1><div class="d-grid gap-2"><button class="btn btn-sm" [class.btn-primary]="selected===0" [class.btn-outline-primary]="selected!==0" (click)="selectCategory(0)">Todas</button><button *ngFor="let c of categories$|async" class="btn btn-sm" [class.btn-primary]="selected===c.id" [class.btn-outline-primary]="selected!==c.id" (click)="selectCategory(c.id)">{{c.name}}</button></div></div></aside>
 <section class="col-12 col-md-9 col-lg-9"><div class="row g-3 mb-3"><div class="col-12 col-md-8"><input class="form-control" [formControl]="search" placeholder="Buscar temas por título"></div></div><div class="row g-3"><div class="col-12 col-md-6 col-xl-4" *ngFor="let t of filteredTopics$|async"><app-topic-card [topic]="t" [categoryName]="categoryName(t.categoryId)"/></div></div></section>
 </div></div>`})
export class ForumComponent{private forum=inject(ForumService);categories$=this.forum.categories;search=new FormControl('',{nonNullable:true});selected=0;private selected$=new BehaviorSubject<number>(0);
 private categories:any[]=[];
 constructor(){this.categories$.subscribe(v=>this.categories=v)}
 filteredTopics$=combineLatest([this.forum.topics,this.search.valueChanges.pipe(startWith('')),this.selected$]).pipe(map(([topics,q,category])=>topics.filter(t=>!t.hidden&&(category===0||t.categoryId===category)&&t.title.toLowerCase().includes(q.toLowerCase()))));
 categoryName(id:number){return this.categories.find(c=>c.id===id)?.name||''}
 selectCategory(id:number){this.selected=id;this.selected$.next(id)}
}

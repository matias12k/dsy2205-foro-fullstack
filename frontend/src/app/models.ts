export type Role='USUARIO'|'ADMINISTRADOR';
export interface User {id:number;name:string;email:string;password:string;role:Role}
export interface Category {id:number;name:string;description:string}
export interface Comment {id:number;content:string;author:string;hidden:boolean}
export interface Topic {id:number;title:string;content:string;categoryId:number;author:string;hidden:boolean;comments:Comment[]}

import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
export const passwordStrength:ValidatorFn=(control:AbstractControl):ValidationErrors|null=>{
 const v=control.value as string|null;if(!v)return null;
 const rules={minLength:v.length>=8,maxLength:v.length<=20,upper:/[A-Z]/.test(v),lower:/[a-z]/.test(v),number:/[0-9]/.test(v),special:/[^A-Za-z0-9]/.test(v)};
 return Object.values(rules).every(Boolean)?null:{passwordStrength:rules};
}

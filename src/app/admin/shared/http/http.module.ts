import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SpinnerInterceptor } from 'src/app/common/interceptors/spinner.interceptor';



@NgModule({
  imports: [
    HttpClientModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: SpinnerInterceptor, multi: true }
  ]
})
export class AdminHttpModule { }

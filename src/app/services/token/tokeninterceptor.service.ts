import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TokeninterceptorService implements HttpInterceptor{

  constructor() { }
  
  
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if(typeof localStorage != 'undefined') {
      const token=localStorage.getItem('ACCESS_TOKEN');
      if(token){
        // Clone the request and add the token to the headers
        let tokenheader = req.clone({
          // setHeaders:{
          //   // 'Content-Type': 'application/json',
          
          headers: req.headers.append('x-access-token', ''+token)
          // }
        })
        // Pass the cloned request instead of the original request to the next handle
        return next.handle(tokenheader)
      }else{
       return next.handle(req);
      }
    }else{
      // If localStorage is not available, just proceed with the original request
      return next.handle(req);
    }   
  } 
}

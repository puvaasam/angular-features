import { HttpInterceptorFn } from '@angular/common/http';

export const apiHeadersInterceptor: HttpInterceptorFn = (req, next) => {
  // Clone the request to modify it (requests are immutable)
  // setHeaders will merge with any existing headers the request might already have
  const modifiedReq = req.clone({
    setHeaders: {
      'x-trace-id': crypto.randomUUID(),
      'x-authorization': 'Bearer demo-token',
      'Accept': 'application/json'
    }
  });

  // Pass the cloned request to the next handler
  return next(modifiedReq);
};
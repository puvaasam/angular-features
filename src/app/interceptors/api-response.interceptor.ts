import { HttpInterceptorFn, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

export const apiResponseInterceptor: HttpInterceptorFn = (req, next) => {
  // `next(req)` returns an Observable of HttpEvents
  return next(req).pipe(
    map((event) => {
      // HttpEvents can be sent/progress/response events. We only want to modify the final response.
      if (event instanceof HttpResponse) {
        
        const originalBody = event.body as any;
        let modifiedBody = originalBody;

        // Example modification: Let's inject an '_intercepted' flag into the response payload
        // In a real app, this is where you might do: modifiedBody = originalBody.data;
        if (originalBody && typeof originalBody === 'object') {
          if (Array.isArray(originalBody)) {
            // If response is an array (like /v1/users), add it to every item
            modifiedBody = originalBody.map(item => ({ ...item, _intercepted: true }));
          } else {
            // If response is a single object, add it directly
            modifiedBody = { ...originalBody, _intercepted: true };
          }
        }

        // Return a cloned HttpResponse with the updated body
        return event.clone({ body: modifiedBody });
      }

      // If it's not an HttpResponse (like a progress event), pass it through unchanged
      return event;
    })
  );
};
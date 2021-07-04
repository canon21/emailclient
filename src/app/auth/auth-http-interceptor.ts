import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest  } from "@angular/common/http";
import { Observable } from "rxjs";

//Another sintax for Injectable
@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor{

    //primo argomento req -> è l'oggetto che sta per essere inviato a qualche server ed ha molte informazioni sulla richiesta
    //secondo argomento next -> per proseguire il flusso su un altro interceptor presente. 
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        //aggiorno il valore di withCredentials nella request originale.
        const updatedReq = req.clone({
            withCredentials: true
        });
        console.log(updatedReq);
        return next.handle(updatedReq);
    }
}

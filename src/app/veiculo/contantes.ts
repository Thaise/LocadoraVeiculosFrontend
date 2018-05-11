import { HttpHeaders } from "@angular/common/http";

export class Contantes {
    public static httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        })
    }
}
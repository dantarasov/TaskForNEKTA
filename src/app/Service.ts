import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './User';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private http: HttpClient) {
  }
  public login(user: User): Observable<any> {
    const email = user.email;
    const password = user.password;
    const postBody = { email, password, personal_data_access: true };
    return this.http.post('https://core.nekta.cloud/api/auth/login', postBody);
  }

  public listOfDevices(access_token: any): Observable<any> {
    const httpOptions = {
      headers: new HttpHeaders({
        Authorization: `Bearer ${access_token}`,
      })
    };
    const postBody = {
      headers: {
        "page": 1, "last_page": 0, "sort_field": "id", "sort": "desc", "search_string": null, "device_state": "all", "is_archived": false, "paginate": true, "append_fields": ["active_polling", "attributes", "tied_point"], "per_page": 10
      }
    }
    return this.http.post('https://core.nekta.cloud/api/device/metering_devices', postBody, httpOptions);
  }
}
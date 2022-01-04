import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, of, retry, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { AuthData } from '../interfaces/auth-data';
import { Token } from '../interfaces/token';
import { User } from '../interfaces/user';
import { StringMap } from '@angular/compiler/src/compiler_facade_interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  

    /**
 * Handle Http operation that failed.
 * Let the app continue.
 * @param operation - name of the operation that failed
 * @param result - optional value to return as the observable result
 */
  private handleError<T>(operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {
  
        // TODO: send the error to remote logging infrastructure
        console.error(error); // log to console instead
  
        // TODO: better job of transforming error for user consumption
        console.log(`${operation} failed: ${error.message}`);
  
        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }
  
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'accept': 'application/json' 
    })
  };

  createUser(username: string, email: string, password: string): Observable<User> {
    const authData: AuthData = {username: username, email: email, password: password}
    return this.http.post<User>(this.apiUrl + "/users/", authData).pipe(
      tap((newUser: User) =>{
        console.log(`New user added with username ${newUser.username}`);
        this.router.navigate(['/login']);
      }),
      catchError(this.handleError<User>('addUser'))
      );
  }

  authenticateUser(username: string, password: string): Observable<Token> {
    let params = new HttpParams({
      fromObject: {username: username, password: password}
    });
    return this.http.post<Token>(this.apiUrl + "/auth/token", params.toString(), this.httpOptions).pipe(
      retry(2),
      tap((token: Token) => {
        localStorage.setItem('token', token.access_token);
      }),
      catchError(this.handleError<Token>('getToken'))
      );
  }

  isLoggedIn() {
    return localStorage.getItem('token') != null;
  }

  currentUser(): Observable<User> {
    return this.http.get<User>(this.apiUrl + '/users/me/').pipe(
      retry(2),
      tap((user: User) => {
        console.log("Current user is " + user.username);
      }),
      catchError(this.handleError<User>('getCurrentUser'))
    );
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }


}

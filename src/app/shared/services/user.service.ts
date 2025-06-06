import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { USER_SERVICE } from '../constants/services-constants';
import { Observable, BehaviorSubject, tap } from 'rxjs';
import { User } from '../models/User';
import { API_URL } from '../constants/app-constants';
import { getStoredItem, removeStoredItem } from '../utils/storage-utils';
import { AUTHENTICATED_USER_STORAGE_NAME } from '../constants/storage-constants';
import { v7 as uuidv7 } from 'uuid';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user$: BehaviorSubject<any> = new BehaviorSubject<any>({});
  readonly users$: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(readonly http: HttpClient) {
    this.refreshUser();
    this.refreshUsersList();
  }

  public refreshUser(): void {
    this.user$.next(getStoredItem(AUTHENTICATED_USER_STORAGE_NAME));
  }

  public refreshUsersList(): void {
    this.findAllUsers().subscribe((users) => {
      this.users$.next(users);
    });
  }

  public get user(): Observable<any> {
    return this.user$;
  }

  public get users(): Observable<any[]> {
    return this.users$;
  }

  public connectUser(user: User): Observable<any> {
    sessionStorage.setItem(
      AUTHENTICATED_USER_STORAGE_NAME,
      JSON.stringify(user),
    );
    this.refreshUser();
    return this.user;
  }

  public disconnectUser(): Observable<any> {
    removeStoredItem(AUTHENTICATED_USER_STORAGE_NAME);
    this.refreshUser();
    return this.user;
  }

  public authenticateUser(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${USER_SERVICE}authentication`, {
      login,
      password,
    });
  }

  public findAllUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${API_URL}/users/list`);
  }

  public findUser(userId: string): Observable<any> {
    return this.http.get<any>(`${USER_SERVICE}${userId}`);
  }

  public createUser(userToCreate: any): Observable<any> {
    userToCreate.userID = uuidv7();
    return this.http.post<any>(`${USER_SERVICE}create`, { userToCreate }).pipe(
      tap(() => {
        this.refreshUsersList();
      }),
    );
  }

  public resetUserPassword(userToResetPassword: any): Observable<any> {
    return this.http
      .put<any>(`${USER_SERVICE}reset-password`, { userToResetPassword })
      .pipe(
        tap(() => {
          this.refreshUsersList();
        }),
      );
  }

  public updateUser(userUpdated: any): Observable<any> {
    return this.http
      .put<any>(`${USER_SERVICE}update/${userUpdated.userID}`, { userUpdated })
      .pipe(
        tap(() => {
          this.refreshUsersList();
        }),
      );
  }

  public deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${USER_SERVICE}delete/${userId}`).pipe(
      tap(() => {
        this.refreshUsersList();
      }),
    );
  }
}

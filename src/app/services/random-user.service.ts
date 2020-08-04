import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RandomUser } from '../models/random-user';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { NgxUiLoaderService } from 'ngx-ui-loader';

@Injectable({
  providedIn: 'root'
})
export class RandomUserService {

  constructor(
    private http: HttpClient,
    private ngxLoader: NgxUiLoaderService
  ) { }

  static readonly API_URL = 'https://randomuser.me/api/?seed=rafael&results=50';
  private readonly TRASH_KEY: string = 'usersInTrash';
  private readonly ATTENDED_KEY: string = 'usersInAttended';

  getAll(): Observable<RandomUser[]> {
    const api = this.http.get(RandomUserService.API_URL);
    this.ngxLoader.start();

    return api.pipe(
      map((data: any) => {
        const users = [];

        data.results.forEach((key: any) => {
          const userData = key;
          // tslint:disable-next-line: use-isnan
          if (key.id.value !== NaN && key.id.value !== null && key.id.value.indexOf('NaN') === -1 && key.id.value.indexOf(' ') === -1) {
            users.push(this.createRandomUser(userData));
          }
        });

        this.ngxLoader.stop();
        return users;
      })
    );
  }

  getTrash(): Observable<Array<RandomUser>> {
    const usersInTrash = this.getSavedTrash();
    if (!usersInTrash || usersInTrash.length === 0) {
      return of([]);
    }

    const usersList = this.getAll();
    return usersList.pipe(
      map((data: Array<RandomUser>) => {
        const users = new Array<RandomUser>();
        data.forEach((objRandomUser: RandomUser) => {
          if (usersInTrash.indexOf(objRandomUser.id) !== -1) {
            users.push(objRandomUser);
          }
        });

        return users;
      })
    );
  }

  getSavedTrash(): Array<number> {
    const sJson = localStorage.getItem(this.TRASH_KEY);
    if (sJson) {
      return JSON.parse(sJson);
    }
    else {
      return [];
    }
  }

  saveUserInTrash(id: number): void {
    let userList = this.getSavedTrash();
    if (!userList) {
      userList = [];
    }

    if (userList.indexOf(id) === -1) {
      userList.push(id);
    }

    localStorage.setItem(this.TRASH_KEY, JSON.stringify(userList));
  }

  getAttended(): Observable<Array<RandomUser>> {
    const usersInAttended = this.getSavedAttended();
    if (!usersInAttended || usersInAttended.length === 0) {
      return of([]);
    }

    const usersList = this.getAll();
    return usersList.pipe(
      map((data: Array<RandomUser>) => {
        const users = new Array<RandomUser>();
        data.forEach((objRandomUser: RandomUser) => {
          if (usersInAttended.indexOf(objRandomUser.id) !== -1) {
            users.push(objRandomUser);
          }
        });

        return users;
      })
    );
  }

  getSavedAttended(): Array<number> {
    const sJson = localStorage.getItem(this.ATTENDED_KEY);
    if (sJson) {
      return JSON.parse(sJson);
    }
    else {
      return [];
    }
  }

  saveUserInAttended(id: number): void {
    let userList = this.getSavedAttended();
    if (!userList) {
      userList = [];
    }

    if (userList.indexOf(id) === -1) {
      userList.push(id);
    }

    localStorage.setItem(this.ATTENDED_KEY, JSON.stringify(userList));
  }

  createRandomUser(userData: any): RandomUser {
    const id = userData.id.value;
    const mediumPicture = userData.picture.medium;
    const largePicture = userData.picture.large;
    const firstName = userData.name.first;
    const lastName = userData.name.last;
    const fullName = `${firstName} ${lastName}`;
    const email = userData.email;
    const birth = new Date(userData.dob.date);
    const location = userData.location;
    const address = `${location.street.number} ${location.street.name}`;
    const city = `${location.city} - ${location.state}`;
    const phone = userData.phone;
    const password = userData.login.password;

    return new RandomUser(
      id, mediumPicture, largePicture, firstName, fullName, email, birth, address, city, phone, password
    );
  }
}

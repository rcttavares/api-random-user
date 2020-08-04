import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/models/random-user';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-trash',
  templateUrl: './trash.component.html',
  styleUrls: ['./trash.component.scss']
})
export class TrashComponent implements OnInit {

  constructor(
    private router: Router,
    private randomUserService: RandomUserService
  ) { }

  users: RandomUser[];
  totalRecords: number;
  page = 1;

  ngOnInit(): void {
    this.getLixeira();
  }

  getLixeira(): void {
    this.randomUserService.getTrash().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.totalRecords = data.length;
    });
  }

  goDetails(randomUser: RandomUser) {
    window.localStorage.setItem('randomUser', JSON.stringify(randomUser));
    this.router.navigate(['/details']);
  }

  goAttended(randomUser: RandomUser) {
    this.randomUserService.saveUserInAttended(randomUser.id);
    this.users = this.users.filter(obj => obj !== randomUser);
  }
}

import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/models/random-user';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  constructor(
    private router: Router,
    private randomUserService: RandomUserService
  ) { }

  users: RandomUser[];
  totalRecords: number;
  page = 1;

  ngOnInit(): void {
    this.randomUserService.getAll().subscribe((data) => {
      console.log(data);
      this.users = data;
      this.totalRecords = data.length;
    });
  }

  goDetails(randomUser: RandomUser) {
    window.localStorage.setItem('randomUser', JSON.stringify(randomUser));
    this.router.navigate(['/details']);
  }

  goTrash(randomUser: RandomUser) {
    if (confirm(`Tem certeza que deseja enviar o usuário ${randomUser.firstName} para a Lixeira?`)) {
      this.randomUserService.saveUserInTrash(randomUser.id);
      this.users = this.users.filter(obj => obj !== randomUser);
    }
  }

  goAttended(randomUser: RandomUser) {
    this.randomUserService.saveUserInAttended(randomUser.id);
    this.users = this.users.filter(obj => obj !== randomUser);
  }
}

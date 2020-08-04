import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RandomUser } from 'src/app/models/random-user';
import { RandomUserService } from 'src/app/services/random-user.service';

@Component({
  selector: 'app-attended',
  templateUrl: './attended.component.html',
  styleUrls: ['./attended.component.scss']
})
export class AttendedComponent implements OnInit {

  constructor(
    private router: Router,
    private randomUserService: RandomUserService
  ) { }

  users: RandomUser[];
  totalRecords: number;
  page = 1;

  ngOnInit(): void {
    this.getAtendidos();
  }

  getAtendidos(): void {
    this.randomUserService.getAttended().subscribe((data) => {
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
}

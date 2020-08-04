import { Component, OnInit } from '@angular/core';
import { RandomUser } from 'src/app/models/random-user';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  constructor() { }

  randomUser: RandomUser;

  public selectedItem = 'fullName';

  ngOnInit(): void {
    this.randomUser = JSON.parse(window.localStorage.getItem('randomUser'));
  }

  hover(item: string) {
    this.selectedItem = item;
  }
}

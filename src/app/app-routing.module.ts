import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './pages/list/list.component';
import { DetailsComponent } from './pages/details/details.component';
import { AttendedComponent } from './pages/attended/attended.component';
import { TrashComponent } from './pages/trash/trash.component';

const routes: Routes = [
  { path: '', component: ListComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'attended', component: AttendedComponent },
  { path: 'trash', component: TrashComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { Component, OnInit, ViewChild } from '@angular/core';
import { Workouts } from '../interfaces/workouts';
import { WorkoutsService } from '../services/workouts.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
    workout: Workouts = {
    date: '',
    workout: '',
    sets: undefined,
    reps: undefined,
    weight: undefined,
  };
  workouts: Workouts[] = [];

  displayedColumns: string[] = ['date', 'workout', 'sets', 'reps', 'weight'];
  dataSource: MatTableDataSource<Workouts>;

  @ViewChild(MatSort, { static: true }) sort: MatSort;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  constructor(private service: WorkoutsService) { }

  async ngOnInit() {
    this.workouts = await this.service.getWorkouts();
    const workout = this.workouts;

    this.dataSource = new MatTableDataSource(workout);

    this.dataSource.sort = this.sort;

    this.dataSource.paginator = this.paginator;
  }
}

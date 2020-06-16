import { Component, OnInit } from '@angular/core';
import { Workouts } from '../interfaces/workouts';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-workout',
  templateUrl: './workout.component.html',
  styleUrls: ['./workout.component.css']
})
export class WorkoutComponent implements OnInit {
  workout: Workouts = {
    date: '',
    workout: '',
    sets: 1,
    reps: 1,
    weight: 1,
  };
  workouts: Workouts[] = [];
  constructor(private service: WorkoutsService) { }

  async ngOnInit() {
    this.workouts = await this.service.getWorkouts();
  }
  async save() {
    const newWorkout = await this.service.addWorkout(this.workout);
    this.workouts.push(newWorkout);
    console.log(newWorkout);
  }
}

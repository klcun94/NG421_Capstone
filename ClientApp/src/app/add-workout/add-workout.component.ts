import { Component, OnInit } from '@angular/core';
import { Workouts } from '../interfaces/workouts';
import { WorkoutsService } from '../services/workouts.service';

@Component({
  selector: 'app-add-workout',
  templateUrl: './add-workout.component.html',
  styleUrls: ['./add-workout.component.css']
})
export class AddWorkoutComponent implements OnInit {
  workout: Workouts = {
    date: '',
    workout: '',
    sets: undefined,
    reps: undefined,
    weight: undefined,
  };
  workouts: Workouts[] = [];
  constructor(private service: WorkoutsService) { }

  ngOnInit() {
  }
  async save() {
    const newWorkout = await this.service.addWorkout(this.workout);
    this.workouts.push(newWorkout);
  }
}

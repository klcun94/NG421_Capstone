import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Workouts } from '../interfaces/workouts';

@Injectable({
  providedIn: 'root'
})
export class WorkoutsService {

  constructor(private httpClient: HttpClient,
    @Inject('BASE_URL')private baseUrl: string) { }
    async getWorkouts() {
      return this.httpClient.get<Workouts[]>(`${this.baseUrl}workouts`).toPromise();
    }
    async addWorkout(workout: Workouts) {
      return await this.httpClient.post<Workouts>(`${this.baseUrl}workouts`, workout).toPromise();
    }
}

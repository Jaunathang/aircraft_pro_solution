import { Component, OnInit } from '@angular/core';
import { Aircraft } from 'src/app/models/aircraft.model';
import { AircraftsService } from 'src/app/services/aircrafts/aircrafts.service';

@Component({
  selector: 'app-aircrafts',
  templateUrl: './aircrafts.component.html',
  styleUrls: ['./aircrafts.component.css']
})
export class AircraftsComponent implements OnInit {

  aircrafts: Aircraft[] = [];


  constructor(private aircraftsService: AircraftsService) { }

  ngOnInit(): void {
    this.aircraftsService.getAll()
      .subscribe({
        next: (aircrafts) => {
          this.aircrafts = aircrafts;
          console.log("AIRCRAFTS", aircrafts);
        },
        error: (response) => {
          // TODO Serious error handling
          console.error("There was an error while sending the request", response)
        }
      });
  }

}

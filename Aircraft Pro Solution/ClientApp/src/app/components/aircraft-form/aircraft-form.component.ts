import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AircraftsService } from 'src/app/services/aircrafts/aircrafts.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Aircraft } from 'src/app/models/aircraft.model';

@Component({
  selector: 'app-aircraft-form',
  templateUrl: './aircraft-form.component.html',
  styleUrls: ['./aircraft-form.component.css']
})
export class AircraftFormComponent implements OnInit {
  aircraftForm: FormGroup;
  isLoading: boolean;
  isNew: boolean;

  constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private aircraftsService: AircraftsService, private router: Router) {
    this.aircraftForm = this.formBuilder.group({
      id: [null],
      modelName: [''],
      serialNumber: [''],
      registrationNumber: [''],
      registrationDate: [''],
      registrationStatus: [false],
    });
    this.isLoading = false;
    this.isNew = true;
  }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const aircraftId = +params['id'];
      if (aircraftId) {
        this.aircraftsService.get(aircraftId)
        .subscribe({
          next: (aircraft) => {
            this.aircraftForm = this.formBuilder.group({
              id: [aircraft.id],
              modelName: [aircraft.modelName],
              serialNumber: [aircraft.serialNumber],
              registrationNumber: [aircraft.registrationNumber],
              registrationDate: [aircraft.registrationDate],
              registrationStatus: [aircraft.registrationStatus],
            });
            this.isNew = false;
          },
          error: (response) => {
            // TODO Serious error handling
            console.error("There was an error while sending the request", response)
          }
        });
      }
    });
  }

  submitForm() {
    this.isNew ? this.addNewAircraft() : this.saveExistingAircraft();
  }

  addNewAircraft() {
    this.isLoading = true;
    // Creating a deep copy to avoid leave the original untouched.
    const newAircraft = JSON.parse(JSON.stringify(this.aircraftForm.value));
    delete newAircraft.id;
    this.aircraftsService.add(newAircraft)
      .subscribe({
        next: (aircraft) => {
          this.router.navigate([`aircrafts`, aircraft.id]);
        },
        error: (response) => {
          // TODO Serious error handling
          console.error("There was an error while sending the request", response);
          this.isLoading = false;
        }
      });
  }

  saveExistingAircraft() {
    this.isLoading = true;
    this.aircraftsService.update(this.aircraftForm.value)
      .subscribe({
        next: (aircraft) => {

          this.router.navigate([`aircrafts/${aircraft.id}`]);
        },
        error: (response) => {
          // TODO Serious error handling
          console.error("There was an error while sending the request", response);
          this.isLoading = false;
        }
      });
  }

}

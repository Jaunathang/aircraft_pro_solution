import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AircraftsService } from 'src/app/services/aircrafts/aircrafts.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  aircraftForm: FormGroup;
  isLoading: boolean;

  constructor(private formBuilder: FormBuilder, private aircraftService: AircraftsService, private router: Router) {
    this.aircraftForm = this.formBuilder.group({
      modelName: [''],
      serialNumber: [''],
      registrationNumber: [''],
      registrationDate: [''],
      registrationStatus: [false],
    });
    this.isLoading = false;
  }

  ngOnInit(): void {

  }

  submitForm() {
    this.isLoading = true;
    this.aircraftService.add(this.aircraftForm.value)
      .subscribe({
        next: (aircraft) => {
          console.log("New Aircraft", aircraft);
          this.router.navigate(['aircrafts']);
        },
        error: (response) => {
          // TODO Serious error handling
          console.error("There was an error while sending the request", response);
          this.isLoading = false;
        }
      });
  }

}

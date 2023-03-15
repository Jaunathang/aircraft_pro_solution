import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationDialogComponent } from '../confirmation-dialog/confirmation-dialog.component';
import { Aircraft } from '../models/aircraft.model';
import { AircraftsService } from '../services/aircrafts/aircrafts.service';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css']
})
export class ViewComponent implements OnInit {
  id!: number;
  aircraft!: Aircraft;

  constructor(private route: ActivatedRoute, private aircraftsService: AircraftsService, private dialog: MatDialog, private router: Router) { }

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.id = +params['id'];
      this.aircraftsService.get(this.id)
        .subscribe({
          next: (aircraft) => {
            this.aircraft = aircraft;
          },
          error: (response) => {
            // TODO Serious error handling
            console.error("There was an error while sending the request", response)
          }
        });
    });
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '300px',
      enterAnimationDuration,
      exitAnimationDuration,
    });

    dialogRef.afterClosed().subscribe(hasAccepted => {
      if (hasAccepted) {
        this.deleteAircraft();
      }
    });
  }

  deleteAircraft() {
    this.aircraftsService.delete(this.id)
      .subscribe({
        next: (aircraft) => {
          console.log("DELETED", aircraft);
          this.router.navigate(['aircrafts']);
        },
        error: (response) => {
          // TODO Serious error handling
          console.error("There was an error while sending the request", response)
        }
      });
  }
}

import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private _snackBar: MatSnackBar) { }

  public showError(messageCode: string, url?: string): void {
    let snackBarRef = this._snackBar.open(messageCode, 'action', {
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'error-snack-bar'
    });

    // snackBarRef.onAction().subscribe(() => {
    //   console.log("ACTION")
    // });
  }
}

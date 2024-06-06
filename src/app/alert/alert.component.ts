import { Component, Input, OnInit } from "@angular/core";
import { Observable, timer } from "rxjs";

@Component({
  selector: "apimock-alert",
  templateUrl: "./alert.component.html",
  styleUrls: ["./alert.component.scss"],
  standalone: true,
})
export class AlertComponent implements OnInit {
  @Input() change: Observable<any>;
  @Input() seconds = 1500;

  message: string;

  /** {@inheritDoc}.*/
  ngOnInit(): void {
    this.change.subscribe((c: string) => {
      this.message = c;
      timer(this.seconds).subscribe(() => {
        this.message = undefined;
      });
    });
  }
}

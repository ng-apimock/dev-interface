import { Component, OnDestroy, OnInit } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass, NgOptimizedImage } from "@angular/common";
import { MatToolbarModule } from "@angular/material/toolbar";
import { VersionsService } from "./versions.service";
import { Subscription } from "rxjs";

@Component({
  selector: "apimock-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
  standalone: true,
  imports: [
    MatToolbarModule,
    NgClass,
    RouterLinkActive,
    RouterLink,
    NgOptimizedImage,
  ],
})
export class HeaderComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[];
  isCollapsed: boolean;
  coreVersion: string;

  /**
   * Constructor.
   * @param {HttpClient} http The http client.
   */
  constructor(private readonly versionsService: VersionsService) {
    this.subscriptions = [];
  }

  getCoreVersion(): void {
    this.subscriptions.push(this.versionsService.getCoreVersion().subscribe(data => {
      this.coreVersion = data.build.version;
    }));
  }

  /** {@inheritDoc}. */
  ngOnInit(): void {
    this.isCollapsed = true;
    this.getCoreVersion();
  }

  /** {@inheritDoc}. */
  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }
}

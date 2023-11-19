import { Routes } from "@angular/router";

import { OverviewComponent } from "./mocks/overview/overview.component";

export const routes: Routes = [
  { path: "", component: OverviewComponent },
  {
    path: "variables",
    loadComponent: () =>
      import("./variables/overview/overview.component").then(
        (f) => f.OverviewComponent
      ),
  },
  {
    path: "presets",
    loadComponent: () =>
      import("./presets/overview/overview.component").then(
        (f) => f.OverviewComponent
      ),
  },
  {
    path: "mocks",
    loadComponent: () =>
      import("./mocks/overview/overview.component").then(
        (f) => f.OverviewComponent
      ),
  },
  {
    path: "recordings",
    loadComponent: () =>
      import("./recordings/overview/overview.component").then(
        (f) => f.OverviewComponent
      ),
  },
];

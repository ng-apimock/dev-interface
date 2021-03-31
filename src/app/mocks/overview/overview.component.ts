import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NavigationStart, Router, RouterEvent } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { filter, mergeMap } from 'rxjs/operators';

import { CreatePresetComponent } from '../../presets/create-preset/create-preset.component';
import { UpdateMockRequest } from '../mock-request';
import { GetMocksResponse } from '../mock-state';
import { MocksService } from '../mocks.service';

@Component({
  selector: 'apimock-mocks-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit, OnDestroy {
    dialogRef: MatDialogRef<any>;
    data: GetMocksResponse;
    subscriptions: Subscription[];
    searchText: string;
    change$: Subject<string>;

  /**
   * Constructor.
   * @param {MocksService} mocksService The mock service.
   */
    constructor(
      private readonly router: Router,
      private readonly mocksService: MocksService,
      private readonly dialog: MatDialog
  ) {
    this.data = { mocks: [], state: {} };
    this.subscriptions = [];
    this.searchText = '';
  }

  /** Gets the mocks. */
    getMocks(): void {
    this.subscriptions.push(
      this.mocksService.getMocks().subscribe(data => this.data = data)
    );
  }

  /** {@inheritDoc}. */
    ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  /** {@inheritDoc}.*/
    ngOnInit(): void {
    this.getMocks();
    this.change$ = new Subject();
    this.subscriptions.push(
        this.router.events
            .pipe(
                filter((event: RouterEvent) => event instanceof NavigationStart),
                filter(() => !!this.dialogRef))
            .subscribe(() => this.dialogRef.close()));
  }

  /**
   * On update show the message about the action that has been performed.
   * @param {UpdateMockRequest} change The change.
   */
    onUpdate(change: UpdateMockRequest): void {
    const message = `Mock '<strong>${change.name}</strong>' has changed the '<strong>${change.type}</strong>'
        to '<strong>${change.value}</strong>'`;
    this.change$.next(message);
  }

  /** Resets the mocks to defaults. */
    resetMocksToDefaults(): void {
    this.subscriptions.push(
      this.mocksService
        .resetMocksToDefault()
        .pipe(mergeMap(() => this.mocksService.getMocks()))
        .subscribe(data => {
          this.data = data;
          this.change$.next('All mocks have been reset to defaults.');
        })
    );
  }

  /** Sets the mocks to passThroughs. */
    setMocksToPassThrough(): void {
    this.subscriptions.push(
      this.mocksService
        .setMocksToPassThrough()
        .pipe(mergeMap(() => this.mocksService.getMocks()))
        .subscribe(data => {
          this.data = data;
          this.change$.next('All mocks have been set to pass through.');
        })
    );
  }

    saveAsPreset(): void {
    this.dialogRef = this.dialog.open(CreatePresetComponent);
  }
}

import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {WorkersService} from "../../services/workers.service";
import {Observable, Subject, takeUntil} from "rxjs";
import {Worker} from '../../models/worker.interface'
import {WorkersFlightsService} from "../../services/workers-flights.service";

@Component({
    selector: 'app-workers-list',
    templateUrl: './workers-list.component.html',
    styleUrls: ['./workers-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkersListComponent implements OnInit, OnDestroy{
    private unsubscribe$: Subject<void> = new Subject<void>();

    workers: Worker[] = []

    constructor(
        private workersService: WorkersService,
        private workersFlightsService: WorkersFlightsService,
        private changeDetectorRef: ChangeDetectorRef) {

    }

    ngOnInit() {
        this.workersService.getWorkersList().subscribe((workers: Worker[]) => {
            this.workers = workers;
            this.select(workers[0].id);
            this.changeDetectorRef.markForCheck();
        });

        this.workersFlightsService.updated
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => {
                this.changeDetectorRef.markForCheck();
            });
    }

    ngOnDestroy() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }

    select(workerId: number) {
        this.workersFlightsService.selectWorker(workerId);
    }

    isSelected(workerId: number): boolean {
        return workerId === this.workersFlightsService.getSelectedId();

    }


}

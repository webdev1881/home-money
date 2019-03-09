import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SystemComponent } from './system.component';
import { SystemRoutingModule } from './system-routing.module';
import { SharedModule } from '../shared/shared.module';

import { BillPageComponent } from './bill-page/bill-page.component';
import { HistoryPageComponent } from './history-page/history-page.component';
import { RecordsPageComponent } from './records-page/records-page.component';
import { SidebarComponent } from './shared/components/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { DropDirective } from './shared/directives/drop.directive';
import { BillCardComponent } from './bill-page/bill-card/bill-card.component';
import { CurrencyCardComponent } from './bill-page/currency-card/currency-card.component';
import { BillService } from './shared/services/bill.service';
import { AddCategoryComponent } from './records-page/add-category/add-category.component';
import { AddEventComponent } from './records-page/add-event/add-event.component';
import { EditCategoryComponent } from './records-page/edit-category/edit-category.component';
import { CategoriesService } from './shared/services/categories.service';
import { PlaningPageComponent } from './planing-page/planing-page.component';
import { HistoryChartComponent } from './history-page/history-chat/history-chart.component';
import { HistoryDetailComponent } from './history-page/history-detail/history-detail.component';
import { HistoryEventsComponent } from './history-page/history-events/history-events.component';
import { HistoryFilterComponent } from './history-page/history-filter/history-filter.component';


@NgModule({
    imports: [
        CommonModule,
        SharedModule,
        SystemRoutingModule
    ],
    declarations: [
        SystemComponent,
        BillPageComponent,
        HistoryPageComponent,
        RecordsPageComponent,
        SidebarComponent,
        HeaderComponent,
        DropDirective,
        BillCardComponent,
        CurrencyCardComponent,
        AddCategoryComponent,
        AddEventComponent,
        EditCategoryComponent,
        PlaningPageComponent,
        HistoryChartComponent,
        HistoryDetailComponent,
        HistoryEventsComponent,
        HistoryFilterComponent
    ],
    providers: [
        BillService, CategoriesService
    ]
})
export class SystemModule {}

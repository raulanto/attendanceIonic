import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginacionComponent } from './paginacion.component';

@NgModule({
    declarations: [
        PaginacionComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        PaginacionComponent
    ]
})
export class PaginacionModule { }
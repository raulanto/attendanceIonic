import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { PaginacionQuestionComponent } from './paginacion-question.component';


@NgModule({
    declarations: [
        PaginacionQuestionComponent
    ],
    imports: [
        CommonModule,
    ],
    exports: [
        PaginacionQuestionComponent
    ]
})
export class PaginacionQuestionModule { }
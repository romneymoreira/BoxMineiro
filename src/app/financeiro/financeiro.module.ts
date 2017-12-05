import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FinanceiroService } from './../services/financeiro.service';
import { MeioPagamentoComponent } from '../financeiro/meio-pagamento/meio-pagamento.component';

export const routes: Routes = [
    { path: 'financeiro/meio-pagamento/meio-pagamento', component: MeioPagamentoComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    MeioPagamentoComponent
  ],
  providers:[FinanceiroService]
})

export class FinanceiroModule { }

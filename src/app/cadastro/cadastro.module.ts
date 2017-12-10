import { NgModule }      from '@angular/core';
import { CommonModule }  from '@angular/common';
import { Routes, RouterModule }  from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CadastroService } from './../services/cadastro.service';
import { ClienteComponent } from '../cadastro/cliente/cliente.component';

export const routes: Routes = [
    { path: 'cadastro/cliente/cliente', component: ClienteComponent }
  ];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ClienteComponent
  ],
  providers:[CadastroService]
})

export class CadastroModule { }


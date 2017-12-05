import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { FinanceiroService } from './../../services/financeiro.service';
import { Observable } from "rxjs/Rx";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormGroup } from '@angular/forms';


@Component({
  selector: 'app-meio-pagamento',
  templateUrl: './meio-pagamento.component.html',
  styleUrls: ['./meio-pagamento.component.css']
})
export class MeioPagamentoComponent implements OnInit {

 meio: any;
 meios: any[] = [];
 title = "Incluir Meio de Pagamento";
 private modalRef: NgbModalRef;
 formulario: FormGroup;

  constructor(
    private financeiroService: FinanceiroService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder
  ) { }

  abrir(meio: any, modal) {
    if(!meio){
       this.formulario = this.formBuilder.group({
        Nome: [null],
        IdMeioPagamento: [0]
      });
    }
    else{
      this.title = "Alterar Meio de Pagamento";
      this.formulario = this.formBuilder.group({
        Nome: meio.Nome,
        IdMeioPagamento: meio.IdMeioPagamento
      });
    }
    this.meio = meio;
   this.modalRef = this.modalService.open(modal);
  }

  fechar(){
    this.modalRef.close();
  }

  salvar(){
    console.log(this.formulario.value);
    this.financeiroService.salvar(this.formulario);
  }

  ngOnInit() {
    this.financeiroService.getMeiosPagamentos()
      .subscribe(dados => {this.meios = dados, console.log(dados)});
  }

}

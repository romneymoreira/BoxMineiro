import { Component, OnInit, EventEmitter, Input, Output} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CadastroService } from './../../services/cadastro.service';
import { Observable } from "rxjs/Rx";
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Cliente } from './../../models/cliente';
import * as _ from "lodash";

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrls: ['./cliente.component.css']
})
export class ClienteComponent implements OnInit {

 cliente: Cliente;
 clientes: Cliente[] = [];
 estados: any[] = [];
 cidades: any[] = [];
 error: boolean = false;
 cidadecep: string = "";

 sexos: any[] = [
   {Key: "M", Value: "Masculino"},
   {Key: "F", Value: "Feminino"}
 ];
 endereco: any[] = [];
 Cidade: number = 0;
 title = "Incluir Cliente";
 private modalRef: NgbModalRef;
 formulario: FormGroup;

  constructor(
    private cadastroService: CadastroService,
    private modalService: NgbModal, 
    private formBuilder: FormBuilder
  ) { }

  abrir(cliente: Cliente, modal) {
    this.carregarEstados();
    if(cliente){
      this.title = "Alterar Cliente";
    }
    this.cliente = cliente;
   this.modalRef = this.modalService.open(modal, {size: 'lg'});
  }

  carregarEstados(){
     this.cadastroService.estados()
      .subscribe(dados => {this.estados = dados});
  }

  cidadesBySigla(sigla){
     this.cadastroService.cidadesBySigla(sigla)
      .subscribe(dados => {this.cidades = dados, this.setCidade(this.cidades)});
  }

  fechar(){
    this.modalRef.close();
  }

  setCidade(cidades){
      let achou = _.find(cidades, { Nome: this.cidadecep });
      if(achou)
        this.Cidade = achou.IdCidade;
  }

  salvar(formulario){
    if(formulario.valid == false){
      this.error = true;

      // _.forEach(formulario.form.controls, function (item) {
      //          console.log(item);
      //     });

      if(formulario.form.controls.email.invalid)
        formulario.form.controls.email.touched = true;
      
       if(formulario.form.controls.Nome.invalid)
          formulario.form.controls.Nome.touched = true;

         if(formulario.form.controls.telefone.invalid)
            formulario.form.controls.telefone.touched = true;
     
    }
    else{
      this.error = false;
      let model = {
        Nome: formulario.value.Nome,
        Telefone1: formulario.value.telefone,
        Email: formulario.value.email,
        Tipo: "PF",
        Situacao: "A",
        IdEmpresa: 2,
        Endereco: {
          Logradouro: formulario.value.endereco.logradouro,
          Bairro: formulario.value.endereco.bairro,
          IdCidadeSelecionado: this.Cidade,
          SiglaEstado: formulario.value.endereco.estado,
          Numero: formulario.value.endereco.numero,
          Complemento: formulario.value.endereco.Complemento,
          Referencia: formulario.value.endereco.Referencia,
          Cep: formulario.value.endereco.cep
        }
      };

      console.log(model);
      this.cadastroService.salvar(model);
    }
  }

  ngOnInit() {
     this.cadastroService.getClientes()
       .subscribe(dados => {this.clientes = dados, console.log(dados)});
  }

  onSubmit(formulario){
    console.log(formulario);
    console.log('456465as4d56s4a56d4a5s4d5as4d65sa465d');
  }

  setarCep(dados, formulario){
    console.log(dados);
    this.cidadecep = dados.localidade;
    formulario.form.patchValue({
      endereco:{
        logradouro: dados.logradouro,
        cep: dados.cep,
        complemento: dados.complemento,
        bairro: dados.bairro,
        estado: dados.uf,
        cidade: dados.localidade
      }

    });
  }

  consultaCep(cep, formulario){
    cep = cep.replace(/\D/g, '');
    if(cep != ""){
      var validaCep = /^[0-9]{8}$/;
      if(validaCep.test(cep)){
        this.cadastroService.buscaCep(cep)
         .subscribe(dados => {
           this.setarCep(dados, formulario)
           });
      }
    }
  }

}

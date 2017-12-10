import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx"

@Injectable()
export class CadastroService {

  constructor(private http: Http) { }

  getClientes(){
    return this.http.get('http://localhost:56738/cadastro/listarClientes')
                .map((res: Response) => res.json());
  }

  salvar(model){
     return this.http.post('http://localhost:56738/cadastro/salvarCliente', model)
                .map(res => res)
                .subscribe(dados => console.log(dados));
  }

  buscaCep(cep){
     return this.http.get(`//viacep.com.br/ws/${cep}/json`)
                .map(dados => dados.json());
  }

  estados(){
      return this.http.get('http://localhost:56738/cadastro/estados')
                .map((res: Response) => res.json());
  }

   cidadesById(id){
      return this.http.get('http://localhost:56738/cadastro/cidadesbyidestado?id='+id)
                .map((res: Response) => res.json());
  }

   cidadesBySigla(sigla){
      return this.http.get('http://localhost:56738/cadastro/cidadesbysigla?sigla='+sigla)
                .map((res: Response) => res.json());
  }

}
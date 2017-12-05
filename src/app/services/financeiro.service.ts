import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from "rxjs/Rx"

@Injectable()
export class FinanceiroService {

  constructor(private http: Http) { }

  getMeiosPagamentos(){
    return this.http.get('http://localhost:56738/cadastro/allmeiosdepagamento')
                .map((res: Response) => res.json());
  }

  salvar(form){
     return this.http.post('http://localhost:56738/cadastro/salvarmeiospagamento', form.value)
                .map(res => res)
                .subscribe(dados => console.log(dados));
  }

}

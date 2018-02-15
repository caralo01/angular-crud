import { Injectable } from '@angular/core';
import { Http, Headers }from '@angular/http'
import { Heroe } from '../interfaces/heroe.interface'
import  'rxjs/Rx'

@Injectable()
export class HeroesService {

  private heroesUrl:string = "https://crud-a1296.firebaseio.com/heroes.json";
  private heroeUrl:string = "https://crud-a1296.firebaseio.com/heroes/"

  constructor(private _http:Http) { }

  nuevoHeroe(heroe:Heroe){
    let body = JSON.stringify( heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    })

    return this._http.post(this.heroesUrl, body, { headers: headers })
          .map( res=> {
            console.log(res.json());
            return res.json();
          })

  }

  actualizarHeroe(heroe:Heroe, id: string){
    let body = JSON.stringify( heroe);
    let headers = new Headers({
      'Content-Type': 'application/json'
    })

    return this._http.put(this.heroeUrl + id +'.json', body, { headers: headers })
          .map( res=> {
            console.log(res.json());
            return res.json();
          })

  }

  getHeroe(id:string){
    let url = `${this.heroeUrl}/${id}.json`;
    return this._http.get(url)
        .map(res=> res.json());
  }

  getHeroes(){
    let url = `${this.heroesUrl}`;
    return this._http.get(url)
        .map(res=> res.json());
  }

  borrarHeroe(id: string){
    let headers = new Headers({
      'Content-Type': 'application/json'
    })

    return this._http.delete(this.heroeUrl + id +'.json')
          .map( res=> {
            console.log(res.json());
            return res.json();
          })

  }

}

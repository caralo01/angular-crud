import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styles: []
})
export class HeroesComponent implements OnInit {

  public heroes:any;
  public loading:boolean;

  constructor(private _heroesService: HeroesService) { 
    this.loading = true;
    this._heroesService.getHeroes().subscribe(res => {
      setTimeout( ()=> {
        this.heroes = res;
        this.loading = false
      }, 3000);
    },
    error => {
      console.log(error);
    });
  }

  ngOnInit() {
  }

  borrarHeroe(id:string){
    this._heroesService.borrarHeroe(id).subscribe(res => {
      if(res){
        console.log(res);
      }
      else{
        delete this.heroes[id];
      }
    },
    error => {
      console.log( error);
    });
  }

}

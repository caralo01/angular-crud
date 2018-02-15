import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Heroe } from '../../../interfaces/heroe.interface';
import { HeroesService } from '../../../services/heroes.service';

@Component({
  selector: 'app-heroe',
  templateUrl: './heroe.component.html',
  styles: []
})
export class HeroeComponent implements OnInit {

  public heroe:Heroe = {
    nombre:"",
    bio:"",
    casa:""
  };
  public nuevo:boolean;
  public id: string;
  constructor(private _heroesService: HeroesService,
              private _router:Router,
              private _route: ActivatedRoute) { 
    this.nuevo = false;
    this._route.params.subscribe( params =>{
      this.id = params['id'];
      if(this.id !== 'new'){
        this._heroesService.getHeroe(this.id).subscribe( res =>{
          this.heroe = res;
        });
      }
    });
  }

  ngOnInit() {
  }

  guardar(){
    if(this.id === "new"){ 
      this._heroesService.nuevoHeroe(this.heroe)
        .subscribe(res =>{
          this._router.navigate(['heroe', res.name])
         },
         error => console.log(error)
      );
    }
    else{
      this._heroesService.actualizarHeroe(this.heroe, this.id)
        .subscribe(res => console.log(res),
         error => console.log(error)
      );
    }
  }

  resetear(form:NgForm){
    this._router.navigate(['/heroe', 'new']);

    form.reset({casa:""});

  }

}

import { Component, OnInit } from '@angular/core';
import { ProduitsService } from './services/produits.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'Calcul de taxes';
  list_produits:any=[];
  Input_produits:any=[];
  Output_produits:any=[];
  historique_Output_produits:any=[];
  id:Number=0
  

  constructor(private produits:ProduitsService) { }

  ngOnInit() {
    this.list_produits=this.produits.produits;
  }

  getItem(index:any){
    let item=
            {
              ind:null,
              indexP:null,
              nb:0
            }
    let trouve=false
    let i=0
    while(i<this.Input_produits.length && trouve == false) {
      if(this.Input_produits[i].indexP.id == this.list_produits[index].id){
         this.Input_produits[i].nb+=1
         trouve =true
         break     
      }
      i++
    }
    if(!trouve){
      item=
      {
        ind:index,
        indexP:this.list_produits[index],
        nb:1
      }
      this.Input_produits.push(item)
    }   
    this.facture()
  }
  facture(){
     let tab_prod_taxe:any=[]
     let taxe_totale=0
     let t_prod=null
     let montant_totale=0

     let Prod_tae=
                {
                  ind:null,
                  produit_Pht:null,
                  produit_t:0,
                  nb:null
                }

      for(let i=0;i<this.Input_produits.length;i++){
        taxe_totale +=Math.round(this.produits.calcul_TTC(this.Input_produits[i].ind) * this.Input_produits[i].nb)
        t_prod = (this.produits.calcul_TTC(this.Input_produits[i].ind) +this.Input_produits[i].indexP.prix) * this.Input_produits[i].nb
        montant_totale +=(this.produits.calcul_TTC(this.Input_produits[i].ind) +this.Input_produits[i].indexP.prix)* this.Input_produits[i].nb
        Prod_tae=
                {
                  ind:this.Input_produits[i].ind,
                  produit_Pht:this.Input_produits[i],
                  produit_t:t_prod,
                  nb:this.Input_produits[i].nb
                }
                tab_prod_taxe.push(Prod_tae)
      }
      this.Output_produits=
                {
                  produit:tab_prod_taxe,
                  Montant_des_taxes:taxe_totale,
                  total :montant_totale
                }
      //this.Output_produits.push(facture_output)
  }
  

}

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
  historique_facture=false
  output_btn=false
  reset_btn=false
  historique_facture_btn=false
  

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
      this.output_btn=true
      this.reset_btn=true
    }   
    //this.facture()
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
        taxe_totale +=this.produits.calcul_TTC(this.Input_produits[i].ind) * this.Input_produits[i].nb
        t_prod = (this.produits.calcul_TTC(this.Input_produits[i].ind) +this.Input_produits[i].indexP.prix) * this.Input_produits[i].nb
        montant_totale +=(this.produits.calcul_TTC(this.Input_produits[i].ind) +this.Input_produits[i].indexP.prix)* this.Input_produits[i].nb
        Prod_tae=
                {
                  ind:this.Input_produits[i].ind,
                  produit_Pht:this.Input_produits[i],
                  produit_t:Number((Math.ceil(t_prod*20)/20).toFixed(2)),
                  nb:this.Input_produits[i].nb
                }
                tab_prod_taxe.push(Prod_tae)
      }
      this.Output_produits=
                {
                  output:"###output"+(this.historique_Output_produits.length +1),
                  produit:tab_prod_taxe,
                  Montant_des_taxes:Number((Math.ceil(taxe_totale*20)/20).toFixed(2)),
                  total : Number((Math.ceil(montant_totale*20)/20).toFixed(2))
                }
      
      this.historique_Output_produits.push(this.Output_produits)
      console.log(this.historique_Output_produits)
      this.historique_facture_btn=true
      this.output_btn=false
  }
  reset(){
    this.Output_produits=[]
    this.Input_produits=[]
    this.output_btn=false
    this.reset_btn=false
    console.log(this.historique_Output_produits)
  }
  Onhistorique_facture(){
    this.historique_facture=!this.historique_facture
  }
  

}

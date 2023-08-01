import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  title = 'Calcul de taxes';
  list_produitsDB:any=[];
  list_produits:any=[];
  Input_produits:any=[];
  Output_produits:any=[];
  num_commande :any=[];
  commande:any=[]
  totalfacture=false

  

  constructor(private produits:ProduitsService, private http:HttpClient,private router: Router) { 
  }

  ngOnInit() {
    this.produits.LoadProduct('get_all_produits.php').subscribe(res =>{
      this.list_produits = res
    })
    this.getcommandeid()
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
    
    this.Output_produits=[]
    this.commande=[]
    this.totalfacture=false
  }
  
  facture(){
     let tab_prod_taxe:any=[]
     let taxe_totale=0
     let t_prod=0
     let montant_totale=0

     let Prod_tae=
                {
                  taxe_unite:0,
                  taxe_tot:0,
                  produit_Pht:null,
                  produit_t:0,
                  nb:null
                }

      for(let i=0;i<this.commande.length;i++){

        taxe_totale +=this.produits.calcul_TTC(this.commande[i]) * this.commande[i].nb
        t_prod = (this.produits.calcul_TTC(this.commande[i]) + Number(this.commande[i].prix_produit)) * this.commande[i].nb
        montant_totale +=(this.produits.calcul_TTC(this.commande[i]) +Number(this.commande[i].prix_produit))* this.commande[i].nb
        

        Prod_tae=
                {
                  taxe_unite:this.produits.round_function(this.produits.calcul_TTC(this.commande[i])),
                  taxe_tot:this.produits.round_function(this.produits.calcul_TTC(this.commande[i])* this.commande[i].nb),
                  produit_Pht:this.commande[i],
                  produit_t:this.produits.round_function(t_prod),
                  nb:this.commande[i].nb
                }
                tab_prod_taxe.push(Prod_tae)
      }
      this.Output_produits=
                {
                  
                  produit:tab_prod_taxe,
                  Montant_des_taxes:this.produits.round_function(taxe_totale),
                  total : this.produits.round_function(montant_totale),
                }
                this.totalfacture=true
          this.Input_produits=[]
      
  }


  btn_page_produits(){
    this.router.navigate(['/produits'])
  }
  get_commandeNumbr(){
    /*this.produits.LoadrowNb().subscribe(data =>{
      let commandenbr = Number(data) +1
      console.log(commandenbr)
      this.ajouter_commande(commandenbr)
    })*/
    let commandenbr =Math.floor(Math.random() * 100)
    this.ajouter_commande(commandenbr)
    }
    ajouter_commande(nbcommande:any){

      console.log(nbcommande)
      for(let i =0;i<this.Input_produits.length;i++){
        let formdata = new FormData()
        formdata.append('num_commande', nbcommande)
        formdata.append('nom_produit', this.Input_produits[i].indexP.nom_produit)
        formdata.append('prix_produit', this.Input_produits[i].indexP.prix_produit)
        formdata.append('t_importe', this.Input_produits[i].indexP.t_importe)
        formdata.append('taxe', this.Input_produits[i].indexP.taxe)
        formdata.append('nb', this.Input_produits[i].nb)
        this.produits.addcommande(formdata).subscribe(res =>{
          if(res.result === 'success'){
            
            console.log('commande num'+ (nbcommande+1) + "est ajouter")
            
          }else{
            console.log('failed')
          }
        })
        
      }
      this.Input_produits=[]
      this.getcommandeid()
      }

      getcommandeid(){
        this.produits.getidcommande().subscribe(res =>{
          this.num_commande= res
          console.log(res)
        })
        
      }
      getcommande(id:any){
        this.produits.getcommande(id).subscribe(res =>{
          this.commande= res
          console.log(res)
        })
        
      }

    reset_btn(){
      this.Output_produits=[]
      this.commande=[]
      this.Input_produits=[]
      this.totalfacture=false
    }
    reset_panier(){
      this.Input_produits=[]
    }
    
    
  
  
}

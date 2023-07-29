import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  produits = [
    {
      id: 1,
      nom: "livre",
      prix: 12.49,
      importé: false,
      marque: 1,
      taxe:10,
      t_importé:0
    },
    {
      id: 2,
      nom: "CD musical",
      prix: 14.99,
      importé: false,
      marque: 1,
      taxe:20,
      t_importé:0
    },
    {
      id: 3,
      nom: "barre de chocolat",
      prix: 0.85,
      importé: false,
      marque: 1,
      taxe:0,
      t_importé:0
    },
    {
      id: 4,
      nom: "boîte de chocolats importée",
      prix: 10,
      importé: true,
      marque: 1,
      taxe:0,
      t_importé:5
    },
    {
      id: 5,
      nom: "flacon de parfum importé",
      prix: 47.50,
      importé: true,
      marque: 1,
      taxe:20,
      t_importé:5
    },
    {
      id: 6,
      nom: "flacon de parfum importé",
      prix: 27.99,
      importé: true,
      marque: 2,
      taxe:20,
      t_importé:5
    },
    {
      id: 7,
      nom: "flacon de parfum ",
      prix: 18.99,
      importé: false,
      marque: 1,
      taxe:20,
      t_importé:0
    },
    {
      id: 8,
      nom: "boîtes de pilules contre la migraine ",
      prix: 9.75,
      importé: false,
      marque: 1,
      taxe:0,
      t_importé:0
    },
    {
      id: 9,
      nom: "boîte de chocolats importé ",
      prix: 11.25,
      importé: true,
      marque: 2,
      taxe:0,
      t_importé:5
    }
  ]

  calcul_TTC(index:any){
    let produit = this.produits[index]
    let pttc = 0
      if(!(produit.taxe == 0) && !(produit.t_importé == 0) ){
        pttc = ((produit.prix * produit.taxe)/100) + ((produit.prix * produit.t_importé)/100)
      }else if(produit.taxe == 0 && !(produit.t_importé == 0) ){
        pttc = ((produit.prix * produit.t_importé)/100)
      }else if(!(produit.taxe == 0) && produit.t_importé == 0 ){
        pttc = ((produit.prix * produit.taxe)/100) 
      }else{
        pttc = 0
      }
      
      return pttc
  }



}

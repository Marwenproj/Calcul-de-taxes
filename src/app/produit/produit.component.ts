import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ProduitsService } from '../services/produits.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

declare var window:any;
@Component({
  selector: 'app-produit',
  templateUrl: './produit.component.html',
  styleUrls: ['./produit.component.css']
})
export class ProduitComponent implements OnInit{
  list_produits:any =[]
  listProduitSubscribe:any 

  formModaladd:any
  formModaldelete:any

  productForm :any

  IdProduitdel:any

  constructor(private serviceProduits:ProduitsService,private http:HttpClient
             ,private formbuilder:FormBuilder, private router: Router){
       
  }


  ngOnInit(){
    this.formModaladd = new window.bootstrap.Modal(document.getElementById('addproduit'))
    this.formModaldelete = new window.bootstrap.Modal(document.getElementById('deleteproduit'))
    this.getProductList()
    this.createProductForm()
  }

  openModal(){
    this.formModaladd.show()
  }
  closeModal(){
    this.formModaladd.hide()
  }
  openModaldelete(){
    this.formModaldelete.show()
  }
  closeModaldelete(){
    this.formModaldelete.hide()
  }


  getProductList(){
    this.listProduitSubscribe =this.serviceProduits.LoadProduct('get_all_produits.php').subscribe(res =>{
      this.list_produits = res
    })
  }

  createProductForm(){
    this.productForm = this.formbuilder.group({
      'nom_produit': ['', Validators.compose([Validators.required])],
      'prix_produit': ['', Validators.compose([Validators.required])],
      'categorie': ['autre', Validators.compose([Validators.required])],
      'importe': ['non', Validators.compose([Validators.required])]
    })
  }

  createProduct(values:any){
    let taxe = '0'
    let t_importe='0'
   
    let formdata = new FormData()
    formdata.append('nom_produit', values.nom_produit)
    formdata.append('prix_produit', values.prix_produit)
    formdata.append('categorie', values.categorie)
    formdata.append('importe', values.importe)

    if(values.importe == 'non'){
      t_importe='0'
      if(values.categorie == 'livre'){
        taxe = '10'
      }else if(values.categorie == 'autre'){
        taxe = '20'
      }else{
        taxe = '0'
      }
      formdata.append('taxe', taxe)
      formdata.append('t_importe', t_importe)
    }else{
      t_importe='5'
      if(values.categorie == 'livre'){
        taxe = '10'
      }else if(values.categorie == 'autre'){
        taxe = '20'
      }else{
        taxe = '0'
      }
      formdata.append('taxe', taxe)
      formdata.append('t_importe', t_importe)
    }

    this.serviceProduits.CreateProduct(formdata,'create.php').subscribe(res =>{
      if(res.result === 'success'){
        
        this.getProductList()
      }else{
        console.log('failed')
      }
    })
    this.closeModal()
  }

  getIdProduit(id:any){
    this.openModaldelete()
    this.IdProduitdel= id
  }
  deleteProduit(){
    this.serviceProduits.deleteProduct(this.IdProduitdel).subscribe(res =>{
      if(res.result === 'success'){
        this.getProductList()
        this.closeModaldelete()
      }else{
        console.log('failed')
      }
    })
  }
  btn_back_home(){
    this.router.navigate([''])
  }




}

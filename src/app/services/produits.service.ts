import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpResponse } from '../model/http-response';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProduitsService {

  constructor(private http:HttpClient){}

  LoadProduct(url_page:string){
    const url =environment.Url + url_page
    return this.http.get(url).pipe(map(data =>data))
  }
  LoadrowNb(){
    const url =environment.Url +'row_commande.php'
    return this.http.get(url).pipe(map(data =>data))
  }
  CreateProduct(data:any, url_page:string): Observable<HttpResponse> {
    const url =environment.Url + url_page
    return this.http.post<HttpResponse>(url, data).pipe(map(data =>data))
  }
  addcommande(data:any): Observable<HttpResponse> {
    const url =environment.Url +'addcommande.php'
    return this.http.post<HttpResponse>(url, data).pipe(map(data =>data))
  }
  deleteProduct(id:any): Observable<HttpResponse> {
    const url =environment.Url +'delete.php?id='+id
    return this.http.get<HttpResponse>(url).pipe(map(data =>data))
  }
  getidcommande(){
    const url =environment.Url +'getcommandid.php'
    return this.http.get(url).pipe(map(data =>data))
  }
  getcommande(id:any): Observable<HttpResponse> {
    const url =environment.Url +'getcommande.php?num_commande='+id
    return this.http.get<HttpResponse>(url).pipe(map(data =>data))
  }

  round_function(val:any){
    return Number((Math.ceil(val*20)/20).toFixed(2))
  }

  calcul_TTC(produit:any){
    //let produit = produittab[index]
    let pttc = 0
      if(!(produit.taxe == 0) && !(produit.t_importe == 0) ){
        pttc = ((produit.prix_produit * produit.taxe)/100) + ((produit.prix_produit * produit.t_importe)/100)
      }else if(produit.taxe == 0 && !(produit.t_importe == 0) ){
        pttc = ((produit.prix_produit * produit.t_importe)/100)
      }else if(!(produit.taxe == 0) && produit.t_importe == 0 ){
        pttc = ((produit.prix_produit * produit.taxe)/100) 
      }else{
        pttc = 0
      }
      return pttc
  }



}

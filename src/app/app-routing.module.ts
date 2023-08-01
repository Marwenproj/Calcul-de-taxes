import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ProduitComponent } from './produit/produit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes =[
  {path: '',component:HomeComponent},
  {path: 'produits',component:ProduitComponent}
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

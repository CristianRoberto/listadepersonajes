import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ToastController,LoadingController } from '@ionic/angular';
import {UserService} from '../servicios/user.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  products:any=[];
  auxproducts=[];
  elementos:any = {
    tipob: "",
    bus:''
     };
  constructor(private http: HttpClient,
    public toast: ToastController,
    public loadingController: LoadingController,
    private servicio: UserService,


    ) {}

  async ngOnInit() {
    this.search();

  }
 

  async search(): Promise<void>{
    const loading = await this.loadingController.create({ message: 'Cargando...' });
      await loading.present();
    this.servicio.getPersonajes().then ( async (re:any)=>{
      this.products = re.results;
      this.auxproducts=[]
      this.auxproducts=this.products;
      await loading.dismiss();
    }).catch(async(_e)=>{
      await loading.dismiss();
      this.presentToast({ args: ["Error de conexion"] });
    })
  }



  onInput2(){
    this.elementos.bus='';
    this.products=this.auxproducts;
  }

  onInput(even:any){
    let val = even.target.value
    if(this.elementos.tipob){
      if(val && val !=''){
        this.products =this.auxproducts.filter((item:any): boolean |any=>{ 
                   if(this.elementos.tipob=='id'){
            return(item.id.toString().toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='name'){
            return(item.name.toLowerCase().indexOf(val.toLowerCase()) >-1)
          }else if(this.elementos.tipob=='specie'){
            return(item.specie.toLowerCase().indexOf(val.toLowerCase()) >-1)
        
          }
          //return(item.precio.toLowerCase().indexOf(val.toLowerCase()) >-1)
        })
  
      }else{
      this.products=this.auxproducts;
      }
    }else{
     this.presentToast('Seleccione un criterio de busqueda');
    }
    

  }

  async presentToast(message:any) {
    const toast = await this.toast.create({
      message: message,
      duration: 2000
    });
    toast.present();
  }}


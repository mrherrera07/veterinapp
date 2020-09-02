var $$ = Dom7
var app = {

};

// variable global

var app7 = new Framework7({
  // App root element
  root: '#app',
  // App Name
  name: 'veterinapp',
  // App id
  id: 'com.veterinapp.app',
  // Enable swipe panel
  /*panel: {
    swipe: 'left',
  },*/
  dialog: {
    // set default title for all dialog shortcuts
    title: 'Confirmacion',
    // change default "OK" button text
    buttonOk: 'OK',
    
  },
  onDeviceReady: function() {

    //GET listeners
document.getElementById("getPosition").addEventListener("click", getPosition);
document.getElementById("watchPosition").addEventListener("click", watchPosition);
},
  // Add default routes
  routes: [
    {
      path: '/home/',
      url: 'views/home.html',
    },
    { path: '/login/',
      url: 'views/login.html',
    },
    { path: '/registro-paciente/',
      url: 'views/registro-paciente.html',
    },
    { path: '/descuentos/',
      url: 'views/descuentos.html',
    },
    { path: '/perfil/',
      url: 'views/perfil.html',
    },
    { path: '/pre-registro/',
      url: 'views/pre-registro.html',
    },
    { path: '/registro-veterinario/',
      url: 'views/registro-veterinario.html',
    },
    { path: '/registro/',
      url: 'views/registro.html',
    },
    { path: '/promociones/',
      url: 'views/promociones.html',
    },
    { path: '/descuentos/',
      url: 'views/descuentos.html',
    },
    { path: '/consejos/',
      url: 'views/consejos.html',
    },
    { path: '/favoritos_doctores/',
      url: 'views/favoritos_doctores.html',
    },
    { path: '/promociones_favoritos/',
    url: 'views/promociones_favoritos.html',
  },
  { path: '/perfil-paciente/',
  url: 'views/perfil-paciente.html',
},
{ path: '/contacto/',
  url: 'views/contacto.html',
},
{ path: '/ubicacion/',
  url: 'views/ubicacion.html',
},
    
  ],
  // ... other parameters
});

var mainView = app7.views.create('.view-main');

var promedio=0;

function showSplashScreen(){
  setTimeout(function(){  InitApp();  }, 1000);
}

function InitApp(){
  if (localStorage.getItem("usuario-login")=="autenticado"){
    mainView.router.navigate('/home/',{animate:true});
    //datos_perfil();
  }else{
  mainView.router.navigate('/login/',{animate:true});
}
}

function CerrarSesion(){
  //checkConnection();
  localStorage.setItem("usuario-login","false");
  localStorage.setItem("usuario","");
  mainView.router.navigate('/login/',{animate:true});
}
//--------------panel-----------------------------------
var panel = app7.panel.create({
  el: '.panel-left',
  resizable: true,
  visibleBreakpoint: 1024,
  collapsedBreakpoint: 768,
})
//----------barra de búsqueda---------------------------
var searchbar = app7.searchbar.create({
  el: '.searchbar',
  on: {
    enable: function () {
      console.log('Searchbar enabled')
    }
  }
})
 
// ---------------dialogo de confirmacion-modalidad---------------------------------
function confirm_modalidad(){
app7.dialog.confirm('¿Estas seguro de la modalidad?', function () {
  mainView.router.navigate('/login/',{animate:true});
});
}
// ---------------dialogo de confirmacion-registro---------------------------------
function confirm_registro(){
  app7.dialog.alert('Usuario registrado exitosamente', function () {
    mainView.router.navigate('/login/',{animate:true});
  });
  }
  // ---------------dialogo de error---------------------------------
function error_password(){
  app7.dialog.alert('La contraseña no concuerda. Escribir correctamente', function () {
    mainView.router.navigate('/registro-paciente/',{animate:true});
  });
  }

//-----------------favorito de promociones------------------
function Favorito(id){
  //alert(id);
  var promocion = id;
  var usuario =localStorage.getItem('usuario');
  //alert(usuario);
 // app7.preloader.show();
app7.request(
  {
    url:'http://localhost/veterinapp/api/favoritos_promo.php', //primer campo es para nombre de variable en API y el segundo el que puse arriba como var
    data:{usuario:usuario,promocion:promocion},
    method:'POST',
    crossDomain: true,
    success:function(data){
      var objson = JSON.parse(data);
     // app7.preloader.hide();
      //alert(objson.data);

      if(objson.data=="ELIMINADO"){
         //sin color
         //alert(objson.data);
       $$('#favorito-'+id).attr('class','f7-icons blanco'); 
        }
        if(objson.data=="REGISTRADO")
        {
        //color rojo
        //alert(objson.data);
        $$('#favorito-'+id).attr('class','f7-icons red');
      }
      
    },
    error:function(error){
      //app7.preloader.hide();
    }
    
  }
  );
}

//------------------------ api de registrarse-paciente------------------------------------

function Registrarse(){
  var nombre = $$('#nombre_r').val();
  var apellidos = $$('#apellidos_r').val();
  var genero = $$('#genero_r').val();
  var nacimiento = $$('#nacimiento_r').val();
  var pais = $$('#pais_r').val();
  var estado = $$('#estado_r').val();
  var ciudad = $$('#ciudad_r').val();
  var direccion = $$('#direccion_r').val();
  var telefono = $$('#telefono_r').val();
  var correo = $$('#correo_r').val();
  var usuario = $$('#usuario_r').val();
var password = $$('#password_r').val();
var password2 = $$('#password2_r').val();

  if (password == password2){
//alert(usuario);
app7.preloader.show();
app7.request(
  {
    url:'http://localhost/veterinapp/api/users.php', //primer campo es para nombre de variable en API y el segundo el que puse arriba como var
    data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,telefono:telefono,correo:correo,genero:genero,nacimiento:nacimiento,pais:pais,estado:estado,ciudad:ciudad,direccion:direccion,password2:password2},
    method:'POST',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();
      //alert(data);
      var objson = JSON.parse(data);

      if(objson.status_message == "CORRECTO"){
        //alert("Gracias por registrarte");
        confirm_registro();
       // mainView.router.navigate('/login/',{animate:true});
      }
      else{
        alert("Hubo un problema intentelo de nuevo");
      }
    },
    error:function(error){
      app7.preloader.hide();
    }
    
  }
  );

 }
 else{
  error_password();
 }
}

//------------------------api registrarse veterinario---------------------------------------------
function Registrarse_V(){
  var nombre = $$('#nombre_v').val();
  var apellidos = $$('#apellidos_v').val();
  var genero = $$('#genero_v').val();
  var nacimiento = $$('#nacimiento_v').val();
  var pais = $$('#pais_v').val();
  var estado = $$('#estado_v').val();
  var ciudad = $$('#ciudad_v').val();
  var direccion = $$('#direccion_v').val();
  var telefono = $$('#telefono_v').val();
  var correo = $$('#correo_v').val();
  var usuario = $$('#usuario_v').val();
var password = $$('#password_v').val();
var password2 = $$('#password2_v').val();
var consultorio = $$('#direccionc_v').val();
var cedula = $$('#cedula_v').val();
var imagen = $$('#cedula_v').val();

  if (password == password2){
//alert(usuario);
app7.preloader.show();
app7.request(
  {
    url:'http://localhost/veterinapp/api/users_v.php', //primer campo es para nombre de variable en API y el segundo el que puse arriba como var
    data:{usuario:usuario,password:password,nombre:nombre,apellidos:apellidos,telefono:telefono,correo:correo,genero:genero,nacimiento:nacimiento,pais:pais,estado:estado,ciudad:ciudad,direccion:direccion,password2:password2,consultorio:consultorio,cedula:cedula,imagen:imagen},
    method:'POST',
    crossDomain: true,
    success:function(data){
      app7.preloader.hide();
      //alert(data);
      var objson = JSON.parse(data);

      if(objson.status_message == "CORRECTO"){
        //alert("Gracias por registrarte");
        confirm_registro();
       // mainView.router.navigate('/login/',{animate:true});
      }
      else{
        alert("Hubo un problema intentelo de nuevo");
      }
    },
    error:function(error){
      app7.preloader.hide();
    }
    
  }
  );

 }
 else{
  error_password();
 }
}

//---------------------api ingresar------------------------------------------
function Ingresar(){

  var usuario = $$('#usuario').val();
  var password = $$('#password').val();
 
  //alert(usuario);
  app7.preloader.show();
  app7.request(
    {
      url:'https://veterinapp.com/veterinapp/api/login.php', 
      //url:'http://localhost/veterinapp/api/login.php',
      data:{usuario:usuario,password:password},
      method:'POST',
      crossDomain: true,
      success:function(data){
        app7.preloader.hide();
        //alert(data);
        var objson = JSON.parse(data);
       

        if(objson.data == "AUTENTICADO"){
          localStorage.setItem("usuario-login","autenticado");
          localStorage.setItem("usuario",usuario);
  
          mainView.router.navigate('/home/',{animate:true});
        }
        else{
          alert("USUARIO Y/O PASSWORD INCORRECTO");
        }
      },
      error:function(error){
        app7.preloader.hide();
      }
      
    }
  );
  
   // app7.preloader.show();
  
  }
  
  //-----------------------Iniciaizacion paginas-------------
  $$(document).on('page:init', '.page[data-name="home"]', function (e) {
    getFotoyperfil();
    getSlider();
    getDoctores();
 });

 $$(document).on('page:init', '.page[data-name="promociones"]', function (e) {
  getPromocion();
});

$$(document).on('page:init', '.page[data-name="consejos"]', function (e) {
  getConsejos();
});

$$(document).on('page:init', '.page[data-name="favoritos_doctores"]', function (e) {
  getDoctores_Favoritos();
});

$$(document).on('page:init', '.page[data-name="promociones_favoritos"]', function (e) {
  getPromociones_Favoritos();
});

$$(document).on('page:init', '.page[data-name="perfil-paciente"]', function (e) {
  getDatosPerfil();
});

//-------------------------


 //-----------------------Api slider del home-------------
 function getSlider(){

  app7.preloader.show();


  app7.request({
    url: 'http://localhost/veterinapp/api/slider.php',
    data:{},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var slider= "";

      var swiper = app7.swiper.get('.swiper-container');
      swiper.removeAllSlides();

      for(x in objson.data){

           var slide ='<div class="swiper-slide"><img src="'+objson.data[x].img+'" width="100%" height="100%" /></div>';

           swiper.appendSlide(slide);

      }

      
    
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });

}

//-------------------Promociones---------------------
function getPromocion(){

  app7.preloader.show();


  app7.request({
    url: 'http://localhost/veterinapp/api/promociones.php',
    data:{},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var promo="";

      for(x in objson.data){

     // console.log(objson.data[x].nombre)
     promo =' <div class="card demo-card-header-pic"><div style="background-image:url('+objson.data[x].imagen+')" class="card-header align-items-flex-end">'+objson.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">Vencimiento:'+objson.data[x].vigencia+' </p><p>'+objson.data[x].descripcion+'</p></div><div class="card-footer fondoamarillo"><a href="#">Precio:$'+objson.data[x].precio+'</a> <i class="f7-icons blanco" id="favorito-'+objson.data[x].id+'"  onClick="Favorito('+objson.data[x].id+')">heart_fill</i><a href="'+objson.data[x].ubicacion+'" target="_blank" class="link">Ver ubicacion</a></div></div>';

     $$('#promos').append(promo);
      }
          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });
}

function verubicacion(ubicacion){
//console.log(ubicacion);

}

//-----------------------------Consejos---------------------------
function getConsejos(){

  app7.preloader.show();


  app7.request({
    url: 'http://localhost/veterinapp/api/consejos.php',
    data:{},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var consejo="";

      for(x in objson.data){

     // console.log(objson.data[x].nombre)
     
     consejo='<div class="card card-expandable" style="height:250px;"><div class="card-content"><div style="background-image:url('+objson.data[x].imagen+'); height:200px; width:100%;background-size:100% auto;background-repeat:no-repeat;"><div class="card-header text-color-white display-block" style="font-size:22px;">'+objson.data[x].titulo+'</div><a href="#" class="link card-close card-opened-fade-in color-white" style="position: absolute; right: 15px; top: 15px"><i class="icon f7-icons" style="color:cyan;">multiply_circle_fill</i></a></div><div class="card-content-padding"><small style="color:gray;">Posteado el '+objson.data[x].fecha+'</small><p>'+objson.data[x].descripcion+'</p><small style="color:gray;">Editado por '+objson.data[x].autor+'</small></div></div></div>'
     
     $$('#consejos').append(consejo);

     console.log(objson.data[x]);
      }
          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });
}
//------------------------Traer info de doctores------------------
function getDoctores(){

  app7.preloader.show();
  var usuario =localStorage.getItem('usuario');
 var prom=0;
  app7.request({
    url: 'http://localhost/veterinapp/api/infodoc.php',
    data:{},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var doctor="";
      
     
  /*var nombre= "";
  var nombre='<div class="col-50 divperfil imgperfil"></div> <div class="col-50 item-title letralogin" style="margin-top:20%;">'+usuario+'</div>'
$$('#nombre_panel').append(nombre);*/
      
      for(x in objson.data){
     obtener_puntaje(objson.data[x].id);
     
       // console.log(objson.data[x].nombre)
     doctor ='<div class="card card-expandable" style="height:150px;"><div class="card-content"><div class="bg-color-yellow fondoazul" style="height:50px"><div class="card-header text-color-black display-block"><small class="nombrecard">'+objson.data[x].nombre+' '+objson.data[x].apellidos+'</small></div><a href="#" class="link card-close card-opened-fade-in color-black" style="position: absolute; right: 15px; top: 15px"><i class="icon f7-icons">multiply_circle_fill</i></a></div><div class="card-content-padding"><div class="row"><div class="col-33"><img src="'+objson.data[x].imagen+'" width="auto" height="70px"/></div><div class="col-66"><small style="font-size:14px">'+objson.data[x].precio+'$ Consulta - '+objson.data[x].precio_dom+'$ Domicilio</small><p><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i>  '+objson.data[x].promedio+'/'+objson.data[x].puntuados+' </p></div></div><div class="row"><div class="col-75" style="color:gray"><p>Cédula profesional:'+objson.data[x].cedula+'</p></div><div class="col-25"><i class="f7-icons gris" id="fav-'+objson.data[x].id+'" onClick="Favorito_doc('+objson.data[x].id+')">heart_fill</i></div></div><p style="margin-top:-10px;font-style: italic;">'+objson.data[x].descripcion+'</p><p style="margin-top:-10px;">Teléfono:'+objson.data[x].telefono+'</p><p style="margin-top:-10px;">Ubicacion:'+objson.data[x].consultorio+'</p><div class="mapa"><iframe src="'+objson.data[x].mapa+'" width="100%" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div><button class="col button button-small button-round  rectanguloamarillo2">Ordenar consulta</button></div></div></div>'
     //alert(objson.data[x].usuario); 
     

     $$('#doctores').append(doctor);
     
      }
          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });
}


//--------------favorito doctor

function Favorito_doc(id){
  //alert(id);
  var doctor = id;
  var usuario =localStorage.getItem('usuario');
  //alert(usuario);
  //alert(id);
 // app7.preloader.show();
app7.request(
  {
    url:'http://localhost/veterinapp/api/favoritos_doctores.php', //primer campo es para nombre de variable en API y el segundo el que puse arriba como var
    data:{usuario:usuario,doctor:doctor},
    method:'POST',
    crossDomain: true,
    success:function(data){
      var objson = JSON.parse(data);
     // app7.preloader.hide();
      //alert(objson.data);

      if(objson.data=="ELIMINADO"){
         //sin color
         //alert(objson.data);
       $$('#fav-'+id).attr('class','f7-icons gris'); 
        }
        if(objson.data=="REGISTRADO")
        {
        //color rojo
        //alert(objson.data);
        $$('#fav-'+id).attr('class','f7-icons red');
      }
      
    },
    error:function(error){
      // alert("no jala");
      //app7.preloader.hide();
    }
    
  }
  );
}

//---------------------------- traer el id de los doctores favoritos y mandarlos a su pagina----------
  
function getDoctores_Favoritos(){

  app7.preloader.show();
  var usuario =localStorage.getItem('usuario');
  var id="";

  app7.request({
    url: 'http://localhost/veterinapp/api/infodoc_favoritos.php',
    data:{usuario:usuario},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var doctor_fav="";
      
      for(x in objson.data){

     // console.log(objson.data[x].nombre)
     doctor_fav = objson.data[x].doctor;
  
    /* alert(doctor_fav);*/

//prueba de construir doctores
  app7.request({
    url: 'http://localhost/veterinapp/api/infodoc_favoritos2.php',
    data:{id:doctor_fav},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson1 = JSON.parse(data);

      var doctor="";
           
      for(x in objson1.data){

     doctor ='<div class="card card-expandable" style="height:150px;"><div class="card-content"><div class="bg-color-yellow fondoazul" style="height:50px"><div class="card-header text-color-black display-block"><small class="nombrecard">'+objson1.data[x].nombre+' '+objson1.data[x].apellidos+'</small></div><a href="#" class="link card-close card-opened-fade-in color-black" style="position: absolute; right: 15px; top: 15px"><i class="icon f7-icons">multiply_circle_fill</i></a></div><div class="card-content-padding"><div class="row"><div class="col-33"><img src="'+objson1.data[x].imagen+'" width="auto" height="70px"/></div><div class="col-66"><small style="font-size:14px">'+objson1.data[x].precio+'$ Consulta - '+objson1.data[x].precio_dom+'$ Domicilio</small><p><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i><i class="icon f7-icons">star</i>  '+objson1.data[x].promedio+'/'+objson1.data[x].puntuados+'</p></div></div><div class="row"><div class="col-75" style="color:gray"><p>Cédula profesional:'+objson1.data[x].cedula+'</p></div><div class="col-25"><i class="f7-icons red" id="fav-'+objson1.data[x].id+'" onClick="Favorito_doc('+objson1.data[x].id+')">heart_fill</i></div></div><p style="margin-top:-10px;font-style: italic;">'+objson1.data[x].descripcion+'</p><p style="margin-top:-10px;">Teléfono:'+objson1.data[x].telefono+'</p><p style="margin-top:-10px;">Ubicacion:'+objson1.data[x].consultorio+'</p><div class="mapa"><iframe src="'+objson1.data[x].mapa+'" width="100%" height="200" frameborder="0" style="border:0;" allowfullscreen="" aria-hidden="false" tabindex="0"></iframe></div><button class="col button button-small button-round  rectanguloamarillo2">Ordenar consulta</button></div></div></div>'


     $$('#doctores_favoritos').append(doctor);
     
      }
          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });

    //llave de if de la la primera funcion
      }

          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });
}


//------------------------------llamar a las promociones favoritas y construirlas en su pagina

function getPromociones_Favoritos(){

 app7.preloader.show();
  var usuario =localStorage.getItem('usuario');
  var id="";

  app7.request({
    url: 'http://localhost/veterinapp/api/promociones_favoritos.php',
    data:{usuario:usuario},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();

      var objson = JSON.parse(data);

      var promocion_fav="";
      
      for(x in objson.data){

     // console.log(objson.data[x].nombre)
     promocion_fav = objson.data[x].promocion;
     //construir la promo
     app7.request({
      url: 'http://localhost/veterinapp/api/promociones_favoritos2.php',
      data:{id:promocion_fav},
      method:'POST',
      crossDomain: true,
      success:function(data){
           
        app7.preloader.hide();
  
        var objson1 = JSON.parse(data);
  
        var promo="";
  
        for(x in objson1.data){
  
       // console.log(objson.data[x].nombre)
       promo =' <div class="card demo-card-header-pic"><div style="background-image:url('+objson1.data[x].imagen+')" class="card-header align-items-flex-end">'+objson1.data[x].titulo+'</div><div class="card-content card-content-padding"><p class="date">Vencimiento:'+objson1.data[x].vigencia+' </p><p>'+objson1.data[x].descripcion+'</p></div><div class="card-footer fondoamarillo"><a href="#">Precio:$'+objson1.data[x].precio+'</a> <i class="f7-icons red" id="favorito-'+objson1.data[x].id+'"  onClick="Favorito('+objson1.data[x].id+')">heart_fill</i><a href="'+objson1.data[x].ubicacion+'" target="_blank" class="link">Ver ubicacion</a></div></div>';
  
       $$('#promos_favoritos').append(promo);
        }
            
      },
      error:function(error){
  
        app7.preloader.hide();
      
      }
      
      });


    //llave de if de la la primera funcion
      }

          
    },
    error:function(error){

      app7.preloader.hide();
    
    }
    
    });    
}

// -----------------------traer foto y nombre al panel-----------------------------
function getFotoyperfil(){
  var usuario =localStorage.getItem('usuario');

app7.request({
  url: 'http://localhost/veterinapp/api/fotousuario.php',
  data:{usuario:usuario},
  method:'POST',
  crossDomain: true,
  success:function(data){
       
    app7.preloader.hide();

    var objson = JSON.parse(data);
    var nombre= "";
    for(x in objson.data){

   // console.log(objson.data[x].nombre)
   nombre='<div class="col-50 divperfil"><img src="'+objson.data[x].foto+'" width="auto" height="100px"/></div> <div class="col-50 item-title letralogin" style="margin-top:20%;">'+objson.data[x].nombre+'</div>'
   $$('#nombre_panel').append(nombre);
  
    }
        
  },
  error:function(error){

    app7.preloader.hide();
  
  }
  
  });

}

//---------------------------------Traer datos al editar perfil------------------
function getDatosPerfil(){
  var usuario =localStorage.getItem('usuario');

app7.request({
  url: 'http://localhost/veterinapp/api/datos_perfil.php',
  data:{usuario:usuario},
  method:'POST',
  crossDomain: true,
  success:function(data){
       
    app7.preloader.hide();

    var objson = JSON.parse(data);
    var profile= "";
    var phone="";
    var direc="";
    for(x in objson.data){

   // console.log(objson.data[x].nombre)
   profile='<li class="item-content item-input"><div class="item-media"><i class="icon demo-list-icon"></i></div><div class="item-inner"><div class="item-title item-floating-label">Nombre</div> <div class="item-input-wrap"><p class="letralogin" style="font-size:7px;" id="nombre_edit"> '+objson.data[x].nombre+'</p></div></div></li><li class="item-content item-input"><div class="item-media"><i class="icon demo-list-icon"></i></div><div class="item-inner"><div class="item-title item-floating-label">Apellidos</div><div class="item-input-wrap"><p class="letralogin" style="font-size:7px;" id="apellidos_edit">'+objson.data[x].apellidos+'</p></div></div></li><li class="item-content item-input"><div class="item-media"><i class="icon demo-list-icon"></i></div><div class="item-inner"><div class="item-title item-floating-label">Usuario</div><div class="item-input-wrap"><p class="letralogin" style="font-size:7px;" id="usuario_edit">'+objson.data[x].usuario+'</p></div></div></li><li class="item-content item-input"><div class="item-media"><i class="icon demo-list-icon"></i></div><div class="item-inner"><div class="item-title item-floating-label">Correo</div><div class="item-input-wrap"><p class="letralogin" style="font-size:7px;" id="correo_edit">'+objson.data[x].correo+'</p></div></div></li>';
    phone=objson.data[x].telefono;
    direc=objson.data[x].direccion;
   $$('#datos_profile').append(profile);
   $$('#telefono_edit').attr('placeholder',phone);
   $$('#direccion_edit').attr('placeholder',direc);
  
    }
        
  },
  error:function(error){

    app7.preloader.hide();
  
  }
  
  });

}

//------------- actualizar perfil------------------
function Actualizar_perfil(){
  var usuario =localStorage.getItem('usuario');
  var telefono = $$('#telefono_edit').val();
  var direccion = $$('#direccion_edit').val();
  var password = $$('#password_edit').val();
  var password2 = $$('#password2_edit').val();

if (password==password2){
  app7.preloader.show();
  app7.request({
    url: 'http://localhost/veterinapp/api/users_perfil.php',
    data:{usuario:usuario,telefono:telefono,direccion:direccion,password:password,password2:password2},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();
  
     //alert("usuarios actualizados")
     mainView.router.navigate('/home/',{animate:true});
    },
    error:function(error){
  
      app7.preloader.hide();
    
    }
    
    });
  
}
else{
error_password();
}
}

 function obtener_puntaje(doctor){
  //var doctor_usuario =localStorage.getItem('usuario');
  var doctor_id=doctor;
  var puntuados=0;
  var puntaje=0;
  
  app7.request({
    url: 'http://localhost/veterinapp/api/obtener_puntaje.php',
    data:{doctor_id:doctor_id},
    method:'POST',
    crossDomain: true,
    success:function(data){
         
      app7.preloader.hide();
  
      var objson1 = JSON.parse(data);
    
      for(x in objson1.data){

        puntuados=objson1.data[x].puntuados;
        puntaje=objson1.data[x].puntaje;
        promedio=puntaje/puntuados;
        //promedio=0.3;
        //alert(promedio);
        /*
        if (promedio >= 0 && promedio <0.49){
          alert("cero estrella");
        }
        else if (promedio >= 0.5 && promedio <0.99){
          alert(" media estrella");
        }
        else if (promedio >= 1 && promedio <1.49){
          alert(" 1 estrella");
        }
        else if (promedio >= 1.5 && promedio <1.99){
          alert(" 1 y media estrella");
        }
        else if (promedio >= 2 && promedio <2.49){
          alert(" 2 estrella");
        }
        else if (promedio >= 2.5 && promedio <2.99){
          alert(" 2 y media estrella");
        }
        else if (promedio >= 3 && promedio <3.49){
          alert(" 3 estrella");
        }
        else if (promedio >= 3.5 && promedio <3.99){
          alert(" 3 y media estrella");
        }
        else if (promedio >= 4 && promedio <4.49){
          alert(" 4 estrella");
        }
        else if (promedio >= 4.5 && promedio <4.99){
          alert(" 4 y media estrella");
        }
        else if (promedio >= 5){
          alert(" 5 estrella");
        }
        */
      }
          
    },
    error:function(error){
      alert("no entra");
      app7.preloader.hide();
    
    }
    
    });

   // return(promedio);
}

// --------------------------funciones para localizacion
function getPosition() {
  var options = {
     enableHighAccuracy: true,
     maximumAge: 3600000
  }
  var watchID = navigator.geolocation.getCurrentPosition(onSuccess, onError, options);

  function onSuccess(position) {
     alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
  };

  function onError(error) {
     alert('code: '    + error.code    + '\n' + 'message: ' + error.message + '\n');
  }
}

function watchPosition() {
  var options = {
     maximumAge: 3600000,
     timeout: 3000,
     enableHighAccuracy: true,
  }
  var watchID = navigator.geolocation.watchPosition(onSuccess, onError, options);

  function onSuccess(position) {
     alert('Latitude: '          + position.coords.latitude          + '\n' +
        'Longitude: '         + position.coords.longitude         + '\n' +
        'Altitude: '          + position.coords.altitude          + '\n' +
        'Accuracy: '          + position.coords.accuracy          + '\n' +
        'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
        'Heading: '           + position.coords.heading           + '\n' +
        'Speed: '             + position.coords.speed             + '\n' +
        'Timestamp: '         + position.timestamp                + '\n');
  };

  function onError(error) {
     alert('code: '    + error.code    + '\n' +'message: ' + error.message + '\n');
  }
}
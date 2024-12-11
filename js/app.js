//------------------------------------------------------- Variables -----------------------------------------------------------------
const marca = document.querySelector('#marca');
const year = document.querySelector('#year');
const minimo = document.querySelector('#minimo');
const maximo = document.querySelector('#maximo');
const puertas = document.querySelector('#puertas');
const transmision = document.querySelector('#transmision');
const color = document.querySelector('#color');

//Contenedor para los resultados
const resultado = document.querySelector('#resultado');


const max = new Date().getFullYear(); //Nos retorna el año actual (2023)
const min = max - 10; //El minimo se considera 10 años menos del actual (2013)

//Creamos un objeto que contendra todos los parametros de busqueda 
const datosBusqueda = {
    marca: '',
    year: '',
    minimo: '',
    maximo: '',
    puertas: '',
    transmision: '',
    color: '',

};


//Eventos
document.addEventListener('DOMContentLoaded', ()=>{
    mostrarAutos(autos); //Muestra todos los autos al cargar la pagina

    llenarSelect(); //Llena las opciones de años 
});

marca.addEventListener('change', e=>{
    datosBusqueda.marca = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});
year.addEventListener('change', e=>{
    datosBusqueda.year = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtrarAuto();
});
minimo.addEventListener('change', e=>{
    datosBusqueda.minimo = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtrarAuto();
});
maximo.addEventListener('change', e=>{
    datosBusqueda.maximo = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtrarAuto();
});
puertas.addEventListener('change', e=>{
    datosBusqueda.puertas = parseInt(e.target.value);
    console.log(datosBusqueda);
    filtrarAuto();
});
transmision.addEventListener('change', e=>{
    datosBusqueda.transmision = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});
color.addEventListener('change', e=>{
    datosBusqueda.color = e.target.value;
    console.log(datosBusqueda);
    filtrarAuto();
});





//Funciones

function mostrarAutos(autos){
    limpiarHTML(); //Elimina el HTML previo
    autos.forEach(auto =>{ //Iteramos sobre el arreglo de objetos autos
        
        const {marca, modelo, year, puertas, transmision, precio, color} = auto;
        const autoHtml = document.createElement('P'); //Por cada iteracion se ira creando un elemento de tipo parrafo
        //Se mostrara unicamente la propiedad de marca de cada objeto auto iterado
        autoHtml.textContent = `
            ${marca} ${modelo} - ${year} - ${puertas} Puertas - Transmision: ${transmision} - Precio: $${precio} - Color: ${color}
        
        
        `;

        //Insertar cada auto dentro del HTML
        resultado.appendChild(autoHtml);
    })
}

function limpiarHTML(){
    while(resultado.firstChild){ //Mientras haya un elemento hijo dentro del contenedor resultado se ejecutara el ciclo while
        resultado.removeChild(resultado.firstChild);
    }
}

//Genera los años del select

function llenarSelect(){

    for(let i = max; i>=min; i--){ //Este for nos permite mostrar los años de forma descendente
        const opcion = document.createElement('OPTION'); //Creamos un elemento HTML de tipo option
        opcion.value = i;
        opcion.textContent = i;
        year.appendChild(opcion); //Vamos agregando cada año a la lista desplegable
    }

};

//Funcion que filtra en base a la busqueda
function filtrarAuto(){ //Esta es una funcion de alto nivel ya que requiere de otra funcion
    const resultado = autos.filter(filtrarMarca).filter(filtrarYear).filter(filtrarPrecio).filter(filtrarPuertas).filter(filtrarTransmision).filter(filtrarColor); //Este filter manda a llamar la funcion filtrarMarca la cual compara la propiedad marca con la marca seleccionada 
    
    if(resultado.length){ //En caso de que haya algun elemento en el arreglo de resultado se mostraran 
        mostrarAutos(resultado);
    }else{//Caso contrario se mostrara un mensaje de que no se encontro el resultado de la busqueda
        limpiarHTML();
        noResultado();
    }


   
}

function filtrarMarca(auto){
    const {marca} = datosBusqueda;
    if(marca){ //Evalua si hay alguna marca dentro del objeto datosBusqueda
        return auto.marca === marca; //En caso de que haya, retorna aquellos autos cuya marca sea igual a la seleccionada
    }
    return auto; //Caso contrario que no se haya seleccionado ninguna marca entonces se mandaran a llamar todos los autos existentes
}

function filtrarPrecio(auto){
    const {minimo, maximo} = datosBusqueda;
    if(maximo && minimo){
        return (auto.precio >= minimo) && ( auto.precio <= maximo);
    }
    if(minimo){
        return auto.precio >= minimo;
    }
    if(maximo){
        return auto.precio <= maximo;
    }

    return auto;
   

}

function filtrarPuertas(auto){
    const {puertas} = datosBusqueda;
    if(puertas){ 
        return auto.puertas === puertas; 
    }
    return auto; 

}

function filtrarTransmision(auto){
    const {transmision} = datosBusqueda;
    if(transmision){ 
        return auto.transmision === transmision; 
    }
    return auto; 
}

function filtrarColor(auto){
    const {color} = datosBusqueda;
    if(color){ 
        return auto.color === color; 
    }
    return auto; 
}

//Filtrar por año
function filtrarYear(auto){
    const {year} = datosBusqueda;
    if(year){ 
        return auto.year === year; 
    }
    return auto; 

}

function noResultado(){
    const noResultado = document.createElement('DIV');
    noResultado.classList.add('alerta','error');
    noResultado.textContent = 'No hay resultados de la busqueda';
    resultado.appendChild(noResultado);

}
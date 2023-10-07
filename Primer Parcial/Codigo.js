
class Vehiculo 
{
  constructor(p_id, p_modelo, p_anoFab, p_velMax) 
  {
    if(!isNaN(p_id) && p_modelo != null && !isNaN(p_anoFab) && !isNaN(p_velMax))
    {
      if(p_id > 0 && p_anoFab > 1885 && p_velMax > 0)
      {
        this.id = p_id;
        this.modelo = p_modelo;
        this.anoFab = p_anoFab;
        this.velMax = p_velMax;
      }
    }
  }

  toString() 
  {
    return `Nombre: ${this.nombre} ${this.apellido}, Edad: ${this.edad}`;
  }
}

class Aereo extends Vehiculo
{
  constructor(p_id, p_modelo, p_anoFab, p_velMax, p_altMax, p_autonomnia) 
  {
    if(!isNaN(p_id) && p_modelo != null && !isNaN(p_anoFab) && !isNaN(p_velMax) && !isNaN(p_altMax) && !isNaN(p_autonomnia))
    {
      if(p_id > 0 && p_anoFab > 1885 && p_velMax > 0 && p_altMax > 0 && p_autonomnia > 0)
      {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.altMax = p_altMax;
        this.autonomia = p_autonomnia;
      }
    }
  }
}

class Terreste extends Vehiculo
{
  constructor(p_id, p_modelo, p_anoFab, p_velMax, p_cantPue, p_cantRue) 
  {
    if(!isNaN(p_id) && p_modelo != null && !isNaN(p_anoFab) && !isNaN(p_velMax) && !isNaN(p_cantPue) && !isNaN(p_cantRue))
    {
      if(p_id > 0 && p_anoFab > 1885 && p_velMax > 0 && p_cantPue > -1 && p_cantRue > 0)
      {
        super(p_id, p_modelo, p_anoFab, p_velMax);
        this.cantPue = p_cantPue;
        this.cantRue = p_cantRue;
      }
    }
  }
}

const jsonString = '[{"id":14, "modelo":"Ferrari F100", "anoFab":1998, "velMax":400, "cantPue":2, "cantRue":4},{"id":51, "modelo":"DodgeViper", "anoFab":1991, "velMax":266, "cantPue":2, "cantRue":4},{"id":67, "modelo":"Boeing CH-47 Chinook","anoFab":1962, "velMax":302, "altMax":6, "autonomia":1200},{"id":666, "modelo":"Aprilia RSV 1000 R","anoFab":2004, "velMax":280, "cantPue":0, "cantRue":2},{"id":872, "modelo":"Boeing 747-400", "anoFab":1989,"velMax":988, "altMax":13, "autonomia":13450},{"id":742, "modelo":"Cessna CH-1 SkyhookR", "anoFab":1953,"velMax":174, "altMax":3, "autonomia":870}]'

const data = JSON.parse(jsonString);

function crearObjetoDeClase(datos)
{
  if (datos.hasOwnProperty('altMax') && datos.hasOwnProperty('autonomia')) 
  {
    return new Aereo(datos.id, datos.modelo, datos.anoFab, datos.velMax, datos.altMax, datos.autonomia);
  } 
  else if (datos.hasOwnProperty('cantPue') && datos.hasOwnProperty('cantRue')) 
  {
    return new Terreste(datos.id, datos.modelo, datos.anoFab, datos.velMax, datos.cantPue, datos.cantRue);
  } 
  else 
  {
    return new Vehiculo(datos.id, datos.modelo, datos.anoFab, datos.velMax);
  }
}

const listaVehiculos = data.map(crearObjetoDeClase);

var ultimoArray = new Array();

ultimoArray = listaVehiculos;

const tablaCuerpo = document.getElementById('tablaCuerpo');

function actualizarTabla(listaVehiculos)
{
  while (tablaCuerpo.firstChild) {
    tablaCuerpo.removeChild(tablaCuerpo.firstChild);
  }

  listaVehiculos.forEach((tipoVehiculo) => 
  {
      const nuevaFila = document.createElement('tr');
      nuevaFila.id = `fila_con_id-${tipoVehiculo.id}`; 
      nuevaFila.innerHTML = `
          <td>${tipoVehiculo.id}</td>
          <td>${tipoVehiculo.modelo}</td>
          <td>${tipoVehiculo.anoFab}</td>
          <td>${tipoVehiculo.velMax}</td>
          <td>${tipoVehiculo.altMax || ''}</td>
          <td>${tipoVehiculo.autonomia || ''}</td>
          <td>${tipoVehiculo.cantPue || ''}</td>
          <td>${tipoVehiculo.cantRue || ''}</td>
      `;
      tablaCuerpo.appendChild(nuevaFila);
  });
}

actualizarTabla(listaVehiculos);

function filtrarVehiculosPorTipo(tipo, vehiculos) 
{
  if(tipo === "todos")
  {
    return vehiculos;
  }

  if (tipo === "aereo" || tipo === "terrestre") 
  {
    return vehiculos.filter((vehiculo) => 
    {
      if (tipo === "aereo" && vehiculo instanceof Aereo) 
      {
        return true;
      } 
      else if (tipo === "terrestre" && vehiculo instanceof Terreste) 
      {
        return true;
      } 
      else 
      {
        return false;
      }
    });
  } 
  else 
  {
    console.log("Tipo de vehículo no válido.");
    return [];
  }
}

var filtros = document.getElementById("filtros");

filtros.addEventListener("change", function(){

  console.log(filtros.value);
  var filtro = filtros.value;

  let nuevoArray = filtrarVehiculosPorTipo(filtro, listaVehiculos);

  ultimoArray = nuevoArray;

  actualizarTabla(nuevoArray);
})


var btnCalcular = document.getElementById("calcular");

var txtPromedio = document.getElementById("txtPromedio");

btnCalcular.addEventListener("click", function(){
  const sumaVelocidades = ultimoArray.reduce((acumulador, vehiculo) => 
  {
    return acumulador + vehiculo.velMax;
  }, 0);

  const promedioVelocidades = sumaVelocidades / ultimoArray.length;

  txtPromedio.value = promedioVelocidades.toFixed(2);
})

var tituloForm = document.getElementById("tituloForm");
var btnCanelar = document.getElementById("cancelar");
var btnAgregar = document.getElementById("agregar");
var primerForm = document.getElementById("primerForm");
var abm = document.getElementById("ABM");

abm.style.display = 'none';

btnAgregar.addEventListener('click', function() 
{
  primerForm.style.display = 'none';
  abm.style.display = 'block';
});

tituloForm.addEventListener('dblclick', function() 
{
  primerForm.style.display = 'none';
  abm.style.display = 'block';
});

btnCanelar.addEventListener('click', function() 
{
  primerForm.style.display = 'block';
  abm.style.display = 'none';
});

function agregarVehiculo()
{
  var tipos = document.getElementById("tipo");

  var tipoSeleccionado = tipos.value;

  //Me quede sin tiempo :(
}





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

const arrayObject = JSON.parse(jsonString);

function crearObjetoDeClase(unObjeto)
{
  if (unObjeto.hasOwnProperty('altMax') && unObjeto.hasOwnProperty('autonomia')) 
  {
    return new Aereo(unObjeto.id, unObjeto.modelo, unObjeto.anoFab, unObjeto.velMax, unObjeto.altMax, unObjeto.autonomia);
  } 
  else if (unObjeto.hasOwnProperty('cantPue') && unObjeto.hasOwnProperty('cantRue')) 
  {
    return new Terreste(unObjeto.id, unObjeto.modelo, unObjeto.anoFab, unObjeto.velMax, unObjeto.cantPue, unObjeto.cantRue);
  } 
  else 
  {
    return new Vehiculo(unObjeto.id, unObjeto.modelo, unObjeto.anoFab, unObjeto.velMax);
  }
}

const listaVehiculos = arrayObject.map(crearObjetoDeClase);

var ultimoArray = new Array();

ultimoArray = listaVehiculos;

const tablaCuerpo = document.getElementById('tablaCuerpo');

function actualizarTabla(listaVehiculos)
{
  while (tablaCuerpo.firstChild)
  {
    tablaCuerpo.removeChild(tablaCuerpo.firstChild);
  }

  listaVehiculos.forEach((vehiculo) => 
  {
      const nuevaFila = document.createElement('tr');
      nuevaFila.id = `fila_con_id-${vehiculo.id}`; 
      nuevaFila.innerHTML = `
          <td>${vehiculo.id}</td>
          <td>${vehiculo.modelo}</td>
          <td>${vehiculo.anoFab}</td>
          <td>${vehiculo.velMax}</td>
          <td>${vehiculo.altMax === undefined ? '' : vehiculo.altMax}</td>
          <td>${vehiculo.autonomia === undefined ? '' : vehiculo.autonomia}</td>
          <td>${vehiculo.cantPue === undefined ? '' : vehiculo.cantPue}</td>
          <td>${vehiculo.cantRue === undefined ? '' : vehiculo.cantRue}</td>
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
    //console.log("Tipo de vehículo no válido.");
    return [];
  }
}

var filtros = document.getElementById("filtros");

filtros.addEventListener("change", function(){

  var filtro = filtros.value;

  let nuevoArray = filtrarVehiculosPorTipo(filtro, listaVehiculos);

  ultimoArray = nuevoArray;

  actualizarTabla(nuevoArray);
})

var btnCalcular = document.getElementById("calcular");

var txtPromedio = document.getElementById("txtPromedio");

btnCalcular.addEventListener("click", function(){
  var sumaVelocidades = ultimoArray.reduce((acumulador, vehiculo) => 
  {
    return acumulador + vehiculo.velMax;
  }, 0);

  var promedioVelocidades = sumaVelocidades / ultimoArray.length;

  txtPromedio.value = promedioVelocidades.toFixed(2);
})

var btnCanelar = document.getElementById("cancelar");
var btnAgregar = document.getElementById("agregar");
var primerForm = document.getElementById("primerForm");
var abm = document.getElementById("ABM");

abm.style.display = 'none';

btnAgregar.addEventListener('click', cambiarDeFormulario);

btnCanelar.addEventListener('click', cambiarDeFormulario);

function cambiarDeFormulario()
{
  if(primerForm.style.display != 'none')
  {
    primerForm.style.display = 'none';
    abm.style.display = 'block';
  }
  else
  {
    primerForm.style.display = 'block';
    abm.style.display = 'none';
  }
}

var id = document.getElementById("idAbm");
var modelo = document.getElementById("modeloAbm");
var anioFabricacion = document.getElementById("anioAbm");
var velMaxima = document.getElementById("velMaxAbm");
var tipo = document.getElementById("tipoAbm");
var altMax = document.getElementById("altMaxAbm");
var autonomia = document.getElementById("autonomiaAbm");
var cantPue = document.getElementById("cantPueAbm");
var cantRue = document.getElementById("cantRueAbm");
var datosAereos = document.getElementById("datosAereos");
var datosTerrestres = document.getElementById("datosTerrestres");

$(document).ready(function() 
{
  $('#tablaCuerpo').on('dblclick', 'tr', function() 
  {
    var rowData = $(this).children('td').map(function() 
    {
        return this.textContent;
    }).get();

    cambiarDeFormulario();
    completarDatosAbm(rowData);
  });
});

function completarDatosAbm(rowData)
{
  id.value = rowData[0];
  modelo.value = rowData[1];
  anioFabricacion.value = rowData[2];
  velMaxima.value = rowData[3];

  if(rowData[4] != '')
  {
    tipo.value = "aereo";
    altMax.value = rowData[4];
    autonomia.value = rowData[5];
    cantPue.value = '';
    cantRue.value = '';
  }
  else
  {
    tipo.value = "terrestre";
    cantPue.value = rowData[6];
    cantRue.value = rowData[7];
    altMax.value = '';
    autonomia.value = '';
  }

  filtarParametrosAbm();
}

function filtarParametrosAbm()
{
  if (tipo.value == "aereo")
  {
    datosTerrestres.style.display = 'none';
    datosAereos.style.display = 'block';
  }
  else
  {
    datosAereos.style.display = 'none';
    datosTerrestres.style.display = 'block';
  }
}

tipo.addEventListener('change',filtarParametrosAbm);

function generarNuevoId(listaVehiculos)
{
  var nuevoId = listaVehiculos.reduce((max, vehiculo) => {
    return vehiculo.id > max ? vehiculo.id : max;
  }, 0) + 1;
  
  return nuevoId;
}

function eliminarVehiculo(id)
{
  for (let i = 0; i < listaVehiculos.length; i++) 
  {
    if (listaVehiculos[i].id == id)
    {
      listaVehiculos.splice(i, 1);
    }
  }
}

btnEliminar = document.getElementById("eliminar");

btnEliminar.addEventListener('click', function()
{
  eliminarVehiculo(id.value);
  actualizarTabla(listaVehiculos);
  cambiarDeFormulario();
});

function validarDatosAbm()
{
  if(modelo.value != null && !isNaN(anioFabricacion.value) && !isNaN(velMaxima.value))
  {
    if(anioFabricacion.value > 1885 && velMaxima.value > 0)
    {
      switch(tipo.value)
      {
        case "aereo":
          if(!isNaN(altMax.value) && !isNaN(autonomia.value))
          {
            if(altMax.value > 0 && autonomia.value > 0)
            {
              return true;
            }
          }
        break;

        case "terrestre":
          if(!isNaN(cantPue.value) && !isNaN(cantRue.value))
          {
            if(cantPue.value > -1 && cantRue.value > 0)
            {
              return true;
            }
          }
        break;
      }
    }
  }

  return false;
}

function modificarVehiculo(id)
{
  if (validarDatosAbm())
  {
    listaVehiculos.forEach(function(vehiculo)
    {
      if (vehiculo.id == id)
      {
        vehiculo.modelo = modelo.value;
        vehiculo.anoFab = anioFabricacion.value;
        vehiculo.velMax = velMaxima.value;

        switch(tipo.value)
        {
          case "aereo":
            vehiculo.altMax = altMax.value;
            vehiculo.autonomia = autonomia.value;
          break;
  
          case "terrestre":
            vehiculo.cantPue = cantPue.value;
            vehiculo.cantRue = cantRue.value;
          break;
        }
      }
    });
  }
}

btnModificar = document.getElementById("modificar");

btnModificar.addEventListener('click', function()
{
  modificarVehiculo(id.value);
  actualizarTabla(listaVehiculos);
  cambiarDeFormulario();
})





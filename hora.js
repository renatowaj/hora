//https://pontoweb.nojason.com.br/radix/colaborador/ajustes/criar

//const ferias = [inicio, final];
//exemplo:
//const ferias = ["", ""];

const regexData = /\d\d\/\d\d\/\d\d\d\d/;

const estouDeFerias = data => {
  return false;
};

function marcacao(hora, justificativa) {
  return {
    marcacao: {
      datahora: hora
    },
    justificativa: justificativa
  };
}

function randomMinute() {
  let minute = Math.ceil(Math.random() * 60);
  if (minute < 10) {
    return "0" + minute;
  } else {
    return minute.toString();
  }
}

function ajuste(dateReference) {
  let ajuste_lista = [];
  let diaponto = ["Atual", "Atual", "Atual", "Atual"];
  let minutesInOut = randomMinute();
  let minutesLunch = randomMinute();
  ajuste_lista.push(marcacao("09:" + minutesInOut, "Entrada"));
  ajuste_lista.push(marcacao("12:" + minutesLunch, "Almoço saída"));
  ajuste_lista.push(marcacao("13:" + minutesLunch, "Almoço retorno"));
  ajuste_lista.push(marcacao("18:" + minutesInOut, "Final expediente"));

  return {
    datareferencia: dateReference,
    diaponto: diaponto,
    form: {
      ajustes: ajuste_lista
    }
  };
}

function send(url, date) {
  return jQuery
    .post(url, ajuste(date))
    .success(function(data) {
      console.info("sucesso!", data);
    })
    .error(function(data) {
      console.error("error", data);
    });
}

// function makeurl(data) {
//     let url = './ajustes/';

//     let splitted = data.split('/');
//     let mapped = splitted.map((x) => parseInt(x));

//     return url + mapped.reverse().join('/')
// }

function envioCoordenado(dates, fnfinal) {
  let url = "./ajustes/criar";

  if (!dates.length) {
    if (fnfinal) {
      fnfinal();
    }
    return;
  }

  let date = dates.pop();

  send(url, date)
    .success(d => {
      console.log("sucesso " + date, d);
      envioCoordenado(dates, fnfinal);
    })
    .error(d => console.error("error " + date, d));
}

var jq = document.createElement("script");
jq.src = "https://ajax.googleapis.com/ajax/libs/jquery/2.1.4/jquery.min.js";
document.getElementsByTagName("head")[0].appendChild(jq);
var momentElement = document.createElement("script");
momentElement.src = "https://momentjs.com/downloads/moment.js";
document.getElementsByTagName("head")[0].appendChild(momentElement);
// ... give time for script to load, then type (or see below for non wait option)

console.log("============ATENÇÃO============");
console.log("Esse script deve ser usado unicamente para fins acadêmicos");

setTimeout(function() {
  jQuery.noConflict();
  console.info("============= START PROCESS =============");
  let datas = [];
  jQuery("table#pendencias-table")
    .find("tr")
    .each(function() {
      var date = jQuery(this).attr("data-date");
      if (date) datas.push(date);
    });
  envioCoordenado(datas, () =>
    console.info("============= END PROCESS =============")
  );
}, 1000);

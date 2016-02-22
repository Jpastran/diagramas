"use strict";
//http:programandoointentandolo.com/2012/11/como-crear-pestanas-con-html.html
function tabs(li, div) {
    //Se ocultan todos los contenedores
    var i = 1;
    while (document.getElementById("ctab" + i) != null) {
        $("#" + "ctab" + i).css('display', 'none');
        i += 1;
    }
    i = 1;
    //Se restaura el fondo de las pestañas
    while (document.getElementById("tab" + i) != null) {
        $("#" + "tab" + i).css('background', '');
        $("#" + "tab" + i).css('padding-bottom', '');
        i += 1;
    }

    //Aplica el fondo a la pestaña activa
    $(li).css('background', '#CECECE');
    $(li).css('padding-bottom', '2px');

    //Activa el contedino solicitado
    $(div).css('display', '');
    if (div == ctab2) {
        $(window).load(function() {
            minimap.initMinimap();
        });
    }
}

function editable() {
    var tds = $("#ctabs td");
    for (var i = 0; i < tds.length; i++) {
        if ($(tds[i]).html() == "") {
            $(tds[i]).attr('contenteditable', 'true');
            $(tds[i]).attr('class', 'edit');
            $(tds[i]).attr('id', 'td' + i);
        }
    }
    bimImg();
}

var resp = [];

function obtener() {
    var edits = $(".edit");
    for (var i = 0; i < edits.length; i++) {
        if ($(edits[i]).text() != "") {
            console.log($(edits[i]).text());
        }
        resp[i] = $(edits[i]).text();
    }
}

function cargar(datos) {
    var edits = $(".edit");
    for (var i = 0; i < edits.length; i++) {
        if (datos[i] != "") {
            console.log(datos[i]);
        }
        $(edits[i]).text(datos[i]);
    }
}

function cambiaCtab(li, ctab) {
    //Obtenemos los id de los objetos
    var li = $(li).attr('id');
    var ctab = $(ctab).attr('id');
    //Crea la nueva ruta de la pestaña
    var href = "javascript:tabs(" + li + "," + ctab + ")";
    //Busca la url de la pestaña y la cambia
    $($("#" + li).children('a')).attr('href', href);
}

function tabName(li, name) {
    var a = $(li).find('a');
    a.html(name);
}

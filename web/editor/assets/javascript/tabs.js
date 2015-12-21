
//http:programandoointentandolo.com/2012/11/como-crear-pestanas-con-html.html
function tabs(tabId) {
    // Obtiene los elementos con los identificadores pasados.
    var tab = document.getElementById(tabId);
    // Obtiene las divisiones que tienen el contenido de las pestañas.
    var ctab = document.getElementById("c" + tabId);
    var i = 1;
    // Recorre la lista ocultando todas las pestañas y restaurando el fondo
    // y el padding de las pestañas.
    while (document.getElementById("tab" + i) != null) {
        $("#" + "ctab" + i).css('display', 'none');
        $("#" + "tab" + i).css('background', '');
        $("#" + "tab" + i).css('padding-bottom', '');
        i += 1;
    }
    // Muestra el contenido de la pestaña pasada como parametro a la funcion,
    // cambia el color de la pestaña y aumenta el padding para que tape el
    // borde superior del contenido que esta juesto debajo y se vea de este
    // modo que esta seleccionada.
    $(ctab).css('display', '');
    $(tab).css('background', '#CECECE');
    $(tab).css('padding-bottom', '2px');

}

var resumen = ['op', 'tr', 'de', 'in', 'al', 'co', 'tal', 'tdi', 'tti'];
var datos = ['carta', 'hoja', 'from', 'mate', 'acti', 'ubic', 'alist', 'fecha'];

function editable() {
    for (var i = 0; i < resumen.length; i++) {
        $("#" + datos[i]).attr('contenteditable', 'true');
        $("#" + datos[i]).attr('class', 'edit');
        for (var j = 1; j <= 3; j++) {
            $("#" + resumen[i] + j).attr('contenteditable', 'true');
            $("#" + resumen[i] + j).attr('class', 'edit');
        }
    }
}

function obtener() {
    var obDatos = [];
    var obResum = [];
    var n = 0;
    for (var i = 0; i < resumen.length; i++) {
        for (var j = 1; j <= 3; j++) {
            obDatos[n] = document.getElementById(resumen[i] + j).textContent;
            n++;
        }
        if (document.getElementById(datos[i]) != null) {
            obResum[i] = document.getElementById(datos[i]).textContent;
        }
    }
    console.log(obResum);
    console.log(obDatos);
}

function cambiaTab(tabOld, tabNew) {
    var href = 'javascript:tabs(' + '"' + tabNew + '"' + ');';
    $($(tabOld).children('a')).attr('href', href);
}
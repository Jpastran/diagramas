"use strict";

figureSets["bimanual"] = {
    name: 'Diagrama Bimanual',
    description: 'Diagram set of figures',
    figures: []
};

var opeB = [187, 188, 189, 190, 191, 192];
var traB = [194, 195, 196, 197, 198, 199];
var demB = [201, 202, 203, 204, 205, 206];
var sosB = [208, 209, 210, 211, 212, 213];
var totB = [215, 216, 217, 218, 219, 220];
var tCil = [222, 223, 224];

function resumBim() {
    var cont = 0;
    var opersI = [0, 0, 0, 0];
    var opersD = [0, 0, 0, 0];
    var tabla = $('#bimanualT').find('tbody').children();
    for (var i = 0; i < tabla.length; i++) {
        var tr = $(tabla[i]).children();
        var time = $(tr).first().text();
        if (!isNaN(time)) {
            cont += parseFloat(time);
        }
        var figI = $(tr[2]).find("img").attr("alt");
        opersI[figI]++;
        var figD = $(tr[3]).find("img").attr("alt");
        opersD[figD]++;
    }
    sumSimb(opersI, 0);
    sumSimb(opersD, 1);
    var met = metSelB(true);
    $("#td" + totB[met]).text(tabla.length);
    $("#td" + totB[met + 1]).text(tabla.length);
    totalNoSel();
    met == 2 ? met = 1 : met = 0;
    $("#td" + tCil[met]).text(cont);
    met == 1 ? met = 0 : met = 1;
    $("#td" + tCil[met]).text(0);
    ganarBim();
}

function sumSimb(opers, mano) {
    var pos = 0;
    var met = metSelB(true);
    for (var i = 0; i < opers.length; i++) {
        if (i == 0) {
            pos = opeB[met + mano];
        } else if (i == 1) {
            pos = traB[met + mano];
        } else if (i == 2) {
            pos = demB[met + mano];
        } else if (i == 3) {
            pos = sosB[met + mano];
        }
        $("#td" + pos).text(opers[i]);
        var noSel = met == 2 ? pos - 2 : pos + 2;
        if (isNaN(parseFloat($("#td" + noSel).text()))) {
            $("#td" + noSel).text(0);
        }
    }
}

function totalNoSel() {
    var contI = 0;
    var contD = 0;
    var noSel = metSelB(true) == 2 ? 0 : 2;
    contI += parseFloat($("#td" + opeB[noSel]).text());
    contI += parseFloat($("#td" + traB[noSel]).text());
    contI += parseFloat($("#td" + demB[noSel]).text());
    contI += parseFloat($("#td" + sosB[noSel]).text());
    contD += parseFloat($("#td" + opeB[noSel + 1]).text());
    contD += parseFloat($("#td" + traB[noSel + 1]).text());
    contD += parseFloat($("#td" + demB[noSel + 1]).text());
    contD += parseFloat($("#td" + sosB[noSel + 1]).text());
    $("#td" + totB[noSel]).text(contI);
    $("#td" + totB[noSel + 1]).text(contD);
}

function ganarBim() {
    for (var k = 0; k < 2; k++) {
        var opeG = parseFloat($("#td" + opeB[k]).text()) - parseFloat($("#td" + opeB[k + 2]).text());
        var traG = parseFloat($("#td" + traB[k]).text()) - parseFloat($("#td" + traB[k + 2]).text());
        var demG = parseFloat($("#td" + demB[k]).text()) - parseFloat($("#td" + demB[k + 2]).text());
        var sosG = parseFloat($("#td" + sosB[k]).text()) - parseFloat($("#td" + sosB[k + 2]).text());
        var totG = parseFloat($("#td" + totB[k]).text()) - parseFloat($("#td" + totB[k + 2]).text());
        $("#td" + opeB[k + 4]).text(opeG);
        $("#td" + traB[k + 4]).text(traG);
        $("#td" + demB[k + 4]).text(demG);
        $("#td" + sosB[k + 4]).text(sosG);
        $("#td" + totB[k + 4]).text(totG);
    }
    var tCilG = parseFloat($("#td" + tCil[0]).text()) - parseFloat($("#td" + tCil[1]).text());
    $("#td" + tCil[2]).text(tCilG);
}

function metSelB(bool) {
    var metB = $('input:radio[name=metB]');
    if (metB[0].checked && bool) {
        return 0;
    } else {
        return 2;
    }
}

function changeMetB() {
    var ope = [];
    var tra = [];
    var dem = [];
    var sos = [];
    var tot = [];
    for (var i = 0; i < 4; i++) {
        ope[i] = $("#td" + opeB[i]).text();
        tra[i] = $("#td" + traB[i]).text();
        dem[i] = $("#td" + demB[i]).text();
        sos[i] = $("#td" + sosB[i]).text();
        tot[i] = $("#td" + totB[i]).text();
    }
    for (var j = 0; j < 2; j++) {
        $("#td" + opeB[j]).text(ope[j + 2]);
        $("#td" + traB[j]).text(tra[j + 2]);
        $("#td" + demB[j]).text(dem[j + 2]);
        $("#td" + sosB[j]).text(sos[j + 2]);
        $("#td" + totB[j]).text(tot[j + 2]);
    }
    for (var k = 2; k < 4; k++) {
        $("#td" + opeB[k]).text(ope[k - 2]);
        $("#td" + traB[k]).text(tra[k - 2]);
        $("#td" + demB[k]).text(dem[k - 2]);
        $("#td" + sosB[k]).text(sos[k - 2]);
        $("#td" + totB[k]).text(tot[k - 2]);
    }
    var tot = [];
    ope[0] = $("#td" + tCil[0]).text();
    ope[1] = $("#td" + tCil[1]).text();
    $("#td" + tCil[0]).text(ope[1]);
    $("#td" + tCil[1]).text(ope[0]);
}

function resetBimanual() {
    $('#bimanualT').find('tbody').html("");
}

function addFila() {
    if (validarBim()) {
        var table = $('#bimanualT').find('tbody');
        var tr = $('<tr>');
        tr.append($('<td>' + $('#time').val() + '</td>'));
        tr.append($('<td>' + $('#mid').val() + '</td>'));
        tr.append($('<td><img src="lib/sets/bimanual/' + opr[$('#mis').val()] + '" alt="' + $('#mis').val() + '"/></td>'));
        tr.append($('<td><img src="lib/sets/bimanual/' + opr[$('#mds').val()] + '" alt="' + $('#mds').val() + '"/></td>'));
        tr.append($('<td>' + $('#mdd').val() + '</td>'));
        tr.append($('<td>' + $('#time').val() + '</td>'));
        var td = $('<td>');
        td.append($('<input/>', {type: 'button', value: 'Editar'}).click(editFila));
        td.append($('<input type="button" value="Borrar">').click(delFila));
        tr.append(td);
        table.append(tr);
        resumBim();
        limpiarInsert();
    } else {
        alert("Complete todos los campos");
    }
}

function validarBim() {
    var bool = true;
    if ($('#time').val() == "") {
        bool = false;
    } else if ($('#mid').val() == "") {
        bool = false;
    } else if ($('#mdd').val() == "") {
        bool = false;
    } else if ($('#mis').val() == -1) {
        bool = false;
    } else if ($('#mds').val() == -1) {
        bool = false;
    }
    return bool;
}

function limpiarInsert() {
    $('#time').val("");
    $('#mid').val("");
    $('#mdd').val("");
    $('#mis').val(-1);
    $('#mds').val(-1);
}

function delFila() {
    $(this).parent('td').parent('tr').remove();
}

var tds;
var opr = ['circle.png', 'arrow.png', 'semi_circle_right.png', 'triangle_inver.png'];

function genSelect() {
    var sel = $('<select>');
    sel.append($('<option value="0">Operacion</option>'));
    sel.append($('<option value="1">Trasporte</option>'));
    sel.append($('<option value="2">Demora</option>'));
    sel.append($('<option value="3">Sostenimiento</option>'));
    return sel;
}

function genImg(td) {
    var val = $(td).find('select').val();
    var img = $('<img src="lib/sets/bimanual/' + opr[val] + '" alt="' + val + '"/>');
    return img;
}

function editFila() {
    tds = $(this).parent('td').parent('tr').find('td');
    for (var i = 0; i < tds.length - 2; i++) {
        if (i != 2 && i != 3) {
            $(tds[i]).attr('contenteditable', true);
            $(tds[i]).attr('class', 'edit');
        }
    }
    disBtn(true);
    $(tds[2]).html(genSelect());
    $(tds[3]).html(genSelect());
    $(this).unbind();
    $(this).attr('value', 'Guardar');
    $(this).attr('disabled', false);
    $(this).click(modFila);
}

function modFila() {
    if (valFila()) {
        for (var i = 0; i < tds.length - 2; i++) {
            $(tds[i]).removeAttr('contenteditable');
            $(tds[i]).removeAttr('class');
        }
        disBtn(false);
        $(this).unbind();
        $(tds[2]).html(genImg(tds[2]));
        $(tds[3]).html(genImg(tds[3]));
        $(this).attr('value', 'Editar');
        $(this).click(editFila);
        tds[5].textContent = tds[0].textContent;
        resumBim();
    } else {
        alert('Complete correctamente los campos');
    }
}

function disBtn(bool) {
    var input = $('#bimanualT').find('input');
    for (var i = 0; i < input.length; i++) {
        $(input[i]).attr("disabled", bool);
    }
}

function valFila() {
    var bool = true;
    for (var i = 0; i < tds.length - 2; i++) {
        if (tds[i].textContent == '') {
            bool = false;
        }
    }
    return bool;
}

function editTime() {
    $('#tR').html($('#tL').val());
}

function bimImg() {
    var td = $("#td175");
    td.css('max-width', '400px');
    td.css('max-height', '300px');
    td.attr('align', 'center');
    td.removeAttr('class');
    td.removeAttr('contenteditable');
    var link = $('<a href="javascript:showInsertImageDialog();" title="Add image"></a>');
    link.append('<img src="assets/images/img_icon.png" alt="Image" border="0">');
    td.append(link);
}

function bimInsertImg(imgSrc) {
    var imageURL = appURL + '/editor/data/import/' + imgSrc;
    var img = $('<img src="' + imageURL + '" alt="Image" border="0">');
    img.css('max-width', '400px');
    img.css('max-height', '300px');
    var link = $("#td175").find('a');
    link.html(img);
}
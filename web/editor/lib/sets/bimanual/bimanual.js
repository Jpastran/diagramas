"use strict";

figureSets["bimanual"] = {
    name: 'Diagrama Bimanual',
    description: 'Diagram set of figures',
    figures: []
};

function addFila() {
    var table = $('#bimanualT').find('tbody');
    var tr = $('<tr>');
    tr.append($('<td>' + $('#time').val() + '</td>'));
    tr.append($('<td>' + $('#mid').val() + '</td>'));
    tr.append($('<td><img src="lib/sets/bimanual/' + opr[$('#mis').val()] + '"/></td>'));
    tr.append($('<td><img src="lib/sets/bimanual/' + opr[$('#mds').val()] + '"/></td>'));
    tr.append($('<td>' + $('#mdd').val() + '</td>'));
    tr.append($('<td>' + $('#time').val() + '</td>'));
    var td = $('<td>');
    td.append($('<input/>', {type: 'button', value: 'Editar'}).click(editFila));
    td.append($('<input type="button" value="Borrar">').click(delFila));
    tr.append(td);
    table.append(tr);
}

function delFila() {
    $(this).parent('td').parent('tr').remove();
}

var tds;
var opr = ['circle.png', 'arrow.png', 'triangle_inver.png', 'semi_circle_right.png'];

function genSelect() {
    var sel = $('<select>');
    sel.append($('<option value="0">Operacion</option>'));
    sel.append($('<option value="1">Trasporte</option>'));
    sel.append($('<option value="2">Sostenimiento</option>'));
    sel.append($('<option value="3">Demora</option>'));
    return sel;
}

function genImg(td) {
    var val = $(td).find('select').val();
    var img = $('<img src="lib/sets/bimanual/' + opr[val] + '"/>');
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


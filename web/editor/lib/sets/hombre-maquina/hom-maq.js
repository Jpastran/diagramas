"use strict";

figureSets["hom-maq"] = {
    name: 'Diagrama Hombre-Maquina',
    description: 'Diagram set of figures',
    figures: []
};

function genInit() {
    var ope = $("#numO").val();
    var maq = $("#numM").val();
    var n = parseInt(maq) + parseInt(ope);
    if (n < 6 && n > 1 && maq != 0 && ope != 0) {
        genResumen(ope, maq);
        genColumas(ope, maq);
    }
}

var trInit = [];

function genResumen(nO, nM) {
    var n = parseInt(nM) + parseInt(nO);
    if (trInit.length != 0) {
        cleanResum();
    }
    for (var i = 3; i < 9; i++) {
        var tr = $('#tr' + i);
        if (trInit.length < 9) {
            trInit[i] = $(tr).children();
        }
        if (i != 3) {
            for (var j = 0; j < n * 3; j++) {
                tr.append($('<td>', {contenteditable: 'true', class: 'edit'}));
            }
        } else {
            for (var m = 0; m < 3; m++) {
                for (var k = 0; k < nO; k++) {
                    tr.append($('<td>O' + (k + 1) + '</td>'));
                }
                for (var l = 0; l < nM; l++) {
                    tr.append($('<td>M' + (l + 1) + '</td>'));
                }
            }
        }
    }
    colspan(n);
}

function cleanResum() {
    for (var i = 3; i < 9; i++) {
        $('#tr' + i).html(trInit[i]);
    }
}

function colspan(n) {
    $("#resum").attr('colspan', (n * 3) + 1)
    $("#pre").attr('colspan', n);
    $("#pro").attr('colspan', n);
    $("#gan").attr('colspan', n);
}

var selArray = [];

function genColumas(op, mq) {
    var divParent = $('#genFila');
    divParent.html('<select id="selPart"></select>');
    selArray = [];
    genDivs(divParent, 'oper', op, 'Operario');
    genDivs(divParent, 'maqu', mq, 'Maquina');
    genOption();
    genThead(op, mq);
    resetBody();
}

function genDivs(divParent, om, n, name) {
    for (var i = 0; i < n; i++) {
        var div = $('<div>');
        div.append($('<p>' + name + ' ' + (i + 1) + '</p>'));
        div.append($('<p>Escala de tiempo</p>'));
        div.append($('<input/>', {type: 'text', id: om + 'Cal' + i}));
        div.append($('<p>Descripcion</p>'));
        div.append($('<input/>', {type: 'text', id: om + 'Des' + i}));
        div.append($('<p>Tipo tiempo</p>'));
        div.append(tipoTiempo().attr('id', om + 'Tip' + i));
        div.append($('<input/>', {
            type: 'button', value: 'Agregar', id: om + i
        }).click(function() {
            addEscala($(this).parent());
        }));
        div.css('display', 'none');
        div.attr('id', om + 'Div' + i);
        selArray.push(om + 'Div' + i);
        divParent.append(div);
    }
}

function tipoTiempo() {
    var sel = $('<select>');
    sel.append($('<option value="0">Independiente</option>'));
    sel.append($('<option value="1">Inactivo</option>'));
    sel.append($('<option value="2">Combinado</option>'));
    return sel;
}

function genOption() {
    var sel = $('#selPart');
    var ope = 1;
    var maq = 1;
    for (var i = 0; i < selArray.length; i++) {
        var str = selArray[i].slice(0, 4);
        if (str == 'oper') {
            sel.append($('<option value=' + selArray[i] + '>Operario ' + ope + '</option>'));
            ope++;
        } else {
            sel.append($('<option value=' + selArray[i] + '>Maquina ' + maq + '</option>'));
            maq++;
        }
    }
    sel.change(function() {
        selOption($(this).val());
    });
    selOption(sel.val());
    genCont();
}

function genCont() {
    for (var j = 0; j < selArray.length; j++) {
        contCol.push(1);
    }
}

function selOption(id) {
    var childs = $('#genFila').children();
    for (var i = 1; i < childs.length; i++) {
        $(childs[i]).css('display', 'none');
    }
    $('#' + id).css('display', 'block');
}

function verDivs() {
    var childs = $('#genFila').children();
    for (var i = 0; i < childs.length; i++) {
        $(childs[i]).css('display', 'block');
        $(childs[i]).css('float', 'left');
    }
    $('#selPart').css('display', 'none');
}

function genThead(op, mq) {
    var head = $('#maquinaT').find('thead');
    head.html("");
    var tr = $('<tr>');
    for (var i = 0; i < op; i++) {
        tr.append($('<th>Escala de tiempo<span></span></th>').css('width', '90px'));
        tr.append($('<th colspan="2">Operario ' + (i + 1) + '</th>').css('min-width', '200px'));
    }
    for (var j = 0; j < mq; j++) {
        tr.append($('<th>Escala de tiempo<span></span></th>').css('width', '90px'));
        tr.append($('<th colspan="2">Maquina ' + (j + 1) + '</th>').css('min-width', '200px'));
    }
    head.append(tr);
}

var contCol = [];

function addEscala(divId) {
    if (valDiv(divId)) {
        var div = $(divId).children();
        var time = parseInt($(div[2]).val());
        if (!isNaN(time)) {
            var colTd = obtenCol($(divId).attr('id'));
            if (valContCol(colTd)) {
                var tr = $(obtenFila(contCol[colTd], colTd));
                var td1 = $('<td rowspan="' + time + '">' + time + '</td>');
                var td2 = $('<td rowspan="' + time + '">' + $(div[4]).val() + '</td>');
                var td3 = $('<td rowspan="' + time + '" class="' + tiempoClase($(div[6]).val()) + '">');
                tr.append(td1, td2, td3);
                addUndo(td1, td2, td3);
                contCol[colTd] += time;
            } else {
                alert('Genere mas tiempo en la linea anterior');
            }
        } else {
            alert('Tiempo no valido');
        }
    } else {
        alert('Complete los campos');
    }
}

function valContCol(colTd) {
    var bool = true;
    for (var i = 1; i <= colTd; i++) {
        if (contCol[i] >= contCol[i - 1]) {
            bool = false;
        }
    }
    return bool;
}

function obtenFila(cont) {
    var body = $('#maquinaT').find('tbody');
    while (body.find('tr').length < cont) {
        body.append($('<tr>'));
    }
    var fila = body.find('tr');
    var tr = fila[cont - 1];
    return tr;
}

function obtenCol(id) {
    var pos = 0;
    for (var i = 0; i < selArray.length; i++) {
        if (selArray[i] == id) {
            pos = i;
        }
    }
    return pos;
}

function tiempoClase(val) {
    var clase = "";
    if (val == '0') {
        clase = 'inde';
    } else if (val == '1') {
        clase = 'inac';
    } else if (val == '2') {
        clase = 'comb';
    }
    return clase;
}

function resetBody() {
    $('#maquinaT').find('tbody').html("");
    contCol = [];
    undo = [];
    genCont();
}

function valDiv(divId) {
    var bool = true;
    var div = $(divId).children('Input');
    for (var i = 0; i < div.length - 1; i++) {
        if ($(div[i]).val() == '') {
            bool = false;
        }
    }
    return bool;
}

function editTime() {
    var time = $('#timeHM').val();
    var times = $('#maquinaT').find('thead').find('span');
    for (var i = 0; i < times.length; i++) {
        $(times[i]).html(" " + time);
    }
}

var undo = [];

function addUndo(c1, c2, c3) {
    var arrCol = [];
    for (var i = 0; i < contCol.length; i++) {
        arrCol.push(contCol[i]);
    }
    var trioQ = [c1, c2, c3];
    var cel = [arrCol, trioQ];
    undo.push(cel);
}

function doUndo() {
    var volver = undo.pop();
    contCol = volver[0];
    for (var i = 0; i < volver[1].length; i++) {
        $(volver[1][i][0]).remove();
    }
}


"use strict";

/*
 Copyright [2014] [Diagramo]
 
 Licensed under the Apache License, Version 2.0 (the "License");
 you may not use this file except in compliance with the License.
 You may obtain a copy of the License at
 
 http://www.apache.org/licenses/LICENSE-2.0
 
 Unless required by applicable law or agreed to in writing, software
 distributed under the License is distributed on an "AS IS" BASIS,
 WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 See the License for the specific language governing permissions and
 limitations under the License.
 */

figureSets["sinoptico"] = {
    name: 'Diagrama Sinoptico',
    description: 'Diagram set of figures',
    figures: [
        {figureFunction: "circle", image: "circle.png"},
        {figureFunction: "square", image: "square.png"},
        {figureFunction: "combined", image: "combine.png"},
        {figureFunction: "LineIn", image: "line_in.png"},
        {figureFunction: "LineOut", image: "line_out.png"},
        {figureFunction: "LineDouble", image: "line_double.png"}
    ]
};

var nSP = [0, 0, 0];
var nSA = [0, 0, 0];

var preS = [77, 81, 85, 91, 97];
var proS = [78, 82, 86, 92, 98];
var ganS = [79, 83, 87, 93, 99];

function resumSinop() {
    var cont = 0;
    var ctNo = 0;
    var sel = metSelS(true);
    var noSel = metSelS(false);
    for (var i = 0; i < nSA.length; i++) {
        $("#td" + sel[i]).text(nSA[i] - 1);
        cont += nSA[i];
        var numNo = parseFloat($("#td" + noSel[i]).text());
        if (isNaN(numNo)) {
            $("#td" + noSel[i]).text(0);
            ctNo += 0;
        } else {
            ctNo += numNo;
        }
    }
    $("#td" + sel[sel.length - 2]).text(cont - 3);
    $("#td" + noSel[noSel.length - 2]).text(ctNo);
    var stak = STACK.figures;
    var time = 0;
    for (var i = 0; i < stak.length; i++) {
        var figT = parseFloat(stak[i].time);
        if (!isNaN(figT)) {
            time += figT;
        }
    }
    for (var i = 0; i < sumRepet.length; i++) {
        var repFig = parseFloat(sumRepet[i].time);
        if (!isNaN(repFig)) {
            time += repFig;
        }
    }
    $("#td" + sel[sel.length - 1]).text(time);
    if (isNaN(parseFloat($("#td" + noSel[noSel.length - 1]).text()))) {
        $("#td" + noSel[noSel.length - 1]).text(0);
    }
    for (var k = 0; k < ganS.length; k++) {
        var pre = parseFloat($("#td" + preS[k]).text());
        var pro = parseFloat($("#td" + proS[k]).text());
        if (isNaN(pre))
            pre = 0;
        if (isNaN(pro))
            pro = 0;
        $("#td" + ganS[k]).text(pre - pro);
    }
}

function metSelS(bool) {
    var metS = $('input:radio[name=metS]');
    if (metS[0].checked && bool) {
        return preS;
    } else {
        return proS;
    }
}

function changeMetS() {
    var pre = [];
    var pro = [];
    for (var i = 0; i < ganS.length; i++) {
        pre[i] = $("#td" + preS[i]).text();
        pro[i] = $("#td" + proS[i]).text();
    }
    for (var j = 0; j < ganS.length; j++) {
        $("#td" + preS[j]).text(pro[j]);
        $("#td" + proS[j]).text(pre[j]);
    }
    refCabecera();
}

function resetSinoptico() {
    nSP = [0, 0, 0];
    nSA = [0, 0, 0];
}

function sumSinop(pos) {
    nSP = [nSA[0], nSA[1], nSA[2]];
    nSA[pos]++;
    resumSinop();
    return nSA[pos];
}

function obtSinop(bool) {
    if (bool) {
        return [nSA[0], nSA[1], nSA[2]];
    } else {
        return nSP;
    }
}

function desSinop(num) {
    nSA = num;
}

function figure_circle(x, y) {
    var f = new Figure("Circle");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Tiempo', 'time', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));

    var c = new Arc(x, y, FigureDefaults.radiusSize, 0, 360, false, 0);

    f.addPrimitive(c);
    var t2 = new Text('O-' + sumSinop(0), x, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_square(x, y) {
    var r = new Polygon();
    r.addPoint(new Point(x, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize));
    r.addPoint(new Point(x, y + FigureDefaults.segmentSize));

    var f = new Figure("Square");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Tiempo', 'time', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));
    f.addPrimitive(r);

    var t2 = new Text('I-' + sumSinop(1), x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_combined(x, y) {
    var c = new Arc(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.radiusSize, 0, 360, false, 0);

    var r = new Polygon();
    r.addPoint(new Point(x, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize));
    r.addPoint(new Point(x, y + FigureDefaults.segmentSize));

    var f = new Figure("Combine");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Tiempo', 'time', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));

    f.addPrimitive(r);
    f.addPrimitive(c);

    var t2 = new Text('C-' + sumSinop(2), x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}
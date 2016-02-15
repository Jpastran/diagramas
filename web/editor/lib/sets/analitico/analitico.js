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

figureSets["analitico"] = {
    name: 'Diagrama Analitico',
    description: 'Diagram set of figures',
    figures: [
        {figureFunction: "Circle", image: "circle.png"},
        {figureFunction: "Square", image: "square.png"},
        {figureFunction: "TriangleInvert", image: "triangle_inver.png"},
        {figureFunction: "SemiCircleRight", image: "semi_circle_right.png"},
        {figureFunction: "Arrow", image: "arrow.png"},
        {figureFunction: "Combined", image: "combine.png"},
        {figureFunction: "LineIn", image: "line_in.png"},
        {figureFunction: "LineOut", image: "line_out.png"},
        {figureFunction: "LineDouble", image: "line_double.png"}
    ]
};

/**Object with default values for figures*/
var FigureDefaults = {
    /**Size of figure's segment*/
    segmentSize: 40,
    /**Size of figure's short segment*/
    segmentShortSize: 30,
    /**Size of radius*/
    radiusSize: 20,
    /**Size of offset for parallels
     * For example: for parallelogram it's projection of inclined line on X axis*/
    parallelsOffsetSize: 25,
    /**Corner radius
     * For example: for rounded rectangle*/
    corner: 8,
    /**Corner roundness
     * Value from 0 to 10, where 10 - it's circle radius.*/
    cornerRoundness: 6,
    /**Color of lines*/
    strokeStyle: "#000000",
    /**Color of fill*/
    fillStyle: "#ffffff",
    /**Text size*/
    textSize: 12,
    /**Text label*/
    textStr: "Text",
    /**Text font*/
    textFont: "Arial",
    /**Color of text*/
    textColor: "#000000"
};

var nAP = [];
var nAA = [1, 1, 1, 1, 1, 1];

var preA = [16, 22, 26, 30, 36, 40, 46, 50, 56];
var proA = [17, 23, 27, 31, 37, 41, 47, 51, 57];
var ganA = [18, 24, 28, 32, 38, 42, 48, 52, 58];

function resumAnali() {
    var cont = 0;
    var ctNo = 0;
    var sel = metSelA(true);
    var noSel = metSelA(false);
    for (var i = 0; i < nAA.length; i++) {
        $("#td" + sel[i]).text(nAA[i] - 1);
        cont += nAA[i];
        var numNo = parseFloat($("#td" + noSel[i]).text());
        if (isNaN(numNo)) {
            $("#td" + noSel[i]).text(0);
            ctNo += 0;
        } else {
            ctNo += numNo;
        }
    }
    $("#td" + sel[sel.length - 3]).text(cont - 6);
    $("#td" + noSel[noSel.length - 3]).text(ctNo);
    var stak = STACK.figures;
    var dist = 0;
    var time = 0;
    for (var i = 0; i < stak.length; i++) {
        var figD = parseFloat(stak[i].dist);
        var figT = parseFloat(stak[i].time);
        if (!isNaN(figD)) {
            dist += figD;
        }
        if (!isNaN(figT)) {
            time += figT;
        }
    }
    for (var i = 0; i < sumRepet.length; i++) {
        var repFigD = parseFloat(sumRepet[i].dist);
        var repFigT = parseFloat(sumRepet[i].time);
        if (!isNaN(repFigD)) {
            dist += repFigD;
        }
        if (!isNaN(repFigT)) {
            time += repFigT;
        }
    }
    $("#td" + sel[sel.length - 2]).text(dist);
    if (isNaN(parseFloat($("#td" + noSel[noSel.length - 2]).text()))) {
        $("#td" + noSel[noSel.length - 2]).text(0);
    }
    $("#td" + sel[sel.length - 1]).text(time);
    if (isNaN(parseFloat($("#td" + noSel[noSel.length - 1]).text()))) {
        $("#td" + noSel[noSel.length - 1]).text(0);
    }
    for (var k = 0; k < ganA.length; k++) {
        var pre = parseFloat($("#td" + preA[k]).text());
        var pro = parseFloat($("#td" + proA[k]).text());
        if (isNaN(pre))
            pre = 0;
        if (isNaN(pro))
            pro = 0;
        $("#td" + ganA[k]).text(pre - pro);
    }
}

function metSelA(bool) {
    var metA = $('input:radio[name=metA]');
    if (metA[0].checked && bool) {
        return preA;
    } else {
        return proA;
    }
}

function changeMetA() {
    var pre = [];
    var pro = [];
    for (var i = 0; i < ganA.length; i++) {
        pre[i] = $("#td" + preA[i]).text();
        pro[i] = $("#td" + proA[i]).text();
    }
    for (var j = 0; j < ganA.length; j++) {
        $("#td" + preA[j]).text(pro[j]);
        $("#td" + proA[j]).text(pre[j]);
    }
}

function resetAnalitico() {
    nAP = [];
    nAA = [1, 1, 1, 1, 1, 1];
}

function sumAnali(pos) {
    nAP = [nAA[0], nAA[1], nAA[2], nAA[3], nAA[4], nAA[5]];
    nAA[pos]++;
    resumAnali();
    return nAP[pos];
}

function obtAnalit() {
    return nAP;
}

function desAnalit(num) {
    nAA = num;
}

function figure_Circle(x, y) {
    var c = new Arc(x, y, FigureDefaults.radiusSize, 0, 360, false, 0);

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
    f.addPrimitive(c);

    var t2 = new Text('O-' + sumAnali(0), x, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_Arrow(x, y) {
    var p = new Polyline();
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 4));
    p.addPoint(new Point(x, y + FigureDefaults.segmentShortSize));
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentShortSize));
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize));
    p.addPoint(new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize / 2));
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y));
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 4));
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 4));

    var f = new Figure("Arrow");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Tiempo', 'time', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Distancia', 'dist', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));
    f.addPrimitive(p);

    var t2 = new Text('T-' + sumAnali(1), x + FigureDefaults.segmentSize / 3, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_SemiCircleRight(x, y) {
    var c = new Arc(x + FigureDefaults.segmentSize / 4, y, FigureDefaults.radiusSize, 270, 450, false, 0);

    var p = new Polyline();
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 4, y - FigureDefaults.radiusSize));
    p.addPoint(new Point(x, y - FigureDefaults.radiusSize));
    p.addPoint(new Point(x, y + FigureDefaults.radiusSize));
    p.addPoint(new Point(x + FigureDefaults.segmentSize / 4, y + FigureDefaults.radiusSize));

    var f = new Figure("SemiCircleRight");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Tiempo', 'time', BuilderProperty.TYPE_SINGLE_TEXT));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));
    f.addPrimitive(c);
    f.addPrimitive(p);

    var t2 = new Text('D-' + sumAnali(2), x + FigureDefaults.radiusSize / 2 + 5, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_Square(x, y) {
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

    var t1 = new Text('I-' + sumAnali(3), x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t1.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t1);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_TriangleInvert(x, y) {
    var t = new Polygon();
    t.addPoint(new Point(x, y));
    t.addPoint(new Point(x + FigureDefaults.segmentSize, y));
    t.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize));

    var f = new Figure("TriangleInvert");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.properties.push(new BuilderProperty(BuilderProperty.SEPARATOR));
    f.properties.push(new BuilderProperty('Descripcion', 'info', BuilderProperty.TYPE_TEXT));
    f.addPrimitive(t);

    var t2 = new Text('A-' + sumAnali(4), x + FigureDefaults.segmentSize / 2 - 2, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_Combined(x, y) {
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

    var t2 = new Text('C-' + sumAnali(5), x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_LineInit(x, y) {
    var p = new Polyline();
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
    p.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2));//80,20
    p.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize));//80,40	

    var q = new Polyline();
    q.addPoint(new Point(x, y));//0,0
    q.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y));//80,0
    q.style.globalAlpha = 0;

    var r = new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);

    var f = new Figure("LineInit");
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Componente', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

    f.addPrimitive(r);

    var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;

    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_LineIn(x, y) {

    var p = new Polyline();
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
    p.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2));//60,20

    var q = new Polyline();
    q.addPoint(new Point(x, y));//0,0
    q.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y));//80,0
    q.style.globalAlpha = 0;

    var t = new Polygon();
    t.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2));
    t.addPoint(new Point(x - 6 + FigureDefaults.segmentSize * 2, y - 2 + FigureDefaults.segmentSize / 2));
    t.addPoint(new Point(x - 6 + FigureDefaults.segmentSize * 2, y + 2 + FigureDefaults.segmentSize / 2));
    t.style.fillStyle = FigureDefaults.strokeStyle;

    var r = new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);

    var f = new Figure("LineIn");
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Material', 'primitives.2.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.addPrimitive(r);
    f.addPrimitive(t);

    var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_LineOut(x, y) {

    var p = new Polyline();
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
    p.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2));//80,20

    var q = new Polyline();
    q.addPoint(new Point(x, y));//0,0
    q.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y));//80,0
    q.style.globalAlpha = 0;

    var t = new Polygon();
    t.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 2));
    t.addPoint(new Point(x - 6 + FigureDefaults.segmentSize * 2, y - 2 + FigureDefaults.segmentSize / 2));
    t.addPoint(new Point(x - 6 + FigureDefaults.segmentSize * 2, y + 2 + FigureDefaults.segmentSize / 2));
    t.style.fillStyle = FigureDefaults.strokeStyle;

    var r = new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);

    var f = new Figure("LineOut");
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Material', 'primitives.2.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.addPrimitive(r);
    f.addPrimitive(t);

    var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.segmentSize / 2), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_LineDouble(x, y) {

    var p = new Polyline();
    p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 4));//0,10
    p.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentSize / 4));//80,10

    var q = new Polyline();
    q.addPoint(new Point(x, y + FigureDefaults.segmentShortSize));//0,30
    q.addPoint(new Point(x + FigureDefaults.segmentSize * 2, y + FigureDefaults.segmentShortSize));//80,30

    var r = new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);

    var f = new Figure("LineDouble");
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Text', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.addPrimitive(r);

    var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize / 4), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentShortSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}


function figure_MultiPoint(x, y) {

    var innerCircleRadius = 2;
    var outerCircleRadius = 8;

    var oc = new Arc(x, y, outerCircleRadius, 0, 360, false, 0);
    oc.style.globalAlpha = 0;

    var ic = new Arc(x, y, innerCircleRadius, 0, 360, false, 0);

    var f = new Figure("MultiPoint");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
    f.addPrimitive(oc);
    f.addPrimitive(ic);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_Text(x, y) {
    var f = new Figure('Text');
    f.style.fillStyle = FigureDefaults.fillStyle;

    f.properties.push(new BuilderProperty('Text', 'primitives.0.str', BuilderProperty.TYPE_TEXT));

    var t2 = new Text(FigureDefaults.textStr, x, y + FigureDefaults.radiusSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    f.addPrimitive(t2);

    f.finalise();
    return f;
}

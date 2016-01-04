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
//TODO agregar la propiedad de texto en el builder, para las lineas
//TODO corregir los que usan el formato patch para cambiar nombre u eliminar la posibilidad
figureSets["recorrido"] = {
    name: 'Diagrama Recorrido',
    description: 'Diagram set of figures',
    figures: [     
        {figureFunction: "operacion", image: "circle.png"},
        {figureFunction: "inspecion", image: "square.png"},
        {figureFunction: "almacenaje", image: "triangle_inver.png"},
        {figureFunction: "demora", image: "semi_circle_right.png"},
        {figureFunction: "trasporte", image: "arrow.png"},
        {figureFunction: "combinado", image: "combine.png"}
    ]
};

var oIdR = 1;
var tIdR = 1;
var iIdR = 1;
var dIdR = 1;
var aIdR = 1;
var cIdR = 1;

function figure_inspecion(x, y) {
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

    var t1 = new Text('I-' + iIdR, x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t1.style.fillStyle = FigureDefaults.textColor;
    iIdR++;
    
    f.addPrimitive(t1);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_operacion(x, y) {
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
    var t2 = new Text('O-' + oIdR, x, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    oIdR++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_almacenaje(x, y) {
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

    var t2 = new Text('A-' + aIdR, x + FigureDefaults.segmentSize / 2 - 2, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    aIdR++;
    f.addPrimitive(t);
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_demora(x, y) {
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

    var t2 = new Text('D-' + dIdR, x + FigureDefaults.radiusSize / 2 + 5, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    dIdR++;

    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_trasporte(x, y) {
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

    var t2 = new Text('T-' + tIdR, x + FigureDefaults.segmentSize / 3, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    tIdR++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_combinado(x, y) {
	var c = new Arc(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2 , FigureDefaults.radiusSize, 0, 360, false, 0);
	
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

    var t2 = new Text('C-' + cIdR, x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    cIdR++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}
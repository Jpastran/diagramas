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
        {figureFunction: "combined", image: "combine.png"}
    ]
};

var oIdS = 1;
var iIdS = 1;
var cIdS = 1;

function figure_square(x, y) {
    var r = new Polygon();
    r.addPoint(new Point(x, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y));
    r.addPoint(new Point(x + FigureDefaults.segmentSize, y + FigureDefaults.segmentSize));
    r.addPoint(new Point(x, y + FigureDefaults.segmentSize));

    var f = new Figure("Square");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Text', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Text Size ', 'primitives.1.size', BuilderProperty.TYPE_TEXT_FONT_SIZE));
    f.properties.push(new BuilderProperty('Font ', 'primitives.1.font', BuilderProperty.TYPE_TEXT_FONT_FAMILY));
    f.properties.push(new BuilderProperty('Alignment ', 'primitives.1.align', BuilderProperty.TYPE_TEXT_FONT_ALIGNMENT));
    f.properties.push(new BuilderProperty('Text Underlined', 'primitives.1.underlined', BuilderProperty.TYPE_TEXT_UNDERLINED));
    f.properties.push(new BuilderProperty('Text Color', 'primitives.1.style.fillStyle', BuilderProperty.TYPE_COLOR));

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

    f.addPrimitive(r);

    var t2 = new Text('I-' + iIdS, x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    iIdS++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}

function figure_circle(x, y) {
    var f = new Figure("Circle");
    f.style.fillStyle = FigureDefaults.fillStyle;
    f.style.strokeStyle = FigureDefaults.strokeStyle;

    f.properties.push(new BuilderProperty('Text', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Text Size ', 'primitives.1.size', BuilderProperty.TYPE_TEXT_FONT_SIZE));
    f.properties.push(new BuilderProperty('Font ', 'primitives.1.font', BuilderProperty.TYPE_TEXT_FONT_FAMILY));
    f.properties.push(new BuilderProperty('Alignment ', 'primitives.1.align', BuilderProperty.TYPE_TEXT_FONT_ALIGNMENT));
    f.properties.push(new BuilderProperty('Text Underlined', 'primitives.1.underlined', BuilderProperty.TYPE_TEXT_UNDERLINED));
    f.properties.push(new BuilderProperty('Text Color', 'primitives.1.style.fillStyle', BuilderProperty.TYPE_COLOR));

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

    var c = new Arc(x, y, FigureDefaults.radiusSize, 0, 360, false, 0);

    f.addPrimitive(c);
    var t2 = new Text('O-' + oIdS, x, y, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    oIdS++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

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

    f.properties.push(new BuilderProperty('Text', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
    f.properties.push(new BuilderProperty('Text Size ', 'primitives.1.size', BuilderProperty.TYPE_TEXT_FONT_SIZE));
    f.properties.push(new BuilderProperty('Font ', 'primitives.1.font', BuilderProperty.TYPE_TEXT_FONT_FAMILY));
    f.properties.push(new BuilderProperty('Alignment ', 'primitives.1.align', BuilderProperty.TYPE_TEXT_FONT_ALIGNMENT));
    f.properties.push(new BuilderProperty('Text Underlined', 'primitives.1.underlined', BuilderProperty.TYPE_TEXT_UNDERLINED));
    f.properties.push(new BuilderProperty('Text Color', 'primitives.1.style.fillStyle', BuilderProperty.TYPE_COLOR));

    f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
    f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
    f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

    f.addPrimitive(r);
    f.addPrimitive(c);

    var t2 = new Text('C-' + cIdS, x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
    t2.style.fillStyle = FigureDefaults.textColor;
    cIdS++;
    f.addPrimitive(t2);

    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
    CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

    f.finalise();
    return f;
}
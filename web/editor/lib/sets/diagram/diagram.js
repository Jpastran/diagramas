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

figureSets["diagram"] = {
	name : 'Diagram',
	description : 'Diagram set of figures',
	figures : [
		{figureFunction : "Square", image : "square.png"}, 
		{figureFunction : "Circle",	image : "circle.png"},
		{figureFunction : "TriangleInvet", image : "triangle_inver.png"},
		{figureFunction : "SemiCircleRight", image : "semi_circle_right.png"}, 
		{figureFunction : "Arrow", image : "arrow.png"},
		{figureFunction : "LineIn",	image : "line_in.png"}, 
		{figureFunction : "LineOut", image : "line_out.png"},
		{figureFunction : "LineDouble",	image : "line_double.png"}, 
		//{figureFunction : "NewLS", image : "new_ls.png"},
		//{figureFunction : "EndLS",image : "end_ls.png"},
		//{figureFunction : "NewSS", image : "new_ss.png"},
		//{figureFunction : "EndSS",image : "end_ss.png"}
	]
};

/**Object with default values for figures*/
var FigureDefaults = {
	/**Size of figure's segment*/
	segmentSize : 40,

	/**Size of figure's short segment*/
	segmentShortSize : 30,

	/**Size of radius*/
	radiusSize : 20,

	/**Size of offset for parallels
	 * For example: for parallelogram it's projection of inclined line on X axis*/
	parallelsOffsetSize : 25,

	/**Corner radius
	 * For example: for rounded rectangle*/
	corner : 8,

	/**Corner roundness
	 * Value from 0 to 10, where 10 - it's circle radius.*/
	cornerRoundness : 6,

	/**Color of lines*/
	strokeStyle : "#000000",

	/**Color of fill*/
	fillStyle : "#ffffff",

	/**Text size*/
	textSize : 12,

	/**Text label*/
	textStr : "Text",

	/**Text font*/
	textFont : "Arial",

	/**Color of text*/
	textColor : "#000000"
};

var oId = 0;
var tId = 0;
var iId = 0;
var dId = 0;
var aId = 0; 

function figure_Square(x, y) {
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

	var t2 = new Text('I-'+ iId, x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;
	iId++;
	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.segmentSize / 2),ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_Circle(x, y) {
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
	var t2 = new Text('O-'+oId, x, y, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;
	oId++;
	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x - FigureDefaults.radiusSize, y),ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_TriangleInvet(x, y) {
	var t = new Polygon();
	t.addPoint(new Point(x, y));
	t.addPoint(new Point(x + FigureDefaults.segmentSize, y));
	t.addPoint(new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize));

	var e = new Figure("TriangleInvert");
	e.style.fillStyle = FigureDefaults.fillStyle;
	e.style.strokeStyle = FigureDefaults.strokeStyle;
	e.properties.push(new BuilderProperty('Text', 'primitives.1.str', BuilderProperty.TYPE_TEXT));
	e.properties.push(new BuilderProperty('Text Size ', 'primitives.1.size', BuilderProperty.TYPE_TEXT_FONT_SIZE));
	e.properties.push(new BuilderProperty('Font ', 'primitives.1.font', BuilderProperty.TYPE_TEXT_FONT_FAMILY));
	e.properties.push(new BuilderProperty('Alignment ', 'primitives.1.align', BuilderProperty.TYPE_TEXT_FONT_ALIGNMENT));
	e.properties.push(new BuilderProperty('Text Underlined', 'primitives.1.underlined', BuilderProperty.TYPE_TEXT_UNDERLINED));
	e.properties.push(new BuilderProperty('Text Color', 'primitives.1.style.fillStyle', BuilderProperty.TYPE_COLOR));

	e.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
	e.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
	e.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
	e.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

	var t2 = new Text('A-'+aId, x + FigureDefaults.segmentSize / 2 - 2, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;
	aId++;
	e.addPrimitive(t);
	e.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(e.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(e.id, new Point(x + FigureDefaults.segmentSize / 4, y + FigureDefaults.segmentSize / 2),ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(e.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

	e.finalise();
	return e;
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

	f.properties.push(new BuilderProperty('Text', 'primitives.2.str', BuilderProperty.TYPE_TEXT));
	f.properties.push(new BuilderProperty('Text Size ', 'primitives.2.size', BuilderProperty.TYPE_TEXT_FONT_SIZE));
	f.properties.push(new BuilderProperty('Font ', 'primitives.2.font', BuilderProperty.TYPE_TEXT_FONT_FAMILY));
	f.properties.push(new BuilderProperty('Alignment ', 'primitives.2.align', BuilderProperty.TYPE_TEXT_FONT_ALIGNMENT));
	f.properties.push(new BuilderProperty('Text Underlined', 'primitives.2.underlined', BuilderProperty.TYPE_TEXT_UNDERLINED));
	f.properties.push(new BuilderProperty('Text Color', 'primitives.2.style.fillStyle', BuilderProperty.TYPE_COLOR));

	f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
	f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

	var t2 = new Text('D-'+dId, x + FigureDefaults.radiusSize / 2 + 5, y, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;
	dId++;
	f.addPrimitive(c);
	f.addPrimitive(p);
	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y - FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y),ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.radiusSize / 2 + 5, y + FigureDefaults.radiusSize), ConnectionPoint.TYPE_FIGURE);

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

	f.addPrimitive(p);

	var t2 = new Text('T-'+tId, x + FigureDefaults.segmentSize / 3, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;
	tId++;
	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y + FigureDefaults.segmentSize / 2),ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}


function figure_LineInit(x, y) {
	
	var p = new Polyline();
	p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	p.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	p.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize));//60,40	
	
	var q = new Polyline();
	q.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	q.addPoint(new Point(x, y));//0,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y));//60,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	q.style.strokeStyle = "#ffffff";
		
    var r=new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);
	
	var f = new Figure("LineInit");
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

	var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;

	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_LineIn(x, y) {
	
	var p = new Polyline();
	p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	p.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	
	var q = new Polyline();
	q.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	q.addPoint(new Point(x, y));//0,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y));//60,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	q.style.strokeStyle = "#ffffff";
		
    var r=new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);
	
	var f = new Figure("LineIn");
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

	var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;

	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize/2), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_LineOut(x, y) {
	
	var p = new Polyline();
	p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	p.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	
	var q = new Polyline();
	q.addPoint(new Point(x, y + FigureDefaults.segmentSize / 2));//0,20
	q.addPoint(new Point(x, y));//0,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y));//60,0
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 2));//60,20
	q.style.strokeStyle = "#ffffff";
		
    var r=new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);
	
	var f = new Figure("LineOut");
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

	var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 3, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;

	f.addPrimitive(t2);

	//CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentSize / 2, y), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x , y + FigureDefaults.segmentSize/2), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_LineDouble(x, y) {
	
	var p = new Polyline();
	p.addPoint(new Point(x, y + FigureDefaults.segmentSize / 4));//0,10
	p.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentSize / 4));//60,10
	
	var q = new Polyline();
	q.addPoint(new Point(x, y + FigureDefaults.segmentShortSize));//0,30
	q.addPoint(new Point(x + FigureDefaults.segmentSize * 1.5, y + FigureDefaults.segmentShortSize));//60,30
		
    var r=new Path();
    r.addPrimitive(p);
    r.addPrimitive(q);
	
	var f = new Figure("LineDouble");
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

	var t2 = new Text(FigureDefaults.textStr, x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 2, FigureDefaults.textFont, FigureDefaults.textSize);
	t2.style.fillStyle = FigureDefaults.textColor;

	f.addPrimitive(t2);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentSize / 4), ConnectionPoint.TYPE_FIGURE);
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x + FigureDefaults.segmentShortSize, y + FigureDefaults.segmentShortSize), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}


function figure_NewLS(x, y) {

	var innerCircleRadius = 2;
	var outerCircleRadius = 6;

	var oc = new Arc(x, y, outerCircleRadius, 0, 360, false, 0);
	oc.style.fillStyle = "#FFFFFF";
	oc.style.strokeStyle = '#000000';

	var ic = new Arc(x, y, innerCircleRadius, 0, 360, false, 0);
	ic.style.fillStyle = "#000000";
	ic.style.strokeStyle = '#000000';

	var f = new Figure("NewLS");
	f.style.fillStyle = FigureDefaults.fillStyle;
	f.style.strokeStyle = FigureDefaults.strokeStyle;

	f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
	f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

	f.addPrimitive(oc);
	f.addPrimitive(ic);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_EndLS(x, y) {
	var circleRadius = 5;
	
	var c = new Arc(x, y, circleRadius, 0, 360, false, 0);

	var f = new Figure("EndLS");
	f.style.fillStyle = "#000000";
	f.style.strokeStyle = FigureDefaults.strokeStyle;
		
	f.addPrimitive(c);
	
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y), ConnectionPoint.TYPE_FIGURE);
	
	f.finalise();
	return f;
}

function figure_NewSS(x, y) {

	var innerCircleRadius = 2;
	var outerCircleRadius = 6;

	var oc = new Arc(x, y, outerCircleRadius, 0, 360, false, 0);
	oc.style.fillStyle = "#FFFFFF";
	oc.style.strokeStyle = '#000000';

	var ic = new Arc(x, y, innerCircleRadius, 0, 360, false, 0);
	ic.style.fillStyle = "#FFFFFF";
	ic.style.strokeStyle = '#000000';

	var f = new Figure("NewSS");
	f.style.fillStyle = FigureDefaults.fillStyle;
	f.style.strokeStyle = FigureDefaults.strokeStyle;

	f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
	f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));

	f.addPrimitive(oc);
	f.addPrimitive(ic);

	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y), ConnectionPoint.TYPE_FIGURE);

	f.finalise();
	return f;
}

function figure_EndSS(x, y) {
	
	var circleRadius = 5;
	var point = 1;
	
	var c = new Arc(x, y, circleRadius, 0, 360, false, 0);
	var p = new Arc(x, y, point, 0, 360, false, 0);

	var f = new Figure("EndSS");
	f.style.fillStyle = "#FFFFFF";
	f.style.strokeStyle = FigureDefaults.strokeStyle;
	
	f.properties.push(new BuilderProperty('Stroke Style', 'style.strokeStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Fill Style', 'style.fillStyle', BuilderProperty.TYPE_COLOR));
	f.properties.push(new BuilderProperty('Line Width', 'style.lineWidth', BuilderProperty.TYPE_LINE_WIDTH));
	f.properties.push(new BuilderProperty('Line Style', 'style.lineStyle', BuilderProperty.TYPE_LINE_STYLE));
	
	f.addPrimitive(c);
	f.addPrimitive(p);
	
	CONNECTOR_MANAGER.connectionPointCreate(f.id, new Point(x, y), ConnectionPoint.TYPE_FIGURE);
	
	f.finalise();
	return f;
}

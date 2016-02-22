"use strict";

/**
 * Permite la carga oculta de los scripts que utiliza los diagramas
 * Libera carga del editor.php  
 * Modificar con cuidado
 */
$(window).load(function() {
    buildPanel();
    tabs(tab2, ctab2);  
    editable();   
});

loadLibs();
loadSets();
loadCommands();
loadQuery();

/*Option 1:
 *We can use window.location like this:
 * url = window.location.protocol + window.location.hostname + ":" + window.location.port + ....
 * @see http://www.w3schools.com/jsref/obj_location.asp
 * 
 * Option 2:
 * Use http://code.google.com/p/js-uri/
 **/
var appURL = window.location.host + "/diagramo/web";
var figureSetsURL = appURL + "/editor/lib/sets";
var insertImageURL = appURL + "/editor/data/import/";

function showImport() {
    //alert("ok");
    var r = confirm("Current diagram will be deleted. Are you sure?");
    if (r === true) {
        $('#import-dialog').modal(); // jQuery object; this demo
    }
}

function loadLibs() {
    document.write(
            '<script type="text/javascript" src="./lib/builder.js"></script>',
            '<script type="text/javascript" src="./lib/dashed.js"></script>',
            '<script type="text/javascript" src="./lib/canvasprops.js"></script>',
            '<script type="text/javascript" src="./lib/style.js"></script>',
            '<script type="text/javascript" src="./lib/primitives.js"></script>',
            '<script type="text/javascript" src="./lib/ImageFrame.js"></script>',
            '<script type="text/javascript" src="./lib/matrix.js"></script>',
            '<script type="text/javascript" src="./lib/util.js"></script>',
            '<script type="text/javascript" src="./lib/key.js"></script>',
            '<script type="text/javascript" src="./lib/groups.js"></script>',
            '<script type="text/javascript" src="./lib/stack.js"></script>',
            '<script type="text/javascript" src="./lib/connections.js"></script>',
            '<script type="text/javascript" src="./lib/connectionManagers.js"></script>',
            '<script type="text/javascript" src="./lib/handles.js"></script>',
            '<script type="text/javascript" src="./lib/text.js"></script>',
            '<script type="text/javascript" src="./lib/log.js"></script>',
            '<script type="text/javascript" src="./lib/browserReady.js"></script>',
            '<script type="text/javascript" src="./lib/containers.js"></script>',
            '<script type="text/javascript" src="./lib/importer.js"></script>',
            '<script type="text/javascript" src="./lib/main.js"></script>',
            '<script type="text/javascript" src="./lib/minimap.js"></script>'
            );
}

function loadSets() {
    document.write(
            '<script type="text/javascript" src="./lib/sets/analitico/analitico.js"></script>',
            '<script type="text/javascript" src="./lib/sets/sinoptico/sinoptico.js"></script>',
            '<script type="text/javascript" src="./lib/sets/recorrido/recorrido.js"></script>',
            '<script type="text/javascript" src="./lib/sets/bimanual/bimanual.js"></script>',
            '<script type="text/javascript" src="./lib/sets/hombre-maquina/hom-maq.js"></script>'
            );
}

function loadCommands() {
    document.write(
            '<script type="text/javascript" src="./lib/commands/History.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureCreateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureCloneCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureTranslateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureRotateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureScaleCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureZOrderCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/FigureDeleteCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupRotateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupScaleCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupCreateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupCloneCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupDestroyCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupDeleteCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/GroupTranslateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ContainerCreateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ContainerDeleteCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ContainerTranslateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ContainerScaleCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ConnectorCreateCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ConnectorDeleteCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ConnectorAlterCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/ShapeChangePropertyCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/CanvasChangeColorCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/CanvasChangeSizeCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/CanvasFitCommand.js"></script>',
            '<script type="text/javascript" src="./lib/commands/InsertedImageFigureCreateCommand.js"></script>'
            );
}

function loadQuery() {
    document.write(
            '<script type="text/javascript" src="./assets/javascript/json2.js"></script>',
            '<script type="text/javascript" src="./assets/javascript/ajaxfileupload.js"></script>',
            '<script type="text/javascript" src="./assets/javascript/dropdownmenu.js"></script>',
            '<script type="text/javascript" src="./assets/javascript/tabs.js"></script>',
            '<script type="text/javascript" src="./assets/javascript/printArea.js"></script>',
            '<script type="text/javascript" src="./assets/simplemodal/js/jquery.simplemodal.js"></script>',
            '<script type="text/javascript" src="./assets/javascript/colorPicker_new.js"></script>',
            '<!--[if IE]><script src="./assets/javascript/excanvas.js"></script><![endif]-->'
            );
}
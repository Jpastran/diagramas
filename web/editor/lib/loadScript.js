"use strict";

/**
 * Permite la carga oculta de los scripts que utiliza los diagramas
 * Libera carga del editor.php  
 * Modificar con cuidado
 */

function loadLibs() {
    document.write(	
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

        '<script type="text/javascript" src="./lib/builder.js"></script>',        
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
        '<script type="text/javascript" src="./lib/sets/recorrido/recorrido.js"></script>'
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

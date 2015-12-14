<?

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

require_once dirname(__FILE__) . '/common/delegate.php';

if (!isset($_SESSION)) {
    session_start();
}

require_once dirname(__FILE__) . '/common/rememberme.php';


$delegate = new Delegate();


#print_r($_SESSION['userId']);
$loggedUser = null;
if(isset($_SESSION['userId']) && is_numeric($_SESSION['userId'])){
    $loggedUser = $delegate->userGetById($_SESSION['userId']);
}

//start diagram guardian
if(isset($_REQUEST['diagramId']) && is_numeric($_REQUEST['diagramId'])){
    if( !isset($_SESSION['userId']) ){
        print "Not allocated to this diagram";
        exit();
    }
}
//end diagram guardian

//get the address where the app reside
$WEBADDRESS = $delegate->settingsGetByKeyNative('WEBADDRESS');

$page = 'editor';
?>


<!DOCTYPE html>
<html>
    <!--Copyright 2010 Scriptoid s.r.l-->
    <head>
        <title>HTML5 diagram editor</title>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=9" />
        <script type="text/javascript" src="./assets/javascript/dropdownmenu.js"></script>    

        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/style.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/minimap.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/tabs.css" />

        <script type="text/javascript" src="./assets/javascript/json2.js"></script>
        <script type="text/javascript" src="./assets/javascript/tabs.js"></script>
        <script type="text/javascript" src="./assets/javascript/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="./assets/javascript/ajaxfileupload.js"></script>

        <link type='text/css' href='./assets/simplemodal/css/diagramo.css' rel='stylesheet' media='screen' />
        <script type="text/javascript" src="./assets/simplemodal/js/jquery.simplemodal.js"></script>

		<script type="text/javascript" src="./lib/loadScript.js"></script>
		
        <script type="text/javascript">
            "use strict";
            /*Option 1:
             *We can use window.location like this:
             * url = window.location.protocol + window.location.hostname + ":" + window.location.port + ....
             * @see http://www.w3schools.com/jsref/obj_location.asp
             * 
             * Option 2:
             * Use http://code.google.com/p/js-uri/
             **/
            var appURL = '<?= $WEBADDRESS ?>';
            var figureSetsURL = appURL + '/editor/lib/sets';
            var insertImageURL = appURL + '/editor/data/import/';

            function showImport(){
                //alert("ok");
                var r = confirm("Current diagram will be deleted. Are you sure?");
                if(r === true){                    
                    $('#import-dialog').modal(); // jQuery object; this demo
                }                
            }
            loadLibs();
            loadSets();
            loadCommands();
			$(document).ready(function() {
				tabs("tab1");
			}); 
        </script>
        
        <script type="text/javascript" src="./assets/javascript/colorPicker_new.js"></script>
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/colorPicker_new.css" />

        <!--[if IE]>
        <script src="./assets/javascript/excanvas.js"></script>
        <![endif]-->

    </head>
    <body onload="init('<?= isset($_REQUEST['diagramId']) ? $_REQUEST['diagramId'] : '' ?>');" id="body">      
        <? require_once dirname(__FILE__) . '/header.php'; ?>
        <div id="actions">

            <a style="text-decoration: none;" href="#" onclick="return save();" title="Save diagram (Ctrl-S)"><img src="assets/images/icon_save.jpg" border="0" width="16" height="16"/></a>          
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a style="text-decoration: none;" href="./myDiagrams.php" title="Open diagram"><img src="assets/images/icon_open.jpg" border="0" width="16" height="16"/></a>
            <?if(isset($_REQUEST['diagramId']) &&  is_numeric($_REQUEST['diagramId']) ){//option available ony when the diagram was saved?>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            <a style="text-decoration: none;" href="#" onclick="return print_diagram();" title="Print diagram"><img src="assets/images/icon_print.png" border="0" width="16" height="16"/></a>
            <?}?>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('connector-straight');"  title="Straight connector"><img src="assets/images/icon_connector_straight.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('connector-jagged');" title="Jagged connector"><img src="assets/images/icon_connector_jagged.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
			<!--
            <a href="javascript:action('connector-organic');" title="Organic connector"><img src="assets/images/icon_connector_organic.gif" border="0" alt="Organic"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('container');" title="Container (Experimental)"><img src="assets/images/container.png" border="0" alt="Container"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <input type="checkbox" onclick="showGrid();" id="gridCheckbox"  title="Show grid" />
            <span class="toolbarText">Show grid</span>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <input type="checkbox" onclick="snapToGrid();" id="snapCheckbox" title="Snap elements to grid" />
            <span class="toolbarText">Snap to grid</span>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
			-->
            <a href="javascript:action('front');" title="Move to front"><img src="assets/images/icon_front.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('back');" title="Move to back"><img src="assets/images/icon_back.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('moveforward');" title="Move (one level) to front"><img src="assets/images/icon_forward.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('moveback');" title="Move (one level) back"><img src="assets/images/icon_backward.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('group');" title="Group (Ctrl-G)"><img src="assets/images/group.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('ungroup');" title="Ungroup (Ctrl-U)"><img src="assets/images/ungroup.gif" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:createFigure(figure_Text, 'assets/images/text.gif');"  title="Add text"><img  src="assets/images/text.gif" border="0" height ="16"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
			<!-- TODO revisar el insetImagen -->
            <a href="javascript:showInsertImageDialog();"  title="Add image"><img src="assets/images/image.gif" border="0" height ="16" alt="Image"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            <!--
            <a href="javascript:action('undo');" title="Undo (Ctrl-Z)"><img src="assets/images/arrow_undo.png" border="0"/></a>           
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <a href="javascript:action('redo');" title="Redo (Ctrl-Y)"><img src="assets/images/arrow_redo.png" border="0"/></a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>  
            --> 
            <!-- TODO: From Janis: we have to create a nice icon for duplicate, currently this is the only command without an icon    
            <a href="javascript:action('duplicate');">Copy (Ctrl-D)</a>
            <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

            <input type="text" id="output" />                
            <img style="vertical-align:middle;" src="../assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            <a href="javascript:action('duplicate');">Copy</a>
            <img style="vertical-align:middle;" src="../assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            <a href="javascript:action('group');">Group</a>
            <img style="vertical-align:middle;" src="../assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            <a href="javascript:action('ungroup');">Ungroup</a>
            -->
        </div>

        <div id="editor">
            <!--Left panel-->
            <div id="left">
                <div id="figures">
                    <select style="width: 120px;" onchange="setFigureSet(this.options[this.selectedIndex].value);">
                        <script>
                            "use strict";
                            for (var setName in figureSets) {
                                var set = figureSets[setName];
                                document.write('<option value="' + setName + '">' + set['name'] + '</option>');
                            }
                            buildPanel();
                        </script>
                    </select>
                </div>
                <div id="especial">
                    <select id="espSelect" style="width: 120px;" onchange="setEspecial(this.options[this.selectedIndex].value)">
                        <option value="entrada" selected>Entrada</option>
                        <option value="salida">Salida</option>
                        <option value="repeticion">Repeticion</option>
                        <option value="reproceso">Reproceso</option>
                        <option value="trayectos">Opciones</option>
                    </select>
                    <div id="entrada" style=" display: block">
                        <img src="lib/sets/entrada.png" class="especial" />
                        <input type="button" value="Añadir" onclick="especial('newLE');"/>
                        <input id="btnLE" type="button" value="Finalizar" onclick="especial('endLE');" disabled/>
                    </div>
                    <div id="salida" style=" display: none">
                        <img src="lib/sets/salida.png" class="especial" />
                        <input type="button" value="Añadir" onclick="especial('newLS');"/>
                        <input id="btnLS" type="button" value="Finalizar" onclick="especial('endLS');" disabled/>
                    </div>
                    <div id="repeticion" style=" display: none">
                        <img src="lib/sets/repeticion.png" class="especial"/>
                        <div class="label">
                            Repeticiones
                            <input type="number" id="repNum" min="1" step="1" style="width: 120px;">                           
                        </div>						
                        <div class="label">
                            Retorno
                            <select id="repOut" style="width: 120px;" onclick="cargarFiguras('repOut')"></select>
                            <input type="button" value="Añadir" onclick="especial('repetir')"/>
                        </div>
                    </div>
                    <div id="reproceso" style=" display: none">
                        <img src="lib/sets/reproceso.png" class="especial" />
                        <div class="label">
                            Inicio
                            <select id="proIn" style="width: 120px;" onclick="cargarFiguras('proIn')"></select>
                            <input id="btnRepIn" type="button" value="Iniciar" onclick="especial('reproIn')"/>
                        </div>					
                        <div class="label">
                            Final
                            <select id="proOut" style="width: 120px;" onclick="cargarFiguras('proOut')"></select>
                            <input id="btnRepOut" type="button" value="Finalizar" onclick="especial('reproOut')" disabled/>
                        </div>						
                    </div>
                    <div id="trayectos" style=" display: none">
                        <img src="lib/sets/trayectos.png" class="especial" />
                        <div class="label" id="trayGen" style=" display: block">
                            Generar
                            <input type="number" id="trayNum" min="2" step="1" max="8" style="width: 120px;">
                            <input type="button" value="Generar" onclick="especial('trayGen')"/>
                        </div>	
                        <div class="label" id="traySig" style=" display: none">
                            Finalizar 
                            <br><label id="trayName"></label><br>
                            <input id="btnFin" type="button" value="Siguiente" onclick="especial('trayFin')"/><br>
                        </div>	
                        <div class="label" id="trayUnir" style=" display: none">
                            Continuan                           
                            <div id="trayChk" style="width: 120px;"></div>                        	
                            <input id="btnUni" type="button" value="Reunir" onclick="especial('trayUnir')"/>
                        </div>
                    </div>
                    <div id="error" class="error" style=" display: none"></div>
                </div>
            </div>
            <!--THE canvas-->
			<div style="width: 100%">
				<div  id="container">
					<div id="tabs">
						<ul id=lista>
							<li id="tab1">
								<a href='javascript:tabs("tab1");'>HTML</a>
							</li>
							<li id="tab2">
								<a href='javascript:tabs("tab2");'>CSS</a>
							</li>
							<li id="tab3">
								<a href='javascript:tabs("tab3");'>JavaScript</a>
							</li>
						</ul>
					</div>
					<div id="ctabs">
						<div id="ctab1">
							<canvas id="a" width="800" height="600">
								Your browser does not support HTML5. Please upgrade your browser to any modern version.
							</canvas>
							<div id="text-editor"></div>
							<div id="text-editor-tools"></div>
						</div>
						<div id="ctab2">
							El nombre hojas de estilo en cascada viene del inglés Cascading Style Sheets, del que toma sus siglas. CSS es un lenguaje usado para definir la presentación de un documento estructurado escrito en HTML o XML2 (y por extensión en XHTML). El W3C (World Wide Web Consortium) es el encargado de formular la especificación de las hojas de estilo que servirán de estándar para los agentes de usuario o navegadores.
						</div>
						<div id="ctab3">
							JavaScript es un lenguaje de programación interpretado, dialecto del estándar ECMAScript. Se define como orientado a objetos,3 basado en prototipos, imperativo, débilmente tipado y dinámico.
						</div>
					</div>					
				</div>
			</div>
            <!--Right panel-->
            <div id="right">
                <center>
                    <div id="minimap">
                    </div>
                </center>
                <div style="overflow: auto;" id="edit">
                </div>
            </div>
        </div>

        <!--The import panel-->
        <div id="import-dialog" style="background-color: white; display: none; margin-top: auto; margin-bottom: auto;">
            <form action="./common/controller.php" method="POST" enctype="multipart/form-data">
                <input type="hidden" name="action" value="importDiagramExe"/>
                <h2>Import Diagramo file </h2>
                <p/>
                <input type="file" name="diagramFile" id="diagramFile"/>  
                <p/>
                <input type="image" src="./assets/images/import.gif"/>
            </form>
        </div>

        <!--Insert Image dialog content-->
        <div id="insert-image-dialog">
            <h2>Insert Image</h2>
            <form action="./common/controller.php" method="POST" target="upload_target" enctype="multipart/form-data">
                <input type="hidden" name="action" value="insertImage"/>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="URL" checked>
                    <label>From URL:</label>
                    <input type="text" class="url-input" name="imageURL" id="imageURL"/>
                </div>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="Upload">
                    <label>Upload:</label>
                    <input type="file" class="right-offset" name="imageFile" id="imageFile"/>
                </div>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="Reuse" id="insert-image-reuse-group">
                    <label>Reuse:</label>
                    <select id="insert-image-reuse"  name="reuseImageFile">
                    </select>
                </div>
                <div id="upload-image-error">
                </div>
                <div class="submit-container">
                    <input type="submit" value="Insert" />
                </div>
            </form>
        </div>

        <!--Insert Image hidden iframe-->
        <iframe id="upload_target" name="upload_target" style="width:0;height:0;border:0px;"></iframe>

        <script type="text/javascript">
            "use strict";
            function loadFill(check) {
                if (check.checked === true) {
                    if ($('#colorpickerHolder3').css('display') === 'none') {
                        $('#colorSelector3').click();
                    }
                }
                else {
                    if ($('#colorpickerHolder3').css('display') === 'block') {
                        $('#colorSelector3').click();
                    }
                }
            }
        </script>
        <br/>
        <? //require_once dirname(__FILE__) . '/common/analytics.php';?>
    </body>
</html>

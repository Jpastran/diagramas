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

            function showImport() {
                //alert("ok");
                var r = confirm("Current diagram will be deleted. Are you sure?");
                if (r === true) {
                    $('#import-dialog').modal(); // jQuery object; this demo
                }
            }
            loadLibs();
            loadSets();
            loadCommands();
            $(document).ready(function() {
                tabs(tab2, ctab2);
                editable();
            });
        </script>

        <script type="text/javascript" src="./assets/javascript/colorPicker_new.js"></script>
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/colorPicker_new.css" />

        <!--[if IE]>
        <script src="./assets/javascript/excanvas.js"></script>
        <![endif]-->

    </head>
    <body onload="init('<?= isset($_REQUEST['diagramId']) ? $_REQUEST['diagramId'] : '' ?>');" id="body">      
        <div id="actions">
            <div id="aSist" style="float: left">
                <a style="text-decoration: none;" href="#" onclick="return save();" title="Guardar diagrama (Ctrl-S)"><img src="assets/images/icon_save.jpg" border="0" width="16" height="16"/></a>          
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a style="text-decoration: none;" href="./myDiagrams.php" title="Abrir diagrama"><img src="assets/images/icon_open.jpg" border="0" width="16" height="16"/></a>
                <?if(isset($_REQUEST['diagramId']) &&  is_numeric($_REQUEST['diagramId']) ){//option available ony when the diagram was saved?>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                <a style="text-decoration: none;" href="#" onclick="return print_diagram();" title="Imprimir diagrama"><img src="assets/images/icon_print.png" border="0" width="16" height="16"/></a>
                <?}?>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            </div>
            <div id="aTools" style="float: left">
                <a href="javascript:action('connector-straight');"  title="Conector lineal"><img src="assets/images/icon_connector_straight.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('connector-jagged');" title="Conector Cuadrado"><img src="assets/images/icon_connector_jagged.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                <!--
                <a href="javascript:action('connector-organic');" title="Organic connector"><img src="assets/images/icon_connector_organic.gif" border="0" alt="Organic"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
    
                <a href="javascript:action('container');" title="Container (Experimental)"><img src="assets/images/container.png" border="0" alt="Container"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                -->
                <input type="checkbox" onclick="showGrid();" id="gridCheckbox"  title="Mostrar malla" />
                <span class="toolbarText">Show grid</span>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <input type="checkbox" onclick="snapToGrid();" id="snapCheckbox" title="Alinear a la malla" />
                <span class="toolbarText">Snap to grid</span>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                <a href="javascript:action('front');" title="Mover al frente"><img src="assets/images/icon_front.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('back');" title="Mover al fondo"><img src="assets/images/icon_back.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('moveforward');" title="Subir un nivel"><img src="assets/images/icon_forward.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('moveback');" title="Bajar un nivel"><img src="assets/images/icon_backward.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('group');" title="Agrupar (Ctrl-G)"><img src="assets/images/group.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('ungroup');" title="Desagrupar (Ctrl-U)"><img src="assets/images/ungroup.gif" border="0"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                <a href="javascript:createFigure(figure_Text, 'assets/images/text.gif');"  title="Agregar comentario"><img  src="assets/images/text.gif" border="0" height ="16"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            </div>
        </div>
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

        <div id="editor">
            <!--Left panel-->
            <div id="left">
                <div id="figures">
                    <select style="width: 100%;" onchange="setFigureSet(this.options[this.selectedIndex].value);">
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
                    <select id="espSelect" onchange="setEspecial(this.options[this.selectedIndex].value)">
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
                            <select id="repOut" onclick="cargarFiguras('repOut')"></select>
                            <input type="button" value="Añadir" onclick="especial('repetir')"/>
                        </div>
                    </div>
                    <div id="reproceso" style=" display: none">
                        <img src="lib/sets/reproceso.png" class="especial" />			
                        <div class="label">
                            Reprocesa
                            <select id="proOut" onclick="cargarFiguras('proOut')"></select>
                            <input id="btnRepro" type="button" value="Agregar" onclick="especial('repro')"/>
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
                <div id="imgLoad" class="label" style="display: none">
                    Suba la imagen con la cual trabajara
                    <a href="javascript:showInsertImageDialog();"  title="Add image"><img src="assets/images/img_icon.png" border="0" width="115px" alt="Image"/></a>
                </div>
                <div id="bimLeft" class="label" style="display: none">
                    <br>Tiempo
                    <input type="text" id="time">
                    <br>Descripcion mano izquierda
                    <textarea type="text" id="mid"></textarea>
                    Simbolo mano izquierda<br>
                    <select id="mis">
                        <option value="0">Operacion</option>
                        <option value="1">Trasporte</option>
                        <option value="2">Sostenimiento</option>
                        <option value="3">Demora</option>
                    </select>
                    <br>Descripcion mano derecha
                    <textarea type="" id="mdd"></textarea>
                    <br>Simbolo mano izquierda
                    <select id="mds">
                        <option value="0">Operacion</option>
                        <option value="1">Trasporte</option>
                        <option value="2">Sostenimiento</option>
                        <option value="3">Demora</option>
                    </select>
                    <input type="button" value="Insertar" onclick="addFila()">
                </div>
            </div>
            <!--THE canvas-->
            <div style="width: 100%">
                <div  id="container">
                    <div id="tabs">
                        <ul id=lista>
                            <li id="tab1">
                                <a href='javascript:tabs(tab1,ctab1)'>Cabecera</a>
                            </li>
                            <li id="tab2">
                                <a href='javascript:tabs(tab2,ctab2)'>Diagrama</a>
                            </li>
                        </ul>
                    </div>
                    <div id="ctabs">
                        <div id="ctab2">
                            <canvas id="a" width="800" height="600">
                                Your browser does not support HTML5. Please upgrade your browser to any modern version.
                            </canvas>
                            <div id="text-editor"></div>
                            <div id="text-editor-tools"></div>
                        </div>
                        <div id="ctab1">
                            <table id="analitico">
                                <tbody>
                                    <tr>
                                        <td>Carta No:</td>
                                        <td></td>
                                        <td>Hoja No:</td>
                                        <td></td>
                                        <td>De:</td>
                                        <td width="100px;"></td>
                                        <td colspan=2>Metodo Presente
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td colspan=2>Metodo Propuesto
                                            <input type="radio" name="metodo"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td rowspan=3>Material</td>
                                        <td colspan=5 rowspan=3></td>
                                        <td colspan=4 align="center">Resumen</td>
                                    </tr>
                                    <tr align="center">
                                        <td>Actividad</td>
                                        <td>Presente</td>
                                        <td>Propuesto</td>
                                        <td>Ganado</td>
                                    </tr>
                                    <tr>
                                        <td>Operacion <img src="lib/sets/analitico/circle.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowspan=3>Actividad:</td>
                                        <td colspan=5 rowspan=3></td>
                                        <td>Trasporte <img src="lib/sets/analitico/arrow.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Demora <img src="lib/sets/analitico/semi_circle_right.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inspeccion <img src="lib/sets/analitico/square.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowspan=2>Ubicacion:</td>
                                        <td colspan=5 rowspan=2 id="ubic"></td>
                                        <td>Almacenaje <img src="lib/sets/analitico/triangle_inver.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Combinada <img src="lib/sets/analitico/combine.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">Analista:</td>
                                        <td colspan="5" rowspan="2"></td>
                                        <td>Total actividades</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    <tr>
                                        <td>Distancia total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Fecha: </td>
                                        <td colspan="5"></td>
                                        <td>Tiempo total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab3">
                            <table id="sinoptico">
                                <tbody>
                                    <tr>
                                        <td>Diagrama No:</td>
                                        <td colspan=3 ></td>
                                        <td>Hoja No:</td>
                                        <td></td>
                                        <td>De:</td>
                                        <td width="100px;"></td>
                                    </tr>
                                    <tr>
                                        <td>Fecha:</td>
                                        <td style="min-width: 120px"></td>
                                        <td>Presente
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td>Propuesto
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td colspan=4 align="center">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td rowspan=4>Actividad</td>
                                        <td colspan=3 rowspan=4></td>
                                        <td align="center">Actividad</td>
                                        <td align="center">Presente</td>
                                        <td align="center">Propuesto</td>
                                        <td align="center">Ganado</td>
                                    </tr>
                                    <tr>
                                        <td>Operacion <img src="lib/sets/sinoptico/circle.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inspeccion <img src="lib/sets/sinoptico/square.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Combinada <img src="lib/sets/sinoptico/combine.png"/></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Analista:</td>
                                        <td colspan=3></td>
                                        <td>Total actividades</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    <tr>
                                        <td>Fecha: </td>
                                        <td colspan=3></td>
                                        <td>Tiempo total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab4">
                            <table id="recorrido">
                                <tbody>
                                    <tr>
                                        <td>Diagrama No:</td>
                                        <td width="100px;" ></td>
                                        <td>Hoja No:</td>
                                        <td width="100px;"></td>
                                        <td>De:</td>
                                        <td width="100px;"></td>
                                        <td>Analista:</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="12">Actividad:</td>
                                        <td colspan="3" rowspan="12"></td>
                                        <td colspan="2">Metodo Presente
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td colspan="2">Metodo Propuesto
                                            <input type="radio" name="metodo"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="4">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td align="center">Actividad</td>
                                        <td align="center">Presente</td>
                                        <td align="center">Propuesto</td>
                                        <td align="center">Ganado</td>
                                    </tr>
                                    <tr>
                                        <td>Operacion</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trasporte</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Demora</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Inspeccion</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Almacenaje</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Combinada</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Total actividades</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Distancia total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tiempo total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Ubicacion:</td>
                                        <td></td>
                                        <td>Escala:1:</td>
                                        <td colspan="2"></td>
                                        <td>Fecha:</td>
                                        <td colspan="2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab5">
                            <table id="bimanualH">
                                <tbody id="gen">
                                    <tr>
                                        <td>Diagrama No:</td>
                                        <td></td>
                                        <td>Hoja No:</td>
                                        <td></td>
                                        <td>De:</td>
                                        <td></td>
                                        <td>Fecha:</td>
                                        <td colspan="6"></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">Actividad:</td>
                                        <td colspan="5" rowspan="2"></td>
                                        <td>Analista:</td>
                                        <td colspan="6"></td>
                                    </tr>
                                    <tr>
                                        <td colspan="3">Metodo Presente
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td colspan="4">Metodo Propuesto
                                            <input type="radio" name="metodo"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="6">Puesto de trabajo</td>
                                        <td align="center" colspan="7">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td colspan="6" rowspan="8"></td>
                                        <td align="center" rowspan="2">Simbolo</td>
                                        <td align="center" colspan="2">Presente</td>
                                        <td align="center" colspan="2">Propuesto</td>
                                        <td align="center" colspan="2">Ganado</td>
                                    </tr>
                                    <tr>
                                        <td>M.I</td>
                                        <td>M.D</td>
                                        <td>M.I</td>
                                        <td>M.D</td>
                                        <td>M.I</td>
                                        <td>M.D</td>
                                    </tr>

                                    <tr>
                                        <td>Operacion</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Trasporte</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Demora</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Sostenimiento</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Total</td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tiempo del ciclo</td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                        <td colspan="2"></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab6">
                            <table id="bimanualT">
                                <thead>
                                    <tr>
                                        <th>Tiempo</th>
                                        <th>Descrpcion de la actividad de</th>
                                        <th colspan="2">Simbolo</th>                                
                                        <th>Descrpcion de la actividad de</th>
                                        <th>Tiempo</th>
                                        <th rowspan="2">Opciones</th>
                                    </tr>
                                    <tr>
                                        <th>
                                            <select id="tL" onchange="editTime()">
                                                <option value="Seg" selected>Seg</option>
                                                <option value="Min">Min</option>
                                                <option value="Hora">Hora</option>
                                            </select>
                                        </th>
                                        <th>Mano izquierda</th>
                                        <th>MI</th>
                                        <th>MD</th>
                                        <th>Mano derecha</th>
                                        <th id="tR">Seg</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab7">
                            <table id="maquinaH">
                                <tbody id="gen">
                                    <tr>
                                        <td style="min-width: 95px;">Diagrama No:</td>
                                        <td></td>
                                        <td>Hoja No:</td>
                                        <td></td>
                                        <td>De:</td>
                                        <td></td>
                                        <td id="resum" align="center">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="3">Producto:</td>
                                        <td colspan="5" rowspan="3"></td>
                                        <td rowspan="2" style="min-width: 150px">
                                            Metodo Presente
                                            <input type="radio" name="metodo"/>
                                            <br>Metodo Propuesto
                                            <input type="radio" name="metodo"/>
                                        </td>
                                        <td id="pre" align="center">Presente</td>
                                        <td id="pro" align="center">Propuesto</td>
                                        <td id="gan" align="center">Ganado</td>
                                    </tr>
                                    <tr id="tr3" style="height: 30.85px">
                                    </tr>
                                    <tr id="tr4">
                                        <td>Tiempo Combinado</td>
                                    </tr>
                                    <tr id="tr5">
                                        <td rowspan="2">Actividad:</td>
                                        <td colspan="5" rowspan="2"></td>
                                        <td>Tiempo Independiente</td>
                                    </tr>
                                    <tr id="tr6">
                                        <td>Tiempo Improductivo</td>
                                    </tr>
                                    <tr id="tr7">
                                        <td>Maquina(s):</td>
                                        <td></td>
                                        <td>Velocidad:</td>
                                        <td></td>
                                        <td>Avance:</td>
                                        <td></td>
                                        <td>
                                            Tiempo de ciclo
                                            <select id="timeHM" onchange="editTime()">
                                                <option value="Seg">Seg</option>
                                                <option value="Min">Min</option>
                                                <option value="Hora">Hora</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr id="tr8">
                                        <td>Analista:</td>
                                        <td colspan="2"></td>
                                        <td>Fecha:</td>
                                        <td colspan="2"></td>
                                        <td>Eficiencia(%)</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div id="ctab8">
                            <table id="maquinaT">
                                <thead>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
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
                <div id="edit">
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

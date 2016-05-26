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
    <head>
        <title>Diagramet - Editor</title>
        <meta charset="UTF-8"> 

        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/style.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/minimap.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/tabs.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/simplemodal/css/diagramo.css" />
        <link rel="stylesheet" media="screen" type="text/css" href="./assets/css/colorPicker_new.css" />

        <script type="text/javascript" src="./assets/javascript/jquery-1.11.0.min.js"></script>
        <script type="text/javascript" src="./lib/loadScript.js"></script>

    </head>
    <body id="body" onload="init('');">      
        <div style="display: none"><? require_once dirname(__FILE__) . '/header.php'; ?></div>
        <div id="actions" >           
            <div style="float: left">
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                <!-- 
                 <a style="text-decoration: none;" href="#" onclick="return save();" title="Guardar diagrama (Ctrl-S)"><img src="assets/images/icon_save.jpg" border="0" width="16" height="16"/></a>          
                 <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                 <a style="text-decoration: none;" href="./myDiagrams.php" title="Abrir diagrama"><img src="assets/images/icon_open.jpg" border="0" width="16" height="16"/></a>
                 <?if(isset($_REQUEST['diagramId']) &&  is_numeric($_REQUEST['diagramId']) ){//option available ony when the diagram was saved?>
                 <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                 <a style="text-decoration: none;" href="#" onclick="return print_diagram();" title="Imprimir diagrama"><img src="assets/images/icon_print.png" border="0" width="16" height="16"/></a>
                 <?}?>
                 <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                -->
                <a href="./common/controller.php?action=newDiagramExe" title="Nuevo"><img src="assets/images/icon_new.jpg" border="0" height="16"></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:refCabecera();"  title="Refrescar Cabecera"><img  src="assets/images/rotate.png" border="0" height ="16"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                
                <? if(strpos($_SERVER['HTTP_USER_AGENT'], 'Chrome') == FALSE){ echo'
                <a href="javascript:printDiagram(\'pdf\')" title="Guardar como PDF"><img src="assets/images/icon_save_pdf.png" border="0" width="16" height="16"/></a>          
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                ';}?>
                
                <a href="javascript:printDiagram('print');"  title="Imprimir"><img  src="assets/images/icon_print.png" border="0" height ="16"/></a>
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>

                <a href="javascript:action('undo');" title="Deshacer (Ctrl-Z)"><img src="assets/images/arrow_undo.png" border="0" height ="16"/></a>           
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                
            </div>
            <div id="aTools" style="float: left; display: none;">
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
            <div id="aInfo" style="float: right;">
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                
                <a href="javascript:action('ayuda');" title="Ayuda"><img src="assets/images/icon_help.png" border="0" height ="16"/></a>           
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
                
                <a href="javascript:action('acerca');" title="Acerca De "><img src="assets/images/icon-about.png" border="0" height ="16"/></a>           
                <img class="separator" src="assets/images/toolbar_separator.gif" border="0" width="1" height="16"/>
            </div>
        </div>

        <!--Cabecera de Impresion-->
        <div id="headDiv" style="display: none">
            <div id="logoCuc"><img src="assets/images/logo_CUC.png"></div>
            <div id="textHead">
                <p>FACULTAD DE INGENIERIAS</p>
                <p>PROGRAMA DE INGENIERIA INDUSTRIAL</p>
                <p id="diagName"></p>
            </div>
            <div id="valId"></div>
            <div id="media"></div>
        </div>

        <div id="editor">
            <!--Left panel-->
            <div id="left">
                <div id="figures">
                    <select id="selDiag" onchange="setFigureSet(this.options[this.selectedIndex].value);">
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
                            <select id="repOut" onmousedown="cargarFiguras('repOut')"></select>
                            <input type="button" value="Añadir" onclick="especial('repetir')"/>
                        </div>
                    </div>
                    <div id="reproceso" style=" display: none">
                        <img src="lib/sets/reproceso.png" class="especial" />			
                        <div class="label">
                            Reprocesa
                            <select id="proOut" onmousedown="cargarFiguras('proOut')" ></select>
                            <input id="btnRepro" type="button" value="Agregar" onclick="especial('repro')"/>
                        </div>						
                    </div>
                    <div id="trayectos" style=" display: none">
                        <img src="lib/sets/trayectos.png" class="especial" />
                        <div class="label" id="trayGen" style=" display: block">
                            Generar
                            <input type="number" id="trayNum" min="2" step="1" max="5" style="width: 120px;">
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
                    <a href="javascript:showInsertImageDialog();"  title="Add image"><img src="assets/images/img_icon.png" border="0" width="115" alt="Image"/></a>
                </div>
                <div id="bimLeft" class="label" style="display: none">
                    <form>
                        Tiempo
                        <input type="text" id="time">
                        <br>Descripcion mano izquierda
                        <textarea id="mid"></textarea>
                        Simbolo mano izquierda<br>
                        <select id="mis">
                            <option value="-1">-Seleccione-</option>
                            <option value="0">Operacion</option>
                            <option value="1">Transporte</option>
                            <option value="2">Demora</option>
                            <option value="3">Sostenimiento</option>
                        </select>
                        <br>Descripcion mano derecha
                        <textarea id="mdd"></textarea>
                        <br>Simbolo mano derecha
                        <select id="mds">
                            <option value="-1">-Seleccione-</option>
                            <option value="0">Operacion</option>
                            <option value="1">Transporte</option>
                            <option value="2">Demora</option>
                            <option value="3">Sostenimiento</option>
                        </select>
                        <input type="button" value="Insertar" onclick="addFila()">
                    </form>
                </div>
                <div id="hmaqLeft" class="label" style="display: none">
                    <form>
                        <div id="genInput">
                            Numero de Operarios
                            <input type="text" id="numO">
                            Numero de Maquinas
                            <input type="text" id="numM">
                            <input type="button" value="Generar" onclick="genInit()">
                        </div>
                        <div id="genRD" style="display: none">
                            <input type="button" value="Deshacer" onclick="doUndoHM()"> 
                        </div>
                        <div id="genFila" style="display: none">
                            <select id="selPart"></select>
                        </div>
                    </form>
                </div>
            </div>

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
                            <!--THE canvas-->
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
                                        <td style="text-align: right">Hoja No:</td>
                                        <td></td>
                                        <td style="text-align: right">De:</td>
                                        <td width="100px;"></td>
                                        <td colspan=2>Metodo Presente
                                            <input type="radio" name="metA" value="pre" onchange="changeMetA()" checked/>
                                        </td>
                                        <td colspan=2>Metodo Propuesto
                                            <input type="radio" name="metA" value="pro" onchange="changeMetA()"/>
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
                                        <td>Transporte <img src="lib/sets/analitico/arrow.png"/></td>
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
                                        <td>Distancia T. <span class="dist">M</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Fecha: </td>
                                        <td colspan="5"></td>
                                        <td>Tiempo T. <span class="time">Seg</span></td>
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
                                        <td style="min-width: 100px">Diagrama No:</td>
                                        <td colspan=3 ></td>
                                        <td style="text-align: right">Hoja No:</td>
                                        <td></td>
                                        <td style="text-align: right">De:</td>
                                        <td width="100px;"></td>
                                    </tr>
                                    <tr>
                                        <td>Fecha:</td>
                                        <td style="min-width: 100px"></td>
                                        <td style="min-width: 100px">Presente
                                            <input type="radio" name="metS" value="pre" onchange="changeMetS()" checked/>
                                        </td>
                                        <td style="min-width: 100px">Propuesto
                                            <input type="radio" name="metS" value="pro" onchange="changeMetS()"/>
                                        </td>
                                        <td colspan=4 align="center">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td rowspan=4>Actividad</td>
                                        <td colspan=3 rowspan=4></td>
                                        <td align="center" style="min-width: 130px">Actividad</td>
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
                                        <td>Tiempo T. <span class="time">Seg</span></td>
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
                                        <td style="text-align: right">De:</td>
                                        <td width="100px;"></td>
                                        <td>Analista:</td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td rowspan="12">Actividad:</td>
                                        <td colspan="3" rowspan="12"></td>
                                        <td colspan="2">Metodo Presente
                                            <input type="radio" name="metR" value="pre" onchange="changeMetR()" checked/>
                                        </td>
                                        <td colspan="2">Metodo Propuesto
                                            <input type="radio" name="metR" value="pro" onchange="changeMetR()"/>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td align="center" colspan="4">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td align="center" style="min-width: 130px">Actividad</td>
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
                                        <td>Transporte</td>
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
                                        <td>Distancia T. <span class="dist">M</span></td>
                                        <td></td>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                    <tr>
                                        <td>Tiempo T. <span class="time">Seg</span></td>
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
                                <tbody>
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
                                            <input type="radio" name="metB" value="pre" onchange="changeMetB()" checked/>
                                        </td>
                                        <td colspan="4">Metodo Propuesto
                                            <input type="radio" name="metB" value="pro" onchange="changeMetB()"/>
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
                                        <td>Transporte</td>
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
                                        <td>T. del ciclo
                                            <select id="timeB" onchange="editTimeB('H')">
                                                <option value="Seg" selected>seg</option>
                                                <option value="Min">min</option>
                                                <option value="Hora">hora</option>
                                            </select>
                                        </td>
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
                                            <select id="tL" onchange="editTimeB()">
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
                        <div id="ctab7" style="overflow:auto">
                            <table id="maquinaH">
                                <tbody>
                                    <tr>
                                        <td style="min-width: 95px;">Diagrama No:</td>
                                        <td></td>
                                        <td>Hoja No:</td>
                                        <td></td>
                                        <td>De:</td>
                                        <td></td>
                                        <td id="resum" align="center" colspan="4">Resumen</td>
                                    </tr>
                                    <tr>
                                        <td rowspan="2">Producto:</td>
                                        <td colspan="5" rowspan="2"></td>
                                        <td rowspan="2" style="min-width: 150px">
                                            Metodo Presente
                                            <input type="radio" name="metH" value="pre" onchange="changeMetH()" checked/>
                                            <br>Metodo Propuesto
                                            <input type="radio" name="metH" value="pro" onchange="changeMetH()"/>
                                        </td>
                                        <td id="pre" align="center">Presente</td>
                                        <td id="pro" align="center">Propuesto</td>
                                        <td id="gan" align="center">Ganado</td>
                                    </tr>
                                    <tr id="tr3" style="height: 30.85px">
                                    </tr>
                                    <tr id="tr4">
                                        <td rowspan="2">Actividad:</td>
                                        <td colspan="5" rowspan="2"></td>                                
                                        <td>Tiempo Combinado</td>
                                    </tr>
                                    <tr id="tr5">
                                        <td>Tiempo Independiente</td>
                                    </tr>
                                    <tr id="tr6">
                                        <td>Maquina(s):</td>
                                        <td colspan="5"></td>
                                        <td>Tiempo Improductivo</td>
                                    </tr>
                                    <tr id="tr7">
                                        <td>Velocidad:</td>
                                        <td colspan="2"></td>
                                        <td>Avance:</td>
                                        <td colspan="2"></td>
                                        <td>
                                            T. de ciclo
                                            <select id="timeHM" onchange="editTimeHM()">
                                                <option value="seg">Seg</option>
                                                <option value="min">Min</option>
                                                <option value="hora">Hora</option>
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
                        <div id="ctab8" style="overflow:auto">
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
                <div id="minimap"></div>
                <div id="edit"></div>
                <div id="medidas">
                    <hr>
                    <div class="line">
                        <div class="label">Unid. de tiempo</div>
                        <select id="timeMan" onchange="paintUT(this.options[this.selectedIndex].value)">
                            <option value="seg">Segundo</option>
                            <option value="min">Minuto</option>
                            <option value="h">Hora</option>
                        </select>
                    </div>
                    <div class="line">
                        <div class="label">Unid. de distancia</div>
                        <select id="distMan" onchange="paintUD(this.options[this.selectedIndex].value)">
                            <option value="cm">Centimetro</option>
                            <option value="m" selected>Metro</option>
                            <option value="km">Kilometro</option>
                        </select>
                    </div>
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
            <form method="POST" id="upload_target" enctype="multipart/form-data">
                <input type="hidden" name="action" value="insertImage"/>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="URL" checked>
                    <label>Desde URL:</label>
                    <input type="text" class="url-input" name="imageURL" id="imageURL"/>
                </div>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="Upload">
                    <label>Subir:</label>
                    <input type="file" class="right-offset" name="imageFile" id="imageFile"/>
                </div>
                <div class="insert-image-line">
                    <input type="radio" name="image-group" value="Reuse" id="insert-image-reuse-group">
                    <label>Reusar:</label>
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

        <div id="imgCanvas" style="display: none"></div>
        
        <div id="acerca" style="display: none">
            <p>DiagraMet Version 1.5.1-beta</p>
            <p>Basado: Diagramo 2.3 <a href="http://www.diagramo.com" target="_blank">Link</a></p>
            <p>Desarrollado: Universidad de la Costa 2016</p>
            <p>Desarrolladores:</p>
            <ul>
                <li>Josue Pastrana </li>
                <li>Miguel Jimenez</li>
                <li>Aida Hyuke</li>
                <li>Marlon Mendoza</li>
                <li>Edward Rangel</li>
            </ul>
        </div>

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
    </body>
</html>
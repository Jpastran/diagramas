http://programandoointentandolo.com/2012/11/como-crear-pestanas-con-html.html
// Dadas la division que contiene todas las pestañas y la de la pestaña que se
// quiere mostrar, la funcion oculta todas las pestañas a excepcion de esa.
function tabs(tabId) {
	// Obtiene los elementos con los identificadores pasados.
	var tab = document.getElementById(tabId);
	// Obtiene las divisiones que tienen el contenido de las pestañas.
	var ctab = document.getElementById("c" + tabId);
	var i = 1;
	// Recorre la lista ocultando todas las pestañas y restaurando el fondo
	// y el padding de las pestañas.
	while (document.getElementById("tab" + i) != null) {
		$("#" + "ctab" + i).css('display', 'none');
		$("#" + "tab" + i).css('background', '');
		$("#" + "tab" + i).css('padding-bottom', '');
		i += 1;
	}
	// Muestra el contenido de la pestaña pasada como parametro a la funcion,
	// cambia el color de la pestaña y aumenta el padding para que tape el
	// borde superior del contenido que esta juesto debajo y se vea de este
	// modo que esta seleccionada.
	$(ctab).css('display', '');
	$(tab).css('background', '#CECECE');
	$(tab).css('padding-bottom', '2px');
}
$(document).ready(function() {
    noEditable();
});

function noEditable() {
    var tds = $("table td");
    for (var i = 0; i < tds.length; i++) {
        $(tds[i]).removeAttr('contenteditable', 'true');
        $(tds[i]).removeAttr('class', 'edit');
    }
    var inpSel = $("table input, table select");
    for (var i = 0; i < inpSel.length; i++) {
        $(inpSel[i]).attr('disabled', true);
    }
    var biman = $("#bimanualT tr");
    for (var i = 0; i < biman.length; i++) {
        if (i != 1)
            $(biman[i]).children().last().remove();
    }
}

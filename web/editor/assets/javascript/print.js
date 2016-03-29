$(document).ready(function() {
    noEditable();
    var hex = idGen();
    $("#valId").text(hex);
    console.log(decodeId(hex));
});

function noEditable() {
    var media = $("#media")
    media.css('display', 'none');
    var tds = $("table td");
    for (var i = 0; i < tds.length; i++) {
        $(tds[i]).removeAttr('contenteditable');
        $(tds[i]).removeClass('edit');
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
    $("#td175 a").attr("href", "#");
//    if (media.html() == "pdf") {
//        genPdfJs();
//    }
}

function idGen() {
    var time = new Date().getTime();
    var hex = time.toString(16);
    return hex;
}

function decodeId(hex) {
    var time = new Date(parseInt(hex, 16));
    var date = time.toString();
    return date;
}


//function generarPDF() {
//    var imgs = $("img");
//    var appURL = "http://" + window.location.host + "/diagramo/web/editor/";
//    for (var i = 0; i < imgs.length; i++) {
//        var src = $(imgs[i]).attr("src");
//        $(imgs[i]).attr("src", "" + appURL + src);
//    }
//    var body = $("body").html();
//    var params = {
//        "Html": body
//    };
//    var url = 'common/generate.php';
//    $.ajax({
//        type: "POST",
//        url: url,
//        data: params,
//        success: function(response, status, xhr) {
//            // check for a filename
//            var filename = "";
//            var disposition = xhr.getResponseHeader('Content-Disposition');
//            if (disposition && disposition.indexOf('attachment') !== -1) {
//                var filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
//                var matches = filenameRegex.exec(disposition);
//                if (matches != null && matches[1])
//                    filename = matches[1].replace(/['"]/g, '');
//            }
//
//            var type = xhr.getResponseHeader('Content-Type');
//            var blob = new Blob([response], {type: type});
//
//            if (typeof window.navigator.msSaveBlob !== 'undefined') {
//                // IE workaround for "HTML7007: One or more blob URLs were revoked by closing the blob for which they were created. These URLs will no longer resolve as the data backing the URL has been freed."
//                window.navigator.msSaveBlob(blob, filename);
//            } else {
//                var URL = window.URL || window.webkitURL;
//                var downloadUrl = URL.createObjectURL(blob);
//
//                if (filename) {
//                    // use HTML5 a[download] attribute to specify filename
//                    var a = document.createElement("a");
//                    // safari doesn't support this yet
//                    if (typeof a.download === 'undefined') {
//                        window.location = downloadUrl;
//                    } else {
//                        a.href = downloadUrl;
//                        a.download = filename;
//                        document.body.appendChild(a);
//                        a.click();
//                    }
//                } else {
//                    window.location = downloadUrl;
//                }
//
//                setTimeout(function() {
//                    URL.revokeObjectURL(downloadUrl);
//                }, 100); // cleanup
//            }
//        }
//    });
//}
//
//function genPdfJs() {
//    var pdf = new jsPDF('p', 'pt', 'letter');
//    // source can be HTML-formatted string, or a reference
//    // to an actual DOM element from which the text will be scraped.
//    source = $('body')[0];
//
//    // we support special element handlers. Register them with jQuery-style 
//    // ID selector for either ID or node name. ("#iAmID", "div", "span" etc.)
//    // There is no support for any other type of selectors 
//    // (class, of compound) at this time.
//    specialElementHandlers = {
//        // element with id of "bypass" - jQuery style selector
//        '#bypassme': function(element, renderer) {
//            // true = "handled elsewhere, bypass text extraction"
//            return true
//        }
//    };
//    margins = {
//        top: 80,
//        bottom: 60,
//        left: 40,
//        width: 522
//    };
//    // all coords and widths are in jsPDF instance's declared units
//    // 'inches' in this case
//    pdf.fromHTML(
//            source, // HTML string or DOM elem ref.
//            margins.left, // x coord
//            margins.top, {// y coord
//                'width': margins.width, // max width of content on PDF
//                'elementHandlers': specialElementHandlers
//            },
//    function(dispose) {
//        // dispose: object with X, Y of the last line add to the PDF 
//        //          this allow the insertion of new lines after html
//        pdf.save('Test.pdf');
//    }, margins);
//}
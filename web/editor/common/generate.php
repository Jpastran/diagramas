<?php

require_once ('dompdf/autoload.inc.php');

// reference the Dompdf namespace
use Dompdf\Dompdf;

// instantiate and use the dompdf class
$dompdf = new Dompdf();
$html = '<html>
            <head>
                <link rel="stylesheet" href="../assets/css/print.css" type="text/css" />
            </head>
            <body>'
                . $_POST['Html'] .
            '</body>
        </html>';

$dompdf->load_html($html);

// (Optional) Setup the paper size and orientation
$dompdf->set_paper('A4', 'landscape');

// Render the HTML as PDF
$dompdf->render();

// Output the generated PDF to Browser
$dompdf->stream("Diagrama");

exit();
?>
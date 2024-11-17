<?php
// PDFConverterService to Handle PDF to Text Conversion 
namespace App\Services;

use Smalot\PdfParser\Parser;

class PDFConverterService
{
    protected $pdfParser;

    public function __construct()
    {
        $this->pdfParser = new Parser();
    }

    public function convertPDFToText($filePath)
    {
        $pdf = $this->pdfParser->parseFile($filePath);
        return $pdf->getText();
    }
}

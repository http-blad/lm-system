<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\StreamedResponse;

class FileController extends Controller
{
    public function show($fileName)
    {

        if (!Storage::exists($fileName)) {
            return response()->json(['code' => 404, 'message' => 'File not found'], 404);
        }

        $fileContent = Storage::get($fileName);

        return new StreamedResponse(function () use ($fileContent) {
            echo $fileContent;
        },200,[
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename="' . $fileName . '"'
        ]);
    }

    public function upload(Request $request)
    {
        if(!$request->hasFile('file')){
            return response()->json(['code'=> 404, 'message'=> 'No file uploaded'], 400);
        }

        $fileName = $request->file('file')->getClientOriginalName();

        Storage::putFileAs('', $request->file('file'),$fileName);

        return response()->json(["message" => "File Uploaded Successfully"]);
    }
}

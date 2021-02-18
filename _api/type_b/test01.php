<?php

header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Origin: *");
header("Content-Type: text/plain");

echo json_encode([
    "result"=>true,
    "name"=>"type_b api",
]);
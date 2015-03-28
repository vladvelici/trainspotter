<?php
  require('config.php');
  require("OpenLDBWS.php");
  if(isset($_GET['crs'])){
    $crs = $_GET['crs'];
  } else {
    $crs = 'PAD';
  }

  if(isset($_GET['max'])){
    $max = intval($_GET['max']);
  } else {
    $max = 10;
  }

  if(count($argv) == 3){
    $crs  =$argv[1];
    $max = $argv[2];
  }

  $OpenLDBWS = new OpenLDBWS($token);
  $departureBoard = $OpenLDBWS->GetDepartureBoard($max,$crs);
  header("Content-Type: application/json");
  $json =  json_encode($departureBoard);

  fwrite(STDOUT, $json);
  // $arr = json_decode(json_encode($departureBoard), TRUE);
  // echo "Hello";
  

  // if(isset($arr['GetStationBoardResult'])
  //       && isset($arr['GetStationBoardResult']['trainServices'])
  //       && isset($arr['GetStationBoardResult']['trainServices']['service'])
  //       && count($arr['GetStationBoardResult']['trainServices']['service']) > 0){

  //   for($i = 0; $i < count($arr['GetStationBoardResult']['trainServices']['service']); $i++){
  //       $arr['GetStationBoardResult']['trainServices']['service'][$i]['serviceID'] = 
  //                   $OpenLDBWS->GetServiceDetails($arr['GetStationBoardResult']['trainServices']['service'][$i]['serviceID']);
  //   }


  // }

  // print_r($arr);
?>
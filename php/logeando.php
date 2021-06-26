<?php
error_reporting(0); 
header('Access-Control-Allow-Origin: *');
header("Access-Control-Allow-Headers: X-API-KEY, Origin, Authorization,X-Requested-With, Content-Type, Accept,Access-Control-Request-Method");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS, PUT, DELETE");
// header("Allow: GET, POST, OPTIONS, PUT, DELETE");

$methodHTTP = $_SERVER['REQUEST_METHOD'];
$dataentrante = ''; 
$eldni = ''; 
$eltelefono = ''; 
$laconsulta = ''; 
$lafecha = ''; 
$lahora = '';  
$noms = ''; 
$apep = ''; 
$apem = '';
$rpta = []; 
$elpaciente = '';

switch ($methodHTTP) 
{      
      case 'POST':
            $dataentrante = json_decode(file_get_contents('php://input'), true);
            $lafecha = $dataentrante['lafecha']; 
            $lahora = $dataentrante['lahora']; 
            $laconsulta = mb_strtoupper(trim($dataentrante['laconsulta']),'UTF-8');
            $eldni = $dataentrante['eldni']; 
            $eltelefono = $dataentrante['eltelefono']; 
            $elpaciente = $dataentrante['elpaciente']; 

            if( $eldni != '' && $lafecha != "" && $lahora != "" && ($elpaciente !="si" || $elpaciente != "no") ) 
                 echo verpost($eldni, $eltelefono, $lafecha, $lahora, $laconsulta, $elpaciente);  
            else 
            {
                  $rpta = ['incorrecto', $eldni, $eltelefono, $lafecha, $lahora, $elpaciente]; 
                  echo json_encode($rpta); 
            }
            
            break; 
}

function verpost($eldni, $eltelefono, $lafecha, $lahora, $laconsulta, $elpaciente) 
{ 
      $url="https://apiperu.dev/api/dni/".$eldni; 
      
      //Inicia una nueva sesion cURL
      $curl = curl_init($url); 
      //Define opciones para nuestra sesion cURL
      //direccion url a capturar. 
      curl_setopt($curl, CURLOPT_URL, $url); 
      //para devolver el resultado de la transferencia 
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
      //header 
      $headers = array(
         "Accept: application/json",
         "Authorization: Bearer e83be58e82defc0be701ae8751bcb68e7b81d2042978241f45169bed7d60d439",
      );
      //array de campos a configurar para el header HTTP 
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      //for debug only!
      //para verificar que el hostname coinicide con el proporcionado 
      curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, false); 
      //para que cURL verifique el peer del certificado 
      curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false); 
      //ejecuta y devuelve un resultado 
      $resp = curl_exec($curl); 
      //close 
      curl_close($curl);

      //recibiendo json 
      $datospersonales = json_decode($resp, true); 
      //header('Content-type:text/html;charset=utf-8'); 
      
      $apep = $datospersonales['data']['apellido_paterno'];
      if(!is_null($apep))
      {
            $apem = $datospersonales['data']['apellido_materno'];
            $noms = $datospersonales['data']['nombres'];
            $rpta = ['correcto', $eldni, $noms, $apep, $apem, $eltelefono, $lafecha['data'], $lahora['data'], $laconsulta, $elpaciente];  
                  
            // guardar en la db
            // $host = "190.233.231.68:3306";
            // $user = "munichon_root";
            // $pass = "hsJBPV%&TJPQ";
            // $bd = "munichon_libroreclamaciones";
            
            $host = "localhost";
            $user = "root";
            $pass = ""; 
            $bd = "odontologica"; 
            $conexion = new mysqli($host, $user, $pass, $bd);
            
            if($conexion->connect_error)
            {
                  $rpta = ['error conectando a db', $eldni, $eltelefono, $lafecha, $lahora, $elpaciente];
                  return json_encode($rpta); 
            }
            else 
            {
                  //Establecer la zona horaria predeterminada a usar
                  date_default_timezone_set('America/Lima');
                  $eldnin = utf8_decode($eldni);
                  $eltelefonon = utf8_decode($eltelefono); 
                  $elpacienten = utf8_decode($elpaciente); 
                  $laconsultan = utf8_decode($laconsulta); 
                  //query
                  $consulta = sprintf("INSERT INTO citas (nombres,apepat,apemat,dni,telefono,fecha,hora,consulta,soypaciente) VALUES('%s','%s','%s','%s','%s','%s','%s','%s','%s')", 
                        mysqli_real_escape_string($conexion,$noms),
                        mysqli_real_escape_string($conexion,$apep),
                        mysqli_real_escape_string($conexion,$apem),
                        mysqli_real_escape_string($conexion,$eldnin),
                        mysqli_real_escape_string($conexion,$eltelefonon),
                        mysqli_real_escape_string($conexion,$lafecha['data']),
                        mysqli_real_escape_string($conexion,$lahora['data']),
                        mysqli_real_escape_string($conexion,$laconsultan),
                        mysqli_real_escape_string($conexion,$elpacienten)
                  );

                  if(!$conexion->query($consulta))
                  {
                        $rpta = ['error insertando a db', $eldni, $eltelefono, $lafecha, $lahora, $elpaciente];
                        return json_encode($rpta);
                  }

                  $conexion->close(); 
            }
      }
      
      return json_encode($rpta); 
}
?>

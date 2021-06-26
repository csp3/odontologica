<?php
echo "<link rel='stylesheet' href='../css/verifica.css'>";

if (isset($_POST['enviar'])  
{
    echo "MIPHP: ".$_POST['midni'];
    echo "--------------------";
    $dni = trim($_POST['dni']);  
    $nombre = mb_strtoupper(trim($_POST['nombre']),'UTF-8');
    $apellidop = mb_strtoupper(trim($_POST['apellidop']),'UTF-8');
    $apellidom = mb_strtoupper(trim($_POST['apellidom']),'UTF-8');

    $url = "https://apiperu.dev/api/dni/".$dni;

    //Inicia una nueva sesion cURL
    $curl = curl_init($url);
    //Define opciones para nuestra sesion cURL
    //direccion url a capturar. 
    curl_setopt($curl, CURLOPT_URL, $url);
    //para devolver el resultado de la transferencia 
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);

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
    $a = json_decode($resp, true);
    //header('Content-type:text/html;charset=utf-8');
    //para dni
    $noms = $a['data']['nombres'];
    $apep = $a['data']['apellido_paterno'];
    $apem = $a['data']['apellido_materno'];
    
    // echo $noms." ".$apell."<br/>";
    
    $pos = strpos($noms, $nombre, 0);
    if($pos !== false)
    {
        $pos = strpos($apep, $apellidop, 0);
        if($pos !== false)
        {
            $pos = strpos($apem, $apellidom, 0);
            if($pos !== false)
                echo "<br>";
        }
    }

    if($pos === false)
        echo "El DNI: ".$dni." no corresponde con: ".$nombre." ".$apellidop. " ".$apellidom."<br>";
    else 
    {
        include('registra.php'); 
    }

}
else 
{     
    echo "<div id='diverror'>";
    echo "debe &nbsp; ingresar: &nbsp; Nombre, Apellidos, DNI y Teléfono <br><br>";
    echo "<a href='../index.php' id='areg'> <img src='../img/arrow-i.png' > Regresar</a>";
    echo "</div>";
}
echo "<script src='../js/verifica.js'></script>";
?>
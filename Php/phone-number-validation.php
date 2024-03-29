<?php
    $phoneNumber = $_POST["phone-number"];
    $email = $_POST["email"];
    
    include "../Php/databaseConnector.php";

    $sqlquery = "SELECT Phone_Number FROM property_owners WHERE Email_Address = ?;";
    $stmt = mysqli_prepare($connectionInitialisation, $sqlquery);
    mysqli_stmt_bind_param($stmt, "s", $email);
    mysqli_stmt_execute($stmt);
    $res = mysqli_stmt_get_result($stmt);

    if (mysqli_num_rows($res) > 0) {
        while ($property_owner = mysqli_fetch_assoc($res)) {
            $retrieved_phoneNumber = $property_owner['Phone_Number'];
        }
        if($phoneNumber === $retrieved_phoneNumber) {
            $table = "property_owners";
            include "../Php/send-mail.php";
        } else {
            include "../Php/wrong-phone-number.php";
        }
 
    } else {
        $sqlquery = "SELECT Phone_Number FROM Administrators WHERE Email_Address = ?;";
        $stmt = mysqli_prepare($connectionInitialisation, $sqlquery);
        mysqli_stmt_bind_param($stmt, "s", $email);
        mysqli_stmt_execute($stmt);
        $res = mysqli_stmt_get_result($stmt);

        if (mysqli_num_rows($res) > 0) {
            while ($administrators = mysqli_fetch_assoc($res)) {
                $retrieved_phoneNumber = $administrators['Phone_Number'];
            }
            if($phoneNumber === $retrieved_phoneNumber) {
                $table = "administrators";
                include "../Php/send-mail.php";
            } else {
                include "../Php/wrong-phone-number.php";
            }
     
        } else {
            include "../Php/no-Such-Account.php";
        }
    }
?>
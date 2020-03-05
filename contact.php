
<?php
if($_POST["message"]) {
    mail("your@email.address", "Form to email message", $_POST["message"], "From: an@email.address");
}
?>


<html>
<head>
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">
    <link rel = "stylesheet" href = "about.css">
    <title> Hunter Rasmussen </title>
</head>
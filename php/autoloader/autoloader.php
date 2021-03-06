<?php
/**
 * File in a directory tree the same as namespace. Example:
 * //in file classes/my_class.php
 * namespace classes;
 * class My_class {}
 *
 * //in file index.php
 * require 'autoloader.php';
 * $myClass= new classes\My_class;
 **/

spl_autoload_register(function ($class) {
    $file = str_replace('\\', DIRECTORY_SEPARATOR, strtolower($class)) . '.php';
    if (file_exists($file)) {
        require $file;
        return true;
    }
    return false;
});


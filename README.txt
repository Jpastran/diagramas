The application is released under Apache License, Version 2.0

Details
---------
Bellow is an overview of the application.

If you want to read how to install application read INSTALL.txt
If you want to read the license read LICENSE.txt
If you want to know more about Diagramo copyright read COPYRIGHT.txt


This folder contains:

[/] - this folder
   |--[web] - the Diagramo itself
   |    |--[assets] - css, images and othe look & feel files
   |    |--[editor] - the editor itself
   |    |   |--[assets] - css, images and othe look & feel files
   |    |   |--[common] - all the PHP files that makes the server side of the application
   |    |   |--[diagrams] - the place where all the diagrams will be stored
   |    |   |--[exporter] - the SVG to PNG exporter
   |    |   |--[lib] - all the JavaScripts of the web app engine
   |    |   |--[test] - all the tests developer created over time
   |    |   
   |    |--[install] - installer of the application
   |        |-- [assets] - installer's JS, images and CSS
   |        |-- [help] - a basic help for users
   |        |-- [sql]
   |        |       |-- db.bat - creates database, tables and add some fake data
   |        |       |-- create-database.sql - creates ONLY the database
   |        |       |-- create-tables.sql - creates ONLY the tables. Used by installer
   |        |       |-- fake-date.sql - creates some fake users
   |        |-- Echo.class - a simple Java program to see if Java is installed
   |        |-- stepX.php - different steps of installation process
   |        |-- + other
   |    
   |--README.txt - this file
   |--README.md - this file
   |--COPYRIGHT.txt - describe copyright
   |--LICENSE.txt - the text version of Diagramo Free License  

/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

// Wait for the deviceready event before using any of Cordova's device APIs.
// See https://cordova.apache.org/docs/en/latest/cordova/events/events.html#deviceready
//document.addEventListener('deviceready', onDeviceReady, false);

//function onDeviceReady() {
    // Cordova is now initialized. Have fun!

//    console.log('Running cordova-' + cordova.platformId + '@' + cordova.version);
//    document.getElementById('deviceready').classList.add('ready');
//}
//neu cordova libary la san sang (ready) thi goi vao function myfunction
var myDB = null;

$(document).ready(myDeviceReadyFunction);

function onCordovaDeviceInfo(){
    alert("available:" + device.available + "\n"
                        + "platform:" + device.platform + "\n"
                        + "version:" + device.version + "\n"
                        + "uuid:" + device.uuid + "\n"
                        + "cordova:" + device.cordova + "\n"
                        + "model:" + device.model + "\n"
                        + "manufacturer:" + device.manufacturer + "\n"
                        + "isVirtual:" + device.isVirtual + "\n"
                        + "serial:" + device.serial + "\n");
}
function isOnline(){
    alert("You are connected");
}
function isOffline(){
    alert("You are disconnected");
}

function onBodyLoad(){

}

function myDeviceReadyFunction(){
    //alert("Cordova library is loaded and ready to use");
    //document.getElementById("convert").addEventListener("click",convertclick);

    $("#addemp").click(addEmployeeClick);
    $("#viewemp").click(viewEmployeeClick);
    $("#searchemp").click(searchEmployeeClick);

    //window.addEventListener('load',onBodyLoad);
    //document.addEventListener("online",isOnline,false);
    //document.addEventListener("offline",isOffline,false);
    //alert(device);
    //myDB.transaction(mySQL,success,error);
}

function searchEmployeeClick(){
    var searchInput = $("#searchInput").val();
    tx.executeSql('SELECT * from Employee WHERE Employee MATCH searchInput',[],querySuccess,errorDB);
    $.mobile.navigate("#pageViewSearchEmployee");

}

function viewEmployeeClick(){
    $.mobile.navigate("#pageViewEmployee");
    //This is where we exec SELECT statement
    myDB = window.sqlitePlugin.openDatabase({
                            name: "MyDatabase",
                            location: "default",});
    myDB.transaction(queryDB,errorDB);

}
function queryDB(tx){
    tx.executeSql('SELECT * from Employee',[],querySuccess,errorDB);
}
function querySuccess(tx, results){
    alert("Select query successful" + results.rows.length);
    var len = results.rows.length;
    $("#lvEmployee").html("");
    for (var i = 0; i < len; i++){
        $("#lvEmployee").append('<li><a href="#"><img src="../_assets/img/album-bb.jpg"><h2>'+results.rows.item(i).firstname +" "+ results.rows.item(i).lastname+'</h2><p>'+results.rows.item(i).id+'</p></a></li>').listview('refresh');
        //$("#lvEmployee").append('<li><a href="#">'+results.rows.item(i).firstname+'</a></li>').listview('refresh');
    }

}
function errorDB(err){
    alert("Select query error for Employee table" + err);
}

function addEmployeeClick(){
    //navigator.notification.alert("You are about to convert",functionAfterAlertClosed,"Title");
    //navigator.notification.confirm("You are about to convert",functionAfterConfirmClosed,"Title",["Yes","No","Cancel"]);
    //g = document.getElementById("anyidforgallon").value;
    //navigator.notification.beep(2);
    myDB = window.sqlitePlugin.openDatabase({
                        name: "MyDatabase",
                        location: "default",});

    //myDB.executeSql('DROP TABLE IF EXISTS Employee');
    myDB.executeSql('CREATE TABLE Employee(id varchar, firstname varchar, lastname varchar)');
    //myDB.executeSql('INSERT INTO Employee(id,firstname,lastname) VALUES ("01","Thomas","Myer")');
    //myDB.transaction(transactionFunction, error, success);

    var empid = $("#empid").val();
    var firstname = $("#firstname").val();
    var lastname = $("#lastname").val();
    myDB.executeSql('INSERT INTO Employee(id,firstname,lastname) VALUES ("'+empid+'","'+firstname+'","'+lastname+'")');
    alert("Employee is added successfully:" + empid + firstname + lastname);
    $("#empid").val("");
    $("#firstname").val("");
    $("#lastname").val("");
}
function transactionFunction(tx){
    tx.executeSql('DROP TABLE IF EXISTS Product');
    tx.executeSql('CREATE TABLE Product(id varchar, productname varchar, price varchar)');
    tx.executeSql('INSERT INTO Product(id,productname,price) VALUES ("01","iPhone 15","800")');

}
function success(){
    alert("Transaction successful");
}
function error(er){
    alert("Transaction error" + er);
}

function functionAfterConfirmClosed(buttonIndex){
    alert("You have just closed the confirm dialog by clicking button " + buttonIndex);
}
function functionAfterAlertClosed(){
    alert("You have just closed the alert dialog");
}


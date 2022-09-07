//
document.getElementById('exampleModal').addEventListener('shown.bs.modal', function () {
    document.getElementById("offcanvasExample").style.visibility = "hidden";
});
document.getElementById('exampleModal').addEventListener('hidden.bs.modal', function () {
    document.getElementById("offcanvasExample").style.visibility = "visible";
    document.getElementById('offcanvasExample').classList.add("show");
});
//no DATE Before TODAY
var dtToday = new Date();
var month = dtToday.getMonth() + 1;
var day = dtToday.getDate();
var year = dtToday.getFullYear();
if (month < 10)
    month = '0' + month.toString();
if (day < 10)
    day = '0' + day.toString();
var maxDate = year + '-' + month + '-' + day;
$('#date').attr('min', maxDate);
$("#creDate").attr('min', maxDate);

/** loadPage */
function LoadFunc(){


    var xhttp = new XMLHttpRequest();
    var url = "http://localhost/Giskard/api/availabilities/read.php";
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var html = "";
            var json = this.responseText;
            console.log(json);
            var temp = JSON.parse(json);
            console.log();
            if (Object.hasOwn(temp, 'message')) {
                document.getElementById("dispDates").innerHTML = "<h1>Nothing At This Date</h1>";
            }
            else {
                // console.log("swi");
                var data = temp['data'];
                console.log(temp['data']);
                console.log(temp['data'][0]);
                console.log(temp['data'].length);
                html += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th>  <th>Manage</th> </tr>";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td><input id=\"s" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['start'] + "\" readonly/></td><td><input id=\"e" + data[i]["id"] + "\" readonly type=\"time\" value=\"" + data[i]['end'] + "\"  /> </td><td><input type=\"date\" id=\"d" + data[i]["id"] + "\" readonly value=\"" + data[i]['date'] + "\"/></td><td><button type=\"button\" class=\"btn btn-danger\" onclick=delAvFunc(" + data[i]['id'] + ") id=\"ba" + data[i]['id'] + "\">Delete</button></td>";
                    html += "</tr>";
                }
                html += "</table>"
                document.getElementById("dispDates").innerHTML = html;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();

        /*res */
        var xhttp2 = new XMLHttpRequest();
        var url2 = "http://localhost/Giskard/api/reservations/read.php";
        xhttp2.onreadystatechange = function () {
            if (this.readyState == 4 && this.status == 200) {
                var html2 = "";
                var json2 = this.responseText;
                console.log(json2);
                var temp2 = JSON.parse(json2);
                console.log();
                if (Object.hasOwn(temp2, 'message')) {
                    document.getElementById("dispRes").innerHTML = "<h1>Nothing At This Date</h1>";
                }
                else {
                    // console.log("swi");
                    var data2 = temp2['data'];
                    console.log(temp2['data']);
                    console.log(temp2['data'][0]['email']);
                    console.log(temp2['data'].length);
                    html2 += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th> <th>Email</th><th>Title</th> <th>Manage</th> </tr>";
                    for (var i = 0; i < data2.length; i++) {
                        html2 += "<tr>";
                        html2 += "<td><input id=\"s" + data2[i]["id"] + "\" type=\"time\" value=\"" + data2[i]['start'] + "\" readonly/></td><td><input id=\"e" + data2[i]["id"] + "\" type=\"time\" value=\"" + data2[i]['end'] + "\" readonly  /></td><td><input type=\"date\" id=\"d" + data2[i]["id"] + "\" readonly value=\"" + data2[i]['date'] + "\"/></td><td><input id=\"em" + data2[i]["id"] + "\" type=\"email\" id=\"email" + data2[i]['id'] + "\" readonly value=\"" + data2[i]['email'] + "\"\"/> </td><td><input type=\"text\" id=\"t" + data2[i]['id'] + "\"readOnly value=\"" + data2[i]['title'] + "\"/></td><td><button type=\"button\" class=\"btn btn-danger\" onclick=delResFunc(" + data2[i]['id'] + ") id=\"br" + data2[i]['id'] + "\">Delete</button></td>"; html2 += "</tr>";
                    }
                    html2 += "</table>"
                    document.getElementById("dispRes").innerHTML = html2;
                }
            }
        };
        xhttp2.open("GET", url2, true);
        xhttp2.send();
    
        /** */
}
/*read availavilities */
$('#date').change(function () {
    /** avail */
    var xhttp = new XMLHttpRequest();
    var url = "http://localhost/Giskard/api/availabilities/read";
    if ($('#date').val().length == 0) {
        url = url + ".php";
    } else {
        url = url + "Day.php?date=" + $('#date').val().toString();
    }
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var html = "";
            var json = this.responseText;
            console.log(json);
            var temp = JSON.parse(json);
            console.log();
            if (Object.hasOwn(temp, 'message')) {
                document.getElementById("dispDates").innerHTML = "<h1>Nothing At This Date</h1>";
            }
            else {
                // console.log("swi");
                var data = temp['data'];
                console.log(temp['data']);
                console.log(temp['data'][0]);
                console.log(temp['data'].length);
                html += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th>  <th>Manage</th> </tr>";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td><input id=\"s" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['start'] + "\" readonly/></td><td><input id=\"e" + data[i]["id"] + "\" readonly type=\"time\" value=\"" + data[i]['end'] + "\"  /> </td><td><input type=\"date\" id=\"d" + data[i]["id"] + "\" readonly value=\"" + data[i]['date'] + "\"/></td><td><button type=\"button\" class=\"btn btn-danger\" onclick=delAvFunc(" + data[i]['id'] + ") id=\"ba" + data[i]['id'] + "\">Delete</button></td>";
                    html += "</tr>";
                }
                html += "</table>"
                document.getElementById("dispDates").innerHTML = html;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();


    /*res */
    var xhttp2 = new XMLHttpRequest();
    var url2 = "http://localhost/Giskard/api/reservations/read";
    if ($('#date').val().length == 0) {
        url2 = url2 + ".php";
    } else {
        url2 = url2 + "Day.php?date=" + $('#date').val().toString();
    }
    xhttp2.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var html2 = "";
            var json2 = this.responseText;
            console.log(json2);
            var temp2 = JSON.parse(json2);
            console.log();
            if (Object.hasOwn(temp2, 'message')) {
                document.getElementById("dispRes").innerHTML = "<h1>Nothing At This Date</h1>";
            }
            else {
                // console.log("swi");
                var data2 = temp2['data'];
                console.log(temp2['data']);
                console.log(temp2['data'][0]['email']);
                console.log(temp2['data'].length);
                html2 += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th> <th>Email</th><th>Title</th> <th>Manage</th> </tr>";
                for (var i = 0; i < data2.length; i++) {
                    html2 += "<tr>";
                    html2 += "<td><input id=\"s" + data2[i]["id"] + "\" type=\"time\" value=\"" + data2[i]['start'] + "\" readonly/></td><td><input id=\"e" + data2[i]["id"] + "\" type=\"time\" value=\"" + data2[i]['end'] + "\" readonly  /></td><td><input type=\"date\" id=\"d" + data2[i]["id"] + "\" readonly value=\"" + data2[i]['date'] + "\"/></td><td><input id=\"em" + data2[i]["id"] + "\" type=\"email\" id=\"email" + data2[i]['id'] + "\" readonly value=\"" + data2[i]['email'] + "\"\"/> </td><td><input type=\"text\" id=\"t" + data2[i]['id'] + "\"readOnly value=\"" + data2[i]['title'] + "\"/></td><td><button type=\"button\" class=\"btn btn-danger\" onclick=delResFunc(" + data2[i]['id'] + ") id=\"br" + data2[i]['id'] + "\">Delete</button></td>"; html2 += "</tr>";
                }
                html2 += "</table>"
                document.getElementById("dispRes").innerHTML = html2;
            }
        }
    };
    xhttp2.open("GET", url2, true);
    xhttp2.send();

    /** */
});




function delAvFunc(x) {
    var myJson = {};
    myJson['id'] = x;
    var test = JSON.stringify(myJson);
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var butt = document.getElementById("ba" + x).parentNode.parentNode;

            var json = this.responseText;
            console.log(myJson);
            console.log(xHttp.responseText);
            console.log(json);
            var temp = JSON.parse(json);
            if (temp['message'] == "Deleted") {
                /*Delete */
                alert("Deleted");
                butt.parentNode.removeChild(butt);

            } else {
                alert("error");
            }

        }
    }
    xHttp.open("POST", "http://localhost/Giskard/api/availabilities/delete.php", true); // false for synchronous request
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xHttp.send(test);
}
function delResFunc(x) {
    var myJson = {};
    myJson['id'] = x;
    var test = JSON.stringify(myJson);
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var butt = document.getElementById("br" + x).parentNode.parentNode;
            var json = this.responseText;
            console.log(myJson);
            console.log(xHttp.responseText);
            console.log(json);
            var temp = JSON.parse(json);
            if (temp['message'] == "Deleted") {
                /*Delete */
                alert("Deleted");
                butt.parentNode.removeChild(butt);
            } else {
                alert("error");
            }

        }
    }
    xHttp.open("POST", "http://localhost/Giskard/api/reservations/deleteIndex.php", true); // false for synchronous request
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xHttp.send(test);
}


function CreAvFunc() {
    var d = document.getElementById("creDate").value;
    var s = document.getElementById("creSTime").value;
    var e = document.getElementById("creETime").value;
    if (d == "" || s == "" || e == "") {
        alert("enter ALL");
    } else {
        if (e <= s) {
            alert("Ending Time should be Greater than Starting time")
        } else {
            var myJson = {};
            myJson['start'] = s;
            myJson['end'] = e;
            myJson['date'] = d;
            var test = JSON.stringify(myJson);
            console.log(test);
            console.log(myJson);
            //
            var xHttp = new XMLHttpRequest();
            xHttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    var json = this.responseText;
                    console.log(myJson);
                    console.log(xHttp.responseText);
                    console.log(json);
                     var temp =JSON.parse(json);
                    if(temp['message']=="Created"){
                        /*Delete */
                        alert("Created Successfully");
                        document.getElementById("btn-close").click();
                    }else{
                      if(temp['message']=="Conflict"){
                        alert("There is a scheduling conflict")
                      }else{
                        alert("Error");
                      }
                    }
        
                }
            }
            xHttp.open("POST", "http://localhost/Giskard/api/availabilities/create.php", true); // false for synchronous request
            xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xHttp.send(test);
            //
        }
    }

}
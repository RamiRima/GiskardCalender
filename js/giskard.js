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
                html += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th> <th>Email</th><th>Title</th> <th>Reserve</th> </tr>";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td><input id=\"s" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['start'] + "\" readonly/></td><td><input id=\"e" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['end'] + "\"  /> <input id=\"h" + data[i]["id"] + "\" type=\"hidden\" value=\"" + data[i]['end'] + "\" /></td><td><input type=\"date\" id=\"d" + data[i]["id"] + "\" readonly value=\"" + data[i]['date'] + "\"/></td><td><input id=\"em" + data[i]["id"] + "\" type=\"email\" id=\"email" + data[i]['id'] + "\"/> </td><td><input type=\"text\" id=\"t" + data[i]['id'] + "\"/></td><td><button type=\"button\" class=\"btn btn-primary\" onclick=ReserveFunc(" + data[i]['id'] + ") id=\"b"+data[i]['id']+"\">Reserve</button></td>";
                    html += "</tr>";
                }
                html += "</table>"
                document.getElementById("dispDates").innerHTML = html;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
}
/*read availavilities */
$('#date').change(function () {
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
                var forms = "";
                console.log(temp['data']);
                console.log(temp['data'][0]);
                console.log(temp['data'].length);
                html += "<table id=\"tableAv\" class=\"table\"> <tr> <th>Start</th> <th>End</th> <th>Date</th> <th>Email</th><th>Title</th> <th>Reserve</th> </tr>";
                for (var i = 0; i < data.length; i++) {
                    html += "<tr>";
                    html += "<td><input id=\"s" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['start'] + "\" readonly/></td><td><input id=\"e" + data[i]["id"] + "\" type=\"time\" value=\"" + data[i]['end'] + "\"  /> <input id=\"h" + data[i]["id"] + "\" type=\"hidden\" value=\"" + data[i]['end'] + "\" /></td><td><input type=\"date\" id=\"d" + data[i]["id"] + "\" readonly value=\"" + data[i]['date'] + "\"/></td><td><input id=\"em" + data[i]["id"] + "\" type=\"email\" id=\"email" + data[i]['id'] + "\"/> </td><td><input type=\"text\" id=\"t" + data[i]['id'] + "\"/></td><td><button type=\"button\" class=\"btn btn-primary\" onclick=ReserveFunc(" + data[i]['id'] + ") id=\"b"+data[i]['id']+"\">Reserve</button></td>";
                    html += "</tr>";
                }
                html += "</table>"
                document.getElementById("dispDates").innerHTML = html;
            }
        }
    };
    xhttp.open("GET", url, true);
    xhttp.send();
});

/* create reservation */
function ReserveFunc(x) {
    var s = document.getElementById("s" + x.toString()).value;
    var e = document.getElementById("e" + x.toString()).value;
    var d = document.getElementById("d" + x.toString()).value;
    var h = document.getElementById("h" + x.toString()).value;
    var em = document.getElementById("em" + x.toString()).value;
    var t = document.getElementById("t" + x.toString()).value;
    var temp = document.getElementById("em" + x.toString()).value.toString();
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var bl = filter.test(temp)
    if (bl == false) {
        alert("Please enter a valid email ");
    }
    else {
        if (!(e > s && e <= h)) { alert("time shoud be between " + s + " and " + h); }
        else {
            if (t.length == 0) { alert("Enter Title") } else {
                /* creating reservation */

                var myJson = {};
                myJson['start'] = s;
                myJson['end'] = e;
                myJson['date'] = d;
                myJson['title'] = t;
                myJson['email'] = em;
                var test = JSON.stringify(myJson);
                var xHttp = new XMLHttpRequest();
                xHttp.onreadystatechange = function () {
                    if (this.readyState == 4 && this.status == 200) {
                        var json = this.responseText;
                        console.log(myJson);
                        console.log(xHttp.responseText);
                        var temp = JSON.parse(json);
                        if(temp['message']=="Created"){
                            alert("Created");
                            var butt=document.getElementById("b"+x.toString()).parentNode.parentNode;
                            butt.parentNode.removeChild(butt);
                            var myJson2 = {};
                            myJson2['id'] = x;
                            var test2 = JSON.stringify(myJson2);
                            var xHttp2=new XMLHttpRequest();
                            xHttp2.onreadystatechange = function () {
                                if (this.readyState == 4 && this.status == 200) {
                                    var json2 = this.responseText;
                                    console.log(myJson2);
                                    console.log(xHttp2.responseText);
                                    var temp2 = JSON.parse(json2);
                                    if(temp2['message']=="Deleted"){
                                        console.log("dele form av");
                                    }else{
                                        alert("An Error has Occured");
                                    }
                                }
                            }
                            xHttp2.open("POST", "http://localhost/Giskard/api/availabilities/delete.php", true); // false for synchronous request
                            xHttp2.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                            xHttp2.send(test2);

                        }else{
                            alert("An Error has Occured")
                        }

                    }
                }
                xHttp.open("POST", "http://localhost/Giskard/api/reservations/create.php", true); // false for synchronous request
                xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                xHttp.send(test);

            }
        }

    }
}

function DelResFunc(){
var de=document.getElementById("delEmail").value;
var dd=document.getElementById("delDate").value;
var dt=document.getElementById("delTime").value;

if(de.length==0 || dd.length==0 || dt.length==0){
    alert("All Fields Are Required");
}else{
    var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    var bl = filter.test(de)
    if(bl==false){alert("Enter A Valid Email")}
    else{
    //alert(de+dd+dt);
    var myJson = {};
    myJson['start'] = dt;
    myJson['email'] = de;
    myJson['date'] = dd;
    var test = JSON.stringify(myJson);
    var xHttp = new XMLHttpRequest();
    xHttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var json = this.responseText;
            console.log(myJson);
            console.log(xHttp.responseText);
            console.log(json);
             var temp =JSON.parse(json);
            if(temp['message']=="Deleted"){
                /*Delete */
                alert("Deleted");
                document.getElementById("btn-close").click();
            }else{
               if(temp['message']=="Not Yours")alert("Not Yours To Delete");
               else alert("Error");
            }

        }
    }
    xHttp.open("POST", "http://localhost/Giskard/api/reservations/delete.php", true); // false for synchronous request
    xHttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    xHttp.send(test);
    }
}
}

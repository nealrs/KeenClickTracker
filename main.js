/*
  Keen.io API keys & project variables. maybe move these to env / seperate file?

  rk - read key
  wk - write key
  pr - project id
  col - event collection
*/

var rk = "";
var wk = "";
var pr = "";
var col = "";

// main functions
function payload(d){
  d = d.replace(/^[,\s]+|[,\s]+$/g, '');
  d = d.replace(/\s*,\s*/g, ',');

  try {
    o = JSON.parse('{'+d+'}');
  } catch(err) { alert("there is an error in the data field"); }

  e = {
    "keen" : {
      "addons" : [
        {
            "name" : "keen:ua_parser",
            "input" : {
                "ua_string" : "user_agent"
            },
            "output" : "parsed_user_agent"
        },
        {
            "name" : "keen:ip_to_geo",
            "input" : {
                "ip" : "ip_address"
            },
            "output" : "ip_geo_info"
        }
      ]
    },
    "ip_address" : "${keen.ip}",
    "user_agent" : "${keen.user_agent}",
    "link" :document.getElementById("r").value
  };

  for (var key in o) {
    if (o.hasOwnProperty(key)) {
      e[key] = o[key];
    }
  }

  e = window.btoa(JSON.stringify(e));
  return e;
}

function process(){
  c = col;

  if (document.getElementById('t').checked){
    c="TEST";
  }

  d = document.getElementById("d").value;
  e = payload(d);
  console.log(e);

  r = encodeURIComponent(document.getElementById("r").value);

  bu = "https://api.keen.io/3.0/projects/"+pr+"/events/"+c+"?api_key="+wk+"&data="+e;

  if (!r){
    ru = "no redirect URL provided";
    document.getElementById("output").innerHTML = "<span class='warn'>No link specified</span>";
  } else {
      ru = "https://api.keen.io/3.0/projects/"+pr+"/events/"+c+"?api_key="+wk+"&data="+e+"&redirect="+r;

      document.getElementById("output").innerHTML = "Use, but don't click, this link:<br><a href='"+ru+"' class='indent'>"+ru+"</a>";

    }

}

function showReport(){
  var table = document.getElementById('tbody');
  table.innerHTML="";

  var client = new Keen({
    projectId: pr,
    readKey: rk
  });

  Keen.ready(function(){
    var data = new Keen.Query('extraction', {
      eventCollection: col, //bk_email
      propertyNames:["keen.timestamp", "link", "ip_geo_info.province", "ip_geo_info.country", "ip_address"]
    });

    client.run(data, function(r){
      //console.log(r.result);

      for (var i = 0, l = r.result.length; i < l; i++) {
        var time = new Date(r.result[i].keen.timestamp).toLocaleString("en-US", {hour12: false});
        var link = r.result[i].link;
        var ip = r.result[i].ip_address;
        var location = r.result[i].ip_geo_info.province+", "+ r.result[i].ip_geo_info.country;
        //console.log(time, link, location, ip);

        var row = document.createElement('tr');
        row.className = "track_row";
        row.innerHTML="<td>"+time+"</td><td><a href='"+link+"'>"+link+"</a></td><td>"+location+"</td><td>"+ip+"</td>";
        table.appendChild(row);
      }
    });
  });
}

$(document).ready(function() {
    getDistricts();
    
});
function getDistricts() {

    var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    var dfr = $.Deferred();
    $.ajax({
        //type: 'GET',
        url: url,
        //contentType: "application/json",
      
        dataType: 'jsonp',
        success: dfr.resolve,
        error: dfr.reject
        
    }); 

}
function getDistricts2() {
   var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    $.ajax({
        url: url,
        dataType: 'jsonp',
        success: function(data){return data;},
        error  : function(e){console.log("fail......");}
    }).then(function(response){
        alert(response.data);
    }).fail(function(e){
        console.log("failed.");
    });
}
    

function getDistricts1() {

    var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    var dfr = $.Deferred();
    $.ajax({
        //type: 'GET',
        url: url,
        //contentType: "application/json",
      
        dataType: 'jsonp',
        success: dfr.resolve,
        error: dfr.reject
        
    }).then(processDistrictsData)
      .fail(console.log("failed")); 

}

function processDistrictsData(response){
    alert(response.data);
}


function getDistricts() {
     var d = $.Deferred();
    var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        //jsonp: "callback",
        dataType: 'jsonp',
        success: function(data){return data;}
        
    }).then(function(p){
        d.resolve(p);
    }).fail(d.reject); 
    return d.promise();
}


function getDistricts() {
     var d = $.Deferred();
    var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        //jsonp: "callback",
        dataType: 'jsonp',
        processData: false,
        success: d.resolve,
        error: d.reject
    });
    return d.promise();
}

$.ajax({
    url: 'public.json',
    dataType: 'json',
    success: function(data) {
        var $tr =$('<tr>').addClass('header');
        $.each(data.headers, function(i,header){
            $tr.append($('<th>').append($('a').addClass('sort').attr('href','#').append($('span').text(header))));
        });
        $tr.appendTo('table.data');
        $.each(data.rows,function(i,row){
            $('<tr>').attr('id',i).
                append($('<td>').text(row.date)).
                append($('<td>').text(row.company)).
                append($('<td>').text(row.location)).appendTo('table.data');
        });
    }
});
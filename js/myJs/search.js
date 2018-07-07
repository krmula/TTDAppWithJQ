$(document).ready(function() {
    getDistricts();
    var distId,manId,villageId,catId;
    
    $('#district').change(function(){
        distId =  $(this).val();
        getMondals(distId);
    });
    
    $('#mandal').change(function(){
        manId =  $(this).val();
        getVillages(distId,manId);
    });
    
    $('#village').change(function(){
        villageId =  $(this).val();
    });
    
    $('#category1').change(function(){
        catId =  $(this).val();
       
    });
    
    $('#searchAllDataId').click(function(){
        if(distId != null && manId != null && villageId != null && catId != null){
            searchAll(distId,manId,villageId,catId);
        }
    });
});

function searchAll(distId,manId,vId,catId) {

    var url = 'http://localhost:8888/restSpring/villages/searchCategoryId';
    var dfr = $.Deferred();
    $('#dynatablesearch').empty();
    $.ajax({
        type: 'GET',
        url: url,
       // contentType: "application/json",
        data: { category: catId,distId: distId ,mandalId: manId,villageId: vId },
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
       //console.log(data.data);
        var seaData = data.data;//jQuery.parseJSON(data.data);
        $.each(seaData,function(i,d){
            var row = "<tr>" + "<td>" + d.category + "</td>"+ "<td>" + d.associationName +"</td>" 
                    + "<td>" + d.templeName + "</td>"+ "<td>" + d.name + "</td>" 
                    + "<td>" + d.designation + "</td>"+ "<td>" + d.phone + "</td>" 
                    + "<td>" + d.email + "</td>" + "</tr>";
            $('#dynatablesearch').append(row);
        });
        /*for (var v in seaData) {
            var row = "<tr>" + "<td>" + seaData[v].category + "</td>"+ "<td>" + seaData[v].associationName +"</td>" 
                    + "<td>" + seaData[v].templeName + "</td>"+ "<td>" + seaData[v].name + 
                    + "<td>" + seaData[v].designation + "</td>"+ "<td>" + seaData[v].phone + 
                    + "<td>" + seaData[v].email + "</td>" + "</tr>";
            $('#searchDataId').append(row);
        }*/
    }).fail(function(e){console.log("failed...");}); 

}

function getVillages(distId,manId) {

    var url = 'http://localhost:8888/restSpring/villages/allVillages';
    var dfr = $.Deferred();
    $('#village').empty();
    var opt = "<option value='" + '0' + "'>" + 'Select Village' + "</option>";
    $('#village').append(opt);
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        data: { districtId: distId ,mandalId: manId},
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var vill = data.data;//jQuery.parseJSON(data.data);
        for (var v in vill) {
            var opt = "<option value='" + vill[v].villageId + "'>" + vill[v].villageName + "</option>";
            $('#village').append(opt);
        }
    }).fail(function(e){console.log("failed...");}); 

}

function getMondals(distId) {

    var url = 'http://localhost:8888/restSpring/villages/allMandals';
    var dfr = $.Deferred();
    $('#mandal').empty();
    var opt = "<option value='" + '0' + "'>" + 'Select Mandal' + "</option>";
    $('#mandal').append(opt);
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        data: { districtId: distId },
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var man = data.data;//jQuery.parseJSON(data.data);
        for (var m in man) {
            var opt = "<option value='" + man[m].mandalId + "'>" + man[m].mandalName + "</option>";
            $('#mandal').append(opt);
        }
    }).fail(function(e){console.log("failed...");}); 

}

function getDistricts() {

    var url = 'http://localhost:8888/restSpring/villages/allDistricts';
    var dfr = $.Deferred();
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        $('#district').empty();
        var opt = "<option value='" + '0' + "'>" + 'Select District' + "</option>";
        $('#district').append(opt);
        var dist = data.data;//jQuery.parseJSON(data.data);
        for (var d in dist) {
            opt = "<option value='" + dist[d].distId + "'>" + dist[d].distName + "</option>";
            $('#district').append(opt);
            //console.log("id.." + dist[d].distId);
        }
    }).fail(function(e){console.log("failed...");}); 

}

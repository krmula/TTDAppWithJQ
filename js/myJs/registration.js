$(document).ready(function() {
    getDistricts();
    var distId,manId,villageId,catId,templeName;
    
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
        getTemples(distId,manId,villageId,catId);
    });
    
    $('#temple').change(function(){
        templeName =  $(this).val();
        
    });
    
    $('#register').click(function(){
        if(distId != null && manId != null && villageId != null && catId != null){
            if(typeof templeName === "undefined" || templeName === null || templeName === '' || templeName === '0'){
                templeName = $('#templeName').val();
            }
            register(distId,manId,villageId,catId,templeName);
        }
    });
});

function register(distId,manId,vId,catId,tn) {

    var url = 'http://localhost:8888/restSpring/managudiUsers/createOrUpdateUsersForNG';
    var dfr = $.Deferred();
    $.ajax({
        type: 'POST',
        url: url,
       // contentType: "application/json",
        data: { id:'0', category: catId,distId: distId, mandalId: manId, 
         villageId: vId, templeName:tn,name:$('#name').val(),email:$('#email').val(),phone:$('#phone').val() },
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
       console.log(data.data);
        var seaData = data.data;//jQuery.parseJSON(data.data);
                
    }).fail(function(e){console.log("failed...");}); 

}

function getTemples(distId,manId,villId,selCat) {

    var url = 'http://localhost:8888/restSpring/villages/searchCategoryId';
    var dfr = $.Deferred();
    $('#temple').empty();
    var opt = "<option value='" + '0' + "'>" + 'Do not exist temple'+ "</option>";
    $('#temple').append(opt);
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        data: { distId: distId, mandalId: manId, villageId: villId, category: selCat},
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var temp = data.data;//jQuery.parseJSON(data.data);
        for (var t in temp) {
            var opt = "<option value='" + temp[t].id + "'>" + temp[t].templeName + "</option>";
            $('#temple').append(opt);
        }
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




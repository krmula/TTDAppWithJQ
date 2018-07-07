$(document).ready(function(){
    var totalRecords;
    getAllUsers(totalRecords);
    getDistricts();
    var distId,manId,villageId,catId,id,category,dName,mName,vName,tName,name,phone,email;
    
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
    
    $('#deleteId').click(function(){
        //getFormValues();
        deleteUser(id,category,dName,mName,vName,phone);
        $('#templeName').val('');
        $('#name').val('');
        $('#phone').val('');
        $('#email').val('');
        getAllUsers();
    });
    
    $('#approveId').click(function(){
       //getFormValues();
       tName = $('#templeName').val();
        name = $('#name').val();
        phone = $('#phone').val();
        email = $('#email').val();
       approveUser(id,category,dName,mName,vName,tName,name,email,phone);
       $('#templeName').val('');
       $('#name').val('');
       $('#phone').val('');
       $('#email').val('');
       getAllUsers();
    });
    
    $('#editId').click(function(){
       //getFormValues();
       tName = $('#templeName').val();
        name = $('#name').val();
        phone = $('#phone').val();
        email = $('#email').val();
       editTempleInfo(id,category,dName, mName, vName, tName,name,email,phone);
       $('#templeName').val('');
       $('#name').val('');
       $('#phone').val('');
       $('#email').val('');
       getAllUsers();
    });
    
    $("#userData").on("click", "tr", function(e) {
        id = $(this).attr('id');
        category = $(this).attr('category');
        dName = $(this).attr('distName');
        mName = $(this).attr('mandalName');
        vName = $(this).attr('villageName');
        $("#district option").each(function (a, b) {
            if ($(this).html() == dName ){
                $(this).attr("selected", "selected");
                distId = $(this).val();
                getMondals(distId,mName,vName);
            }
        });
        $("#category option").each(function (a, b) {
            if ($(this).html() == category ){
                $(this).attr("selected", "selected");
            }
        });
        
        /*$("#mandal option").each(function (a, b) {
            if ($(this).html() == mName ){
                $(this).attr("selected", "selected");
                manId = $(this).val();
                getVillages(distId,manId);
            }
            
        });*/
        
        tName = $(this).attr('templeName');
        $('#templeName').val(tName);
        name = $(this).attr('name');
        $('#name').val(name);
        phone = $(this).attr('phone');
        $('#phone').val(phone);
        email = $(this).attr('email');
        $('#email').val(email);
    });
    
    $('#smart-paginator').smartpaginator(
        { 
            totalrecords: totalRecords, 
            recordsperpage: 5, 
            initval:0 , 
            next: 'Next', 
            prev: 'Prev', 
            first: 'First', 
            last: 'Last', 
            theme: 'green', 
            onchange: onChange

    });

    function onChange(newPageValue) {
        alert(newPageValue);
    }
    
});
function getFormValues(){
    //id = $(this).attr('id');
    /*category = $('#category').val();
    dName = $('#district').val();
    mName = $('#mandal').val();
    vName = $('#village').val();*/
    tName = $('#templeName').val();
    name = $('#name').val();
    phone = $('#phone').val();
    email = $('#email').val();
}
function editTempleInfo(id,selCat,distId, mandId, villId, selTemple,name,email,phone){
    var url = 'http://localhost:8888/restSpring/managudiUsers/createOrUpdateUsers';
    var dfr = $.Deferred();
    
    $.ajax({
        type: 'POST',
        url: url,
        data: { id:id, catName: selCat,distName: distId, mandalName: mandId, 
                        villageName: villId, templeName:selTemple,name:name,email:email,phone:phone},
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var user = data.data;//jQuery.parseJSON(data.data);
        
    }).fail(function(e){console.log("failed...");}); 
}

function approveUser(id,catName,distName,mandalName,villageName,templeName,name,email,phone){
    var url = 'http://localhost:8888/restSpring/managudiUsers/approveUser';
    var dfr = $.Deferred();
    
    $.ajax({
        type: 'POST',
        url: url,
        data: { id:id,catName:catName,
                        distName:distName,mandalName:mandalName,
                        villageName:villageName,templeName:templeName,
                        name:name,email:email,phone:phone},
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var user = data.data;//jQuery.parseJSON(data.data);
        
    }).fail(function(e){console.log("failed...");}); 
}

function deleteUser(id,catName,distName,mandalName,villageName,phone){
    var url = 'http://localhost:8888/restSpring/managudiUsers/deleteUser';
    var dfr = $.Deferred();
    
    $.ajax({
        type: 'POST',
        url: url,
        data: { id:id,catName:catName,
                        distName:distName,mandalName:mandalName,
                        villageName:villageName,phone:phone},
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var user = data.data;//jQuery.parseJSON(data.data);
        
    }).fail(function(e){console.log("failed...");}); 
}
function getAllUsers(totalRecords) {

    var url = 'http://localhost:8888/restSpring/managudiUsers/findAllUsers';
    var dfr = $.Deferred();

    $('#dynabody').empty();
    $.ajax({
        type: 'GET',
        url: url,
        contentType: "application/json",
        dataType: 'json',
        success: dfr.resolve,
        error: dfr.reject
        
    }).done(function(data){
        //console.log(data.data);
        var users = data.data;//jQuery.parseJSON(data.data);
         $.each(users,function(i,d){
            totalRecords++;
            var row = "<tr id=" + d.id +" " +"category="+d.category+ " " +
                     "distName="+d.distName+" " +
                     "mandalName="+d.mandalName+" " +
                     "villageName='"+d.villageName+"' "+
                     "templeName='"+d.templeName+"' "+
                     "name='"+d.name+"' "+
                     "phone="+d.phone+" "+
                     "email="+d.email+" "+
                     ">" 
                    + "<td>" + d.category + "</td>"
                    + "<td>" + d.distName +"</td>" 
                    + "<td>" + d.mandalName + "</td>"
                    + "<td>" + d.villageName + "</td>" 
                    + "<td>" + d.templeName + "</td>"
                    + "<td>" + d.name + "</td>" 
                    + "<td>" + d.phone + "</td>" 
                    + "<td>" + d.email + "</td>" + "</tr>";
            $('#dynabody').append(row);
        });
    }).fail(function(e){console.log("failed...");}); 

}

function getVillages(distId,manId,vName) {

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
            if(vill[v].villageName === vName){
                opt = "<option value=" +"' vill[v].villageId '" +' selected="selected"'+ ">" + vill[v].villageName + "</option>";
               
            }else{
                var opt = "<option value='" + vill[v].villageId + "'>" + vill[v].villageName + "</option>";
            }
            $('#village').append(opt);
        }
    }).fail(function(e){console.log("failed...");}); 

}

function getMondals(distId,mName,vName) {

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
        var opt;
        for (var m in man) {
            if(man[m].mandalName === mName){
                opt = "<option value=" +"' man[m].mandalId '" +' selected="selected"'+ ">" + man[m].mandalName + "</option>";
                getVillages(distId,man[m].mandalId,vName);
            }else{
                opt = "<option value='" + man[m].mandalId + "'>" + man[m].mandalName + "</option>";
            }
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
        var opt = "<option value='" + 0 + "'>" + 'Select District' + "</option>";
        $('#district').append(opt);
        var dist = data.data;//jQuery.parseJSON(data.data);
        for (var d in dist) {
            opt = "<option value='" + dist[d].distId + "'>" + dist[d].distName + "</option>";
            $('#district').append(opt);
            //console.log("id.." + dist[d].distId);
        }
    }).fail(function(e){console.log("failed...");}); 

}



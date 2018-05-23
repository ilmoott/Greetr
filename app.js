var g = G$('Ilmo','Ott');

$('#login').click(function(){
    
    var loginGrtr = G$('John','Doe');
    
    $('#logindiv').hide();
    
    loginGrtr.setLang($('#lang').val()).HTMLgreeting('.greeting',true).log();
})
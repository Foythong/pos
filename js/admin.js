$(function() {
    sidebarPage();
})

function sidebarPage (){
    $('.sidebar').click(function(){
            prg_1 = "admin/"+$(this)[0].id + ".html";
            
            $('#Showmain-body').load(prg_1);
        });
}


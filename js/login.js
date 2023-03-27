$(function () {
    $("form#formUser").submit(function (e) {
        e.preventDefault();
        $.post('php/login.php', {
            act: 'login',
            Username: $("#Username").val(),
            Pass: $("#Pass").val()
        }, function (data) {
            var json = JSON.parse(data)
            if (json.status == 1) {
                users = JSON.parse(getCookie("User"));
                console.log(users);
                if(users.memType == "admin"){
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ admin',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "admin/admin.html";
                           
                    }
                });
                  
                }else{
                    Swal.fire({
                        icon: 'success',
                        title: 'เข้าสู่ระบบ POS',
                    }).then((result) => {
                        if (result.isConfirmed) {
                            window.location.href = "pos/pos_demo.html";
                    }
                });
                }
                
            } else {     
                Swal.fire({
                    icon: 'error',
                    text: 'ไม่พบผู้ใช้งาน',
                    timer: 1500
                })
            }
            }  
        )
        })
    })


var imgData;
function user(){
    if(getCookie("User")){
        users = JSON.parse(getCookie("User"));
        $("#userAdminName").html(users.username);
        // $("#userAdmin").htnl(users.User);
        imgData = "../php/assets/uploadmem/" + users.userimg
        document.getElementById("myImg").src = imgData;
        return imgData;
    }else{
        window.location.href = "../index.html";
    }
   
}




function logoutPOS(){
    Swal.fire({
        title: 'คุณต้องการออกจากระบบหรือไม่?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        setTimeout: 2000,
    }).then((result) => {
        if (result.isConfirmed) {
            setCookie("User","",0);
            location.reload(true);
    }
});
}

// function backLogin(){
//     let reload = getCookie("admin.html");
//     if (reload != "") {
//        
// }



function getCookie(cname) {
    let name = cname + "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
        let c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
function setCookie(cname, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}
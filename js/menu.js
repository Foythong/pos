var prg = "../php/menu.php";
var thisIMG;

$(function () {
    $("form#menuForm").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append("act", "add_menu");

        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                r = JSON.parse(response);
                // console.log(row);
                if (r.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        text: 'บันทึกข้อมูลสำเร็จ',
                        timer: 3000
                    });
                    // window.location.reload();
                    refresh_menu()
                } else {
                    Swal.fire({
                        icon: 'error',
                        text: 'บันทึกข้อมูลไม่สำเร็จ'
                    });
                }
            }
        });
    });
});

$(function () {
    $("form#menu_form").submit(function (e) {     
        e.preventDefault();

        var formdata = new FormData(this);
        formdata.append("act", "edit_menu");
        formdata.append("img", thisIMG);
        formdata.append("id", $('#menu_id').val());
        formdata.append("menuType", $('#EmenuType').val());
        formdata.append("menuName", $('#EmenuName').val());
        formdata.append("Price", $('#EPrice').val());
        user();
        $.ajax({
            url: prg,
            type: 'POST',
            data: formdata,
            success: function (res) {
                data = JSON.parse(res); 
                console.log(data);
                if (data.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        title: 'อัพเดทข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1000
                    })
                    refresh_table()
                    $('#MenuModal').modal('hide');
                    
                }     
            },
            cache: false,
            contentType: false,
            processData: false,
        })
        // return false;
    })
})



function showEdit(id) {
    var modalTitle = MenuModal.querySelector('.modal-title')
    modalTitle.textContent = 'แก้ไขข้อมูลไอดี: ' + id
    $('#menu_id').val(id);

    $.ajax({
        url: prg,
        method: "POST",
        data: { act: "select", id: id },
        success: function (data) {
            var row = JSON.parse(data);
            $("#EmenuType").val(row[0].menuType);
            $("#EmenuName").val(row[0].menuName);
            $("#EPrice").val(row[0].Price);
            $("#showImageModal").attr("src", "../php/assets/uploadfood/" + row[0].imgMenu + "");
        }
    })
}


function deleteRow(id) {
    Swal.fire({
        title: 'คุณต้องการลบข้อมูล?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'ตกลง',
        cancelButtonText: 'ยกเลิก',
        setTimeout: 2000,
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire({
                title: 'ลบข้อมูลสำเร็จ',
                icon: 'success',
                confirmButtonColor: '#262626',
                setTimeout: 2000,
            })
            $.ajax({
                url: prg,
                method: "POST",
                data: { act: "delete", id: id },
                success: function () {
                     location.reload();
                    // refresh_table()
                }
            })
        }
    })
}


function menuImg(event) {
    showImage.src = URL.createObjectURL(event.target.files[0]);
}


function editImage(event) {
    thisIMG = event.target.files[0];
    showImageModal.src = URL.createObjectURL(event.target.files[0]);
}

function refresh_menu() {
    page = "../admin/menu.html";
    $('#Showmain-body').load(page);
}

function refresh_table() {
    page = "../admin/menu.html";
    $('#Showmain-body').load(page);
}

// function refresh() {
//     setTimeout(function () {
//         location.reload()
//     }, 1000);
// }






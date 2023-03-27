var prg = "../php/mem.php";
var thisIMG;
$(function () {
    $("form#formMember").submit(function (e) {
        e.preventDefault();
        var formData = new FormData(this);
        formData.append("act", "add_mem");

        $.ajax({
            type: "POST",
            url: prg,
            data: formData,
            processData: false,
            contentType: false,
            success: function (response) {
                console.log(response);
                row = JSON.parse(response);
                if (row.status == 1) {
                    Swal.fire({
                        icon: 'success',
                        text: 'บันทึกข้อมูลสำเร็จ'
                    });
                    refresh_table();
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
    $("form#form_member").submit(function (e) {
        e.preventDefault();

        var formdata = new FormData(this);
        formdata.append("act", "edit_mem");
        formdata.append("img", thisIMG);
        formdata.append("id", $('#mem_id').val());
        formdata.append("Fname", $('#EditFname').val());
        formdata.append("Lname", $('#EditLname').val());
        formdata.append("Phone", $('#EditPhone').val());

        $.ajax({
            url: prg,
            type: 'POST',
            data: formdata,
            success: function (res) {
                console.log(res);
                data = JSON.parse(res);
                if (data.status == 1){
                    Swal.fire({
                        icon: 'success',
                        title: 'อัพเดทข้อมูลสำเร็จ',
                        showConfirmButton: false,
                        timer: 1500
                      })
                      $('#memModal').modal('hide');
                      refresh_table();
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
    var modalTitle = memModal.querySelector('.modal-title')
    modalTitle.textContent = 'แก้ไขข้อมูลไอดี: ' + id
    $('#mem_id').val(id);

    $.ajax({
        url: prg,
        method: "POST",
        data: { act: "select", id: id },
        success: function (data) {
            var row = JSON.parse(data);
            $("#EditFname").val(row[0].Fname);
            $("#EditLname").val(row[0].Lname);
            $("#EditPhone").val(row[0].Phone);
            $("#showImageModel").attr("src",  "../php/assets/uploadmem/"  + row[0].Images + "");
        }
    })
}

function delRow(id) {
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
                data: { act: "del", id: id },
                success: function (data) {
                    console.log(data);
                    refresh_table();
                }
            })
        }
    })
}



function memImg(event) {
    console.log(event);
    showImage.src = URL.createObjectURL(event.target.files[0]);
}

function memEdit(event) {
    thisIMG = event.target.files[0]
    showImageModel.src = URL.createObjectURL(event.target.files[0]);
}

function refresh_menu() {
    page = "../admin/tableform.html";
    $('#Showmain-body').load(page);
}

function refresh_table() {
    page = "../admin/tableform.html";
    $('#Showmain-body').load(page);
}

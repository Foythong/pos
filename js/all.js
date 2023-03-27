var array;

$(function() {    
    var formData = JSON.stringify({ act: "all_menu" });

    $.ajax({
        url: "../php/sumOrder.php",
        type: "post",
        data: formData,
        async: false,         
        success: function (res) {
            console.log(res);
            array = JSON.parse(res);
            console.log(array);
            $.each(array.data, function (idx, value) {
                $("#all_Menu").append(
                    "<p>" + value.allMenu +"</p>"
                );
            })
        },
        cache: false,
        contentType: false,
        processData: false,
    })
});

$(function() {    
    var formData = JSON.stringify({ act: "all_admin" });

    $.ajax({
        url: "../php/sumOrder.php",
        type: "post",
        data: formData,
        async: false,         
        success: function (res) {
            console.log(res);
            array = JSON.parse(res);
            console.log(array);
            $.each(array.data, function (idx, value) {
                $("#admin").append(
                    "<p>" + value.all_Admin +"</p>"
                );
            })
        },
        cache: false,
        contentType: false,
        processData: false,
    })
});

$(function() {    
    var formData = JSON.stringify({ act: "all_memBer" });

    $.ajax({
        url: "../php/sumOrder.php",
        type: "post",
        data: formData,
        async: false,         
        success: function (res) {
            console.log(res);
            array = JSON.parse(res);
            console.log(array);
            $.each(array.data, function (idx, value) {
                $("#memBer").append(
                    "<p>" + value.all_mem +"</p>"
                );
            })
        },
        cache: false,
        contentType: false,
        processData: false,
    })
});

$(function() {    
    var formData = JSON.stringify({ act: "all_order" });

    $.ajax({
        url: "../php/sumOrder.php",
        type: "post",
        data: formData,
        async: false,         
        success: function (res) {
            console.log(res);
            array = JSON.parse(res);
            console.log(array);
            $.each(array.data, function (idx, value) {
                $("#all_sum").append(
                    "<p>" + value.today_sum +"</p>"
                );
            })
        },
        cache: false,
        contentType: false,
        processData: false,
    })
});

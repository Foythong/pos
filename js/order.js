var array;
var sum = 0;
$.ajax({
    url: "../php/order.php",
    type: "post",
    async: false,  // กำหนดให้ ajax รอให้ดึงข้อมูลสำเร็จก่อนคอยทำฟังชั่นตัวต่อไป
    success: function (res) {
        array = JSON.parse(res);
        console.log(array);
        console.log(array.data);
        return array;
    },
    // ไม่นำเอาข้อมูลลง cache เพื่อปกกันเอาข้อมูลเก่ามาใช้งาน
    cache: false,
    // ไม่นำกำหนดไฟล์ที่รับมาเพื่อปกป้องกันเปลี่ยน
    contentType: false,
    // เอาข้อมูลไปแสดงเลยไม่ต้องประมวลผลเพื่อความเร็ว
    processData: false
});



$.each(array.data, function (idx, value) {
    $("#show_Food").append(
        "<div id='btnOrder' onclick='success(" + idx + ")' class='card mt-4'>" +
        "<img class='imgOrder' src='../php/assets/uploadfood/" + value.imgMenu + "' class='img-fluid'> " +
        "<div class='card-info mb-5'>" +
        "<p class='text-body mt-2 ' id='name_Food' name='text_Food'>" + value.menuName + "</p>" +
        "<p class='text-body mb-5' id='price_Food' name='text_Food'>" + "ราคา " + value.Price + " บาท" + "</p>" +
        "</div>" +
        "</div>"
    );
})


var list = [];

function success(menu) {
    id = array.data[menu].id;
    menuName = array.data[menu].menuName;
    Price = array.data[menu].Price;

    console.log(id, menuName, Price);
    var pass = true;

    for (let i = 0; i < list.length; i++) {
        if (list[i].id == id) {
            list[i].count++;  //บวกไปเรื่อยๆ
            pass = false;  // ถ้ามีเมนูอยู่ใน list pass เป็น false จะไม่เข้า if ต่อไป
        }
    }
    if (pass) {
        list.push({
            id: id,
            menuName: menuName,
            Price: Price,
            count: 1
        })
    }
    console.log('list : ', list);

    var html = '';
    html += `
        <p class="text-center">ร้านอาหาร</p>
        <p>********************************************</p>
        `;
    for (var i = 0; i < list.length; i++) {
        sum += list[i].count * list[i].Price;
        html += `
        <div class="list-items text-center">
            <div class="row  d-flex justify-content-between">
                <div class="col-6">
                    <p> ${list[i].count} ${list[i].menuName}</p>
                </div>
                <div class="col-6">
                    <p> ${sum} บาท</p>
                </div>
            </div>
        </div>
        `;
        
    }

    html += `
    <div class="list-items text-center">
    <div class="row  d-flex justify-content-between"> 
    <div class="col-6">  
        <p>รวมราคา</p>
    </div>
    <div class="col-6"> 
        <p>${Commas(sum)} บาท</p>
    </div>
    </div>
    </div>
    `;
    $("#order_box").html(html);
}

function Commas(x) {
    x = x.toString();
    var pattern = /(-?\d+)(\d{3})/;
    while (pattern.test(x))
        x = x.replace(pattern, "$1,$2");
    return x;
}

function clearList() {
    list = [];
    $("#order_box").html(`<p>โปรดเลือกรายการ</p>`)
}

function successList() {
    console.log('list', list)
    var gotolist = JSON.stringify(list)  //แปลงอาเรย์เป็น string
    console.log('gotolist', gotolist)
    localStorage.setItem('menulist', gotolist)
    window.open("../pos/slip.html", "_blank");
    // window.location.href = '../pos/slip.html', "_blank"
}


setInterval(() => {
    $.get( "../php/date.php", function( data ) {
        $( "#ShowDateTime" ).html( data );
    });        
}, 1000);



// function thelast1(){
//     $.ajax({
//         url: "../php/dashbord.php?value="+ sum +"&action=get",
//         type: "get",
//         async: false,  
//         success: function (res) {
//             console.log(res);
//         },
//         cache: false,
//         contentType: false,
//         processData: false
//     });
// }

function thelast(){
    var formData = JSON.stringify({act : "get",sum : sum});
    $.ajax({
        url: "../php/dashbord.php",
        dataType: 'json',
        contentType: 'application/json',  //ค่าส่งไปเป็น json เท่านั้น
        type: "post",
        data:formData,
        async: false,  
        success: function (res) {
            console.log(res);
        },
        cache: false,
        contentType: false,
        processData: false
    });
}


// function getID(){
//     $.ajax({
//         url: "../php/dashbord.php",
//         type: "post",
//         act: "select",
//         async: false, 
//         success: function (res) {
//             json = JSON.parse(res);
//             console.log(json);
//             console.log(json.data);
//             return json;
//         },
//         cache: false,
//         contentType: false,
//         processData: false
//     });
// }
 

// $.each(json.data, function (idx, value) {
//     $("#show_Order").append(
//         "<tr>"+
//             "<td>"+ value.sum_price +"</td>"+
//             "<td>"+ value.Order_date+"</td>"+
//         "</tr>"
//     );
// })
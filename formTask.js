$(document).ready(function () {

$("#alert").hide();

    $("#Add").click(function () {
        $("#form").show(1000).css("display", "block");
    });
    $("#exit").click(function () {
        $("#form").fadeOut();
        $("#submit").css("display","block");
        $("#edited").css("display","none");
         $("#alert").slideDown();
        NewId.pop();
        res();
    });

    $("#exited").click(function(){
        $("#alert").slideUp();
    })
});

var counter = function () {
    let des = $("#des").val();
    if (des.length == 0) {
        $("#count").html(0);
        return;
    }
    let charCount = des.length;
    $("#count").html(charCount);




    let title = $("#title").val();
    if (title.length == 0) {
        $("#count").html(0);
        return;
    }
    let titleCount = title.length;
    $("#titleTextCount").html(titleCount);
};

$(document).ready(function () {
    $("#des").change(counter);
    $("#des").keydown(counter);
    $("#des").keypress(counter);
    $("#des").keyup(counter);
    $("#des").blur(counter);
    $("#des").focus(counter);
});



$(document).ready(function(){
    $(document).on("click", "#edited", function(){
        console.log("Im edit");
    let title = $("#title").val().trim().toLowerCase();
    let des = $("#des").val().trim().toLowerCase();
    let active = document.getElementById("active");


//---------------------------------------------------FORM VALIDATION--------------------------------------------------------------------------------
    if(title == ""){
        $("#alert").slideDown();
        $("#warn-text").text("plese check title box");
        return false;
    }
    else if(des == ""){
        $("#alert").slideDown();
        $("#warn-text").text("plese check desription box.");
        return false;
    }
    else{
            $(`.title${NewId[0]}`).text(title);
            $(`.des${NewId[0]}`).text(des);
            let actives = document.getElementById("active");
            if (actives.checked) {
                $(`.status${NewId[0]}`).text(actives.value);
            } else {
                $(`.status${NewId[0]}`).text("Deactive");
            }
            NewId.pop();
            $("#form").css("display", "none");
            $("#submit").css("display","block");
            $("#edited").css("display","none");
            $("#alert").slideUp();
            res();
        }   
    })
});



//-------------------------------------------------------------------------------------------------------------------------


var count = 0;
var divCount = 0;
var divId = 0;
var NewId = [];


var today = new Date();
var date = today.getDate()+':'+today.getMonth()+1+':'+today.getFullYear()
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = time+' - '+date;
//------------------------------------------------------validation-------------------------------------------------------------------
function main() {
    var title = $("#title").val().trim().toLowerCase();
    var des = $("#des").val().trim().toLowerCase();
    var active = document.getElementById("active");
    $("#submit").css("display","block");
    $("#edited").css("display","none");
    if(title == ""){
        $("#alert").slideDown();
        $("#warn-text").text("pls check title box.");
        return false;
    }
    else if(des == ""){
        $("#alert").slideDown();
        $("#warn-text").text("pls check desription box.");
        return false;
    }
    

//-----------------------------------------Function Area ------------------------------------------------------------------------
        else{
            divId++;
            addContainer(title, des,activateCheck(active), dateTime);
            divCount = $("#content .content-div").length;
            dropDisable(divCount);
            $("#form").css("display", "none");
            $("#alert").slideUp();
            res();
    }
    
}
function dropDisable(divCount){
    if(divCount > 0){
        $("#statusdrop,#navsearch").prop("disabled", false);
        $("#No-Record").hide();
    }else{
        $("#statusdrop, #navsearch").prop("disabled", true);
        $("#No-Record").show();
    }
    return;
}
function activateCheck(active) {
    let result;
    if (active.checked) {
        result = active.value;
    } else {
        result = "Deactive";
    }
    return result;
}

function search() {
    let inp = document.getElementById("navsearch").value.toLowerCase();
    let coun = 0;
    if(inp.length == 0){
            $(".content-div").show();
       }else{
            for(let i = 1; i <= divCount; i++){
                if($(`.title${i}`).text().indexOf(inp) > -1){
                    $(`.title${i}`).parent("div").parent("div").parent("div").show();
                    console.log($(`.title${i}`).parent("div").parent("div").parent("div"));
                    coun+= $(`.title${i}`).parent("div").parent("div").parent("div").length;
                    if(coun <= 0 || coun == null){
                        $("#No-Record").show();
                    }
                    console.log(coun);
                }
                else{
                    $(`.title${i}`).parent("div").parent("div").parent("div").hide();
                }
            }
       }
}



function addContainer(title, des,active, created) {
    const profileCont = `<div id="${divId}" class="content-elements">
    <div style="width:100%;height:70px;display:flex; align-items:center; justify-content:start">
        <p id="div_title" class="title${divId}" style="font-size:20px;margin-left:40%; color:black"> ${title}</p>
    </div><hr>
    <p id="div_box"><span id="div_des" class="des${divId}">${des}</span></p>
    <p>SATUTS :<span id="div_satuts" class="status${divId}">${active}</span></p>
    <p><span id="div_created">${created}</span></p>
    <button id="delete" class="btn btn-danger" ><i class="fa fa-close" style="font-size:20px;color:red"></i></button></br>
    <button id="edit" class="btn btn-warning"><i class="fa fa-pencil" style="font-size:20px;color:green"></i></button> </div>`;

    const newDiv = document.createElement("div");
    newDiv.classList.add("content-div", "col-lg-4");
    newDiv.innerHTML = profileCont;
    document.getElementById("content").append(newDiv);
    return;
}
$("#status drop").click(function() {
    alert("")
    var select_option = this.options[this.selectedIndex].value;
    if (select_option == "status") {
        $(".content-div").show();
    }else if(select_option == "active"){
        for(let i = 1; i <= divCount; i++){
            if($(`.status${i}`).text() == "active"){
                $(`.status${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.status${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }else if(select_option == "Deactive"){
        for(let i = 1; i <= divCount; i++){
            if($(`.status${i}`).text() == "Deactive"){
                $(`.status${i}`).parent().parent("div").parent("div").show()
            }
            else{
                $(`.status${i}`).parent().parent("div").parent("div").hide()
                }
            }
    }
});

//-------------------------------------------------DELETE----------------------------------------------------------------------------------
$(document).ready(function(){
    $(document).on("click", "#delete", function() {
        let text = true;
        if (true) {
            $(this).closest(".content-div").remove();
            divCount--;
            dropDisable(divCount);
            console.log($(this).parent("div").attr("id"));
            let contId = $(this).parent("div").attr("id");
            if(divCount == 0){
                divId = 0;
            }
        } else {
             $("#alert").slideDown();
        }
    });
});


//--------------------------------------------Edit-------------------------------------------------------------------------------------
$(document).ready(function(){
    $(document).on("click", "#edit", function() {
        let parent = $(this).parent("div");
        let text1 = parent.find("#div_title").text();
        let text2 = parent.find("p #div_des").text();
        let satuts1 = parent.find("p #div_satuts").text();
        
        NewId.push($(this).parent("div").attr("id"))    
        $("#title").val(text1);
        $("#des").val(text2);
        if(satuts1 == "active"){
            $("#active").prop("checked", true);
        }else{
            $("#active").prop("checked", false);
        }
        $("#form").fadeIn().css("display", "block");
        $("#edited").css("display","block");
        $("#submit").css("display","none");
    });
});


//------------------------------------------------------reset validation of form-------------------------------------------------------
function res() {
    title.value = "";
    des.value = "";
    $("input[type=checkbox]").prop("checked", false);
}

//----------------------------------------------------------------------------------------------------------------------------------------
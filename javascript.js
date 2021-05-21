$(function(){
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event,ui){
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
        }
    });

    var paint = false; //painting or not
    var paint_erase = "paint"; // painting or erasing
    var canvas = document.getElementById("paint"); 
    var ctx = canvas.getContext("2d");
    
    //get the canvas container
    var container = $('#container');

    var mouse  = {x: 0,y: 0};
    
    //onload load saved work from local storage
    if(localStorage.getItem("imageCanvas")!= null){
        var img = new Image();
        img.onload = function(){
            ctx.drawImage(img,0,0);
        }
        img.src = localStorage.getItem("imageCanvas")
    };
    //set drawing parameters
    ctx.lineWidth = 3;
    ctx.lineJoin = "round";
    ctx.lineCap = "round";

    //click inside the container
    container.mousedown(function(e){
        paint = true;
        // window.alert(paint);
        ctx.beginPath();
        mouse.x = e.pageX - this.offsetLeft;
        // window.alert(mouse.x);
        mouse.y = e.pageY - this.offsetTop;
        // window.alert(mouse.y);

        ctx.moveTo(mouse.x,mouse.y);
    });

    container.mousemove(function(e){
        mouse.x = e.pageX - this.offsetLeft; // window.alert(mouse.x);
        mouse.y = e.pageY - this.offsetTop; // window.alert(mouse.y);
        if(paint == true){
            if(paint_erase == "paint"){
                //get color input
                ctx.strokeStyle = $("#paintColor").val();
            }else{
                //white color
                ctx.strokeStyle = "white";
            }
            ctx.lineTo(mouse.x,mouse.y);
            ctx.stroke();
        }
    });
    container.mouseup(function(){
        paint=false;
    });
    container.mouseleave(function(){
        paint=false;
    });
    //click on the reset button
    $("#reset").click(function(){
        ctx.clearRect(0,0,canvas.width,canvas.height);
        paint_erase = "paint";
        $("#erase").removeClass("eraseMode");
    });
    //click on save button
    $("#save").click(function(){
        if(typeof(localStorage)!= null){
            localStorage.setItem("imageCanvas",canvas.toDataURL());
            window.alert(localStorage.getItem("imageCanvas"))
        }else{
            window.alert("Your device or browser does not support local storage")
        }
        $(this).toggleClass("eraseMode");
    });
    //localStorage
    
    // click on the erase button
    $("#erase").click(function(){
        if(paint_erase == "paint"){
            paint_erase = "erase";
        }else{
            paint_erase = "paint";
        }
        $(this).toggleClass("eraseMode");
    });
    // change color input
    $("#paintColor").change(function(){
        $("#circle").css("background-color",$(this).val());

    });
    $("#slider").slider({
        min: 3,
        max: 30,
        slide: function(event,ui){
            $('#circle').height(ui.value);
            $('#circle').width(ui.value);
            ctx.lineWidth = ui.value;
        }
    });
});
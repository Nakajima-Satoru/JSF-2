rd2.cmenu=function(cMenuName){

    var _this=function(cMenuName){

        this.open=function(option){

            if(!option){
                option={};
            }

            if(option.disable){
                rd2.redirect.disable(true);
            }
            if(!option.callback){
                option.callback={};
            }

            var cMenuNameBase64 = btoa(cMenuName+".html");
			if(!rd2._data.cmenuCache[cMenuNameBase64]){
                return;
            }
            var content=decodeURIComponent(escape(atob(rd2._data.cmenuCache[cMenuNameBase64])));

            var setClassName="";
            if(option.class){
                setClassName=option.class;
            }

            var setIdName="";
            if(option.id){
                setIdName=option.id;
            }

            $(".contextmenu").remove("");

            var cMenuString='<div class="contextmenu '+setClassName+'" id="'+setIdName+'"><div class="window">'+content+'</div></div>';

            $("html").append(cMenuString);

            var target=$(".contextmenu");

            var position={};

            if((rd2._data.touchPosition.pageX+target.width()) > $(window).width()){
                position.left = rd2._data.touchPosition.pageX-target.width();
            }
            else{
                position.left = rd2._data.touchPosition.pageX;
            }

            if((rd2._data.touchPosition.pageY+target.height()) > $(window).height()){
                position.top = rd2._data.touchPosition.pageY-target.height()-5;
            }
            else{
                position.top = rd2._data.touchPosition.pageY-5;
            }

            target.css(position);

            var obj={
                cmenu:$(".contextmenu"),
            };

            setTimeout(function(){

                $(".contextmenu").addClass("open");

                if(option.callback.open){
                    option.callback.open(obj);    
                }
                
            },50);

        };

    };

    return new _this(cMenuName);

};

$("html").on("touchend",".contextmenu",function(){
    return false;
});
$("html").on("touchend",".contextmenu a",function(){
    var url=$(this).attr("url");
    rd2.redirect.move(url);
    $(".contextmenu").remove();    
});
$("html").on("touchend",function(){
    $(".contextmenu").remove();
});

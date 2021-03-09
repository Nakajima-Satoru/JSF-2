rd2.sync=function(){

    var _this=function(){

        this.callbacks=[];

        this.then=function(callback){
            this.callbacks.push(callback);
            return this;
        };

        this.for=function(limit,callbacks){
            
            for(var n=0;n<limit;n++){
                this.callbacks.push(callbacks);
            }

            this.run();
        },

        this.foreach=function(data,callbacks){

            if(Array.isArray(data) == true){
                var length=data.length;
                for(var n=0;n<length;n++){

                    let index=n;
                    let value=data[index];

                    this.callbacks.push(function(obj){
                        callbacks(obj,index,value);
                    });
                }
            }
            else{
                if(typeof data=="object"){
                    var colum=Object.keys(data);
                    var length=colum.length;
                    for(var n=0;n<length;n++){

                        let field=colum[n]
                        let value=data[field];

                        this.callbacks.push(function(obj){
                            callbacks(obj,field,value);                        
                        });
                    }
                }
                else{
                    return;
                }
            }

            this.run();

        },

        this.run=function(){

            var cond=this;
            var obj={
                _index:0,
                _response:null,
                next:function(response){
                    this._index++;
                    if(cond.callbacks[this._index]){
                        this._response=response;
                        cond.callbacks[this._index](obj);
                    }
                },
                index:function(){
                    return this._index;
                },
                get:function(){
                    return this._response;
                },
            };

            cond.callbacks[0](obj);
        };

    };

    return new _this();
};
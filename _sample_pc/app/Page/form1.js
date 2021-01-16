rd2.page("form1").addGroup(["app"]).before(function(obj){
    setTitle("Form Sample1");

    rd2.form("form1").set({
        name:{
            type:"text",
            placeholder:"Your Name.",
        },
        name_kana:{
            type:"text",
            placeholder:"Your Name(kana).",
        },
        category:{
            type:"select",
            select:{
                1:"category type 1",
                2:"category type 2",
                3:"category type 3",
                4:"category type 4",
            },
        },
        type:{
            type:"radio",
            select:{
                1:"type 1",
                2:"type 2",
                3:"type 3",
            },
        },
        like:{
            type:"checkbox",
            select:{
                1:"check like 1",
                2:"check like 2",
                3:"check like 3",
                4:"check like 4",
            },
        },
        file:{
            type:"file",
        },
        message:{
            type:"textarea",
            style:"height:300px",
        },
        submit:{
            type:"submit",
            value:"Submit",
            style:"background:#29a;",
        },
        cancel:{
            type:"reset",
            value:"Reset",
            style:"background:#444",
        }
    });

});

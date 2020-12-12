const cmdColor={
    default:"\x1b[0m",
    green:"\x1b[32m",
    magenta:"\x1b[35m",
    cyan:"\x1b[36m",
    red:"\u001b[31m",
};
const fs=require("fs");
const https=require("https");
const fsc=require("./fscustom.js");

module.exports={
    create:function(project,template){

        if(!template){
            template="normal";
        }

        if(!project){
            project="_project";
        }
    
        var path="template/"+template;

        if(!fsc.fileExists(path)){
            console.log("Error:The specified template does not exist.");
            return;
        }
    
        console.log(cmdColor.green+"Start template generation and build"+cmdColor.default);
        console.log("");
    
        var fileList=fsc.search(path);
    
        try{
            fs.mkdirSync(project);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+project);
        }catch(err){}
    
        for(var n=0;n<fileList.dir.length;n++){
    
            var dirName=fileList.dir[n];
            dirName=dirName.replace(path,project);
            try{
                fs.mkdirSync(dirName);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+dirName);
            }catch(err){}
        }
    
        for(var n=0;n<fileList.file.length;n++){
            var fileName=fileList.file[n];
            var newFileName=fileName.replace(path,project);
            fs.copyFileSync(fileName,newFileName);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy "+cmdColor.default+fileName+" -> "+newFileName);
        }
    
        console.log("");
        console.log(cmdColor.green+"# "+cmdColor.default+project+" generation is complete.");
    
    },
    build:function(project){

        if(!project){
            console.log(cmdColor.red+"Error:No project specified."+cmdColor.default);
            return;
        }
    
        if(!fsc.fileExists(project)){
            console.log(cmdColor.red+"Error:The selected project does not exist."+cmdColor.default);
            return;
        }
    
        console.log(cmdColor.green+"Start build of the specified project."+cmdColor.default);
        console.log("");
    
        // ビルドディレクトリ生成
        console.log(cmdColor.green+"# "+cmdColor.cyan+"create build directory"+cmdColor.default);
        var buildDir=project+"/_build";
        try{
            fs.mkdirSync(buildDir);
        }catch(err){}
    
        // manifest.jsonをロード
        var manifestBasePath=project+"/manifest.json";
        console.log(cmdColor.green+"# "+cmdColor.cyan+"load manifest"+cmdColor.default);
        var manifest;
        try{
            manifest=fs.readFileSync(manifestBasePath).toString();
        }catch(err){
            console.log(cmdColor.red+"ERROR : manifest.json file not found."+cmdColor.default);
            return;
        }


        // index.htmlを設置
        var htmlFileBasePath=project+"/index.html";
        var htmlFileName=buildDir+"/index.html";
    
        var htmlContent=fs.readFileSync(htmlFileBasePath).toString();

        var scriptAreaText='<script src="core/jquery.js"></script>';
        scriptAreaText+='<script src="core/rd2.js"></script>';
        scriptAreaText+='<script src="core/rd2pagelist.js"></script>';
        scriptAreaText+='<script src="core/rd2viewlist.js"></script>';
        scriptAreaText+='<script src="core/rd2localsc.js"></script>';
        scriptAreaText+='<link rel="stylesheet" href="core/rd2paging.css">';
        scriptAreaText+='<link rel="stylesheet" href="core/rd2window.css">';
        scriptAreaText+='<script>rd2.load('+manifest+');</script>';

        htmlContent=htmlContent.replace("{scriptArea}",scriptAreaText);

        var pageAreaContent='<pagelist></pagelist>';
        
        htmlContent=htmlContent.replace("{pageArea}",pageAreaContent);

        fs.writeFileSync(htmlFileName,htmlContent);
        console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy+set "+cmdColor.default+htmlFileName);

        // assetsの中身を設置
        var assetsBasePath=project+"/assets";
        var assetsFileList=fsc.search(assetsBasePath);
        var buildDirAssets=buildDir+"/assets";
    
        try{
            fs.mkdirSync(buildDirAssets);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+buildDirAssets)
        }catch(err){}
    
        for(var n=0;n<assetsFileList.dir.length;n++){
            var dname=assetsFileList.dir[n];
            dname=dname.replace(assetsBasePath,buildDirAssets);
            try{
                fs.mkdirSync(dname);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+dname)
            }catch(err){}
        }
        for(var n=0;n<assetsFileList.file.length;n++){
            var fbase=assetsFileList.file[n];
            var fname=fbase.replace(assetsBasePath,buildDirAssets);
            fs.copyFileSync(fbase,fname);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy "+cmdColor.default+fbase+" => "+fname);
        }
    
        // コアの生成
        console.log(cmdColor.green+"# "+cmdColor.cyan+"create core"+cmdColor.default);
        var buildDirCore=buildDir+"/core";
        try{
            fs.mkdirSync(buildDirCore);
        }catch(err){}
        console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+buildDirCore+cmdColor.default);
    
        var coreFileBasePath=__dirname+"/resources";
        var coreFileList=fs.readdirSync(coreFileBasePath);

        for(var n=0;n<coreFileList.length;n++){
            var copyFileName=buildDirCore+"/"+coreFileList[n];
            var baseFileName=coreFileBasePath+"/"+coreFileList[n];

            if(!fs.statSync(baseFileName).isDirectory()){

                fs.copyFileSync(baseFileName,copyFileName);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy "+cmdColor.default+baseFileName+" => "+copyFileName);        
            }
        }

        // rd2.jsの変換
        var coreLibraryPath=coreFileBasePath+"/core";
        var loadList=fs.readFileSync(coreLibraryPath+"/load.json").toString();
        loadList=JSON.parse(loadList);

        var coreJsString="var rd2={};\n";
        for(var n=0;n<loadList.length;n++){
            var buff=fs.readFileSync(coreLibraryPath+"/"+loadList[n])+"\n";
            coreJsString+=buff;
        }
        fs.writeFileSync(buildDirCore+"/rd2.js",coreJsString);
        console.log(cmdColor.green+"# "+cmdColor.cyan+"build rd2.js"+cmdColor.default);        
    
        // ページソースからページスクリプト生成
        var pageDir=project+"/pages";
        var pageFileList=fs.readdirSync(pageDir);
        if(pageFileList){
            var srcText="";
            for(var n=0;n<pageFileList.length;n++){
                var pageFileName=pageFileList[n];
                var pageName=pageFileName.replace(".html","");
                pageName = pageName.charAt(0).toLowerCase() + pageName.slice(1);
                var getContent=fs.readFileSync(pageDir+"/"+pageFileName);
                var content=Buffer.from(getContent).toString('base64');
                
                srcText+="rd2._data.pageCache."+pageName+"='"+content+"';"+"\n";
            }
        
            fs.writeFileSync(buildDirCore+"/rd2pagelist.js",srcText);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"convert "+cmdColor.default+buildDirCore+"/rd2pagelist.js");    
        }
    
        // viewソースからviewスクリプト生成
        var viewDir=project+"/views";
        var viewFileList=fs.readdirSync(viewDir);
        if(viewFileList){
            var viewText="";
            for(var n=0;n<viewFileList.length;n++){
                var viewFileName=viewFileList[n];
                var viewName=viewFileName.replace(".html","");
                viewName=viewName.charAt(0).toLowerCase() + viewName.slice(1);
                var getContent=fs.readFileSync(viewDir+"/"+viewFileName);
                var content=Buffer.from(getContent).toString('base64');
                viewText+="rd2._data.viewCache."+viewName+"='"+content+"';"+"\n";
            }

            fs.writeFileSync(buildDirCore+"/rd2viewlist.js",viewText);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"convert "+cmdColor.default+buildDirCore+"/rd2viewlist.js");
        }

        // スクリプトソースを結合してローカルスクリプト生成
        var localSc=project+"/app";
        var localScFileList=fsc.search(localSc);
        var localScText="";
        for(var n=0;n<localScFileList.file.length;n++){
    
            var localScFilePath=localScFileList.file[n];
            console.log(cmdColor.green+"# "+cmdColor.cyan+"local script loading "+cmdColor.default+localScFilePath);
            var getContent=fs.readFileSync(localScFilePath);
            localScText+=getContent+"\n";
        }
    
        fs.writeFileSync(buildDirCore+"/rd2localsc.js",localScText);
        console.log(cmdColor.green+"# "+cmdColor.cyan+"convert "+cmdColor.default+buildDirCore+"/rd2localsc.js");
    
    
        var finish=function(){
            // 後処理
            console.log("");
            console.log(cmdColor.green+"# "+cmdColor.default+"build complete!");
    
        };
    
        // jqueryをダウンロード(なければ)
        var jqueryCache=__dirname+"/jquerycache.js";
    
        if(!fsc.fileExists(jqueryCache)){
    
            var jqueryUrl="https://code.jquery.com/jquery-1.12.4.min.js";
    
            var jqueryStr="";
            https.get(jqueryUrl,function(res){
    
                console.log(cmdColor.green+"# "+cmdColor.cyan+"jquery download"+cmdColor.default);
    
                // テキストファイルの場合は、エンコード指定は重要！
                res.setEncoding('utf8');
    
                // データを受け取るたびに、文字列を追加
                res.on('data',function(xml) {
                    jqueryStr+=xml;
                });
    
                // ファイルのダウンロードが終わるとendイベントが呼ばれる
                res.on('end', function () {
                    fs.writeFileSync(jqueryCache,jqueryStr);
                    console.log('# jquery loading finish.');
    
                    // jqueryキャッシュからファイルをコピー
                    var jqueryCopyPath=buildDirCore+"/jquery.js";
                    fs.copyFileSync(jqueryCache,jqueryCopyPath)
    
                    console.log("# filecopy "+jqueryCopyPath);
    
                    finish();
                }); 
    
            });
    
        }
        else{
    
            // jqueryキャッシュからファイルをコピー
            var jqueryCopyPath=buildDirCore+"/jquery.js";
            fs.copyFileSync(jqueryCache,jqueryCopyPath)
    
            console.log("# filecopy "+jqueryCopyPath);
            finish();
    
        }

    },
    template:{
        _endpoint:"http://localhost:1242/",
        list:function(){
            
        },
        get:function(templateName){


        },
    },
};
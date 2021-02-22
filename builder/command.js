const cmdColor={
    default:"\x1b[0m",
    green:"\x1b[32m",
    magenta:"\x1b[35m",
    cyan:"\x1b[36m",
    red:"\u001b[31m",
    yellow: '\u001b[33m',
};
const fs=require("fs");
const https=require("https");
const fsc=require("./fscustom.js");

module.exports={
    create:function(baseDirectory,project,template){

        if(!template){
            template="simple";
        }

        if(!project){
            project="_project";
        }
    
        var path=__dirname+"/../template/"+template;
        if(!fsc.fileExists(path)){
            console.log(cmdColor.red+"Error:The specified template does not exist."+cmdColor.default);
            return false;
        }
    
        console.log(cmdColor.green+"Start template generation and build"+cmdColor.default);
        console.log("");
    
        var fileList=fsc.search(path);
    
        try{
            fs.mkdirSync(baseDirectory+"/"+project);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+project);
        }catch(err){
            console.log(cmdColor.yellow+"WARNING: Cannot create project because a directory with the same project name exists."+cmdColor.default);
        }
    
        for(var n=0;n<fileList.dir.length;n++){
    
            var dirName=fileList.dir[n];
            dirName=dirName.replace(path,project);
            try{
                fs.mkdirSync(dirName);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"mkdir "+cmdColor.default+dirName);
            }catch(err){
                console.log(cmdColor.yellow+"WARNING: Could not generate some directories for the project. \""+dirName+cmdColor.default+"\""+cmdColor.default);
            }
        }
    
        for(var n=0;n<fileList.file.length;n++){
            var fileName=fileList.file[n];
            var newFileName=fileName.replace(path,project);
            try{
                fs.copyFileSync(fileName,newFileName);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy "+cmdColor.default+fileName+" -> "+newFileName);
            }catch(err){
                console.log(cmdColor.yellow+"WARNING: Some files could not be copied.  "+cmdColor.default+fileName+cmdColor.default);
            }
        }
    
        console.log("");
        console.log(cmdColor.green+"# "+cmdColor.default+project+" generation is complete.");
    
        return true;
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
    
        // Build directory generation
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


        // Generate index.html
        var htmlFileBasePath=project+"/index.html";
        var htmlFileName=buildDir+"/index.html";
    
        var htmlContent=fs.readFileSync(htmlFileBasePath).toString();

        var scriptAreaText='<script src="core/jquery.js"></script>';
        scriptAreaText+='<script src="core/rd2.js"></script>';
        scriptAreaText+='<script src="core/rd2pagelist.js"></script>';
        scriptAreaText+='<script src="core/rd2dialoglist.js"></script>';
        scriptAreaText+='<script src="core/rd2viewlist.js"></script>';
        scriptAreaText+='<script src="core/rd2localsc.js"></script>';
        scriptAreaText+='<link rel="stylesheet" href="core/rd2paging.css">';
        scriptAreaText+='<link rel="stylesheet" href="core/rd2dialog.css">';
        scriptAreaText+='<script>rd2.load('+manifest+');</script>';

        htmlContent=htmlContent.replace("{scriptArea}",scriptAreaText);

        var pageAreaContent='<pagelist></pagelist>';
        
        htmlContent=htmlContent.replace("{pageArea}",pageAreaContent);

        fs.writeFileSync(htmlFileName,htmlContent);
        console.log(cmdColor.green+"# "+cmdColor.cyan+"filecopy+set "+cmdColor.default+htmlFileName);

        // Set up the contents of assets
        var assetsBasePath=project+"/render/assets";
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
    
        // Core generation
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

        // rd2.js conversion
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
    
        // Page script generation from page source
        var pageDir=project+"/render/pages";
        var pageFileList=fsc.search(pageDir);
        if(pageFileList.file){

            var srcText="rd2._data.pageCache = {\n";

            console.log(cmdColor.green+"# "+cmdColor.cyan+"add page start...");

            for(var n=0;n<pageFileList.file.length;n++){
                var pageFileName=pageFileList.file[n];

                var pageName = pageFileName.replace(pageDir+"/","");
                pageName = Buffer.from(pageName).toString('base64');

                var getContent=fs.readFileSync(pageFileName);
                var content=Buffer.from(getContent).toString('base64');
                
                srcText+="  \""+pageName+"\": \""+content+"\",\n";
                console.log(cmdColor.green+"# "+cmdColor.cyan+"add page "+cmdColor.default+pageFileName);    
            }
        
            srcText+="};";
            fs.writeFileSync(buildDirCore+"/rd2pagelist.js",srcText);
            console.log(cmdColor.green+"# "+cmdColor.cyan+"convert page...");    
        }

        // Dialog script generation from dialog source
        try{
            var dialogDir=project+"/render/dialog";
            var dialogFileList=fsc.search(dialogDir);
            
            if(dialogFileList.file){

                var srcText="rd2._data.dialogCache = {\n";

                console.log(cmdColor.green+"# "+cmdColor.cyan+"add dialog start...");

                for(var n=0;n<dialogFileList.file.length;n++){
                        var dialogFileName=dialogFileList.file[n];

                        var dialogName = dialogFileName.replace(dialogDir+"/","");
                        dialogName = Buffer.from(dialogName).toString('base64');

                        var getContent = fs.readFileSync(dialogFileName);
                        var content=Buffer.from(getContent).toString('base64');
                        
                        srcText+="  \""+dialogName+"\": \""+content+"\",\n";
                        console.log(cmdColor.green+"# "+cmdColor.cyan+"add dialog "+cmdColor.default+dialogFileName);    
                    }

                    srcText+="};";
                
                    fs.writeFileSync(buildDirCore+"/rd2dialoglist.js",srcText);
                    console.log(cmdColor.green+"# "+cmdColor.cyan+"convert dialog ");
        
            }
    
        }catch(err){
            console.log(err);
            console.log("dialog not found...");
            fs.writeFileSync(buildDirCore+"/rd2dialoglist.js","");  
        }

        
        // View script generation from view source
        try{
            var viewDir=project+"/render/views";
            var viewFileList=fsc.search(viewDir);

            if(viewFileList.file){
                
                var viewText="rd2._data.viewCache = {\n";

                console.log(cmdColor.green+"# "+cmdColor.cyan+"add view start...");

                for(var n=0;n<viewFileList.file.length;n++){
                    var viewFileName=viewFileList.file[n];

                    var viewName = viewFileName.replace(viewDir+"/","");
                    viewName = Buffer.from(viewName).toString('base64');

                    var getContent=fs.readFileSync(viewFileName);
                    var content=Buffer.from(getContent).toString('base64');

                    viewText+=" \""+viewName+"\": \""+content+"\",\n";
                    console.log(cmdColor.green+"# "+cmdColor.cyan+"add view "+cmdColor.default+viewFileName);    
                }

                viewText+="};";

                fs.writeFileSync(buildDirCore+"/rd2viewlist.js",viewText);
                console.log(cmdColor.green+"# "+cmdColor.cyan+"convert view ");
            }
        }catch(err){
            fs.writeFileSync(buildDirCore+"/rd2viewlist.js","");
        }

        // Combine script sources to generate local scripts
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
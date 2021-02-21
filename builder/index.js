module.exports={

	command:function(baseDirectory){

		var cmd=process.argv;
		cmd.shift();
		cmd.shift();
		
		const command=require("./command.js");
		
		if(cmd[0]=="project"){
			if(cmd[1]=="add"){
				var res=command.create(baseDirectory,cmd[2]);
				if(!res){ return; }
				command.build(baseDirectory,cmd[2]);
			}
			else if(cmd[1]=="build"){
				command.build(cmd[2]);
			}
			else if(cmd[1]=="rename"){
				command.rename(cmd[2]);
			}
			else if(cmd[1]=="delete"){
				command.delete(cmd[2]);
			}
		}
		else if(cmd[0]=="template"){
			if(cmd[1]=="list"){
				command.template.list();
			}
			else if(cmd[1]=="search"){
				command.template.search(cmd[2]);
			}
			else if(cmd[1]=="get"){
				command.template.get(cmd[2]);
			}
		}
		else{

			console.log("============================================");
			console.log(" JSF-2 (Javascript Frameowrk Builder")
			console.log(" Copylight :  Nakajima-Satoru 2021.");
			console.log("============================================");

			console.log("<<Command List>>");
			console.log("");

			console.log("$ project");
			console.log("  add [projectName] [templateName(=simple)]  Create a project.");
			console.log("  build [projectName]                        Run the build of the project.");
			console.log("  rename [projectName]                       Rename the project.");
			console.log("  delete [projectName]                       Rename the Delete.");
			console.log("");

		}
		
	},
	project:function(projectName){

		var cmd=process.argv;
		cmd.shift();
		cmd.shift();
		
		const { basename } = require("path");
		const command=require("./command.js");
		
		if(cmd[0]=="build"){
			command.build(projectName);
		}
		else{
			console.log("============================================");
			console.log(" JSF-2 (Javascript Frameowrk Builder")
			console.log(" Copylight :  Nakajima-Satoru 2021.");
			console.log("============================================");

			console.log("<<Command List On Project>>");
			console.log("");

			console.log("$ add page [pageName]               Create a page. Create an empty HTML file for the page and a before callback");
			console.log("$ add dialog [dialogName]           Create a doalog. Create an empty HTML file for the doalog and a before callback");
			console.log("$ add group [groupName]             Create a group. Create before callback");
			console.log("$ add form [submitName]             Create a form. Create before callback");
			console.log("$ add request [requestName]         Create a request. Create before callback");
			console.log("");

		}

	},

};
var cmd=process.argv;
cmd.shift();
cmd.shift();

const { basename } = require("path");
const command=require("./command.js");

if(cmd[0]=="project"){
	if(cmd[1]=="add"){
		command.create(cmd[2]);
		command.build(cmd[2]);
	}
	else if(cmd[1]=="build"){
		command.build(cmd[2]);
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
	module.exports={
		build:function(projectPath){
			var project=basename(projectPath);
			command.build(projectPath);
		},
	};
}
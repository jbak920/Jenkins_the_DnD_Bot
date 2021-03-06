const Discord = require("discord.js");
const ytdl = require("ytdl-core");
var fs = require('fs');

var goldFile = require("./inventory/gold.json");
var Player = require('./player.js');
const config = require("./config.json");
var tools = require("./tools.js"); 
var perm = require("./permissions.json");
var armor = require("./inventory/armor.json");



const client = new Discord.Client();
var players = []; 
var gold = goldFile.gold;
var restrictPlay = "any";

var voiceChannel = null; 
var dispatcher = null;
const broadcast = client.createVoiceBroadcast();


function addAditionalModifier(id, args){



}


function set(id, args){

    var message = "";

    if(args.length > 1){
				if (args[0] == "gold"){
						gold = Number(args[1]).toFixed(2);
						message += "Setting gold to " + Number(gold).toFixed(2) + "gp.";
				}
				else{
						var statBuff = tools.parseStringForStat(String(args.join(" ")));
						console.log(statBuff);
						for(i=0; i< players.length;i++){
								if (id == players[i].getId()){
										
										switch(statBuff){
										case "mygold":
												players[i].setGold(Number(args[args.length-1]));
												message += "Setting " + players[i].getName() + "'s gold to " + args[args.length-1] + ".\n";
												break;
										case "nm":
												var name = args;
												args.shift();
												console.log(name);
												if(args.length > 1){
														name = name.join(" ");
												}
												else{
														name = name[0];
												}
												console.log(name);
												players[i].setName(name);
												message += "Setting name to " + name + ".\n";
												break;
										case "lvl":
												players[i].setLevel(args[args.length-1]);
												message += "Setting level to " + args[args.length-1] + ".\n";
												break;
										case "cls":
												players[i].setClass(args[args.length-1]);
												message += "Setting class to " + args[args.length-1] + ".\n";
												break;
										case "str":
												players[i].setStr(args[args.length-1]);
												message += "Setting STR to " + args[args.length-1] + ".\n";
												break;
										case "dex":
												players[i].setDex(args[args.length-1]);
												message += "Setting DEX to " + args[args.length-1] + ".\n";
												break;
										case "con":
												players[i].setCon(args[args.length-1]);
												message += "Setting CON to " + args[args.length-1] + ".\n";
												break;
										case "int":
												players[i].setInt(args[args.length-1]);
												message += "Setting INT to " + args[args.length-1] + ".\n";
												break;
										case "wis":
												players[i].setWis(args[args.length-1]);
												message += "Setting WIS to " + args[args.length-1] + ".\n";
												break;
										case "cha":
												players[i].setCha(args[args.length-1]);
												message += "Setting CHA to " + args[args.length-1] + ".\n";
												break;
										case "ac":
												players[i].setAc(args[args.length-1]);
												message += "Setting AC to " + args[args.length-1] + ".\n";
												break;
										case "init":
												players[i].setInit(args[args.length-1]);
												message += "Setting INIT to " + args[args.length-1] + ".\n";
												break;
										case "spd":
												players[i].setSpd(args[args.length-1]);
												message += "Setting SPD to " + args[args.length-1] + ".\n";
												break;
										case "hp":
												players[i].setHp(args[args.length-1]);
												message += "Setting HP to " + args[args.length-1] + ".\n";
												break;
										default:
												message += "Invalid argument " + args[0] + ".\n"
												break;
										}
										players[i].setMods();
										break;
								}
						}
				}
    }

    else{
				message += "Please give me something to set and its values.\n"
    }

    return message;
}



function save(callback){
    var json = "";
    for(i=0; i < players.length; i++){
				json = JSON.stringify(players[i], null, '\t');
				var name = players[i].getName().split(" ");
				name = name.join("_");

				fs.writeFile("./players/" + name + ".json", json, function(err) {
						if(err) {
								return console.log(err);
						}
				});
    }

    var goldString = '{"gold" : ' + gold + '}';	
    fs.writeFile("./inventory/gold.json", goldString, function(err) {
				if(err) {
						return console.log(err);
				}	
    });
    
    if(callback){callback();}

}


function PlayStream(streamUrl) {

    const streamOptions = {seek: 0, volume: 1};
    console.log("Streaming audio from " + streamUrl);

    if (streamUrl) {
        const stream = ytdl(streamUrl, {filter: 'audioonly'});
        const dispatcher = bot.voiceConnections.first().playStream(stream, streamOptions);
    }
}



client.on("ready", () => {

    voiceChannel = client.channels.find('name', 'The Game');
    voiceChannel.join().then(connection => console.log(`Connected to ${voiceChannel.name}`)).catch(console.error);
    
    // This event will run if the bot starts, and logs in, successfully.
    console.log(`Bot has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`); 
    // Example of changing the bot's playing game to something useful. `client.user` is what the
    // docs refer to as the "ClientUser".

    client.user.setGame(`on ${client.guilds.size} servers`);

    const dirname = './players/';
    
    fs.readdirSync(dirname).forEach(file => {
				json = fs.readFileSync(dirname+file, "utf8");
				player = JSON.parse(json);
				player.__proto__ = Player.prototype;
				player.setMods();
				players.push(player);
    })

});

function messageSend(message, text, messagefile = "", breakChar = '\n'){


		if (text.length > config.discordMax){
				console.log(text)

				var arr = tools.breakUpString(text, breakChar);
				
				for(i=0; i < arr.length;i++){
						messageSend(message, String(arr[i]));
				}

		}
		else{
				var textToSend = "```" + text + "\n```";		
				if(messagefile != ""){
						message.channel.send(textToSend, {
								file: messagefile
						});
				}
				else{
						
						message.channel.send(textToSend);
						
				}
		}
}
var commands = {
		"test" : {
				permissions: "any",
				description: 'A testbed function for Jenkins.',
				process: function(client,message,args,id){
						message.edit("Edited!");
				}
    },
    "armor" : {
				permissions: "any",
				description: "This command changes the armor you have equipped.",
				process: function(client, message, args, id) 
	                        {
				    var numTypes = Object.keys(armor).length;
				    var newAC;
				    var ACdexBuff;

				    if(args[0]=="equip" || args[0]=="unequip")
				    {
					var valid_armor = 0;
					var armor_type;
					if(args[0]=="unequip")
					{
					    armor_type = "_none";
					}
					else
					{
					    args.shift();
					    armor_type = "_" + args.join("");
					}
					for (ar in armor)
					{
					    if(ar == armor_type)
						valid_armor = 1;
					}
					if(valid_armor)
					{
					    for(i=0; i < players.length; i++)
					    {
						if(id == players[i].getId())
						{
						    newAC = armor[armor_type][2];
						    if(armor[armor_type][3] != "na")
						    {
							if(armor[armor_type][3] == "Inf")
							{
							    ACdexBuff = players[i].getDexmod();
							}
							else
							{							
							    ACdexBuff = Math.min(players[i].getDexmod(), armor[armor_type][3]);
							    newAC = newAC + ACdexBuff;
							}
						    }
						    messageSend(message, "Equipping " + armor[armor_type][0] + " armor on " + players[i].getName() + ".");
						    messageSend(message, "New AC should be " + newAC);
						    players[i].setAc(newAC);
						    
						}
					    }		
					}
					else
					{
					    messageSend(message, "Invalid armor type.");
					}
				    }
				    else if(args[0]=="unequip")
				    {
					messageSend(message, "Unequipping armor.");
				    }
				    else if(args[0]=="")
				    {
					messageSend(message, "Report the armor currently equipped here.");
				    }
				    else
				    {
					messageSend(message, "Unacceptable arguments for armor command.");
				    }
				}
				
    },
    "close": {
				permissions: "administrator",
        description: "Turns me off. Needs admin permissions.",
        process: function(client, message, args, id=0) {
						messageSend(message,"Shutting down.");
						client.destroy().then(function(){
								process.exit(0);	
						});
				}
    },
    "reboot": {
				permissions: "any",
        description: "Reboots me.",
        process: function(client, message, args, id=0) {
						const { spawn } = require('child_process')
						messageSend(message,"Rebooting.");
						
						client.destroy().then(function(){
								var com = "";
								if(process.platform == "win32"){
										com = "node";
								}
								else if(process.platform == "linux"){
										com = "nodejs";
								}
								const child = spawn(com, ['app.js'], {
										detached: true,
										stdio: ['ignore']
								});
								
								child.unref();
								

								process.exit(0);	
						});
				}
    },
    "update": {
				permissions: "administrator",
				description: "Updates from git repo and reboots.",
        process: function(client, message, args, id=0) {
						const { spawn } = require('child_process');
						messageSend(message,"Updating from git repo.");

						var fetch = spawn('git', ['pull']);
						fetch.stdout.on('data',function(data){
								console.log(data.toString());
						});
						
						
						client.destroy().then(function(){
								var com = "";
								if(process.platform == "win32"){
										com = "node";
								}
								else if(process.platform == "linux"){
										com = "nodejs";
								}
								const child = spawn(com, ['app.js'], {
										detached: true,
										stdio: ['ignore']
								});
								
								child.unref();
								

								process.exit(0);	
						});
				}
    },		
    "save": {
				permissions: "any",
        description: "Saves all player profiles and gold.",
        process: function(client, message, args,id=0) {

						save();

						messageSend(message,"Saving Profiles.\n");

				}
    },

    "map":{
				permissions: "any",
				description: "Shows a map of Faerun.",
				process: function(client, message, args, id=0){
						mapMessage = "A Map of Faerun\n";
						mapFile = "./map.jpg";
						messageSend(message,mapMessage,mapFile);
				}
				

    },
    "say":{
				permissions: "any",
				description: "Makes me say something.",
				process: function(client,message,args,id){


						var sayMessage =  args.join(" ");
						// Then we delete the command message (sneaky, right?). The catch just ignores the error with a cute smiley thing.
						message.delete().catch(O_o=>{}); 
						// And we get the bot to say the thing: 
						
						var mickelDescription = ["poop", "eldritch ", "vibrant ", "breezy ", "silky ", "bountiful ", "literally on fire "];
						var mickelparts = ["face", "butt", "foot","head", "buttocks","buttock", "nostril","growth", "skeleton", "aqueous humor", '"breasts"'];
						
						
						if(id == 152235945368879105){
								
								sayMessage += "\nP.S.: Mickel has a " + String(mickelDescription[tools.getRandomInt(0, mickel.length - 1)]) + String(mickelparts[tools.getRandomInt(0, mickelparts.length-1)]) +".\n";
						}

						//	sayMessage = "hello";
						messageSend(message,sayMessage);

				}
    },
    "set":{
				permissions: "any",
				description: "Sets stats or gold to a given value.",
				process: function(client,message,args,id){
						setMessage = set(id, args);
						messageSend(message,setMessage);
				}
    },
    "stats":{
				permissions: "any",
				description: "Shows character stats and modifiers.",
				process: function(client,message,args,id){
						
						if( args.length > 0){
								for(i=0; i< players.length;i++){
										playerName = players[i].getName().toLowerCase();
										
										if( playerName.indexOf(" ") > -1){
												if( playerName.slice(0, playerName.indexOf(" ")) == args[0].toLowerCase()){
														var statsMessage =players[i]. getStatsMessage();
														messageSend(message,statsMessage);
														break;
												}
										}
										
										name = String(args.join(" ")).toLowerCase();
										if (name == players[i].getName().toLowerCase()){
												var statsMessage = players[i].getStatsMessage();
												messageSend(message,statsMessage);
												break;
										}
								}
								
						}

						else{
								for(i=0; i< players.length;i++){
										if (id == players[i].getId()){
												var statsMessage = players[i].getStatsMessage();
												messageSend(message,statsMessage);
												break;
										}
								}
						}
				}						
    },
    "skills":{
				permissions: "any",
				description: "Shows your character's skills, proficiencies and modifiers. You can give me the first name of someone to see their skills.",
				process: function(client,message,args,id){
						if( args.length > 0){
								for(i=0; i< players.length;i++){
										
										
										playerName = players[i].getName().toLowerCase();
										
										if( playerName.indexOf(" ") > -1){
												if( playerName.slice(0, playerName.indexOf(" ")) == args[0].toLowerCase()  ){
														var skillsMessage = players[i].getSkillsMessage();
														messageSend(message,skillsMessage);
														break;
												}
										}
										
										name = String(args.join(" ")).toLowerCase();
										if (name == players[i].getName().toLowerCase()){
												var skillsMessage = players[i].getSkillsMessage();
												messageSend(message,skillsMessage);
												break;
										}
								}
								
						}
						
						else{
								for(i=0; i< players.length;i++){
										if (id == players[i].getId()){
												var skillsMessage = players[i].getSkillsMessage();
												messageSend(message,skillsMessage);
												break;
										}
								}
						}
						
						
				}
    },
    "bonuses":{
				permissions: "any",
				description: "Shows your character's additional modifiers that have been extracted from your notes. You can give me the first name of someone to see their bonuses.",
				process: function(client,message,args,id){
						if( args.length > 0){
								for(i=0; i< players.length;i++){
										
										
										playerName = players[i].getName().toLowerCase();
										
										if( playerName.indexOf(" ") > -1){
												if( playerName.slice(0, playerName.indexOf(" ")) == args[0].toLowerCase()  ){
														var bonusMessage = players[i].getBonusMessage();
														messageSend(message,bonusMessage);
														break;
												}
										}
										
										name = String(args.join(" ")).toLowerCase();
										if (name == players[i].getName().toLowerCase()){
												var bonusMessage = players[i].getBonusMessage();
												messageSend(message,bonusMessage);
												break;
										}
								}
								
						}
						
						else{
								for(i=0; i< players.length;i++){
										if (id == players[i].getId()){
												var bonusMessage = players[i].getBonusMessage();
												messageSend(message,bonusMessage);
												break;
										}
								}
						}
						
						
				}
    },
    
    "roll":{
				permissions: "any",
				description: "Give a number of die with modifier(s) to roll and show result, (1d4 + 10 - 5 or 5d17 - 5). Put sum at the end if you don't want to see the individual rolls.",
				process: function(client,message,args,id){

						var sumFlag = false;
						var advFlag = false;
						var disFlag = false;

						////////////////////////////////// Parsing input
						var totArgs = args.join("").toLowerCase();
						
						if( totArgs.indexOf("sum") != -1){
								sumFlag = true;
								totArgs = totArgs.replace("sum","");
						}
						else{
								if(totArgs.indexOf("adv") != -1)
								{
										advFlag = true;
										totArgs = totArgs.replace("adv","");
								}
								if(totArgs.indexOf("dis") != -1)
								{
										disFlag = true;
										totArgs = totArgs.replace("dis","");
								}	
						}

						if( advFlag && disFlag ){
								advFlag = false;
								disFlag = false;
						}
						
						var rollMessage = "";

						var numDieArr = [];
						var maxDieArr = [];
						var dice = [];
//////
						var buffArr = tools.newGetDice(args.join(" ").toLowerCase());
						dice = buffArr[0];

						for(k = 0; k < dice.length; k++){
								numDieArr.push(Number(dice[k][0]));
								maxDieArr.push(Number(dice[k][1]));
						}

						
						
						console.log(dice);


						var	buff= tools.parseSum(buffArr[1].replace(/ +/g, ""))
						var modifier = Number(buff[0])
						modifier += tools.getModFromString(players,id,tools.parseStringForStat(buffArr[1]));
						console.log("modifier: " + modifier);


					

						rollMessage = tools.getRollMessage(numDieArr,maxDieArr, modifier, players, id, sumFlag, advFlag, disFlag);
						
						messageSend(message,rollMessage);
						
						
						
						
				}
    },
		
    "aliases":{
				permissions: "any",
				description: "Shows the aliases of all the different stats and skills that roll and notes can understand.",
				process: function(client,message,args,id){
						var aliasMessage = tools.getAliases();
						messageSend(message, aliasMessage, "", "\n\n");
				}
		},
		
    "gold":{
				permissions: "any",
				description: "Shows the party's gold. Can be added and subtracted from (i.e. +100 - 50 +...).",
				process: function(client,message,args,id){
						
						var goldMessage = "";
						totArgs = args.join("");
						if (totArgs.length < 1){}
						else {
								if(tools.parseStringForStat(args.join(" ")) == "div"){

										var numPlayers = players.length - 1;

										var divGold = Number(gold/numPlayers).toFixed(2);
										goldMessage += "Dividing " + Number(gold).toFixed(2) + "gp amongst the party into " + tools.inWords(numPlayers) + " parts of " + divGold + "gp.\n";
										var divMessage = Array(goldMessage.length).join("-");
										goldMessage += divMessage + '\n';
										var max = 0;
										for(i = 0; i < players.length; i++){
												if(players[i].getId() != config.DM_ID){
														console.log(players[i].getGold());
														console.log(divGold);
														players[i].setGold(Number(Number(players[i].getGold()) +Number( divGold)).toFixed(2));
														console.log(players[i].getGold());

														var buffMessage = "Adding " + divGold + " to " + players[i].getName() + "'s gold.\n" 
														if (buffMessage.length > max){
																max = buffMessage.length;
														}

														
														goldMessage += buffMessage
												}
										}
										gold = 0;

										max = Math.max(max, String("Total gold: " + Number(gold).toFixed(2) + "gp\n").length);
										divMessage = Array(max).join("-");
										goldMessage += divMessage + '\n';
										
										
										
										
								}
								else if( tools.parseStringForStat(args.join(" ")) == "give"){
										for(k = 0; k < players.length; k++){
												//			console.log(i + " " + players[i].getName() + " " + players[i].getGold());

												if(id == players[k].getId()){
														var giveGold = 0;
														var index = tools.findNumberIndex(args.join(" "));
														if( index == -1){
																var re = new RegExp("\\ball\\b");
																if( args.join(" ").match(re) != null){
																		giveGold = players[k].getGold();
																}
																else{
																		goldMessage += "Please state how much gold you want to give to the party.\n"
																		messageSend(message, goldMessage);
																		return;
																}
														}
														else{
																giveGold = tools.parseNumberFromString(index, args.join(" "));
														}
														if(giveGold > players[k].getGold()){
																giveGold = players[k].getGold();
														}
														players[k].setGold(Number(Number(players[k].getGold()) - Number( giveGold)).toFixed(2));
														gold = Number(Number(gold) +  Number(giveGold));
														goldMessage += players[k].getName() + " has given " + String(Number(giveGold).toFixed(2)) + "gp to the party.\n";
														break;
												}
												
												
										}
								}
								else if( tools.parseStringForStat(args.join(" ")) == "take"){
										for(k = 0; k < players.length; k++){
												//			console.log(i + " " + players[i].getName() + " " + players[i].getGold());

												if(id == players[k].getId()){
														var takeGold = 0;
														var index = tools.findNumberIndex(args.join(" "));
														if( index == -1){
																var re = new RegExp("\\ball\\b");
																if( args.join(" ").match(re) != null){
																		takeGold = gold;
																}
																else{
																		goldMessage += "Please state how much gold you want to take from the party.\n"
																		messageSend(message, goldMessage);
																		return;
																}
														}
														else{
																takeGold = tools.parseNumberFromString(index, args.join(" "));
														}
														if(takeGold > gold){
																takeGold = gold;
														}
														players[k].setGold(Number(Number(players[k].getGold()) + Number( takeGold)).toFixed(2));
														gold = Number(Number(gold) -  Number(takeGold));
														goldMessage += players[k].getName() + " has taken " + String(Number(takeGold).toFixed(2)) + "gp from the party.\n";
														break;
												}
												
												
										}
								}
								
								else{
										var goldBuff = Number(tools.parseSum(totArgs)[0]);
										gold = Number(Number(gold) +  Number(goldBuff));
										if(goldBuff >= 0){
												goldMessage += "Adding " + Number(goldBuff).toFixed(2) + "gp\n";
										} 
										else if(goldBuff < 0){
												goldMessage += "Removing " + Number(goldBuff).toFixed(2) + "gp\n";
										}
								}
						}
						
						
						goldMessage += "Total gold: " + Number(gold).toFixed(2) + "gp\n";
						messageSend(message,goldMessage);
						
						
				}
				
				
    },

		"mygold":{
				permissions: "any",
				description: "Shows your personal gold. Can be added and subtracted from (i.e. +100 - 50 +...).",
				process: function(client,message,args,id){
						
						var goldMessage = "";
						totArgs = args.join("");
						for(k=0; k < players.length;k++){
								if(id == players[k].getId()){
										console.log(players[k].getName());
										if (totArgs.length < 1){}
										else {

												if( (tools.parseStringForStat(args.join(" ")) == "take") || (tools.parseStringForStat(args.join(" ")) == "give") ){
														commands["gold"].process(client, message, args, id)
														return;
												}
												
												var goldBuff = Number(tools.parseSum(totArgs)[0]);
												players[k].setGold(Number(Number(players[k].getGold()) +  Number(goldBuff)));
												if(goldBuff >= 0){
														goldMessage += "Adding " + Number(goldBuff).toFixed(2) + "gp\n";
												} 
												else if(goldBuff < 0){
														goldMessage += "Removing " + Number(goldBuff).toFixed(2) + "gp\n";
												}
										}
										
										goldMessage += players[k].getName() + "'s total gold: " + Number(players[k].getGold()).toFixed(2) + "gp\n";
										messageSend(message,goldMessage);
										break;
										
								}
						}
				}
    },

		
    
    "play":{
				permissions: restrictPlay,
				description: "Give end of youtube address (everything after watch?v=) to play audio.",
				process: function(client,message,args,id=0){
						if( args.length >= 1){
								const streamOptions = {seek: 0, volume: 1};
								var video_id = args[0];
								
								var playMessage = "Playing " + args[0];
								messageSend(message, playMessage);
								var stream = ytdl("https://www.youtube.com/watch?v=" + video_id, {filter: 'audioonly'});
								//console.log("Streaming audio from https://www.youtube.com/watch?v=" + video_id );	
								dispatcher = client.voiceConnections.first().playStream(stream, streamOptions);
   							
						}
				}
    },
    "stop":{
				permissions: restrictPlay,
				description: "Stops audio.",
				process: function(client,message,args,id=0){
						var stopMessage = "Stopping stream.";
						messageSend(message, stopMessage);
						dispatcher.end();
				}
    },
    "pause":{
				permissions: restrictPlay,
				description: "Pauses audio.",
				process: function(client,message,args,id=0){
						var pauseMessage = "Pausing stream.";
						messageSend(message, pauseMessage);
 						dispatcher.pause();
				}
    },
    "resume":{
				permissions: restrictPlay,
				description: "Resumes audio.",
				process: function(client,message,args,id=0){
						var resumeMessage = "Resuming stream.";
						messageSend(message, resumeMessage);
						dispatcher.resume();
				}
    },
    "restrict":{
				permissions: "administrator",
				description: "",
				process: function(client,message,args,id=0){
						
						var restrictMessage = "Setting music restrictions from " + restrictPlay + " to ";
 						restrictPlay = "administrator";
						restrictMessage += restrictPlay + "\n"; 
						messageSend(message,restrictMessage);
						
				}
    },
    "unrestrict":{
				permissions: "administrator",
				description: "",
				process: function(client,message,args,id=0){
						
						var restrictMessage = "Setting music restrictions from " + restrictPlay + " to ";
 						restrictPlay = "any";
						restrictMessage += restrictPlay + "\n"; 
						messageSend(message,restrictMessage);
						
				}
    },

    "players":{
				permissions: "any",
				description: "Shows the list of players.",
				process: function(client,message,args,id=0){
						var playersMessage= "";
						
						var buffMessage = "";
						var regionSize = 25;
						var maxSize = 0;
						
						var playersHeader = "Name" + Array(regionSize - String("Name").length).join(" ") + "Level" + Array(regionSize - String("Level").length).join(" ") + "Class" + Array(regionSize - String("Class").length).join(" ") + "Gold" +  "\n"; 
						
						for(i = 0; i < players.length; i++){
								if(players[i].getClass() != "Dungeon Master"){
										buffMessage += players[i].getName() + Array(regionSize - String(players[i].getName()).length).join(" ") + "Level " + players[i].getLevel() + Array(regionSize - String("Level " + players[i].getLevel()).length).join(" ") + players[i].getClass() + Array(regionSize - String(players[i].getClass()).length).join(" ") + String(Number(players[i].getGold()).toFixed(2)) + "gp" +  "\n"; 
										
										if(players[i].getClass().length > maxSize){
												maxSize = players[i].getClass().length;
										}
										
										
								}	
						}
						
						playersMessage += playersHeader + Array(3*regionSize + maxSize -1).join("-") + "\n" + buffMessage;
						
						messageSend(message, playersMessage);
						
						
				}
				
				
				
    },
    
    "defs":{
				permissions: "any",
				description: "Shows the list of players' defenses and combat related stats.",
				process: function(client,message,args,id=0){
						var defsMessage= "";
						
						var buffMessage = "";
						var regionSize = 10;
						var nameregionSize =30;
						var maxSize = 0;
						
						var defsHeader = "Name" + Array(nameregionSize - String("Name").length).join(" ") + "AC" + Array(regionSize - String("AC").length).join(" ") + "INIT" + Array(regionSize - String("INIT").length).join(" ") + "SPD" + Array(regionSize - String("SPD").length).join(" ")  + "PER" + Array(regionSize - String("PER").length).join(" ")  +  "HP" + "\n"; 
						
						for(i = 0; i < players.length; i++){
								
								if(players[i].getClass() != "Dungeon Master"){
										buffMessage += players[i].getName() + Array(nameregionSize - String(players[i].getName()).length).join(" ")  + players[i].getAc() + Array(regionSize - String(players[i].getAc()).length).join(" ") + players[i].getInit() + Array(regionSize - String(players[i].getInit()).length).join(" ") + players[i].getSpd() + Array(regionSize - String(players[i].getSpd()).length).join(" ") + players[i].getPer() + Array(regionSize - String(players[i].getPer()).length).join(" ") + players[i].getHp() + "\n"; 
										
										if(String(players[i].getSpd()).length > maxSize){
												maxSize = String(players[i].getSpd()).length;
												
										}
										
								}	
						}
						
						maxSize = Math.max(defsHeader.length, 2*regionSize + nameregionSize + maxSize);
						
						defsMessage += defsHeader + Array(maxSize).join("-") + "\n" + buffMessage;
						
						messageSend(message,defsMessage);
						
				}

    },
    "notes":{
				permissions: "any",
				description: 'You can "add" or "remove"/"rm" notes about your characters. You can also give me the first name of any players to view their notes. These notes are parsed for any additional modifiers your character recieves, which can be view using '  + config.prefix + 'bonuses command. This means you can give me a note like "My Ring of Names give me +4 to PER/perception" and I will update your stats accordingly.',
				process: function(client,message,args,id){
						notesMessage = "";
						var playerNotes = false;
						
						if(args.length > 0){
								for(i=0; i< players.length;i++){
										var playerName = players[i].getName().toLowerCase();
										
										if( playerName.indexOf(" ") > -1){
												if( playerName.slice(0, playerName.indexOf(" ")) == args[0].toLowerCase()  ){
														var notesMessage = players[i].getNotesMessage();
														playerNotes = true;
														break;
												}
										}
										
										name = String(args.join(" ")).toLowerCase();
										if (name == players[i].getName().toLowerCase()){
												var notesMessage = players[i].getNotesMessage();
												playerNotes = true;
												break;
										}
								}
						}
						
						else{
								for(i = 0; i < players.length; i++){
										if(players[i].getId() == id){
												notesMessage = players[i].getNotesMessage();
												playerNotes = true;
												break;
										}
								}
								
						}
						
						
						
						
						if(playerNotes == false){
								if(args[0] == "add"){
										args.shift();
										var note = message.content.replace("\\notes","");
										note = note.replace("add", "");
										note = note.replace(/^\s+|\s+$/g, "");
										for(i = 0; i < players.length; i++){
												if(players[i].getId() == id){
														var notesBuff = players[i].getNotes();
														notesBuff.push(note);
														players[i].setNotes(notesBuff);
														notesMessage += "Added to " + players[i].getName() + "'s notes.\n";
														players[i].parseNotes();
														break;
												}
										}
								}
								else if (args[0] == "rm" || args[0] == "remove") {
										if( args.length == 1){
												notesMessage += "Please specify which note to remove.";
										}
										else{
												for(i = 0; i < players.length; i++){
														if(players[i].getId() == id){
																var notesBuff = players[i].getNotes();
																var newNotes = [];
																var rmFlag = false;
																
																for(j = 0; j < notesBuff.length; j++){
																		var addFlag = true;
																		for(k = 1; k < args.length; k++){
																				if( args[k] == String(Number(j+1)) ){
																						addFlag = false;
																						rmFlag = true;
																						break;
																				}
																				
																		}
																		if(addFlag){
																				newNotes.push(notesBuff[j]);
																		}
																		else{
																				notesMessage += "Removing note (" + String(j+1) + ") from " + players[i].getName() + "'s notes.\n";
																		}
																		
																}
																if(rmFlag == false){
																		notesMessage += "I cannot remove notes that do not exist!";
																}
																
																players[i].setNotes(newNotes);
																players[i].parseNotes();
																break;
														}
														
												}
										}
								}
								else{
										for(i = 0; i < players.length; i++){
												if(players[i].getId() == id){
														notesMessage = players[i].getNotesMessage();
												}
										}
										
								}
						}
						
						
						messageSend(message,notesMessage);
				}
    },
		"inv" : {
				permissions: "any",
				description: 'You can "add" or "remove"/"rm" items in your characters\' inventory.',
				process: function(client,message,args,id){
						invMessage = "";
						var playerInv = false;
						
						if(args.length > 0){
								for(i=0; i< players.length;i++){
										var playerName = players[i].getName().toLowerCase();
										
										if( playerName.indexOf(" ") > -1){
												if( playerName.slice(0, playerName.indexOf(" ")) == args[0].toLowerCase()  ){
														var invMessage = players[i].getInvMessage();
														playerInv = true;
														break;
												}
										}
										
										name = String(args.join(" ")).toLowerCase();
										if (name == players[i].getName().toLowerCase()){
												var invMessage = players[i].getInvMessage();
												playerInv = true;
												break;
										}
								}
						}
						
						else{
								for(i = 0; i < players.length; i++){
										if(players[i].getId() == id){
												invMessage = players[i].getInvMessage();
												playerInv = true;
												break;
										}
								}
								
						}
						
						
						
						
						if(playerInv == false){
								if(args[0] == "add"){
										args.shift();
										var inv = message.content.replace("\\inv","");
										inv = inv.replace("add", "");
										inv = inv.replace(/^\s+|\s+$/g, "");
										for(i = 0; i < players.length; i++){
												if(players[i].getId() == id){
														var invBuff = players[i].getInventory();
														invBuff.push(inv);
														players[i].setInventory(invBuff);
														invMessage += "Added to " + players[i].getName() + "'s inventory.\n";
														break;
												}
										}
								}
								else if (args[0] == "rm" || args[0] == "remove") {
										if( args.length == 1){
												invMessage += "Please specify which item to remove.";
										}
										else{
												for(i = 0; i < players.length; i++){
														if(players[i].getId() == id){
																var invBuff = players[i].getInventory();
																var newInv = [];
																var rmFlag = false;
																
																for(j = 0; j < invBuff.length; j++){
																		var addFlag = true;
																		for(k = 1; k < args.length; k++){
																				if( args[k] == String(Number(j+1)) ){
																						addFlag = false;
																						rmFlag = true;
																						break;
																				}
																				
																		}
																		if(addFlag){
																				newInv.push(invBuff[j]);
																		}
																		else{
																				invMessage += "Removing item (" + String(j+1) + ") from " + players[i].getName() + "'s inventory.\n";
																		}
																		
																}
																if(rmFlag == false){
																		invMessage += "I cannot remove items that do not exist!";
																}
																
																players[i].setInventory(newInv);
																break;
														}
														
												}
										}
								}
								else{
										for(i = 0; i < players.length; i++){
												if(players[i].getId() == id){
														invMessage = players[i].getInvMessage();
												}
										}
										
								}
						}
						
						
						messageSend(message,invMessage);
				}
    }

		
}
function checkMessageForCommand(message, isEdit) {
    //filter for prefix and bots
    if(message.author.bot || message.content.indexOf(config.prefix) !== 0 ){
				return;
    }
    
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();

    if(command == "help") {
				var dashSpace = "--      ";
				var frontLength = 11;
				var helpMessage = "";
				helpMessage +=	"help" + Array(frontLength - String("help").length).join(" ") + dashSpace + "Shows this text.\n\n";
				for( com in commands){
						if( commands.hasOwnProperty(com) && commands[com].description != "") {
								var discordMax = config.discordWidth;
								var descLength = String(commands[com].description).length;
								var descArr = [];
								descLength += frontLength + dashSpace.length;
								var arrBuff = String(commands[com].description).split("\n");
								
								var k = 0;
								while( k < arrBuff.length) {
										if( (arrBuff[k].length + frontLength +dashSpace.length) >= discordMax) {
												var maxIndex = discordMax - (frontLength+ dashSpace.length);
												var buffString = "";
												var newIndex = tools.findSpace(arrBuff[k],maxIndex);
												// 	if(newIndex == maxIndex || newIndex < maxIndex - 15){ 
												// 					buffString = arrBuff[k].slice(maxIndex);
												// 					arrBuff[k] = arrBuff[k].replace(buffString,"-");
												// 					buffString = "-" + buffString;
												// 			}
												// //	
												//	else{
												buffString = arrBuff[k].slice(newIndex);
												arrBuff[k] = arrBuff[k].replace(buffString, "");
												//		}
												if( k < arrBuff.length - 1){
														arrBuff[k+1] = buffString + " " + arrBuff[k+1];
												}
												else{
														arrBuff.push(buffString);
												}
												
												
												
										}
										k++;
								}
								
								helpMessage +=	String(com) + Array(frontLength - String(com).length).join(" ");
								var frontSpace = Array(frontLength).join(" ");
								for(k=0; k < arrBuff.length;k++){
										if(k == 0){
												helpMessage += dashSpace + arrBuff[k] + "\n";
										}
										else{
												helpMessage += frontSpace + Array(dashSpace.length).join(" ")  + arrBuff[k] + "\n";
										}
								}
								helpMessage += "\n";
								//notesMessage += "(" + String(Number(j + 1)) + ")" + Array(space).join(" ") +  notesBuff[j] + "\n\n";
						}
						
						
						
				}
				
				
				messageSend(message, helpMessage, "", "\n\n" );
				return;
				
    }
    var cmd = commands[command];
    if(String(cmd) == "undefined"){
				return;
    }

    var id = 0;
    if (message.channel.type == "dm"){
				id = message.channel.recipient.id;

    }

    else{
				id = message.member.id;
    }

	
    if( (cmd.permissions == "administrator" && (perm.admin.indexOf(id) > -1))|| cmd.permissions == "any" ){
				try{
						cmd.process(client,message,args,id);
				} catch(e){
						var msgTxt = "command " + command + " failed :(\n";
						if(config.debug){
								msgTxt +=  e.stack;
						}

						messageSend(message,msgTxt);
				}
    }
    else{
				msgTxt = "You do not have the neccesarry permissions for this command.\n";
				messageSend(message,msgTxt);
    }

}


client.on("message", async message => {
    checkMessageForCommand(message, false);	
});


client.login(config.token);

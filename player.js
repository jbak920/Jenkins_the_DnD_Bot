
var fs = require('fs');
var tools = require("./tools.js"); 



function Player() {
		this._id = 0;
		this._name = "";	
		//Player Level
		this._level = 0;
		this._class = "";
		//Stats
		this._str = 0;
		this._dex = 0;
		this._con = 0;
		this._int = 0;
		this._wis = 0;
		this._cha = 0;
		//modifiers
		this._strmod = 0;
		this._dexmod = 0;
		this._conmod = 0;
		this._intmod = 0;
		this._wismod = 0;
		this._chamod = 0;
		this.profbonus=0;
		//Armor stuff
		this._ac  = 0;
		this._init = 0;	
		this._spd = 0;
		this._per = 0;
		//HP
		this._hp = 0;
		//skills
		//strength
		this._strsavprof	= 0;
		this._athprof		= 0;
		//dex
		this._dexsavprof 	= 0;
		this._acroprof		= 0;
		this._sleightprof 	= 0;
		this._stealthprof 	= 0;
		//con
		this._consavprof	= 0;
		//int
		this._intsavprof	= 0;
		this._arcanaprof	= 0;
		this._historyprof	= 0;
		this._investprof	= 0;
		this._natureprof	= 0;
		this._religionprof	= 0;

		//wisdom
		this._wissavprof	= 0;
		this._animalprof	= 0;
		this._insightprof	= 0;
		this._medicineprof	= 0;
		this._perprof		= 0;
		this._survprof		= 0;
		//cha
		this._chasavprof	= 0;
		this._deceptprof	= 0;
		this._intimprof		= 0;
		this._performprof	= 0;	
		this._persprof		= 0;
		//additional modifiers
		this._stradd = 0;
		this._dexadd = 0;
		this._conadd = 0;
		this._intadd = 0;
		this._wisadd = 0;
		this._chaadd = 0;
		//modifiers

		this.profbonusadd=0;
		//Armor stuff
		this._acadd  = 0;
		this._initadd = 0;	
		this._spdadd = 0;
		this._peradd = 0;
		this._hpadd = 0;
		//skills
		//strength
		this._strsavadd	= 0;
		this._athadd		= 0;
		//dex
		this._dexsavadd 	= 0;
		this._acroadd		= 0;
		this._sleightadd 	= 0;
		this._stealthadd 	= 0;
		//con
		this._consavadd	= 0;
		//int
		this._intsavadd	= 0;
		this._arcanaadd	= 0;
		this._historyadd	= 0;
		this._investadd	= 0;
		this._natureadd	= 0;
		this._religionadd	= 0;

		//wisdom
		this._wissavadd	= 0;
		this._animaladd	= 0;
		this._insightadd	= 0;
		this._medicineadd	= 0;
		this._peradd		= 0;
		this._survadd		= 0;
		//cha
		this._chasavadd	= 0;
		this._deceptadd	= 0;
		this._intimadd		= 0;
		this._performadd	= 0;	
		this._persadd		= 0;

		//Notes:
		
		this._notes			="0";	
}



Player.prototype = {
		getId: function(){
				return this._id;
		},

		getName: function(){
				return this._name;
		},
		getLevel: function(){
				return this._level;
		},
		getClass: function(){
				return this._class;
		},	
		getStr: function(){
				return this._str;
		},
		getDex: function(){
				return this._dex;
		},
		getCon: function(){
				return this._con;
		},
		getInt: function(){
				return this._int;
		},
		getWis: function(){
				return this._wis;
		},
		getCha: function(){
				return this._cha;
		},

		getStrmod: function(){
				return this._strmod;
		},
		getDexmod: function(){
				return this._dexmod;
		},
		getConmod: function(){
				return this._conmod;
		},
		getIntmod: function(){
				return this._intmod;
		},
		getWismod: function(){
				return this._wismod;
		},
		getChamod: function(){
				return this._chamod;
		},
		getProfbonus: function(){
				return this._profbonus;
		},

		getAc: function(){
				return this._ac;
		},
		getInit: function(){
				return this._init;
		},
		getSpd: function(){
				return this._spd;
		},
		getHp: function(){
				return this._hp;
		},
		getPer: function(){
				return this._per;
		},

		//strength
		getStrsavprof: function(){
				return this._strsavprof;
		},
		getAthprof: function(){
				return this._athprof;
		},
		//dex
		getDexsavprof: function(){
				return this._dexsavprof;
		},
		getAcroprof: function(){
				return this._acroprof;
		},	
		getSleightprof: function(){
				return this._sleightprof;
		},
		getStealthprof: function(){
				return this._stealthprof;
		},
		//con
		getConsavprof: function(){
				return this._consavprof;
		},
		//int
		getIntsavprof: function(){
				return this._intsavprof;
		},
		getArcanaprof: function(){
				return this._arcanaprof;
		},
		getHistoryprof: function(){
				return this._historyprof;
		},
		getInvestprof: function(){
				return this._investprof;
		},
		getNatureprof: function(){
				return this._natureprof;
		},
		getReligionprof: function(){
				return this._religionprof;
		},
		//wisdom
		getWissavprof: function(){
				return this._wissavprof;
		},	
		getAnimalprof: function(){
				return this._animalprof;
		},
		getInsightprof: function(){
				return this._insightprof;
		},
		getMedicineprof: function(){
				return this._medicineprof;
		},
		getPerprof: function() {
				return  this._perprof;
		},
		getSurvprof: function() {
				return  this._survprof;
		},

		//cha
		getChasavprof: function() {
				return  this._chasavprof;
		},
		getDeceptprof: function() {
				return  this._deceptprof;
		},
		getIntimprof: function() {
				return  this._intimprof;
		},
		getPerformprof: function() {
				return  this._performprof;
		},
		getPersprof: function() {
				return  this._persprof;
		},
		getStradd: function(){
				return this._stradd;
		},
		getDexadd: function(){
				return this._dexadd;
		},
		getConadd: function(){
				return this._conadd;
		},
		getIntadd: function(){
				return this._intadd;
		},
		getWisadd: function(){
				return this._wisadd;
		},
		getChaadd: function(){
				return this._chaadd;
		},

		getProfbonusadd: function(){
				return this._profbonusadd;
		},

		getAcadd: function(){
				return this._acadd;
		},
		getInitadd: function(){
				return this._initadd;
		},
		getSpdadd: function(){
				return this._spdadd;
		},
		getHpadd: function(){
				return this._hpadd;
		},
		getPeradd: function(){
				return this._peradd;
		},
		///////
		getStrsavadd: function(){
				return this._strsavadd;
		},
		getAthadd: function(){
				return this._athadd;
		},
		//dex
		getDexsavadd: function(){
				return this._dexsavadd;
		},
		getAcroadd: function(){
				return this._acroadd;
		},	
		getSleightadd: function(){
				return this._sleightadd;
		},
		getStealthadd: function(){
				return this._stealthadd;
		},
		//con
		getConsavadd: function(){
				return this._consavadd;
		},
		//int
		getIntsavadd: function(){
				return this._intsavadd;
		},
		getArcanaadd: function(){
				return this._arcanaadd;
		},
		getHistoryadd: function(){
				return this._historyadd;
		},
		getInvestadd: function(){
				return this._investadd;
		},
		getNatureadd: function(){
				return this._natureadd;
		},
		getReligionadd: function(){
				return this._religionadd;
		},
		//wisdom
		getWissavadd: function(){
				return this._wissavadd;
		},	
		getAnimaladd: function(){
				return this._animaladd;
		},
		getInsightadd: function(){
				return this._insightadd;
		},
		getMedicineadd: function(){
				return this._medicineadd;
		},
		getPeradd: function() {
				return  this._peradd;
		},
		getSurvadd: function() {
				return this._survadd;
		},

		//cha
		getChasavadd: function() {
				return this._chasavadd;
		},
		getDeceptadd: function() {
				return this._deceptadd;
		},
		getIntimadd: function() {
				return this._intimadd;
		},
		getPerformadd: function() {
				return this._performadd;
		},
		getPersadd: function() {
				return this._persadd;
		},

		//////
		
		getNotes:   function(){
				return this._notes;
		},

		// Setting functions:
		setName: function(name){
				this._name = name;
		},
		setLevel: function(level){
				this._level = level;
		},
		setClass: function(Class){
				this._class = Class;
		},	
		setStr: function(str){
				this._str = str;
		},
		setDex: function(dex){
				this._dex = dex;
		},
		setCon: function(con){
				this._con = con;
		},
		setInt: function(int){
				this._int = int;
		},
		setWis: function(wis){
				this._wis = wis;
		},
		setCha: function(cha){
				this._cha = cha;
		},


		setAc: function(ac){
				this._ac = ac;
		},
		setInit: function(init){
				this._init = init;
		},
		setSpd: function(spd){
				this._spd = spd;
		},
		//HP
		setHp: function(hp){
				this._hp = hp;
		},
		setPerprof: function(perprof){
				this._perprof = perprof;
		},
		//modifiers
		setStradd: function(str){
				this._stradd = str;
		},
		setDexadd: function(dex){
				this._dexadd = dex;
		},
		setConadd: function(con){
				this._conadd = con;
		},
		setIntadd: function(int){
				this._intadd = int;
		},
		setWisadd: function(wis){
				this._wisadd = wis;
		},
		setChaadd: function(cha){
				this._chaadd = cha;
		},
		setAcadd: function(acadd){
				this._acadd = acadd;
		},
		setInitadd: function(initadd){
				this._initadd = initadd;
		},
		setSpdadd: function(spdadd){
				this._spdadd = spdadd;
		},
		//HP
		setHpadd: function(hpadd){
				this._hpadd = hpadd;
		},
		setPeradd: function(peradd){
				this._peradd = peradd;
		},
		///////////////////////////////
		
		setStrsavadd: function(strsavadd){
				this._strsavadd = strsavadd;
		},
		setAthadd: function(athadd){
				this._athadd = athadd;
		},
		setDexsavadd: function(dexsavadd){
				this._dexsavadd = dexsavadd;
		},
		setAcroadd: function(acroadd){
				this._acroadd = acroadd;
		},	
		setSleightadd: function(sleightadd){
				this._sleightadd = sleightadd;
		},
		setStealthadd: function(stealthadd){
				this._stealthadd = stealthadd;
		},
		setConsavadd: function(consavadd){
				this._consavadd = consavadd;
		},
		setIntsavadd: function(intsavadd){
				this._intsavadd = intsavadd;
		},
		setArcanaadd: function(arcanaadd){
				this._arcanaadd = arcanaadd;
		},
		setHistoryadd: function(historyadd){
				this._historyadd = historyadd;
		},
		setInvestadd: function(investadd){
				this._investadd = investadd;
		},
		setNatureadd: function(natureadd){
				this._natureadd = natureadd;
		},
		setReligionadd: function(religionadd){
				this._religionadd = religionadd;
		},
		//wisdom
		setWissavadd: function(wissavadd){
				this._wissavadd = wissavadd;
		},	
		setAnimaladd: function(animaladd){
				this._animaladd = animaladd;
		},
		setInsightadd: function(insightadd){
				this._insightadd = insightadd;
		},
		setMedicineadd: function(medicineadd){
				this._medicineadd = medicineadd;
		},
		setPeradd: function(peradd){
				this._peradd = peradd;
		},
		setSurvadd: function(survadd){
				this._survadd = survadd;
		},

		//cha
		setChasavadd: function(chasavadd){
				this._chasavadd = chasavadd;
		},
		setDeceptadd: function(deceptadd){
				this._deceptadd = deceptadd;
		},
		setIntimadd: function(intimadd){
				this._intimadd = intimadd;
		},
		setPerformadd: function(performadd){
				this._performadd = performadd;
		},
		setPersadd: function(persadd){
				this._persadd = persadd;
		},


		/////////////////////////////

		
		setNotes: function(notes){
				this._notes = notes;
		},

		
		getStatsMessage: function(){


				//	var perProf = this.getPerception();
				//	var perModifier = String(10 + this.getWismod() + this.getProfbonus()*this.getPerception());


				var statsMessage = "";
				var space = 4;
				var headerLength = String(this.getName()).length + String("Level ").length + String(this.getLevel()).length + String(this.getClass()).length;


				var defHeader = "AC = " + this.getAc() + "   |   INIT = " + this.getInit() + "   |   SPD = " + this.getSpd() + "   |   PER = " + this.getPer() + "   |   HP = " + this.getHp() + "\n";

				if(defHeader.length > headerLength){
						space = Math.ceil((defHeader.length - headerLength)/2) +1;
				}



				var messageHeader = this.getName() + Array(space).join(" ") + "Level " + this.getLevel() + Array(space).join(" ") + this.getClass() + "\n";

				fillerLength = Math.max(messageHeader.length, defHeader.length);

				var messagefiller = Array(fillerLength).join("-") + "\n";
				var deffiller = Array(defHeader.length).join("-") + "\n";
				
				statsMessage += messageHeader + messagefiller + defHeader + messagefiller;
				statsMessage += "STR = " + Number(Number(this.getStr()) + Number(this.getStradd())) + " (" + String(this.getStrmod()) + ")\n";
				statsMessage += "DEX = " + Number(Number(this.getDex()) + Number(this.getDexadd())) + " (" + String(this.getDexmod()) + ")\n";
				statsMessage += "CON = " + Number(Number(this.getCon()) + Number(this.getConadd())) + " (" + String(this.getConmod()) + ")\n";
				statsMessage += "INT = " + Number(Number(this.getInt()) + Number(this.getIntadd())) + " (" + String(this.getIntmod()) + ")\n";
				statsMessage += "WIS = " + Number(Number(this.getWis()) + Number(this.getWisadd())) + " (" + String(this.getWismod()) + ")\n";
				statsMessage += "CHA = " + Number(Number(this.getCha()) + Number(this.getChaadd())) + " (" + String(this.getChamod()) + ")\n";


				var profMessage = "Proficiency Bonus = " + this.getProfbonus() + "\n";

				var filler = Array(profMessage.length).join("-") + "\n";

				statsMessage += filler + profMessage;

				return statsMessage;

		},



		getSkillsMessage: function(){

				var skillsMessage = "";
				var space = 30;
				var messageHeader = this.getName() + Array(space - this.getName().length).join(" ") +  "\n";
				skillsMessage += messageHeader + Array(messageHeader.length).join("-")  + "\n";

				skillsMessage += "S| STR Saving Throw  |" + tools.getProf(this.getStrsavprof()) + "| (" + String(Number(Number(this.getStrmod()) + Number(this.getProfbonus())*Number(this.getStrsavprof()) + Number(this.getStrsavadd()))) + ")" +  "\n"; 
				skillsMessage += "T| Athletics         |" + tools.getProf(this.getAthprof()) + "| (" + String(Number(Number(this.getStrmod()) +  Number(this.getProfbonus())*Number(this.getAthprof()) + Number(this.getAthadd()))) + ")" + "\n"; 	
				skillsMessage += "R|                   | |" + "\n"; 
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"
				//dex

				skillsMessage += "D| DEX Saving Throw  |" + tools.getProf(this.getDexsavprof()) + "| (" + String(Number(Number(this.getDexmod()) +  Number(this.getProfbonus())*Number(this.getDexsavprof()) + Number(this.getDexsavadd()))) + ")" + "\n"; 
				skillsMessage += "E| Acrobatics        |" + tools.getProf(this.getAcroprof()) + "| (" + String(Number(Number(this.getDexmod()) +  Number(this.getProfbonus())*Number(this.getAcroprof()) + Number(this.getAcroadd()))) + ")" + "\n"; 	
				skillsMessage += "X| Sleight of Hand   |" + tools.getProf(this.getSleightprof()) + "| (" + String(Number(Number(this.getDexmod()) +  Number(this.getProfbonus())*Number(this.getSleightprof()) + Number(this.getSleightadd()))) + ")" + "\n"; 
				skillsMessage += " | Stealth           |" + tools.getProf(this.getStealthprof()) + "| (" + String(Number(Number(this.getDexmod()) +  Number(this.getProfbonus())*Number(this.getStealthprof()) + Number(this.getStealthadd()))) + ")" +"\n"; 
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"
				//con
				skillsMessage += "C| CON Saving Throw  |" + tools.getProf(this.getConsavprof()) + "| (" + String(Number(Number(this.getConmod()) +  Number(this.getProfbonus())*Number(this.getConsavprof()) + Number(this.getConsavadd()))) + ")" + "\n"; 
				skillsMessage += "O|                   | |" + "\n"; 	
				skillsMessage += "N|                   | |" + "\n"; 
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"
				//int
				skillsMessage += "I| INT Saving Throw  |" + tools.getProf(this.getIntsavprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getIntsavprof()) + Number(this.getIntsavadd()))) + ")" + "\n"; 
				skillsMessage += "N| Arcana            |" + tools.getProf(this.getArcanaprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getArcanaprof()) + Number(this.getArcanaadd()))) + ")" + "\n"; 	
				skillsMessage += "T| History           |" + tools.getProf(this.getHistoryprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getHistoryprof()) + Number(this.getHistoryadd()))) + ")" + "\n"; 
				skillsMessage += " | Investigation     |" + tools.getProf(this.getInvestprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getInvestprof()) + Number(this.getInvestadd()))) + ")" + "\n"; 
				skillsMessage += " | Nature            |" + tools.getProf(this.getNatureprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getNatureprof()) + Number(this.getNatureadd()))) + ")" + "\n"; 
				skillsMessage += " | Religion          |" + tools.getProf(this.getReligionprof()) + "| (" + String(Number(Number(this.getIntmod()) +  Number(this.getProfbonus())*Number(this.getReligionprof()) + Number(this.getReligionadd()))) + ")" + "\n"; 		
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"
				//wis
				skillsMessage += "W| WIS Saving Throw  |" + tools.getProf(this.getWissavprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getWissavprof()) + Number(this.getWissavadd()))) + ")"+ "\n"; 
				skillsMessage += "I| Animal Handling   |" + tools.getProf(this.getAnimalprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getAnimalprof()) + Number(this.getAnimaladd()))) + ")"+ "\n"; 	
				skillsMessage += "S| Insight           |" + tools.getProf(this.getInsightprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getInsightprof()) + Number(this.getInsightadd()))) + ")"+ "\n"; 
				skillsMessage += " | Medicine          |" + tools.getProf(this.getMedicineprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getMedicineprof()) + Number(this.getMedicineadd()))) + ")"+ "\n"; 
				skillsMessage += " | Perception        |" + tools.getProf(this.getPerprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getPerprof()) + Number(this.getPeradd()))) + ")"+ "\n"; 	
				skillsMessage += " | Survival          |" + tools.getProf(this.getSurvprof()) + "| (" + String(Number(Number(this.getWismod()) +  Number(this.getProfbonus())*Number(this.getSurvprof()) + Number(this.getSurvadd()))) + ")"+ "\n"; 	
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"
				//cha
				skillsMessage += "C| CHA Saving Throw  |" + tools.getProf(this.getChasavprof()) + "| (" + String(Number(Number(this.getChamod()) +  Number(this.getProfbonus())*Number(this.getChasavprof()) + Number(this.getChasavadd()))) + ")"+ "\n"; 
				skillsMessage += "H| Deception         |" + tools.getProf(this.getDeceptprof()) + "| (" + String(Number(Number(this.getChamod()) +  Number(this.getProfbonus())*Number(this.getDeceptprof()) + Number(this.getDeceptadd()))) + ")"+  "\n"; 	
				skillsMessage += "A| Intimidation      |" + tools.getProf(this.getIntimprof()) + "| (" + String(Number(Number(this.getChamod()) +  Number(this.getProfbonus())*Number(this.getIntimprof()) + Number(this.getIntimadd()))) + ")"+  "\n"; 
				skillsMessage += " | Performance       |" + tools.getProf(this.getPerformprof()) + "| (" + String(Number(Number(this.getChamod()) +  Number(this.getProfbonus())*Number(this.getPerformprof()) + Number(this.getPerformadd()))) + ")"+  "\n"; 
				skillsMessage += " | Persuasion        |" + tools.getProf(this.getPersprof()) + "| (" + String(Number(Number(this.getChamod()) +  Number(this.getProfbonus())*Number(this.getPersprof()) + Number(this.getPersadd()))) + ")"+  "\n"; 	
				skillsMessage += Array(messageHeader.length).join("-")  + "\n"

				return skillsMessage;
		},
		setMods: function(){

				this._strmod = Number(Math.floor((Number(this.getStr()) + Number(this.getStradd()) - 10)/2));
				this._dexmod = Number(Math.floor((Number(this.getDex()) + Number(this.getDexadd()) - 10)/2));
				
				this._conmod = Number(Math.floor((Number(this.getCon()) + Number(this.getConadd()) - 10)/2));
				this._intmod = Number(Math.floor(( Number(this.getInt()) + Number(this.getIntadd()) - 10)/2));

				this._wismod = Number(Math.floor(( Number(this.getWis()) + Number(this.getWisadd()) - 10)/2));
				this._chamod = Number(Math.floor(( Number(this.getCha()) + Number(this.getChaadd()) - 10)/2));
				this._profbonus = Math.floor(( Number(this.getLevel()) + 7)/4) + Number(this.getProfbonusadd());
				
				this._per = 10 + Number(this.getWismod()) + ( Number(this.getProfbonus())) * Number(this.getPerprof()) + Number(this.getPeradd());
				this._ac = Number(this._ac) + Number(this._acadd); 
				this._hp = Number(this._hp) + Number(this._hpadd);
				this._init = Number(this._init) + Number(this._initadd);
				this._spd = Number(this._spd) + Number(this._spdadd);
				//console.log(this.getPer());
		},

}


module.exports = Player;










"use strict";
var API_KEY = "RGAPI-eeec3804-4690-43c1-8d21-4c74a353c63e";
var champName;
var ChampID;
var ChampID2;
var champDataUrl = "https://na1.api.riotgames.com/lol/static-data/v3/champions?locale=en_US&dataById=false&api_key=" + API_KEY;
var champDetailUrl;
var versionDataUrl ="https://na1.api.riotgames.com/lol/static-data/v3/versions?api_key=" + API_KEY;
var version;
//var playerName;
//var playerName2;
//var playerNameNoSpace;
window.onload = init;

function init(){
document.querySelector("#champSearch").onclick = getChampData;
//document.querySelector("#playerSearch").onclick = getPlayerData;
  //showSkills();
  showHideLore();
  showHideSkills();
}
	
// MY FUNCTIONS

//function showSkills(){
//  $(document).ready(function(){
//    $("#champSearch").click(function(){
//        $(".spells").toggle(250);
//    });
//  });
//}

function showHideLore(){
  $(document).ready(function(){
    $("#lore").click(function(){
        $("#champLore").toggle(250);
    });
  });
}

function showHideSkills(){
  $(document).ready(function(){
    $("#abilities").click(function(){
        $(".spells").toggle(250);
    });
  });
}

function getVersionData(){
  // Get data about all champs (id, key, name, title)
  
  $.ajax({
    dataType: "json",
    url: versionDataUrl,
    data: null,
    success: versionDataLoad
  });
}
	
function versionDataLoad(obj){
  // Get champion ID from the JSON file, then load the second JSON file that has ability/passive details
  
  var versionData = obj;
  version = versionData[0];
  //console.log(version);
  getChampDetails();
//  playerIconLoad();
}

function getChampData(){
  // Get data about all champs (id, key, name, title)
  
  champName = document.querySelector('#searchterm').value;
  champName = champName.trim().replace(" ", "");
    if (champName == 'Wukong'){
      champName = 'MonkeyKing';
    }
  $.ajax({
    dataType: "json",
    url: champDataUrl,
    data: null,
    success: champDataLoad
  });
}	
	
function champDataLoad(obj){
  // Get champion ID from the JSON file, then load the second JSON file that has ability/passive details
  
  var champData = obj;
  if(champData.data.hasOwnProperty(champName)){
    var champData2 ='.data.' + champName + '.id';
    ChampID2 = champData.data[champName].id;
    champDetailUrl = "https://na1.api.riotgames.com/lol/static-data/v3/champions/"+ChampID2+"?locale=en_US&tags=all&api_key=" + API_KEY;
    //console.log(champDetailUrl);
    getVersionData();
  }
}
    
function getChampDetails(){
  // Get all details about a (single) champion using the static-data api
  $.ajax({
    dataType: "json",
    url: champDetailUrl,
    data: null,
    success: champDetailLoad
  });
  //console.log(champDetailUrl);
}
    
function champDetailLoad(obj){
  // Change info on screen to match new champion
  
  var champSpellData = obj;
  // Champion Name and Title
  document.querySelector("#champName").innerHTML = champSpellData.name + " " + champSpellData.title;
  // Lore
  document.querySelector("#champLoreData").innerHTML = champSpellData.lore;
  // Splash Art
  document.querySelector("#champSplash").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/img/champion/splash/" + champSpellData.key + "_0.jpg'  alt= '" +  champSpellData.name + " Splash Art'>";
  // Passive
  document.querySelector("#passiveImg").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/passive/" + champSpellData.passive.image.full + "' class='img-responsive img-thumbnail' alt=' " +  champSpellData.name + " Passive'>";
  document.querySelector("#passiveName").innerHTML = 'Passive: ' + champSpellData.passive.name;
  document.querySelector("#passiveDescription").innerHTML = 'Description: ' + champSpellData.passive.sanitizedDescription;
  // First Ability
  document.querySelector("#spell1Img").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + champSpellData.spells[0].image.full + "' class='img-responsive img-thumbnail' alt= '" +  champSpellData.name + " First Ability'>";
  document.querySelector("#spell1Name").innerHTML = 'First Ability: ' + champSpellData.spells[0].name;
  document.querySelector("#spell1Description").innerHTML = 'Description: ' + champSpellData.spells[0].sanitizedDescription;
  document.querySelector("#spell1Cd").innerHTML = 'Cooldown: ' + champSpellData.spells[0].cooldown + ' seconds';
  //Second Ablilty
  document.querySelector("#spell2Img").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + champSpellData.spells[1].image.full + "' class='img-responsive img-thumbnail' alt= '" +  champSpellData.name + " Second Ability'>";
  document.querySelector("#spell2Name").innerHTML = 'Second Ability: ' + champSpellData.spells[1].name;
  document.querySelector("#spell2Description").innerHTML = 'Description: ' + champSpellData.spells[1].sanitizedDescription;
  document.querySelector("#spell2Cd").innerHTML = 'Cooldown: ' + champSpellData.spells[1].cooldown + ' seconds';
  // Third Ability
  document.querySelector("#spell3Img").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + champSpellData.spells[2].image.full + "' class='img-responsive img-thumbnail' alt= '" +  champSpellData.name + " Third Ability'>";
  document.querySelector("#spell3Name").innerHTML = 'Third Ability: ' + champSpellData.spells[2].name;
  document.querySelector("#spell3Description").innerHTML = 'Description: ' + champSpellData.spells[2].sanitizedDescription;
  document.querySelector("#spell3Cd").innerHTML = 'Cooldown: ' + champSpellData.spells[2].cooldown + ' seconds';
  // Ult Ability
  document.querySelector("#spell4Img").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/spell/" + champSpellData.spells[3].image.full + "' class='img-responsive img-thumbnail' alt= '" +  champSpellData.name + " Ultimate Ability'>";
  document.querySelector("#spell4Name").innerHTML = 'Ultimate Ability: ' + champSpellData.spells[3].name;
  document.querySelector("#spell4Description").innerHTML = 'Description: ' + champSpellData.spells[3].sanitizedDescription;
  document.querySelector("#spell4Cd").innerHTML = 'Cooldown: ' + champSpellData.spells[3].cooldown + ' seconds';

  $("#champName").fadeIn(500);
}

//function getPlayerData(){
//  // Get data about all champs (id, key, name, title)
//    
//  playerName = document.querySelector('#searchName').value;
//  console.log(playerName);
////  playerName2 = playerName.;
////  playerNameNoSpace = Object.assign(playerNameNoSpace,playerName);
////  playerNameNoSpace = playerNameNoSpace.trim().replace(" ", "").toLowerCase();
//  playerName = encodeURI(playerName);
////  console.log(playerName, playerName2, playerNameNoSpace);
//  console.log(playerName);
//  var playerDataUrl = "https://global.api.pvp.net/api/lol/NA/v1.4/summoner/by-name/" + playerName +"?api_key=" + API_KEY;
//  //var playerDataUrl = "https://na1.api.riotgames.com/lol/summoner/v3/summoners/by-name/" + playerName +"?api_key=" + API_KEY;
//  console.log(playerDataUrl);
//  $.ajax({
//    dataType: "json",
//    url: playerDataUrl,
//    data: null,
//    success: champDataLoad
//  });
//}	
//	
//function playerIconLoad(obj){
//  // Get champion ID from the JSON file, then load the second JSON file that has ability/passive details
//  
//  var playerData = obj;
//  console.log(obj);
//  
//    https://global.api.pvp.net/api/lol/NA/v1.4/summoner/by-name/FNC%20Rory%20Mercury?api_key=f905f4dc-b359-43fd-b5ca-aede5fc59aaf
//    http://ddragon.leagueoflegends.com/cdn/7.9.2/img/profileicon/1616.png
//    document.querySelector("#profIcon").innerHTML = "<img class='img-responsive img-thumbnail' src = 'http://ddragon.leagueoflegends.com/cdn/" + version + "/img/profileicon/" + playerData.profileIconId + "'  alt= '" +   + " Player Icon'>";
//}
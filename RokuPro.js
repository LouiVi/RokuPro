cfg.Portrait, cfg.Light, cfg.MUI

app.LoadPlugin( "Utils" );

var ROKU_IP = "192.168.70.236";
var TV_CHANNELS = "http://" + ROKU_IP + ":8060/query/tv-channels";
var APP_CHANNELS = "http://" + ROKU_IP + ":8060/query/apps";
var TV = "http://" + ROKU_IP + ":8060/launch/tvinput.dtv?ch=";
var ROKU_TV = "http://" + ROKU_IP + ":8060/";
var ROKU_SEARCH = "http://" + ROKU_IP + ":8060/search/browse/?keyword=";
var TV_ACTIVE_APP = "http://" + ROKU_IP + ":8060/query/tv-active-channel";

var imgArray = ["Img/roku-yellow.png", "Img/roku-white-shadow.png", "Img/roku-purple-shadow.png", "Img/roku-orange.png", "Img/roku-green.png", "Img/roku-blue.png"];
//Called when application is started.
function OnStart()
{
utils = app.CreateUtils();
	//Create a layout with objects vertically centered.
	lay = app.CreateLayout( "Linear", "Top,HCenter,FillXY" )
	//lay.SetBackGradientRadial(DW()/2, DH()/2, MUI.colors.deepPurple.darken3, MUI.colors.deepPurple.lighten3, MUI.colors.deepPurple.darken1);
	lay.SetBackGradient(MUI.colors.deepPurple.darken3, MUI.colors.deepPurple.lighten3, MUI.colors.deepPurple.darken1);
  w = 0.01;
	//Create a text label and add it to layout.
	logo = app.CreateImage("Img/roku-white-shadow.png", w, -1);
	lay.AddChild( logo )
	
	//Add layout to app.	
	app.AddLayout( lay )
	
	s = setInterval(Anim, 10);
    logo.Animate( "Swing", ()=>{logo.Animate( "Tada", null, 100 )}, 200 )

	//Tween1();
}

async function Anim()
{
w+=0.01;
	if(w.toFixed(2)==1) clearInterval(s);
	//s = null, s = setInterval(Anim, 50000000);
	//app.ShowPopup( w.toFixed(2) );
	
	logo.SetSize( w, w);//-0.84);
	await logo.SetImage( imgArray[utils.RandomIntegerRange(0, imgArray.length)], w, w-0.84 )
	
}

async function SendTVCommand(ch) {
    var baseUrl = TV + ch;
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
            app.ShowPopup("Command sent: ");
        else
            app.ShowPopup("Failed to send command.");
    };
}

async function SendTVActiveCommand() {
    var baseUrl = TV_ACTIVE_APP;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
            app.ShowPopup("Command sent: ");
        else
            app.ShowPopup("Failed to send command.");
    };
}

async function SendSearchCommand() {
    var baseUrl = ROKU_SEARCH + prompt("Search keyword: ");
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
           app.ShowPopup("Command sent: ");
        else
            app.ShowPopup("Failed to send command.");
    };
}

async function SendTVChannelsCommand() {
    var baseUrl = TV_CHANNELS;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
           app.ShowPopup("Command sent: ");
        else
            app.ShowPopup("Failed to send command.");
    };
}

async function SendAppChannelsCommand() {
    var baseUrl = APP_CHANNELS;
    var xhr = new XMLHttpRequest();
    xhr.open("GET", baseUrl, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
            app.ShowPopup("Command sent: ");
        else
            app.ShowPopup("Failed to send command.");
    };
}

function SendCommand(command) {
    var baseUrl = "http://<ROKU_IP>:8060/keypress/".replace("<ROKU_IP>", ROKU_IP);
    var xhr = new XMLHttpRequest();
    xhr.open("POST", baseUrl + command, true);
    xhr.send();
    xhr.onload = function() {
        if (xhr.status == 200)
            app.ShowPopup("Command sent: " + command);
        else
            app.ShowPopup("Failed to send command.");
    };
}

function Tween1()
{
logo.Animate( "Swing", ()=>{logo.Animate( "Tada", null, 100 )}, 200 )
    target = { x:0.5, y:0.5, sw:0.5, sh:0.5, rot:360 };
    logo.Tween( target, 50, "Exponential.Out", 1, true, Tween2 )
    logo.Tween( target, 50, "Exponential.InOut", 1, true, Tween3 )
}

function Tween2()
{
 
    target = { x: 0.8, y:[0.6,0.3,0.6], rot: 360*1 };
    logo.Tween( target, 100 )
    
}

function Tween3()
{
    target = { x: 0.8, y:[0.6,0.3,0.6], rot: 360*1};
    logo.Tween( target, 100 )
    
    
}
app.LoadPlugin("Support")

function OnStart() {
    sup = app.CreateSupport()
    
    lay = app.CreateLayout("Linear", "FillXY")
    lay.SetBackColor(color.GREY_DARK_4)
    app.AddLayout(lay)
    
    app.ShowProgress()
    InitFirebaseWeb()
}

function CreateSignUp(web) {
	var laySignUp = app.AddLayout(lay, "Linear", "VCenter,FillXY")
	laySignUp.Hide()
  
  var card = app.AddLayout(laySignUp, "Card")
  card.SetCornerRadius(15)
  
  var layCard = app.AddLayout(card, "Linear", "FillXY,VCenter")
  layCard.SetSize(0.8, 0.45)
  layCard.SetBackColor(color.GREY)
  
  var label = app.AddText(layCard, "Sign Up")
  label.SetTextSize(26)
  
  var edtEmail = app.AddTextEdit(layCard, "", 0.8, -1, "Email")
  edtEmail.SetHint("Type your email")
  edtEmail.SetBackColor(color.GREY_DARK_2)
  
  var edtPass = app.AddTextEdit(layCard, "", 0.8, -1, "Password")
  edtPass.SetHint("Type your password")
  edtPass.SetBackColor(color.GREY_DARK_2)
  
  var btn = app.AddButton(layCard, "Sign Up")
  btn.SetOnTouch(() => {
  	var email = edtEmail.GetText()
  	var pass = edtPass.GetText()
  	
  	/*if(email == "" || pass == "") {
  		return
  	}*/
  	
  	//web.Execute("signUp()")
  })
  
  laySignUp.Show()
}

function InitFirebaseWeb() {
	web = app.CreateWebView(0, 0, "Persist")
	lay.AddChild(web)
    
    web.SetOnConsole(function(msg) { 
        console.log("Firebase Log: " + msg);
    })
    
    web.LoadUrl("firebase.html")
    web.SetOnProgress(web_OnProgress)
}

function web_OnProgress(prog) {
	if(prog == 100) {
		app.HideProgress()
		CreateSignUp()
		
		function SignUp() {
			web.Execute("signUp()")
		}
	}
	
	app.SaveCookies()
}
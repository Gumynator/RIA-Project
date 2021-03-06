function initmenu() {
    const menucontainer = document.getElementById("menucontainer")
    const validerpseudobtn = document.getElementById("validerpseudobtn")
    const playbutton = document.getElementById("playbutton")
    const settingsbutton = document.getElementById("settingsbutton")
    const recordsbutton =document.getElementById("recordsbutton")
    const backbutton1 = document.getElementById("backbutton1")
    const backbutton2 = document.getElementById("backbutton2")
    const pseudotxt = document.getElementById("pseudotxt")
    const viewport = document.getElementById("viewport")
    const mainmenu = document.getElementById("mainmenu")
    const menuselection = document.getElementById("menuselection")
    const menurecords =document.getElementById("menurecords")
    const menusettings = document.getElementById("menusettings")
    const menupseudo = document.getElementById("menupseudo")
    const lamarseillaise=document.getElementById("lamarseillaise")
    const audioplay=document.getElementById("audioplay")
    const locationinfo=document.getElementById("locationinfo")

    playbutton.addEventListener("click", event => {
        mainmenu.style.display = "none"
        menupseudo.style.display = "flex"
        pseudotxt.value = window.localStorage.getItem("pseudo")
    })

    settingsbutton.addEventListener("click", event => {
        mainmenu.style.display = "none"
        menusettings.style.display = "flex"

        
            let endpoint = 'https://api.geoapify.com/v1/ipinfo'
            let apiKey = '5c32115a4e154b51b0e5793a2e2207f6'
          
            $( "#locationinfo" ).each(function( index, element ) {
          
              $.ajax({
                  url: endpoint + "?&apiKey=" + apiKey + " &q=" + $( this ).text(),
                  contentType: "application/json",
                  dataType: 'json',
                  success: function(result){
                      console.log("yolo"+result);
                  }
              })
            });
         



        var requestOptions = {
            method: 'GET',
          };
          
          fetch("https://api.geoapify.com/v1/ipinfo?&apiKey=5c32115a4e154b51b0e5793a2e2207f6", requestOptions)
            .then(response => response.json())
            .then(result =>  locationinfo.innerHTML = "Canton: "+(result.state.name))
            .catch(error => console.log('error', error));

            
            
        
    })

    recordsbutton.addEventListener("click", event => {
        mainmenu.style.display = "none"
        menurecords.style.display = "flex"
        console.log("local storage");
            console.log(localStorage.getItem(localStorage.key(1)));
            let scores = window.localStorage.getItem("scores")

            if(scores == null){
                scores = {}
            }else{
                scores = JSON.parse(scores)
            }
            let txt = "";
            let compteur = 0;
            for (var [cle, valeur] of Object.entries(scores)){
                if(compteur ==4){
                    break
                }
                txt+=cle + ': ' + valeur +"<br>"
                compteur++;
              }

            document.getElementById("recordslist").innerHTML = txt;
    })

    backbutton1.addEventListener("click", event => {
        
        menusettings.style.display = "none"
        mainmenu.style.display = "flex"
        
    })

    backbutton2.addEventListener("click", event => {
        menurecords.style.display = "none"
        
        mainmenu.style.display = "flex"
        
    })

    validerpseudobtn.addEventListener("click", event => {
        window.localStorage.setItem("pseudo", pseudotxt.value)
        menupseudo.style.display = "none"
        menuselection.style.display = "flex"
        menucontainer.style.display = "block"
    })

    menuselection.addEventListener("dragover", event => {
        event.preventDefault()
    })

    menuselection.addEventListener("drop", event => {
        event.preventDefault()
        if(event.x > 320){
            window.team = "Z"
        }else{
            window.team = "M"
        }
        
        menucontainer.style.display = "none"
        viewport.style.display = "block"
        window.startGame()
    })


    audioplay.addEventListener("click", event => {
        
        lamarseillaise.play();
        //lamarseillaise.autoplay;
        lamarseillaise.loop = true;
        lamarseillaise.load(); 
        
    })

    var reference = (function audiomanager(){

        //function body
        //audio manager
        
        return audiomanager; //return the function itself to reference
    
    }());
    

    let volume = document.querySelector("#volume-control");
    volume.addEventListener("change", function(e) {
        lamarseillaise.volume = e.currentTarget.value / 100;
    })

}

window.addEventListener("load", initmenu)

//https://stackoverflow.com/questions/7066191/javascript-onclick-onsubmit-for-dynamically-created-button
//https://stackoverflow.com/questions/18831783/how-to-call-a-server-side-function-from-client-side-e-g-html-button-onclick-i
var hpSubmitFunction = function(){
  var button = document.createElement('button');
  button.id="lumosButton"
  button.innerHTML = 'Lumos';
  button.onclick = function(){
    alert('here be dragons');return false;
  };
  // where do we want to have the button to appear?
  // you can append it to another element just by doing something like
  // document.getElementById('foobutton').appendChild(button);

  document.getElementById('hp01Form').appendChild(button);
    // document.body.appendChild(button);
};


hpSubmitFunction(); //CALL THIS F'N FOR LUMOSBUTTON TO SHOW





var lumosButton = document.getElementById("lumosButton");

// lumosButton.addEventListener('click', function(){
//     //Get form id
//     var addStudent = document.getElementById("hp01Form");
//
//     //Create a request in order to add the element to the server
//     var ourRequest = new XMLHttpRequest();
//
//     //Check the parameters...might need /home1 + "?"+ ___
//     ourRequest.open('GET', '/home1', true);
//     ourRequest.onload=function(){// ourRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
//       var ourData = JSON.parse(ourRequest.responseText);
//
//       console.log(ourData);
//     };
//     //don't put this here before ourRequest.send(): console.log(ourData);
//
//     ourRequest.send();
//     /* 8. Add console.log() statement to client-side code in callback of the GET ourRequest
//       and log the info coming back from the request*/
//     // console.log(ourData); guess should be in onload bc ourData not defined
// });


/*Try the AJAX again*/
lumosButton.addEventListener('click', function(){
    //Get form id
    var addStudent = document.getElementById("hp01Form");

    //Create a request in order to add the element to the server
    var ourRequest = new XMLHttpRequest();

    //Check the parameters...might need /home1 + "?"+ ___
    ourRequest.open('GET', '/home1', true);

    //Do something with the data when it gets loaded.
    //Alternatively can do: ourRequest.addEventListener("load", function(){});
    ourRequest.onload=function(){// ourRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //A. If the data from server loads properly, then do something with it.
      if(ourRequest.status >= 200 && ourRequest.status < 400){
        var ourData = JSON.parse(ourRequest.responseText); //Parse the loaded JSON data
        console.log(ourData); //Display the objects to console

        // document.


      }
      //B. If data fails to load from the server, print error message.
      else{
        console.log("Error in network request: " + ourRequest.statusText);
      }

    };


    //don't put this here before ourRequest.send(): console.log(ourData);

    ourRequest.send();
    /* 8. Add console.log() statement to client-side code in callback of the GET ourRequest
      and log the info coming back from the request*/
    // console.log(ourData); guess should be in onload bc ourData not defined


});

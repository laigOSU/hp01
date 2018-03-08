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

lumosButton.addEventListener('click', function(event){
    //Get form id
    var addStudent = document.getElementById("hp01Form");

    //Create a request in order to add the element to the server
    var ourRequest = new XMLHttpRequest();

    //Check the parameters...might need /home1 + "?"+ ___
    ourRequest.open('GET', '/home1', true);
    ourRequest.onload=function(){// ourRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      var ourData = JSON.parse(ourRequest.responseText);
      renderHTML(ourData);
    };

    ourRequest.send();

});

//https://stackoverflow.com/questions/7066191/javascript-onclick-onsubmit-for-dynamically-created-button
//https://stackoverflow.com/questions/18831783/how-to-call-a-server-side-function-from-client-side-e-g-html-button-onclick-i
var hpSubmitFunction = function(){
  var button = document.createElement('button');
  button.id="lumosButton"
  button.innerHTML = 'Lumos';
  button.onclick = function(){
    // alert('here be dragons');
    return false;
  };
  // where do we want to have the button to appear?
  // you can append it to another element just by doing something like
  // document.getElementById('foobutton').appendChild(button);

  document.getElementById('hp01Form').appendChild(button);
    // document.body.appendChild(button);
};


//CALL THIS F'N FOR LUMOSBUTTON TO SHOW
hpSubmitFunction();


var lumosButton = document.getElementById("lumosButton");


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
    ourRequest.onload = function(){// ourRequest.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
      //A. If the data from server loads properly, then do something with it.
      if(ourRequest.status >= 200 && ourRequest.status < 400){
        var ourData = JSON.parse(ourRequest.responseText); //Parse the loaded JSON data
        console.log(ourData); //Display the objects to console

        //Dynamically create a table to display the loaded ourData (f'n definition below)
        generate_table(ourData);
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


//https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Traversing_an_HTML_table_with_JavaScript_and_DOM_Interfaces
//https://www.w3schools.com/jsref/met_table_insertrow.asp
//https://www.w3schools.com/html/html_tables.asp
/* <table>
    <tr>
      <th>  <th>  <th>
    <tr>
      <td>  <td>  <td>
    <tr>
      <td>  <td>  <td>
*/
function generate_table(loadedJSON){
  //Get the table (from home0)
  var table = document.getElementById("home0table");

  //Create a header row <tr> with header cells <th>
  var head_row = document.createElement("tr");

  var head_fname = document.createElement("th");
  var head_lname = document.createElement("th");
  var head_house = document.createElement("th");
  var head_update = document.createElement("th");
  var head_delete = document.createElement("th");

  //Append upward to each parent
  head_fname.innerText = "First Name";
  head_row.appendChild(head_fname);
  head_lname.innerText = "Last Name";
  head_row.appendChild(head_lname);
  head_house.innerText = "House";
  head_row.appendChild(head_house);
  head_update.innerText = "Update";
  head_row.appendChild(head_update);
  head_delete.innerText = "Delete";
  head_row.appendChild(head_delete);

  table.appendChild(head_row);

  //For each item in loaded JSON object, create new row and insert elements
  //https://stackoverflow.com/questions/921789/how-to-loop-through-plain-javascript-object-with-objects-as-members
  //https://stackoverflow.com/questions/1078118/how-do-i-iterate-over-a-json-structure
  loadedJSON.forEach(function(item){
    //Create new row/cells to put the loaded JSON in
    var add_row = document.createElement("tr");

    var add_fname = document.createElement("td");
    var add_lname = document.createElement("td");
    var add_house = document.createElement("td");
    var add_update = document.createElement("td");
    var add_delete = document.createElement("td");

    /*loaded JSON on client console:
      0: {id: 2, fname: "Harry", lname: "Potter", house: 9}
      1: {id: 2, fname: "Ron", lname: "Weasley", house: 9}  */
      //https://stackoverflow.com/questions/31275357/using-substring-of-json-key-value-for-conditionals
      //https://www.w3schools.com/jsref/jsref_substring.asp

    // if (item["fname"] != null){
      add_fname.innerText = item["fname"].substring(0);   //}  curly from if statemetn
      add_row.appendChild(add_fname);

      add_lname.innerText = item["lname"].substring(0);
      add_row.appendChild(add_lname);

      //becuase item["house"] is not a substring
      add_house.innerText = item["house"];
      add_row.appendChild(add_house);

      //NEED TO APPEND!!
      table.appendChild(add_row);

  })

  //
}

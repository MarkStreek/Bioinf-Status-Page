## Material & methods

e status data will be read from a web server through AJAX (Asynchronous JavaScript And XML) calls in JS (JavaScript). AJAX is a technique that allows the user to access a webserver from the webpage.

This project is layered with a back-end powered by AJAX calls. 
AJAX (Asynchronous JavaScript And XML) calls in JS (JavaScript) and enables reading status data from a web server;
[W3Schools](https://www.w3schools.com/xml/ajax_intro.asp).
Structures are built using JSON (config.json) to configure
mapping of rooms and its computers, and web.xml holds the queries links that are needed to fetch the desired data from the servers.

Config.json is divided in rooms by name. Each room holds a collection of pc names, that are compared to the names fetched
from the server. Additionally, a classroom matrix is made to save the actual computer locations.

"XmlWebListener" manages passing the queries from web.xml to the "RequestListener".
These query links are then passed to "MakeRequest". MakeRequest sends the actual
request for each query and the body of each response. At last RequestListener then saves each response as
a "Workstation" object where all data is divided into variables. Then these object are converted to json objects
using Gson().toJson.

Request.js has async functions that handles responses to fetch json data from requestListener and the map configuration from config.json.
Here all json data is sent to the front-end where html objects assigned to that data are updated based on the 
newly fetched information every ten minutes.

The data is divided over three div objects that are created and filled by the logic of three javascript files;
a file that creates a room map (CreateMapOfRooms.js), a file that creates suggestions what pc's have the 
lightest workload (createSuggestionCards.js) and a file that creates workstation cards (CreateWorkStationCards.js). 

Each workstation card is a block that colours red of green based on the status of the computer. For more statistics
of a computer the "Show status" button can be pressed and a model is created with several parameters and a load graph.


Above the workstation cards a plain is filled with computer suggestions. A suggestion card is clickable and will start a scroll event
to the workstation card. 
The scroll event moves towards the calculated position of the card and will end when the card is in the middle of the screen.
Then the card's background colour blinks in orange for three seconds, so the user knows where to look at.

All workstation cards and their suggestions are inserted into H186.html in a fluid div container called innerdiv. 
The advantage of fluid is more flexible positioning against the page size, 
also when the div is filled the contents move along more swiftly.
Also, the workstation cards can be filtered by checking a checkbox by room name. The checkboxes are also made using bootstrap.

The logic for making cards appears on-click or disappear is managed in main.js. Furthermore, in main.js is the logic for retrieving the pc names from the config file, inserting the created workstation cards into the "innerdiv" grid and the call is made to update the page content. 
When scrolling page down a button appears with a scroll page up event if the user wants to return to the top of the page.
This event is managed through a 'click' eventListener in main.js.

The basic website lay-out and bootstrap connection is handled in index.html using thymeleaf.
Next the user can navigate through the nav-sidebar to the room map, home or about page. The appearance of the nav is managed in sidebar.css.
In each page the data inserted div objects or base lay-out is handled through bootstrap. Bootstrap enables editing of div objects more flexible than css. 
Though using css simpler appearance changes are managed.

In Map.html two logics are applied: a button menu to change the classroom and a fluid div container called mapdiv where the created map cards are inserted.
By extracting the classroom matrix from config.json map card objects are created for each index that holds a computer name.
Additionally, for indices with no computer name empty map cards are made. By applying these logics a classroom map is created from a configuration matrix.

Two images were added to the webpage, one favicon and the Hanze icon inside the nav-sidebar.

In order to make the webpage responsive to window size for both desktop and phone. Two solutions are introduced.
First by making the div containers "innerdiv" and "mapdiv" container-fluid. This means the contents and the objects shape changes more flexible.
For innerdiv this works for all window sizez. Although this isn't a solution for the map due its unique size. 
Using breakpoints the viewport is changed for the map, making it decrease in size along with a smaller window.

TODO: Structure of m&m e.g. core structure, data extracting methods, java object creation, eventListeners.







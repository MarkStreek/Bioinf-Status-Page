## Material & methods


This project is layered with a back-end powered by AJAX calls. Structures are built using JSON (config.json) and web.xml to configure
mapping of rooms and its computers, and stating the queries that are needed to fetch the desired data from the servers.

XmlWebListener" manages passing the queries from web.xml to the "RequestListener" under servlets.
These query links are then passed to "MakeRequest". MakeRequest sends the actual
request for each query and the body of each response. At last RequestListener then saves each response as
a "Workstation" object where all data is divided into variables. Then these object are converted to json objects
using Gson().toJson.

Request.js has async functions that fetch the json data from requestListener and map configuration from config.json.
Here all fetching from send by the back-end is send to the front-end with a responsive structure; a structure where
html objects holding data are updated based on the newly fetched information each x minutes.
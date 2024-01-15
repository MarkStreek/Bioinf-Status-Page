# Bioinf-Status-Page

Repository for a web application that shows the status of bioinf server pc's

## Concept design-SNAPSHOT-0.01
![Frontpage](demo_design.png "Statuses")


## Current design-SNAPSHOT-0.19

![SNAPSHOT-0 19](https://github.com/MarkStreek/Bioinf-Status-Page/assets/60214213/3ddf20db-ca51-49b1-a2dc-7675bc64ef17)

## Project tree
```
16 directories, 36 files
.
├── WEB-INF
├── java
│   └── nl
│       └── bioinf
│           └── shbreekers
│               ├── config
│               │   ├── WebConfig.java
│               │   └── XmlWebListener.java
│               ├── model
│               │   ├── MakeRequests.java
│               │   ├── ParseJsonRequests.java
│               │   └── Workstation.java
│               └── servlets
│                   ├── RequestListener.java
│                   └── WelcomeServlet.java
└── webapp
    ├── WEB-INF
    │   ├── templates
    │   │   ├── D107.html
    │   │   ├── D108.html
    │   │   ├── H1122.html
    │   │   ├── H186.html
    │   │   ├── H188A.html
    │   │   ├── Map.html
    │   │   ├── Sidebar.html
    │   │   ├── checkboxTest.html
    │   │   ├── index.html
    │   │   ├── loginTest.html
    │   │   ├── modalTest.html
    │   │   └── welcome.html
    │   └── web.xml
    ├── data
    │   ├── config.json
    │   └── queries.json
    ├── images
    │   ├── favicon.ico
    │   ├── favicon_round.png
    │   ├── favoicon_round.png
    │   ├── logo_OFFLINE.png
    │   └── logo_ONLINE.png
    ├── js
    │   ├── AJAXTester2.js
    │   ├── CreateMapOfRooms.js
    │   ├── createSuggestionsCards.js
    │   ├── createWorkStationCards.js
    │   ├── main.js
    │   └── requests.js
    └── style
        ├── sidebar.css
        ├── test.css
        └── viewport.css
```

# Bioinf-Status-Page

In this repository,
you can find the code for the status page from the bioinformatics department at the Hanze University of Applied Sciences.

## About the project

The project was made by third year bioinformatics students at the Hanze University of Applied Sciences. 
The exercise was to create a functional status page for the bioinformatics department.

## Tools used in this project

![Java](https://img.shields.io/badge/java-%23ED8B00.svg?style=for-the-badge&logo=openjdk&logoColor=white)
![Servlets](https://img.shields.io/badge/-Servlets-000000?style=for-the-badge&logo=Java&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)
![Thymeleaf](https://img.shields.io/badge/Thymeleaf-%23005C0F.svg?style=for-the-badge&logo=Thymeleaf&logoColor=white)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)

### Contributors

- [Luka Stein - l.t.stein@st.hanze.nl](https://github.com/Coldbirdie)
- [Sibren Reekers - s.h.b.reekers@st.hanze.nl](https://github.com/SibrenReekers)
- [Mark Van de Streek - m.van.de.streek@st.hanze.nl](https://github.com/MarkStreek)

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


## Progress 

The design of the status page changed a couple of times. Below are some examples of the first versions.

### Design-SNAPSHOT-1.0

![Frontpage](demo_design.png "Statuses")

### design-SNAPSHOT-1.1

![SNAPSHOT-0 19](https://github.com/MarkStreek/Bioinf-Status-Page/assets/60214213/3ddf20db-ca51-49b1-a2dc-7675bc64ef17)
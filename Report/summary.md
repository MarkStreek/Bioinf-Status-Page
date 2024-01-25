# Summary

Currently, there is no active website showing the bioinformatics study computers' activity. 
Previously a website existed that showed which computers where online or offline, but since a while
it stopped working and its replacement could have some extra features. That's why our team of student developers
where tasked to provide exactly that. The advantage of such website is giving a quick overview what computers can be logged into using
either ssh or in the classroom by students and teachers alike, without having to manually find out by trial and error.

thymeleaf, bootstrap, ajax calls via javascript, server , java backend 

To realise this a web.xml is needed with requests, which are links that inquire data e.g.
computer workload from a server. Then these queries are fetched by the XmlWebListener and a list of these request is passed to the RequestListener.
The RequestListener then starts making requests using the MakeRequest class. Once those are
made the extracted data is assigned to a structured Workstation class. Finally, we convert that structure
to JSON type objects.

Then from the backend these objects can be fetched by the middle level which is javascript. 
This data is then connected to a config JSON file, which is used for creating a computer grid or classroom map
that can be inserted into the front-end; the html pages.

By following this methodology, the website results in two main featured pages.
A front page with all the computers showing their online status, but also a button
which show more information like the workload or processor temperature. And, a second page
with classroom maps based on the actual classrooms in the bioinformatics 
space at the ILST institute.


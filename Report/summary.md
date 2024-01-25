# Summary

Currently, there is no active website showing the Bioinformatics study computers' activity. 
Previously a website existed that showed which computers where online or offline, but since a while
it stopped working and its replacement could have some extra features. That's why our team of student developers
where tasked to provide exactly that. The advantage of such website is giving a quick overview what computers can be logged into using
either ssh or in the classroom by students and teachers alike, without having to manually find out by trial and error.



To realise this a web.xml is needed with requests, which are links that inquire data e.g.
computer workload from a server. Then these queries are fetched by the XmlWebListener and a list of these request is passed to the RequestListener.
The RequestListener then starts making requests using the MakeRequest class. Once, those are
made the extracted data is assigned to a structured Workstation class. Finally, we convert that structure
to JSON type objects.

Then from the back-end these objects can be fetched by the middleware which is AJAX in JavaScript. 
This data is then connected to a configure JSON file, which is used for creating a computer grid or classroom map
that can be inserted into the front-end; the HTML pages.

By following this methodology, the website results in two main featured pages.
A front page with all the computers showing their online status, but also a button
which shows more information like the workload or processor temperature. And, a second page
with classroom maps based on the actual classrooms in the bioinformatics 
space at the ILST institute. Here the online status is also viewable, but more simple.
Additionally, the website works both on computer as on phone.

Ultimately, a working and flexible website is created. In the future it would make a good
addition if a feature is added that shows what classrooms are occupied based on the
class schedule.


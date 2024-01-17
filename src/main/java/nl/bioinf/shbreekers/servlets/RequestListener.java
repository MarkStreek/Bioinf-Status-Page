package nl.bioinf.shbreekers.servlets;

import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.XmlWebListener;
import nl.bioinf.shbreekers.model.MakeRequests;
import nl.bioinf.shbreekers.model.Workstation;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Collections;
import java.util.Date;
import java.util.List;

/**
 * The RequestListener servlet.
 * This servlet is responsible for handling the requests from the front-end.
 * It directs the models that request to the prometheus server and
 * returns the right data to the front-end.
 */
@WebServlet(name = "requestListener", urlPatterns = {"/requestListener"}, loadOnStartup = 1)
public class RequestListener extends HttpServlet {

    /**
     * This method retrieves the request from the front-end.
     * This method then calls models.
     * The models are responsible for making the requests to the prometheus server.
     *
     * One request link is modified to get the data from the last 10 minutes.
     * The results are then sorted and returned to the front-end.
     *
     * @param request   an {@link HttpServletRequest} object that
     *                  contains the request the client has made
     *                  of the servlet
     *
     * @param response  an {@link HttpServletResponse} object that
     *                  contains the response the servlet sends
     *                  to the client
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        MakeRequests makeRequests = new MakeRequests();
        // Get the query links from the XmlWebListener
        List<String> links = XmlWebListener.getQueriesList();

        long nowTimestamp = new Date().getTime() / 1000;
        long tenMinutesAgoTimestamp = nowTimestamp - 600;
        // Loop through the links and replace the link used to get the data from the last 10 minutes,
        // with the right timestamp
        for (int i = 0; i < links.size(); i++) {
            if (links.get(i).contains("query_range?")) {
                links.remove(i);
                String url = String.format("http://localhost:9090/api/v1/query_range?query=node_load1&start=%d&end=%d&step=60",
                        tenMinutesAgoTimestamp, nowTimestamp);
                links.add(url);
            }
        }

        // Make the call to the request function with the right query links
        List<Workstation> workstations = makeRequests.startRequests(links);
        // Sort the results
        Collections.sort(workstations, new Workstation("instance"));
        // Convert the results to json
        String json = new Gson().toJson(workstations);

        // Set the data to the response
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}

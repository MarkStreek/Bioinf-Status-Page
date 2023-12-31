package nl.bioinf.shbreekers.servlets;
import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.XmlWebListener;
import nl.bioinf.shbreekers.config.WebConfig;
import nl.bioinf.shbreekers.model.MakeRequests;
import nl.bioinf.shbreekers.model.Workstation;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.Collections;
import java.util.Date;
import java.util.List;


@WebServlet(name = "requestListener", urlPatterns = {"/requestListener"}, loadOnStartup = 1)
public class RequestListener extends HttpServlet {

    @Override
    public void init() throws ServletException {
        System.out.println("Initializing Thymeleaf template engine");
        final ServletContext servletContext = this.getServletContext();
        WebConfig.createTemplateEngine(servletContext);
    }

    /**
     * This method retrieves the request from the front-end.
     * This method then handles a request to the prometheus server.
     * <p>
     * After the request, the right data is returned to the front-end.
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
        List<String> links = XmlWebListener.getQueriesList();

        // not properly working
        // TODO: Fix the link: 10 minutes in steps of 60 or 30 seconds.

        // 1 minute ago
        LocalDateTime now = LocalDateTime.now().minusMinutes(5);
        // 60 minutes ago
        LocalDateTime tenMinutesAgo = now.minusMinutes(10);

        long nowTimestamp = new Date().getTime() / 1000;
        long tenMinutesAgoTimestamp = nowTimestamp - 600;

        System.out.println(nowTimestamp);

        for (int i = 0; i < links.size(); i++) {
            if (links.get(i).contains("query_range?")) {
                links.remove(i);
                String url = String.format("http://localhost:9090/api/v1/query_range?query=node_load1&start=%d&end=%d&step=60",
                        tenMinutesAgoTimestamp, nowTimestamp);
                links.add(url);
                System.out.println(links.get(i));
            }
        }

        List<Workstation> workstations = makeRequests.startRequests(links);

        Collections.sort(workstations, new Workstation("instance"));

        // Make the call to the request function with the right query link
        String json = new Gson().toJson(workstations);

        // Set the data to the response
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);

        /*
        Request for load of the last 5 minutes
        curl -G 'http://monitor:9090/api/v1/query_range' --data-urlencode 'query=node_load1' --data-urlencode "start=$(date -d '-5 minutes' +%s)" --data-urlencode "end=$(date +%s)" --data-urlencode 'step=30s' | jq

        http://localhost:9090/api/v1/query_range?query=node_load1&start=1703674365&end=1703674429&step=30s
         */
    }
}

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
import java.util.Collections;
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

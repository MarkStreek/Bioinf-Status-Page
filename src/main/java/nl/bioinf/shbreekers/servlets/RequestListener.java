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
     * After the request the right data is returned to the front-end.
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

        // Or should we make a different servlet for each request?
        // i.e., servlet that listens to requests for room D1.08,
        // and a servlet that listens to requests for room D1.07 etc...

        // If we make a different servlet for each request, we can add some logical if/else,
        // inside the javascript front-end and then the specific function for that request is called.
        // Otherwise, we have to do a back-end check which data is necessary

        MakeRequests makeRequests = new MakeRequests();
        List<String> links = XmlWebListener.getQueriesList();
        List<Workstation> workstations = makeRequests.startRequests(links);

        // Make the call to the request function with the right query link
        String json = new Gson().toJson(workstations);

        // Set the data to the response
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}

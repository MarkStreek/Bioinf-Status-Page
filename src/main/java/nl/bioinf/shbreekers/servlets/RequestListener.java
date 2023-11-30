package nl.bioinf.shbreekers.servlets;
import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.WebConfig;
import nl.bioinf.shbreekers.model.MakeRequests;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;


@WebServlet("/requests")
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

        // TODO: create some logical, that checks which data is needed for the front end

        // Or should we make a different servlet for each request?
        // i.e., servlet that listens to requests for room D1.08,
        // and a servlet that listens to requests for room D1.07 etc...

        // If we make a different servlet for each request, we can add some logical if/else,
        // inside the javascript front-end and then the specific function for that request is called.
        // otherwise we have to do a back-end check which data is necessary

        MakeRequests makeRequests = new MakeRequests();

        // Construct the query link
        String queryLink = constructQueryLink();

        // Make the call to the request function with the right query link
        String json = new Gson().toJson(makeRequests.getData(queryLink));

        // Set the data to the response
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }

    /**
     * This method constructs the query link. The right parameters are added.
     * The base of the query link is:
     *  http://monitor:9090/api/v1/query?query=
     *  For every request, a certain query must be made. This is done inside this function
     * @return String with the query link
     */
    private String constructQueryLink() {
        String base = "http://monitor:9090/api/v1/query?query=";
        // add query to the base query...
        return null;
    }
}

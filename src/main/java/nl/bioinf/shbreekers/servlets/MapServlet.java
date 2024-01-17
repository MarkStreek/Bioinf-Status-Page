package nl.bioinf.shbreekers.servlets;

import nl.bioinf.shbreekers.config.WebConfig;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.WebContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "MapServlet", urlPatterns = "/map", loadOnStartup = 1)
public class MapServlet extends HttpServlet {

    // Create a new instance for the template engine
    private TemplateEngine templateEngine;

    @Override
    public void init() throws ServletException {
        System.out.println("Initializing Thymeleaf template engine");
        final ServletContext servletContext = this.getServletContext();
        // Store the template engine in the instance variable, so it can be used multiple times
        this.templateEngine = WebConfig.createTemplateEngine(servletContext);
    }

    private static final long serialVersionUID = 1L;

    /**
     * Redirect the post-request to process method.
     *
     * @param request  the request
     * @param response the response
     * @throws IOException the io exception
     */
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {
        process(request, response);
    }

    /**
     * Redirect the get-request to process method.
     *
     * @param request  the request
     * @param response the response
     * @throws IOException the io exception
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        process(request, response);
    }

    /**
     * Process the request and serve the Map page to the user.
     *
     * @param request  the request
     * @param response the response
     * @throws IOException the io exception
     */
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {

        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        // Use the template engine that was created in the init() method
        // and render the map page
        this.templateEngine.process(
                "Map", ctx, response.getWriter());
    }
}
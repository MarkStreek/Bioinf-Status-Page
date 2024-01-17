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

/**
 * The AboutServlet.
 * This servlet serves the about page to the user.
 */
@WebServlet(name = "WelcomeServlet", urlPatterns = "/give.welcome", loadOnStartup = 1)
public class AboutServlet extends HttpServlet {

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
     * The get request is handled.
     * The about page is served to the user.
     *
     * @param request  the request
     * @param response the response
     * @throws IOException the io exception
     */
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        // Use the template engine that was created in the init() method
        // and render the about page
        this.templateEngine.process(
                "About", ctx, response.getWriter());
    }
}
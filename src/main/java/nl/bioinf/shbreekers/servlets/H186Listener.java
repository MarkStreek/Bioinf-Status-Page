package nl.bioinf.shbreekers.servlets;

import nl.bioinf.shbreekers.config.WebConfig;
import org.thymeleaf.context.WebContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet(name = "H186Listener", urlPatterns = "/give.H186", loadOnStartup = 1)
public class H186Listener extends HttpServlet {
    @Override
    public void init() throws ServletException {
        System.out.println("Initializing Thymeleaf template engine");
        final ServletContext servletContext = this.getServletContext();
        WebConfig.createTemplateEngine(servletContext);
    }
    private static final long serialVersionUID = 1L;
    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException{
        process(request, response);
    }
    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        process(request, response);
    }
    public void process(HttpServletRequest request, HttpServletResponse response) throws IOException {

        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        WebConfig.createTemplateEngine(getServletContext()).
                process("H186", ctx, response.getWriter());
    }
}
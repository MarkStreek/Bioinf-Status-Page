package nl.bioinf.shbreekers.servlets;
import nl.bioinf.shbreekers.config.WebConfig;
import nl.bioinf.shbreekers.config.XmlWebListener;
import nl.bioinf.shbreekers.model.MakeRequests;
import nl.bioinf.shbreekers.model.Workstation;
import org.thymeleaf.context.WebContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.List;

@WebServlet(name = "WelcomeServlet", urlPatterns = "/give.welcome", loadOnStartup = 1)
public class WelcomeServlet extends HttpServlet {
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

        MakeRequests makeRequests = new MakeRequests();
        List<String> links = XmlWebListener.getQueriesList();
        List<Workstation> workstations = makeRequests.startRequests(links);

        System.out.println(workstations.size());


            WebConfig.configureResponse(response);
            WebContext ctx = new WebContext(
                    request,
                    response,
                    request.getServletContext(),
                    request.getLocale());

            WebConfig.createTemplateEngine(getServletContext()).
                    process("checkboxTest", ctx, response.getWriter());
        }
}
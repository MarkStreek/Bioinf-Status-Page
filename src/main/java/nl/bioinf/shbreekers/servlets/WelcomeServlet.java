package nl.bioinf.shbreekers.servlets; //change to your situation!
import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.WebConfig;
import nl.bioinf.shbreekers.model.MakeRequests;
import nl.bioinf.shbreekers.model.ParseJsonRequests;
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

        ParseJsonRequests parseJsonRequests = new ParseJsonRequests();
        MakeRequests makeRequests = new MakeRequests();

        String data = makeRequests.getData("http://localhost:9090/api/v1/query?query=node_load1");
        parseJsonRequests.parseJsonToRecord(data);

        List<Workstation> workstations = parseJsonRequests.getWorkstations();
        for (Workstation w : workstations) {
            System.out.println("w.getInstance() = " + w.getInstance());
            System.out.println("w.getCurrnetLoad() = " + w.getCurrnetLoad());
        }




        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        WebConfig.createTemplateEngine(getServletContext()).
                process("index", ctx, response.getWriter());
    }
}
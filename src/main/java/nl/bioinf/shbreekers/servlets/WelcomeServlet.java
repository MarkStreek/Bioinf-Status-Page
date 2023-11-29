package nl.bioinf.shbreekers.servlets; //change to your situation!
import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.WebConfig;
import org.apache.http.HttpResponse;
import org.apache.http.client.HttpClient;
import org.apache.http.client.methods.HttpGet;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.thymeleaf.context.WebContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.Date;
import java.util.Scanner;

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
    public void process(HttpServletRequest request, HttpServletResponse response)
            throws IOException {
        //this step is optional; standard settings also suffice

//        HttpClient httpClient = HttpClients.createDefault();
//        HttpGet httpGet = new HttpGet("https://google.com");
//
//        try {
//            HttpResponse responses = httpClient.execute(httpGet);
//
//            if (responses.getStatusLine().getStatusCode() == 200) {
//                String jsonResponse = EntityUtils.toString(responses.getEntity());
//                System.out.println("Response:");
//                System.out.println(jsonResponse);
//                // Verwerk de JSON-respons zoals nodig
//            } else {
//                System.out.println("HTTP Request failed: " + responses.getStatusLine().getReasonPhrase());
//            }
//        } catch (Exception e) {
//            e.printStackTrace();
//        }


        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        WebConfig.createTemplateEngine(getServletContext()).
                process("D108", ctx, response.getWriter());
    }
}
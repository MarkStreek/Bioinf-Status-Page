package nl.bioinf.shbreekers.servlets;
import com.google.gson.Gson;
import nl.bioinf.shbreekers.config.WebConfig;
import org.thymeleaf.context.WebContext;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@WebServlet("/D108")
public class AjaxCall extends HttpServlet {
    @Override
    public void init() throws ServletException {
        System.out.println("Initializing Thymeleaf template engine");
        final ServletContext servletContext = this.getServletContext();
        WebConfig.createTemplateEngine(servletContext);
    }
    private static final long serialVersionUID = 1L;

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException{
        String text = String.valueOf(Math.random());
        String json = new Gson().toJson(text);


        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}

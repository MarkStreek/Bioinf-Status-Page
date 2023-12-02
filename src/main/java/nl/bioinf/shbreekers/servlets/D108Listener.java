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

@WebServlet("/D1.08")
public class D108Listener extends HttpServlet {

    @Override
    public void init() throws ServletException {
        System.out.println("Initializing Thymeleaf template engine");
        final ServletContext servletContext = this.getServletContext();
        WebConfig.createTemplateEngine(servletContext);
    }

    public void doGet(HttpServletRequest request, HttpServletResponse response) throws IOException {
        WebConfig.configureResponse(response);
        WebContext ctx = new WebContext(
                request,
                response,
                request.getServletContext(),
                request.getLocale());

        WebConfig.createTemplateEngine(getServletContext()).
                process("D108", ctx, response.getWriter());
    }

    public void doPost(HttpServletRequest request, HttpServletResponse response) throws IOException {

        Gson gson = new Gson();
        String json = gson.toJson("D108");
        System.out.println(json);
        response.setContentType("text/json");
        response.setCharacterEncoding("UTF-8");
        response.getWriter().write(json);
    }
}

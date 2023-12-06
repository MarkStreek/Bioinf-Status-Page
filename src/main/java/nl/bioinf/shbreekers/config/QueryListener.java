package nl.bioinf.shbreekers.config;

import org.thymeleaf.TemplateEngine;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

import static nl.bioinf.shbreekers.config.WebConfig.createTemplateEngine;

@WebListener
public class QueryListener implements ServletContextListener {
    public static List<String> queriesList = new ArrayList<>();
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext ctx = servletContextEvent.getServletContext();
        queriesList.add(ctx.getInitParameter("up"));
        queriesList.add(ctx.getInitParameter("temperature"));
        queriesList.add(ctx.getInitParameter("currentLoad"));
        queriesList.add(ctx.getInitParameter("loadLast5Minutes"));
        queriesList.add(ctx.getInitParameter("currentFreeMemory"));
        queriesList.add(ctx.getInitParameter("availableMemory"));
        queriesList.add(ctx.getInitParameter("temperature"));
        queriesList.add(ctx.getInitParameter("currentLoad"));
        queriesList.add(ctx.getInitParameter("loadLast5Minutes"));
        queriesList.add(ctx.getInitParameter("currentFreeMemory"));
        queriesList.add(ctx.getInitParameter("availableMemory"));
        System.out.println("DatabaseWebListener.contextIntitialized");
    }

    public static List<String> getQueriesList() {
        return Collections.unmodifiableList(queriesList);
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Shutting down servlet service");
    }
}


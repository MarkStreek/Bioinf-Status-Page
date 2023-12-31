package nl.bioinf.shbreekers.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@WebListener
public class XmlWebListener implements ServletContextListener {
    public static List<String> queriesList = new ArrayList<>();
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        ServletContext ctx = servletContextEvent.getServletContext();
        queriesList.add(ctx.getInitParameter("up"));
        queriesList.add(ctx.getInitParameter("temperature"));
        // TODO: 11/12/2018 add temperature to the list
        queriesList.add(ctx.getInitParameter("currentLoad"));
        queriesList.add(ctx.getInitParameter("loadLast5Minutes"));
        queriesList.add(ctx.getInitParameter("currentFreeMemory"));
        queriesList.add(ctx.getInitParameter("availableMemory"));

        // Query for a load range
        queriesList.add(ctx.getInitParameter("currentLoadHistory"));

        System.out.println("DatabaseWebListener.contextIntitialized");
    }

    public static List<String> getQueriesList() {
        return queriesList;
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Shutting down servlet service");
    }
}


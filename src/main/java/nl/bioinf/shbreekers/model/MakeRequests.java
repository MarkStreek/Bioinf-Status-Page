package nl.bioinf.shbreekers.model;

import org.apache.http.client.utils.URIBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.ArrayList;
import java.util.List;


public class MakeRequests {

    public String getData(String queryLink) {
        HttpClient client = HttpClient.newHttpClient();
        try {
            URI workStationURI = new URIBuilder(queryLink).build();

            HttpResponse<String> dataResponse = client.send(
                            HttpRequest
                            .newBuilder(workStationURI)
                            .GET().build(), HttpResponse
                            .BodyHandlers.ofString());

            if (dataResponse.statusCode() == 200) {
                return dataResponse.body();
            }
        } catch (URISyntaxException | InterruptedException | IOException e) {
            System.err.println((String.format("Something went wrong while making a request (Line: %d): %s: %s",
                    e.getStackTrace()[0].getLineNumber(),
                    e.getClass().getSimpleName(), e.getMessage())));
            System.exit(1);
        }
        return "FAILED";
    }


    /**
     * Start the requests to the prometheus server.
     * The input list contains the query links that are needed to get the right data.
     * The output list contains the workstations with the right data set.
     *
     * @param queryLinks the query links
     * @return the list
     */
    public List<Workstation> startRequests(List<String> queryLinks) {
        ParseJsonRequests parseJsonRequests = new ParseJsonRequests();
        try {
            for (String link : queryLinks) {
                String data = getData(link);
                parseJsonRequests.parseJsonToRecord(data);
            }
        } catch (Exception e) {
            System.err.println((String.format("Something went wrong while making a request (Line: %d): %s: %s",
                    e.getStackTrace()[0].getLineNumber(),
                    e.getClass().getSimpleName(), e.getMessage())));
            System.exit(1);
        }
        return parseJsonRequests.getWorkstations();
    }

    public static void main(String[] args) {
//        System.out.println("HERE");
//        MakeRequests makeRequests = new MakeRequests("http://monitor:9090/api/v1/query?query=node_dmi_info");
//        System.out.println(makeRequests.getData().getClass());
    }
}

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
                            .timeout(java.time.Duration.ofSeconds(10))
                            .GET().build(), HttpResponse
                            .BodyHandlers.ofString());

            if (dataResponse.statusCode() == 200) {
                return dataResponse.body();
            }
        } catch (URISyntaxException | InterruptedException | IOException e) {
            System.out.println((String.format("Something went wrong while making a request (Line: %d): %s: %s",
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
            for (String link : queryLinks) {
                try {
                    String data = getData(link);
                    parseJsonRequests.parseJsonToRecord(data);
                } catch (Exception e) {
                    System.out.println((String.format("Something went wrong while start a request (Line: %d): %s: %s",
                            e.getStackTrace()[0].getLineNumber(),
                            e.getClass().getSimpleName(), e.getMessage())));
                }
            }
        return parseJsonRequests.getWorkstations();
    }

    public static void main(String[] args) {
        MakeRequests makeRequests = new MakeRequests();

        List<String> links = List.of("http://localhost:9090/api/v1/query_range?query=node_load1&start=1703674265&end=1703674465&step=30s",
                "http://localhost:9090/api/v1/query?query=node_load1", "http://localhost:9090/api/v1/query?query=up");

        List<Workstation> workstations = makeRequests.startRequests(links);
        System.out.println(workstations.size());
        for (int i = 0; i < workstations.size(); i++) {
            System.out.println(i + " " + workstations.get(i).getInstance());
            System.out.println(i + " " + workstations.get(i).getCurrentLoadHistory());
        }
    }
}

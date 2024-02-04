/**
 * Title: MakeRequests.java
 * Authors: Sibren, Luka and Mark
 * Copyright: Bioinf-Status-Page, 2023-2024
 *
 * Class that makes the requests to the prometheus server
 */

package nl.bioinf.shbreekers.model;

import org.apache.http.client.utils.URIBuilder;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.util.List;

public class MakeRequests {
    /**
     * Logic for making requests
     * Receives a query link and then sends a request with that link.
     * A response body is returned, that contains all data for that request
     * @param queryLink a single query link
     * @return the response body
     */
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
            // Don't let the program crash when a request fails.
            // The program will continue with the next request.
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
                    // Send request per link
                    String data = getData(link);
                    // Convert the request-JSON object for that request to a workstation with a selection of values
                    parseJsonRequests.parseJsonToRecord(data);
                } catch (Exception e) {
                    System.out.println((String.format("Something went wrong starting a request (Line: %d): %s: %s",
                            e.getStackTrace()[0].getLineNumber(),
                            e.getClass().getSimpleName(), e.getMessage())));
                }
            }
        return parseJsonRequests.getWorkstations();
    }
}

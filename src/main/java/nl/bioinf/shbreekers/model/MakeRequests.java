package nl.bioinf.shbreekers.model;

import org.apache.http.client.utils.URIBuilder;

import java.io.IOException;
import java.io.InterruptedIOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

import static java.time.temporal.ChronoUnit.SECONDS;

public class MakeRequests {

    private String queryLink;

    public MakeRequests(String queryLink) {
        this.queryLink = queryLink;
    }

    private String getData() {
        // Make the HTTPClient
        HttpClient client = HttpClient.newHttpClient();
        try {
            URI workStationURI = new URIBuilder(queryLink).build();

            HttpResponse<String> dataResponse = client.send(HttpRequest.newBuilder(workStationURI).GET().build(), HttpResponse.BodyHandlers.ofString());

            if (dataResponse.statusCode() == 200) {
                return dataResponse.body();
            }
        } catch (URISyntaxException | IOException e) {
            e.printStackTrace();
        } catch (InterruptedException e) {
            throw new RuntimeException(e);
        }
        return "FAILED";
    }
}

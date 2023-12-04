package nl.bioinf.shbreekers.model;

import org.apache.http.client.utils.URIBuilder;

import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;


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
            e.printStackTrace();
            // TODO: Proper error handling
        }
        return "FAILED";
    }

    public static void main(String[] args) {
//        System.out.println("HERE");
//        MakeRequests makeRequests = new MakeRequests("http://monitor:9090/api/v1/query?query=node_dmi_info");
//        System.out.println(makeRequests.getData().getClass());
    }
}

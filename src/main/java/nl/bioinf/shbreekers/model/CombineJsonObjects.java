package nl.bioinf.shbreekers.model;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.List;

public class CombineJsonObjects {


    /**
     * Parse json to record list.
     *
     * @return the list
     */
    public List<Workstation> parseJsonToRecord() {
        // Defining a Test request
        String json =
                """
                {          "status": "success",          "data": {            "resultType": "vector",            "result": [              {                "metric": {                  "__name__": "node_load1",                  "instance": "assemblix2012.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "2.42"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "assemblix2019.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.18"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin302.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.81"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin303.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin305.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.07"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin306.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin307.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.61"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "monitor",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.9"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "salt",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.98"                ]              }            ]          }        }
                """;
        // New Gson object and list for the workstations
        Gson gson = new Gson();
        List<Workstation> workstations = new ArrayList<>();

        // The request contains a lot of values, we don't need.
        // If we put the request-JSON in a JsonObject, we can pull out the data we need.
        JsonObject jsonObject = gson.fromJson(json, JsonObject.class);
        // Retrieve the data from the request
        JsonArray results = jsonObject.getAsJsonObject("data").getAsJsonArray("result");

        // Looping through the results array
        for (JsonElement result : results) {
            JsonObject resultObj = result.getAsJsonObject();
            // Retrieve the metric object from the result
            JsonObject metricObj = resultObj.getAsJsonObject("metric");

            // Retrieve the name, instance and job from the metric object
            String name = metricObj.get("__name__").getAsString();
            String instance = metricObj.get("instance").getAsString();
            String job = metricObj.get("job").getAsString();

            // Retrieve the value list out of the 'value' field
            List<String> value = gson.fromJson(resultObj.getAsJsonArray("value"), new TypeToken<List<String>>(){}.getType());

            // With all the information, create a new workstation object and add it to the list
            workstations.add(new Workstation(name, instance, job, value));
        }
        return workstations;
    }

    public static void main(String[] args) {
        CombineJsonObjects combineJsonObjects = new CombineJsonObjects();
        List<Workstation> workstations= combineJsonObjects.parseJsonToRecord();
        System.out.println(workstations);
    }
}

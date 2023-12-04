package nl.bioinf.shbreekers.model;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class ParseJsonRequests {

    List<Workstation> workstations = new ArrayList<>();

    /**
     * Parse json to record list.
     *
     * @return the list
     */
    public List<Workstation> parseJsonToRecord(String requestBody) {
        // Defining a Test request
//        String json =
//                """
//                {          "status": "success",          "data": {            "resultType": "vector",            "result": [              {                "metric": {                  "__name__": "node_load1",                  "instance": "assemblix2012.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "2.42"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "assemblix2019.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.18"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin302.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.81"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin303.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin305.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.07"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin306.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "bin307.bin.bioinf.nl",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.61"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "monitor",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.9"                ]              },              {                "metric": {                  "__name__": "node_load1",                  "instance": "salt",                  "job": "node_exporter"                },                "value": [                  1701441032.4,                  "0.98"                ]              }            ]          }        }
//                """;
        // New Gson object and list for the workstations
        Gson gson = new Gson();

        // The request contains a lot of values, we don't need.
        // If we put the request-JSON in a JsonObject, we can pull out the data we need.
        JsonObject jsonObject = gson.fromJson(requestBody, JsonObject.class);
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
            List<String> value = gson.fromJson(resultObj.getAsJsonArray("value"), new TypeToken<List<String>>() {
            }.getType());

            for (Workstation station : workstations) {
                if (!station.getInstance().equals(instance)) {
                    workstations.add(new Workstation(instance));
                } else if (name.equals("node_load1")) {
                    station.setCurrnetLoad(value.get(1));
                } else if (name.equals("node_load5")) {
                    station.setCurrentLoad5(value.get(1));
                } else if (name.equals("up")) {
                    station.setUP(value.get(1).equals("1"));
                } else if (name.equals("node_memory_MemAvailable_bytes")) {
                    station.setCurrentAvailableMemory(value.get(1));
                } else if (name.equals("node_memory_MemFree_bytes")) {
                    station.setCurrentFreeMemory(value.get(1));
                } else if (name.equals("smartmon_temperature_celsius_raw_value")) {
                    station.setTemperature(value.get(1));
                }
            }
        }
        return workstations;
    }

    public List<Workstation> getWorkstations() {
        return Collections.unmodifiableList(workstations);
    }

    public static void main(String[] args) {
//        ParseJsonRequests parseJsonRequests = new ParseJsonRequests();
//        List<Workstation> workstations= parseJsonRequests.parseJsonToRecord();
//        System.out.println(workstations);
    }
}

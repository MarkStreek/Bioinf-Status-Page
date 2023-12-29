package nl.bioinf.shbreekers.model;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import com.google.gson.stream.JsonToken;

import java.util.*;

public class ParseJsonRequests {

    List<Workstation> workstations = new ArrayList<>();

    /**
     * Parse json to record list.
     *
     */
    public void parseJsonToRecord(String requestBody) {
        // New Gson object and list for the workstations
        Gson gson = new Gson();

        // The request contains a lot of values, we don't need.
        // If we put the request-JSON in a JsonObject, we can pull out the data we need.
        JsonObject jsonObject = gson.fromJson(requestBody, JsonObject.class);
        // Retrieve the data from the request
        JsonArray results = jsonObject.getAsJsonObject("data").getAsJsonArray("result");

        // Looping through the result array
        for (JsonElement result : results) {

            JsonObject resultObj = result.getAsJsonObject();
            // Retrieve the metric object from the result
            JsonObject metricObj = resultObj.getAsJsonObject("metric");

            // Retrieve the name, instance and job from the metric object
            String name = metricObj.get("__name__").getAsString();
            String instance = metricObj.get("instance").getAsString();
            String job = metricObj.get("job").getAsString();

            JsonArray values = resultObj.getAsJsonArray("values");

            List<JsonElement> value = gson.fromJson(resultObj.getAsJsonArray("value"), new TypeToken<List<JsonElement>>() {
            }.getType());

            Workstation newStation = new Workstation(instance);

            if (!workstations.contains(newStation)) {
                workstations.add(newStation);
            }

            List<JsonElement> currentLoad;

            if (values != null) {
                currentLoad = values.asList();
            } else {
                currentLoad = value;
            }

            for (Workstation station : workstations) {
                if (station.getInstance().equals(instance)) {
                    if (job.equals("node_exporter")) {
                        switch (name) {
                            case "node_load1": station.setCurrentLoad(currentLoad); break;
                            case "node_load5" : station.setCurrentLoad5(value.get(1).getAsString()); break;
                            case "up" : station.setUP(value.get(1).getAsString()); break;
                            case "node_memory_MemAvailable_bytes" : station.setCurrentAvailableMemory(value.get(1).getAsString()); break;
                            case "node_memory_MemFree_bytes" : station.setCurrentFreeMemory(value.get(1).getAsString()); break;
                            case "node_hwmon_temp_celsius" : station.setTemperature(value.get(1).getAsString()); break;
                        }
                    }
                }
            }
        }
    }

    public List<Workstation> getWorkstations() {
        return workstations;
    }

    public static void main(String[] args) {
    }
}

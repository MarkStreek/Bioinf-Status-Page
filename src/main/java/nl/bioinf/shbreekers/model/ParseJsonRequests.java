package nl.bioinf.shbreekers.model;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;

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

        // Looping through the results array
        for (JsonElement result : results) {

            JsonObject resultObj = result.getAsJsonObject();
            // Retrieve the metric object from the result
            JsonObject metricObj = resultObj.getAsJsonObject("metric");

            // Retrieve the name, instance and job from the metric object
            String name = metricObj.get("__name__").getAsString();
            String instance = metricObj.get("instance").getAsString();
            String job = metricObj.get("job").getAsString();
            List<String> value = gson.fromJson(resultObj.getAsJsonArray("value"), new TypeToken<List<String>>() {
            }.getType());
//
//            System.out.println("instance: " + instance);
//            System.out.println("name: " + name);
//            System.out.println("job: " + job);
//            System.out.println("value: " + value);

            Workstation newStation = new Workstation(instance);

            if (!workstations.contains(newStation)) {
                workstations.add(newStation);
            }

            for (Workstation station : workstations) {
                if (station.getInstance().equals(instance)) {
                    if (job.equals("node_exporter")) {
                        switch (name) {
                            case "node_load1" -> station.setCurrentLoad(value.get(1));
                            case "node_load5" -> station.setCurrentLoad5(value.get(1));
                            case "up" -> station.setUP(value.get(1));
                            case "node_memory_MemAvailable_bytes" -> station.setCurrentAvailableMemory(value.get(1));
                            case "node_memory_MemFree_bytes" -> station.setCurrentFreeMemory(value.get(1));
                            case "node_hwmon_temp_celsius" -> station.setTemperature(value.get(1));
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

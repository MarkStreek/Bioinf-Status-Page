package nl.bioinf.shbreekers.model;

import com.google.gson.*;
import com.google.gson.reflect.TypeToken;
import java.util.*;

public class ParseJsonRequests {
    /**
     *  Parse the request-JSON object to workstation object
     */

    // List that can be filled with all workstations
    List<Workstation> workstations = new ArrayList<>();

    /**
     * Parse json to record list.
     * Receives a requestBody filled with data for a given request
     * Then selects only the values that are needed which are then assigned to a workstation object
     * Workstation objects are added to a list
     * @param requestBody the body with data of a request
     */
    public void parseJsonToRecord(String requestBody) {
        // New Gson object and list for the workstations
        Gson gson = new Gson();

        // The request contains a lot of values, that aren't needed.
        // If the request-JSON is put into a JsonObject, all needed data can be pulled out.
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

            // Extract and store values if parameter name is given.
            List<JsonElement> value = gson.fromJson(resultObj.getAsJsonArray("value"), new TypeToken<List<JsonElement>>() {
            }.getType());

            Workstation newStation = new Workstation(instance);

            // Add workstation object to class list if not present
            if (!workstations.contains(newStation)) {
                workstations.add(newStation);
            }

            List<JsonElement> currentLoad;

            // Assign data to currentLoad
            if (values != null) {
                currentLoad = values.asList();
            } else {
                currentLoad = value;
            }
            // Loop over every Workstation in class list
            for (Workstation station : workstations) {
                if (station.getInstance().equals(instance)) {
                    if (job.equals("node_exporter")) {
                        // Switch on parameter names
                        switch (name) {
                            // Get data from the 'value' List and assign values for given parameter (by name)
                            // to corresponding class variables of a workstation
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
}

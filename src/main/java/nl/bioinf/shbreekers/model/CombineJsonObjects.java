package nl.bioinf.shbreekers.model;

import com.google.gson.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class CombineJsonObjects {

    /**
     * This method combines json objects with the same instance value.
     *
     * @param jsons: list of json objects
     */
    public void combineMultipleJsonObjects(List<String> jsons) {
        Gson gson = new Gson();
        JsonObject mergedJson = new JsonObject();
        Map<String, List<JsonObject>> combinedMap = new HashMap<>();

        for (String json : jsons) {
            JsonObject jsonObject = gson.fromJson(json, JsonObject.class);

            JsonObject metricObject = jsonObject.getAsJsonObject("metric");
            if (metricObject != null && metricObject.has("instance")) {
                String instance = metricObject.get("instance").getAsString();

                if (!combinedMap.containsKey(instance)) {
                    combinedMap.put(instance, new ArrayList<>());
                }

                List<JsonObject> instanceValues = combinedMap.get(instance);
                instanceValues.add(jsonObject);
            }
        }

        for (Map.Entry<String, List<JsonObject>> entry : combinedMap.entrySet()) {
            JsonArray instanceArray = new JsonArray();
            for (JsonObject instanceValue : entry.getValue()) {
                instanceArray.add(instanceValue);
            }
            mergedJson.add(entry.getKey(), instanceArray);
        }

        System.out.println(mergedJson);
    }

    public static void main(String[] args) {
        CombineJsonObjects combineJsonObjects = new CombineJsonObjects();
        combineJsonObjects.combineMultipleJsonObjects(List.of(
                """
                                {
                                         "metric": {
                                           "__name__": "process_cpu_seconds_total",
                                           "instance": "bin305.bin.bioinf.nl",
                                           "job": "promtail_exporter"
                                         },
                                         "value": [
                                           1701351511.15,
                                           "17471.38"
                                         ]
                                       }
                        """,
                """
                                {
                                         "metric": {
                                           "__name__": "node_load1",
                                           "instance": "bin305.bin.bioinf.nl",
                                           "job": "node_exporter"
                                         },
                                         "value": [
                                           1701356426.099,
                                           "56"
                                         ]
                                       }
                        """,
                """
                                {
                                         "metric": {
                                           "__name__": "node_load1",
                                           "instance": "bin306.bin.bioinf.nl",
                                           "job": "node_exporter"
                                         },
                                         "value": [
                                           1701356426.099,
                                           "100"
                                         ]
                                       }
                        """,
                """
                        {
                                "metric": {
                                  "__name__": "node_load5",
                                  "instance": "bin305.bin.bioinf.nl",
                                  "job": "node_exporter"
                                },
                                "value": [
                                  1701358223.862,
                                  "0"
                                ]
                              }
                        """

        ));
    }
}

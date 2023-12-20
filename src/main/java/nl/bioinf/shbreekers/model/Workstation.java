package nl.bioinf.shbreekers.model;

import nl.bioinf.shbreekers.config.XmlWebListener;

import java.util.*;

public class Workstation implements Comparable<Workstation> {

    private String instance;
    private String currentLoad;
    private String currentLoad5;
    private boolean isUP;
    private String currentAvailableMemory;
    private String currentFreeMemory;
    private String temperature;

    public Workstation(String instance) {
        this.instance = instance;
    }

    public String getInstance() {
        return instance;
    }

    public String getCurrentLoad() {
        return currentLoad;
    }

    public void setCurrentLoad(String currentLoad) {
        if (currentLoad.equals("0") || currentLoad.equals("null")) {
            this.currentLoad = currentLoad;
        } else {
            this.currentLoad = String.format(Locale.US, "%.1f", (Double.parseDouble(currentLoad) * 100)) + "%";
        }
    }

    public String getCurrentLoad5() {
        return currentLoad5;
    }

    public void setCurrentLoad5(String currentLoad5) {
        if (currentLoad5.equals("0") || currentLoad5.equals("null")) {
            this.currentLoad5 = currentLoad5;
        } else {
            this.currentLoad5 = String.format(Locale.US, "%.1f", (Double.parseDouble(currentLoad5) * 100)) + "%";
        }
    }

    public boolean isUP() {
        return isUP;
    }

    public void setUP(String UP) {
        isUP = UP.equals("1");
    }

    public String getCurrentAvailableMemory() {
        return currentAvailableMemory;
    }

    public void setCurrentAvailableMemory(String currentAvailableMemory) {
        if (currentAvailableMemory.length() >= 9) {
            this.currentAvailableMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentAvailableMemory) / 1000000000)) + "GB";
        } else {
            this.currentAvailableMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentAvailableMemory) / 1000000)) + "MB";
        }
    }

    public String getCurrentFreeMemory() {
        return currentFreeMemory;
    }

    public void setCurrentFreeMemory(String currentFreeMemory) {
        if (currentFreeMemory.length() >= 9) {
            this.currentFreeMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentFreeMemory)/ 1000000000)) + "GB";
        } else {
            this.currentFreeMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentFreeMemory) / 1000000)) + "MB";
        }
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature + "℃";
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Workstation that = (Workstation) o;
        return Objects.equals(instance, that.instance);
    }

    @Override
    public int hashCode() {
        return Objects.hash(instance);
    }

    @Override
    public int compareTo(Workstation o) {
        return this.instance.compareTo(o.instance);
    }

    public static void main(String[] args) {

        MakeRequests makeRequests = new MakeRequests();
        List<String> links = List.of("http://localhost:9090/api/v1/query?query=up",
        "http://localhost:9090/api/v1/query?query=node_hwmon_temp_celsius",
        "http://localhost:9090/api/v1/query?query=node_load1",
        "http://localhost:9090/api/v1/query?query=node_load5",
        "http://localhost:9090/api/v1/query?query=node_memory_MemFree_bytes",
        "http://localhost:9090/api/v1/query?query=node_memory_MemAvailable_bytes");
        List<Workstation> workstations = makeRequests.startRequests(links);

        // sort the workstation list using the compareTo method that has been implemented
        Collections.sort(workstations);

        for (Workstation station : workstations) {
            System.out.println(station.getInstance());
        }
    }
}

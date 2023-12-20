package nl.bioinf.shbreekers.model;

import nl.bioinf.shbreekers.config.XmlWebListener;

import java.util.*;

public class Workstation implements Comparator<Workstation> {

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
            this.currentLoad = String.format(Locale.US, "%.1f", (Double.parseDouble(currentLoad) * 100));
        }
    }

    public String getCurrentLoad5() {
        return currentLoad5;
    }

    public void setCurrentLoad5(String currentLoad5) {
        if (currentLoad5.equals("0") || currentLoad5.equals("null")) {
            this.currentLoad5 = currentLoad5;
        } else {
            this.currentLoad5 = String.format(Locale.US, "%.1f", (Double.parseDouble(currentLoad5) * 100));
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
        this.currentAvailableMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentAvailableMemory) / 1000000000));
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
        this.temperature = temperature;
    }

    @Override
    public int compare(Workstation o1, Workstation o2) {

        if (o1.getCurrentLoad() == null) {
            return (o2.getCurrentLoad() == null) ? 0 : 1;
        }
        if (o2.getCurrentLoad() == null) {
            return -1;
        }

        int loadComparison = Double.compare(Double.parseDouble(o1.getCurrentLoad()), Double.parseDouble(o2.getCurrentLoad()));
        if (loadComparison != 0) {
            return loadComparison;
        }

        if (o1.getCurrentAvailableMemory() == null) {
            return (o2.getCurrentAvailableMemory() == null) ? 0 : 1;
        }
        if (o2.getCurrentAvailableMemory() == null) {
            return -1;
        }

        int memoryComparison = Double.compare(Double.parseDouble(o2.getCurrentAvailableMemory()), Double.parseDouble(o1.getCurrentAvailableMemory()));
        if (loadComparison != 0) {
            return memoryComparison;
        }

        if (o1.getTemperature() == null) {
            return (o2.getTemperature() == null) ? 0 : 1;
        }
        if (o2.getTemperature() == null) {
            return -1;
        }

        int temperatureComparison = Double.compare(Double.parseDouble(o1.getTemperature()), Double.parseDouble(o2.getTemperature()));
        if (temperatureComparison != 0) {
            return temperatureComparison;
        }

        if (o1.getCurrentLoad5() == null) {
            return (o2.getCurrentLoad5() == null) ? 0 : 1;
        }
        if (o2.getCurrentLoad5() == null) {
            return -1;
        }
        return Double.compare(Double.parseDouble(o1.getCurrentLoad5()), Double.parseDouble(o2.getCurrentLoad5()));
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
        Collections.sort(workstations, new Workstation("instance"));

        for (Workstation station : workstations) {
            System.out.println(station.getInstance().replaceAll(".bin.bioinf.nl", "") + " " + station.getCurrentLoad() + " " + station.getCurrentAvailableMemory() + " " + station.getTemperature() + " " + station.getCurrentLoad5());
        }
    }
}

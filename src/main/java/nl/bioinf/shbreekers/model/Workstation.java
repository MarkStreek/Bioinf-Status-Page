package nl.bioinf.shbreekers.model;

import com.google.gson.JsonElement;
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
    private List<String> currentLoadHistory = new ArrayList<>();

    public Workstation(String instance) {
        this.instance = instance;
    }

    public String getInstance() {
        return instance;
    }

    public String getCurrentLoad() {
        return currentLoad;
    }

    public List<String> getCurrentLoadHistory() {
        return currentLoadHistory;
    }

    public void setCurrentLoad(List<JsonElement> currentLoad) {
        if (currentLoad.size() <= 2) {
            if (currentLoad.get(1).toString().equals("0") || currentLoad.get(1).toString().equals("null")) {
                this.currentLoad = currentLoad.get(1).toString();
            } else {
                this.currentLoad = String.format(Locale.US, "%.1f", (currentLoad.get(1).getAsDouble()) * 100);
            }
        } else {
            for (int i = 0; i < currentLoad.size(); i++) {
                this.currentLoadHistory.add(String.format(Locale.US, "%.1f", (currentLoad.get(i).getAsJsonArray().get(1).getAsDouble()) * 100));
            }
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
        return this.currentFreeMemory;
    }

    public void setCurrentFreeMemory(String currentFreeMemory) {
        this.currentFreeMemory = String.format(Locale.US, "%.1f", (Double.parseDouble(currentFreeMemory)/ 1000000000));
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }

    @Override
    public int compare(Workstation o1, Workstation o2) {

        if (o1.isUP() && !o2.isUP()) {
            return -1;
        }
        if (!o1.isUP() && o2.isUP()) {
            return 1;
        }

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

}

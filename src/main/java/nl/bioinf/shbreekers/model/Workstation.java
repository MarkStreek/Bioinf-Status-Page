package nl.bioinf.shbreekers.model;

import java.util.Objects;

public class Workstation {

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
            this.currentLoad = String.format("%.1f", (Double.parseDouble(currentLoad) * 100)) + "%";
        }
    }

    public String getCurrentLoad5() {
        return currentLoad5;
    }

    public void setCurrentLoad5(String currentLoad5) {
        if (currentLoad5.equals("0") || currentLoad5.equals("null")) {
            this.currentLoad5 = currentLoad5;
        } else {
            this.currentLoad5 = String.format("%.1f", (Double.parseDouble(currentLoad5) * 100)) + "%";
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
            this.currentAvailableMemory = String.format("%.1f", (Double.parseDouble(currentAvailableMemory) / 1000000000)) + "gb";
        } else {
            this.currentAvailableMemory = String.format("%.1f", (Double.parseDouble(currentAvailableMemory) / 1000000)) + "mb";
        }
    }

    public String getCurrentFreeMemory() {
        return currentFreeMemory;
    }

    public void setCurrentFreeMemory(String currentFreeMemory) {
        if (currentFreeMemory.length() >= 9) {
            this.currentFreeMemory = String.format("%.1f", (Double.parseDouble(currentFreeMemory)/ 1000000000)) + "gb";
        } else {
            this.currentFreeMemory = String.format("%.1f", (Double.parseDouble(currentFreeMemory) / 1000000)) + "mb";
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
}

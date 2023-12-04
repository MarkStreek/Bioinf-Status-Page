package nl.bioinf.shbreekers.model;

import java.util.List;

public class Workstation {

    private String instance;
    private String CurrnetLoad;
    private String CurrentLoad5;
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

    public String getCurrnetLoad() {
        return CurrnetLoad;
    }

    public void setCurrnetLoad(String currnetLoad) {
        CurrnetLoad = currnetLoad;
    }

    public String getCurrentLoad5() {
        return CurrentLoad5;
    }

    public void setCurrentLoad5(String currentLoad5) {
        CurrentLoad5 = currentLoad5;
    }

    public boolean isUP() {
        return isUP;
    }

    public void setUP(boolean UP) {
        isUP = UP;
    }

    public String getCurrentAvailableMemory() {
        return currentAvailableMemory;
    }

    public void setCurrentAvailableMemory(String currentAvailableMemory) {
        this.currentAvailableMemory = currentAvailableMemory;
    }

    public String getCurrentFreeMemory() {
        return currentFreeMemory;
    }

    public void setCurrentFreeMemory(String currentFreeMemory) {
        this.currentFreeMemory = currentFreeMemory;
    }

    public String getTemperature() {
        return temperature;
    }

    public void setTemperature(String temperature) {
        this.temperature = temperature;
    }
}

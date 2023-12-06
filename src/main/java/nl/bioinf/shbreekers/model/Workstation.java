package nl.bioinf.shbreekers.model;

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
        this.currentLoad = currentLoad;
    }

    public String getCurrentLoad5() {
        return currentLoad5;
    }

    public void setCurrentLoad5(String currentLoad5) {
        this.currentLoad5 = currentLoad5;
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

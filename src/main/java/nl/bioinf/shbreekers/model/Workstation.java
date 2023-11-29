package nl.bioinf.shbreekers.model;

import java.util.List;

public record Workstation(String _computer_,
                          boolean _status_,
                          boolean _inUse_,
                          int _processorLoad_,
                          int _temperature_,
                          int _uptime_,
                          List<String> _users_,
                          String _classroom_
) {
}

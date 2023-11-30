package nl.bioinf.shbreekers.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public record Workstation(
        @SerializedName("__name__")
        String __name__,

        @SerializedName("instance")
        String instance,

        @SerializedName("job")
        String job
//        String _computer_,
//        boolean _status_,
//        boolean _inUse_,
//        int _processorLoad_,
//        int _temperature_,
//        int _uptime_,
//        List<String> _users_,
//        String _classroom_
) {
}

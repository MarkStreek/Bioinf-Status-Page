package nl.bioinf.shbreekers.model;

import com.google.gson.annotations.SerializedName;

import java.util.List;

public record Workstation(
        @SerializedName("__name__")
        String __name__,

        @SerializedName("instance")
        String instance,

        @SerializedName("job")
        String job,

        @SerializedName("value")
        List<String> load
) {
}

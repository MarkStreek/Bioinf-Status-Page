package nl.bioinf.shbreekers.model;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.util.Calendar;
import java.util.Date;

public class MessageFactory {
    public static String giveMessage(){
        LocalDate d = LocalDate.now();
        DayOfWeek day = d.getDayOfWeek();
//        System.out.println("day = " + day);
        Calendar cal = Calendar.getInstance();
        cal.setTime(new Date());
        int dayOfWeek = cal.get(Calendar.DAY_OF_WEEK);

        if (dayOfWeek == 1){
            return "It is sunday so we cannot serve you.";
        } else if (dayOfWeek == 7){
            return "Commerce must flow, also on saturday" + day;
        } else {
            return "Boring day" + day;
        }
    }
}

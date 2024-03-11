package com.submodule.maincode;


import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.submodule.maincode.service.externalcall;

import java.time.LocalDate;
import java.time.format.DateTimeFormatter;

@RestController
public class apimaps {
    @GetMapping("/pod")
	public ResponseEntity<?> apod(@RequestParam(value = "date", required = false) String date,
                            @RequestParam(value = "start_date", required = false) String start_date,
                            @RequestParam(value = "end_date",required = false) String end_date,
                            @RequestParam(value = "count",required = false) String count,
                            @RequestParam(value = "thumbs",required = false) String thumbs) {

        
        externalcall externalcallObj =  new externalcall();
        return externalcallObj.getNASAPOD(date,start_date, end_date,count, thumbs);
    }
        
        
}

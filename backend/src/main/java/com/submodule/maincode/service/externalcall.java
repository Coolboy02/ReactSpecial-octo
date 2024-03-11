package com.submodule.maincode.service;
import java.util.*;

import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import lombok.Getter;
import lombok.Setter;
import java.util.*;

@Getter
@Setter
public class externalcall {
    private Map<String, Object> resource; // Assuming a generic structure for flexibility
    private Boolean concept_tags;
    private String title;
    private String date;
    private String url;
    private String hdurl; // May be omitted if not available
    private String media_type;
    private String explanation;
    private String[] concepts; // Assuming an array of strings for the concepts
    private String thumbnail_url;
    private String copyright;
    private String service_version;

    public ResponseEntity<?> getNASAPOD( String date,String start_date,String end_date,String count,String thumbs){
        String apiKey = "Epi0Oq0qLq0OP1HYN7N01IXazaijyh7FhJFQdlHs"; // Ideally store this securely
        String baseUrl = "https://api.nasa.gov/planetary/apod?api_key=" + apiKey;

        String url = baseUrl 
            + (date != null ? "&date=" + date : "") 
            + (start_date != null ? "&start_date=" + start_date : "") 
            + (end_date != null ? "&end_date=" + end_date : "") 
            + (count != null ? "&count=" + count : "") 
            + (thumbs != null ? "&thumbs=" + thumbs : "");
        
        RestTemplate restTemplate = new RestTemplate();
        System.out.println(url);

        try {
            
            externalcall[] responsesArray = restTemplate.getForObject(url, externalcall[].class);
            List<externalcall> responsesList = Arrays.asList(responsesArray);
            return ResponseEntity.ok(responsesList);
        } catch (Exception e) {
            externalcall response = restTemplate.getForObject(url, externalcall.class);
            return ResponseEntity.ok(response);
        }
    }
}

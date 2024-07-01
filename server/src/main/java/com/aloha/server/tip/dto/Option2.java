package com.aloha.server.tip.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class Option2 {
    String keyword;
    int code;
    
    public Option2() {
        this.keyword = "";
    }


}

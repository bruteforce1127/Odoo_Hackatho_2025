package com.kucp1127.StackIt.Email.DTO;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AnswerDto {
    private String toEmail;
    private String name1;
    private String name2;
}

package io.nology.trivia_api.User;

import lombok.Data;

@Data
public class UpdateUserDTO {

    private String firstName;

    private String lastName;

    private String gamerTag;

    private Long points;

}

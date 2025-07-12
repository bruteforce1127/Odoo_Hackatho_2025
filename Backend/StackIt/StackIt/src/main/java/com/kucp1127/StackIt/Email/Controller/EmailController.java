package com.kucp1127.StackIt.Email.Controller;


import com.kucp1127.StackIt.Email.Service.EmailService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;


@Service
public class EmailController {

    @Autowired
    public EmailService emailService;

    public void sendEmailWhileSignup(String toEmail , String name ){
        emailService.sendSimpleEmail(
                toEmail,
                "Email Regarding Registration on StackIt",
                "" +
                        "Hi " + name + ",\n" +
                        "\n" +
                        "Thank you for registering on ScapIT! \uD83C\uDF89\n" +
                        "\n" +
                        "You can now:\n" +
                        "✅ Post your questions and get them answered by peers and experts.\n" +
                        "✅ Track your questions and answers under your profile.\n" +
                        "✅ Earn reputation, badges, and grow your learning network.\n" +
                        "\n" +
                        "Your learning journey starts today, and we’re excited to have you with us!\n" +
                        "\n" +
                        "If you have any questions or need assistance, feel free to reply to this email.\n" +
                        "\n" +
                        "Happy learning and sharing!\n" +
                        "\n" +
                        "Best regards,\n" +
                        "The ScapIT Team\n" +
                        "\n"
        );
    }

}

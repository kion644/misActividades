package com.ca.control.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.mail.*;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;
import java.util.List;
import java.util.Properties;

@Service
public class EmailService {



    @Value("${email.remitente.host:}")
    String host;

    @Value("${email.remitente.port:}")
    String port;

    @Value("${email.remitente:}")
    String remitente;

    @Value("${email.remitente.password:}")
    String pass;

    //------------Annotation for internal e-mail recipients-----//
    @Value("#{'${email.destinatarios:}'.split(',')}")
    List<String> destinatarios;
    //-------------------------------------------------//


    /*
     * Método de envío de e-mail interno para la lista
     * de destinatarios tomada del archivo de propiedades
     *
     * messageSubject -> Asunto
     * messageText -> Cuerpo
     * */
    public void enviarEmailInterno(String messageSubject, String messageText){
        try {
            Properties prop = new Properties();
            prop.put("mail.smtp.ssl.trust", host);
            prop.put("mail.smtp.host", host);
            prop.put("mail.smtp.port", port);
            prop.put("mail.smtp.user", remitente);
            prop.put("mail.smtp.password", pass);
            prop.put("mail.smtp.auth", "LOGIN");
            prop.put("mail.smtp.starttls.enable", "true"); // TLS
            prop.put("mail.smtp.debug", "true");
            prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
            prop.put("mail.smtp.timeout", 10000);

            Session session = Session.getInstance(prop,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(remitente, pass);
                        }
                    });

            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(remitente));
                destinatarios.forEach(destinatario ->//Ingreso cada destinatario
                        {
                            try {
                                message.addRecipient(
                                        Message.RecipientType.TO,
                                        new InternetAddress(destinatario));
                            } catch (MessagingException e) {
                                throw new RuntimeException(e);
                            }
                        }
                );
                message.setSubject(messageSubject);
                message.setText(messageText);

                Transport.send(message);

            } catch (MessagingException mex) {
                mex.printStackTrace();
            }

        }catch (Exception e){
            System.out.println("Error en EmailService > enviarEmailInterno: " + e);
        }


    }


    /*
    * Método de envío de e-mail genérico para una lista de destinatarios dada
    *
    * destinatarios -> Lista de tipo string de los destinatarios
    * messageSubject -> Asunto
    * messageText -> Cuerpo
    * */
    public void enviar(List<String> destinatarios, String messageSubject, String messageText) {
        try {
            Properties prop = new Properties();
            prop.put("mail.smtp.ssl.trust", host);
            prop.put("mail.smtp.host", host);
            prop.put("mail.smtp.port", port);
            prop.put("mail.smtp.user", remitente);
            prop.put("mail.smtp.password", pass);
            prop.put("mail.smtp.auth", "LOGIN");
            prop.put("mail.smtp.starttls.enable", "true"); // TLS
            prop.put("mail.smtp.debug", "true");
            prop.put("mail.smtp.ssl.protocols", "TLSv1.2");
            prop.put("mail.smtp.timeout", 10000);

            Session session = Session.getInstance(prop,
                    new javax.mail.Authenticator() {
                        protected PasswordAuthentication getPasswordAuthentication() {
                            return new PasswordAuthentication(remitente, pass);
                        }
                    });

            try {
                Message message = new MimeMessage(session);
                message.setFrom(new InternetAddress(remitente));
                destinatarios.forEach(destinatario ->//Ingreso cada destinatario
                        {
                            try {
                                message.addRecipient(
                                Message.RecipientType.TO,
                                new InternetAddress(destinatario));
                            } catch (MessagingException e) {
                                throw new RuntimeException(e);
                            }
                        }
                );
                message.setSubject(messageSubject);
                message.setText(messageText);

                Transport.send(message);

            } catch (MessagingException mex) {
                mex.printStackTrace();
            }

        }catch (Exception e){
            System.out.println("Error en EmailService > enviar: " + e);
        }
    }
}
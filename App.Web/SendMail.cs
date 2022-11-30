using Microsoft.AspNetCore.Identity.UI.Services;
using System.Net.Mail;

namespace App.Web
{
    public class SendMail : IEmailSender
    {
        public async Task SendEmailAsync(string email, string subject, string htmlMessage)
        {
            //System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
            using (MailMessage mailMessage = new MailMessage())
            {
                
                mailMessage.From = new MailAddress("support@quibs.com", "Quib Support");
                mailMessage.Subject = subject;
                mailMessage.Body = email + htmlMessage;
                mailMessage.IsBodyHtml = true;
                mailMessage.To.Add(new MailAddress(email));
                SmtpClient smtpClient = new SmtpClient();
                smtpClient.Host = "mailtrap.io";
                //smtpClient.EnableSsl = true;
                System.Net.NetworkCredential networkCredential = new System.Net.NetworkCredential();
                networkCredential.UserName = "JimmyMcClements";
                networkCredential.Password = "5m9pG6hsvBHEcUfL";
                smtpClient.UseDefaultCredentials = false;
                smtpClient.Credentials = networkCredential;
                smtpClient.Port = 2525;
                //System.Net.ServicePointManager.Expect100Continue = false;
                //System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;
                await smtpClient.SendMailAsync(mailMessage);
            }
        }
    }
}

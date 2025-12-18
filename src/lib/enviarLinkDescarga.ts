import Mailgun from "mailgun.js";
import formData from "form-data";
import imgMail from "../../public/resources/LOGOTIPO-CREMA.svg";

export async function enviarLinkDescarga(data: FormData) {
  const emailTo = data.get("Email").toString();

  // Configuración de Mailgun
  const mailgun = new Mailgun(formData);
  const client = mailgun.client({
    username: "api",
    key: import.meta.env.MAILGUN_API_KEY, // API Key desde Mailgun
  });

  const emailText = `<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><title>Asegurarse es la Nueva Moda</title></head><body style="margin:0; padding:0; background-color:#fefaf6; font-family: Arial, Helvetica, sans-serif; color:#222;"><table width="100%" border="0" cellspacing="0" cellpadding="0" bgcolor="#fefaf6" style="padding:20px 0;"><tr><td align="center"><table width="600" border="0" cellspacing="0" cellpadding="0" bgcolor="#fff3e9" style="border-radius:8px; padding:20px;"><tr><td align="center" style="padding:20px;"><h1 style="margin:0; font-size:24px; font-weight:bold; color:#1c5d4f;">Asegurarse es la <span style="color:#e63946;">Nueva Moda</span></h1><p style="margin:5px 0; font-size:18px;">⬇️</p></td></tr><tr><td style="padding:20px; font-size:16px; line-height:1.5; color:#333;"><p style="margin:0 0 15px;">Hola 👋</p><p style="margin:0 0 15px;">Descargá la guía digital y gratuita <strong>"Aprendé a leer tu póliza"</strong> en el siguiente link 👉 <a href=${
    import.meta.env.URL_DESCARGA_GUIA
  } style="color:#000; font-weight:bold; text-decoration:underline;">QUIERO MI GUÍA</a></p><p style="margin:0 0 15px;">¡No te olvides de sumarte a la comunidad <strong>Tribu Segura!</strong> ✅</p><p style="margin:0 0 15px;">Abajo están mis redes sociales 👇</p><p style="margin:0;">Nos vemos pronto!</p></td></tr><tr><td bgcolor="#000" style="padding:30px; border-radius:0 0 8px 8px; color:#fff;" align="center"><p style="margin:0 0 10px; font-size:20px; font-weight:bold;">La Chica del Seguro ♥️</p><p style="margin:0 0 20px; font-size:14px; line-height:1.4;">Bolívar 75 - depto. 39 - CP 6620 - Chivilcoy<br>Argentina</p></body><html>`;

  try {
    const result = await client.messages.create(
      import.meta.env.MAILGUN_DOMAIN,
      {
        from: `La Chica del Seguro <noreply@${import.meta.env.MAILGUN_DOMAIN}>`,
        to: emailTo,
        subject: `Aquí está tu guía gratuita! 🎁`,
        html: emailText,
      }
    );

    return result.status;
  } catch (error) {
    console.error("Error al enviar el correo:", error);
  }
}

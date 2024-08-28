import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/libs/resend";
import config from "@/config";

// This route receives incoming emails from Resend and forwards them to the configured customer support email address.
// See more: https://docs.microsaasfast.me/emails/

export async function POST(req: NextRequest) {
  try {
    // Extract the form data from the incoming request.
    const formData = await req.formData();

    // Get the sender's email, the subject of the email, and the HTML content from the form data.
    const sender = formData.get("From");
    const subject = formData.get("Subject");
    const html = formData.get("body-html");

    // Check if forwarding is configured, and ensure that all necessary fields (sender, subject, and html) are present.
    if (config.resend.forwardRepliesTo && html && subject && sender) {
      // Send an email using the sendEmail function.
      await sendEmail({
        // The email address from which the email will be sent (configured in the environment variables).
        from: process.env.SEND_EMAIL_FROM,

        // The subject of the email, including the application name and the original subject.
        subject: `${config?.appName} | ${subject}`,

        // The HTML content of the email, which includes the original subject, sender, and content.
        html: `<div>
                 <p><b>- Subject:</b> ${subject}</p>
                 <p><b>- From:</b> ${sender}</p>
                 <p><b>- Content:</b></p>
                 <div>${html}</div>
               </div>`,

        // Set the "Reply-To" header to the original sender's email address.
        replyTo: String(sender),
      });
    }

    // Return an empty JSON response to indicate successful processing.
    return NextResponse.json({});
  } catch (e) {
    console.error(e?.message);
    return NextResponse.json({ error: e?.message }, { status: 500 });
  }
}

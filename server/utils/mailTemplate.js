const styles = {
  body: `margin: 0; padding: 0; width: 100%; background-color: #f9fafb; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;`,
  wrapper: `padding: 40px 10px; background-color: #f9fafb;`,
  container: `max-width: 500px; margin: 0 auto; background-color: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06); border: 1px solid #e5e7eb;`,
  header: `background-color: #1f2937; padding: 30px; text-align: center;`,
  logo: `color: #ffffff; font-size: 24px; font-weight: 800; letter-spacing: -0.025em; margin: 0; text-transform: uppercase;`,
  content: `padding: 40px 30px; text-align: center;`,
  title: `font-size: 22px; font-weight: 700; color: #111827; margin-bottom: 12px;`,
  text: `font-size: 16px; color: #4b5563; line-height: 1.6; margin-bottom: 24px;`,
  otpContainer: `background-color: #f3f4f6; border-radius: 8px; padding: 24px; margin: 24px 0; border: 1px solid #e5e7eb;`,
  otpNumber: `font-size: 38px; font-weight: 800; letter-spacing: 8px; color: #2563eb; font-family: 'Courier New', Courier, monospace;`,
  expiry: `font-size: 13px; color: #9ca3af; margin-top: 10px; font-style: italic;`,
  footer: `padding: 24px; text-align: center; border-top: 1px solid #f3f4f6;`,
  footerText: `font-size: 12px; color: #9ca3af; line-height: 1.5; margin: 0;`,
};

const wrapLayout = (content, companyName) => {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            @media only screen and (max-width: 600px) {
                .container { width: 100% !important; border-radius: 0 !important; }
            }
        </style>
    </head>
    <body style="${styles.body}">
        <div style="${styles.wrapper}">
            <div style="${styles.container}" class="container">
                <div style="${styles.header}">
                    <h1 style="${styles.logo}">${companyName}</h1>
                </div>
                <div style="${styles.content}">
                    ${content}
                </div>
                <div style="${styles.footer}">
                    <p style="${styles.footerText}">
                        &copy; ${new Date().getFullYear()} ${companyName}. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    </body>
    </html>
  `;
};

export const otpEmail = (verificationOTP, companyName) => {
  const content = `
    <h2 style="${styles.title}">Verify Email</h2>
    <p style="${styles.text}">To complete your account setup, please use the 6-digit verification code below. This code will only be active for a limited time.</p>
    
    <div style="${styles.otpContainer}">
        <div style="${styles.otpNumber}">${verificationOTP}</div>
        <p style="${styles.expiry}">Valid for 1 hour • Do not share this code</p>
    </div>
    
    <p style="${styles.text}">If you didn't request this code, you can safely ignore this email.</p>
  `;
  return wrapLayout(content, companyName);
};

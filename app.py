from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
import logging

# Set up logging
logging.basicConfig(level=logging.DEBUG)
logger = logging.getLogger(__name__)

app = Flask(__name__)

# Email configuration
app.config.update(
    MAIL_SERVER='smtp.gmail.com',
    MAIL_PORT=465,  # Changed to 465 for SSL
    MAIL_USE_SSL=True,  # Use SSL
    MAIL_USE_TLS=False,  # Disable TLS
    MAIL_USERNAME='yillipillinikitha1975@gmail.com',
    MAIL_PASSWORD='lufj libi hxoj xdzo',
    MAIL_DEFAULT_SENDER='yillipillinikitha1975@gmail.com',
    MAIL_MAX_EMAILS=None,
    MAIL_ASCII_ATTACHMENTS=False
)

mail = Mail(app)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/test_email')
def test_email():
    try:
        logger.info("Attempting to send test email...")
        msg = Message(
            "Test Email",
            sender='yillipillinikitha1975@gmail.com',
            recipients=['yillipillinikitha1975@gmail.com'],
            body="This is a test email from your Flask application."
        )
        mail.send(msg)
        logger.info("Test email sent successfully!")
        return "Test email sent! Check your inbox and spam folder."
    except Exception as e:
        logger.error(f"Error sending test email: {str(e)}")
        return f"Error: {str(e)}"

@app.route('/send_email', methods=['POST'])
def send_email():
    try:
        data = request.get_json()
        logger.info(f"Received data: {data}")
        
        name = data.get('name')
        email = data.get('email')
        subject = data.get('subject')
        message = data.get('message')

        msg = Message(
            subject=f"Portfolio Contact: {subject}",
            sender='yillipillinikitha1975@gmail.com',
            recipients=['yillipillinikitha1975@gmail.com'],
            body=f"""
            New message from your portfolio website:
            
            Name: {name}
            Email: {email}
            Subject: {subject}
            
            Message:
            {message}
            """
        )
        
        mail.send(msg)
        logger.info("Email sent successfully!")
        return jsonify({"status": "success", "message": "Message sent successfully!"})

    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return jsonify({"status": "error", "message": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
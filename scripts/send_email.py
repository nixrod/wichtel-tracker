import os
import mysql.connector
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

db_user = os.environ['MYSQL_USER']
db_pass = os.environ['MYSQL_PW']
sendgrid_api_key = os.environ['SENDGRID_API_KEY']

connection = mysql.connector.connect(host='104.248.23.137',
                                     database='wichtel',
                                     user=db_user,
                                     password=db_pass)

sg = SendGridAPIClient(sendgrid_api_key)


query = "SELECT u.name as wichtel_name, w.wishes as wichtel_wishes, p.email as email_partner, p.name as partner_name " \
        "FROM wichtel.users u " \
        "LEFT JOIN wichtel.wishlists w " \
        "ON w.user_id = u.id " \
        "LEFT JOIN wichtel.users p " \
        "ON p.id = w.partner_id"
cursor = connection.cursor(buffered=True)
cursor.execute(query)
res = cursor.fetchall()

for wish in res:
    if wish[1] is None:
        continue
    print("Email to ", wish[2])
    message_content = '<p>Hallo ' + wish[3] + \
                      ',</p><p>ich wünsche mir von dir folgende Dinge:</p><p>' \
                      + wish[1] + '</p>Viele Grüße, ' + wish[0]
    message = Mail(
        # Adapt with your sender email here
        from_email='michael@example.com',
        to_emails=wish[2],
        subject='Die Wichtelwünsche sind da!',
        html_content=message_content)

    response = sg.send(message)
    print(response.status_code, response.body, response.headers)


cursor.close()
connection.close()

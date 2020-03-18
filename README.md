# nodejs-nodemailer-gsuite-example
![GSuite OAuth2 Authentication to be used with NodeMailer](https://alpibo.com/wp-content/uploads/2020/03/How-to-connect-gmail-minified.png)

While I was developing a cross-platform [Electron](https://www.electronjs.org/) application, I had to be able to somehow send email notifications to the application`s users. After doing some research I came to the conclusion that the best thing to do was to connect a GSuite account using the NodeJS package [NodeMailer](https://nodemailer.com/about/).

I am not going to lie, there were some difficult parts in the process which seem to be poorly documented. Fortunately, I will be able to guide you through this endeavour step by step. 

## Setting up GSuite for sending emails

The first thing you will need is a G Suite account with administrator permissions in the organisation.

We will be using OAuth2 to authenticate the mail requests. The Google OAuth 2.0 system supports server-to-server interactions such as those between a web application and a Google service. For this scenario you need a service account, which is an account that belongs to your application instead of to an individual end user. Your application calls Google APIs on behalf of the service account, so users aren’t directly involved. This scenario is sometimes called “two-legged OAuth,” or “2LO.” (The related term “three-legged OAuth” refers to scenarios in which your application calls Google APIs on behalf of end users, and in which user consent is sometimes required.)

Typically, an application uses a service account when the application uses Google APIs to work with its own data rather than a user’s data. For example, an application that uses Google Cloud Datastore for data persistence would use a service account to authenticate its calls to the Google Cloud Datastore API. More info can be found here: [https://developers.google.com/identity/protocols/oauth2/service-account](https://developers.google.com/identity/protocols/oauth2/service-account)

In order to create a new project, go to [https://console.cloud.google.com/iam-admin/serviceaccounts](https://console.cloud.google.com/iam-admin/serviceaccounts).

You can either create a new project or use an existing one. A project requires only a name and a location (which should be your organisation). If you want to create a project, just hit the ‘Create Project’ button.

![Create a new GSuite Project](https://alpibo.com/wp-content/uploads/2020/03/how-to-connect-gsuite-nodemailer-step-1.jpg)

After the project is created you should create a service account. The name of the service key does not matter at all, give it a name you will recognise later.

![Create a new service account](https://alpibo.com/wp-content/uploads/2020/03/how-to-connect-gsuite-nodemailer-step-2.jpg)

During the second step you can grant permissions to the service account. We will just skip this step.

The last step is to create a secret key for the service account that will be used to communicate with the service. It can be generated and downloaded as a JSON to be used in our NodeJS app:

![Download JSON file with service key](https://alpibo.com/wp-content/uploads/2020/03/how-to-connect-gsuite-nodemailer-step-3-scaled.jpg)

The last step is to enable the API for the service account. This can be done using the admin panel of your G Suite: [https://accounts.google.com/](https://accounts.google.com/)

**Security -> Advanced security -> Manage API client access**

![Manage API client access](https://alpibo.com/wp-content/uploads/2020/03/how-to-connect-gsuite-nodemailer-step-4.jpg)

Now you need to open the JSON file you downloaded in one of the previous steps and copy your **“client_id”** code. Paste the code in the **“Client Name”** field and **https://mail.google.com** as an API scope.

Then, just press **“Authorize”**.

![Authorize API client access](https://alpibo.com/wp-content/uploads/2020/03/how-to-connect-gsuite-nodemailer-step-5.jpg)

If you have followed the whole process step by step you should now see **Email (Read/Write/Send)** as the resolved permission.

## Importing NodeMailer and sending a test email

NodeMailer has been created in 2010 and has come a long way since then. I love the fact that it has zero dependencies and is heavily focused on security. It only requires a Node.js 6.0.0 or newer version to give you the ability to send emails, add attachments, embed images and generally to make your life easier.

You can find a very simplified example in [nodemailer-example.js](https://github.com/antonioiliev/nodejs-nodemailer-gsuite-example/blob/master/nodemailer-example.js) file.


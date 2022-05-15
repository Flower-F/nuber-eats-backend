import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'src/common/common.constants';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import { MailModuleOptions } from './mail.interfaces';
import { MAIL_SUBJECT } from './mai.constants';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: MailModuleOptions,
  ) {}

  private getTransporter() {
    return nodemailer.createTransport({
      host: this.options.host,
      service: this.options.service, // 邮箱类型 例如 service:'163'
      secure: true, // 是否使用 https
      port: 465, // 邮件服务所占用的端口
      auth: {
        user: this.options.user, // 发件人
        pass: this.options.pass, // 授权码
      },
    });
  }

  // 邮件模板
  private getTemplate(content: string) {
    return `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta http-equiv="X-UA-Compatible" content="IE=edge" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <title>Nuber Eats Verification</title>
      
          <style>
            body,
            html,
            div,
            ul,
            li,
            button,
            p,
            img,
            h1,
            h2,
            h3,
            h4,
            h5,
            h6 {
              margin: 0;
              padding: 0;
            }
      
            body,
            html {
              background: #fff;
              line-height: 1.8;
            }
      
            .email-container {
              height: 100vh;
              font-size: 14px;
              color: #212121;
              display: flex;
              justify-content: center;
              align-items: center;
            }
      
            .email-title {
              font-size: 20px;
              font-weight: 500;
              color: #252525;
            }
      
            .warm_tips {
              margin-top: 10px;
              color: #757575;
              background: #f7f7f7;
              padding: 20px;
            }
      
            .warm_tips .desc {
              margin-bottom: 20px;
            }
      
            .nuber-eats {
              font-size: 30px;
              font-weight: 800;
            }
      
            .nuber-eats-container {
              max-width: 500px;
              min-height: 1vh;
              display: flex;
              align-items: center;
              justify-content: center;
              flex-direction: column;
            }
      
            .nuber-eats-container .account-email {
              color: #4c84ff;
              display: block;
              font-weight: 600;
              margin-bottom: 20px;
            }
          </style>
        </head>
      
        <body>
          <section class="email-container">
            <div class="nuber-eats-container">
              <h1 class="nuber-eats">[Nuber Eats]</h1>
              <h3 class="email-title">尊敬的用户您好：</h3>
              <p>您的验证码为：</p>
              <p class="account-email">${content}</p>
      
              <p>请注意，如果这不是您本人的操作，请忽略并关闭此邮件。</p>
      
              <div class="warm_tips">
                <p class="desc">为安全起见，此验证码仅供一次性使用，请您尽快完成操作。</p>
                <p>如有任何疑问或无法完成注册，请直接回复此邮箱与我们联系。</p>
                <p>本邮件由系统自动发送，请勿回复。</p>
              </div>
            </div>
          </section>
        </body>
      </html>
    `;
  }

  sendVerificationEmail(email: string, code: string) {
    const transporter = this.getTransporter();
    const mailOptions: Mail.Options = {
      from: this.options.user,
      to: email,
      subject: MAIL_SUBJECT,
      html: this.getTemplate(code),
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.log(error);
      }
    });
  }
}

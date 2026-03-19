"use server";

import { Resend } from "resend";

type FormInfo = {
    name : string,
    surname: string,
    email : string,
    subject: string,
    comment: string
}

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (formInfo : FormInfo) => {
    await resend.emails.send({
        to: 'leksos95@gmail.com',
        from: formInfo.email,
        subject: formInfo.subject,
        html: `<p>${formInfo.comment}</p>`
    });
}
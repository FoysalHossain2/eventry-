'use server'

import EmailTemplate from "@/components/payments/EmailTemplate";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Resend } from "resend";
const { createUser, fundUserByCredentials, updateInterest, updateGoing, getAllEventsId } = require("@/db/queries");


async function registerUser(formData) {
    const user = Object.fromEntries(formData);
    const crated = await createUser(user);
    redirect('/login');
}

async function performLogin(formData) {

    try {
        const credential = {};
        credential.email = formData.get('email');
        credential.password = formData.get('password');
        const found = await fundUserByCredentials(credential);
        return found;
    } catch (error) {
        throw error
    }
}

async function addInterestedEvent(evenId, authId) {
   try {
    await updateInterest(evenId, authId)
   } catch (error) {
    throw error
   } 
   revalidatePath('/')
}

async function addGoingEvent(evenId, user) {
    try {
        await updateGoing(evenId, user?.id);
        await sendEmail(evenId, user);
    } catch (error) {
        throw error;
    }
    revalidatePath('/')
    redirect('/')
}

async function sendEmail(eventId, user) {
    try{
      console.log(eventId, user, process.env.RESEND_API_KEY);
      const event = await getAllEventsId(eventId);
      const resend = new Resend(process.env.RESEND_API_KEY);
      const message = `Dear ${user?.name}, you have been successfully registered for the event, ${event?.name}. Please carry this email and your official id to the venue. We are excited to have you here.`;
      const sent = await resend.emails.send({
        from: "noreply@noreply.tapascript.io",
        to: user?.email,
        subject: "Successfully Registered for the event!",
        react: EmailTemplate({ message })
      });
    } catch (error) {
      throw error;
    }
  }



export {
    registerUser,
    performLogin,
    addInterestedEvent,
    addGoingEvent,
    sendEmail
    
};
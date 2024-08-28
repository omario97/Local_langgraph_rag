import { NextResponse, NextRequest } from "next/server";
import { headers } from "next/headers";
import Stripe from "stripe";
import configFile from "@/config";
import { findCheckoutSession } from "@/libs/stripe";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";
import { stripe, webhookSecret } from "@/constants/stripe";

// This route handles receiving Stripe webhook events, which are used to update user data, send emails, and more.
// By default, it will store the user in the database.
// See more: https://docs.microsaasfast.me/payments/

export async function POST(req: NextRequest) {
  // Get the raw body of the incoming request.
  const body = await req.text();
  // Retrieve the Stripe signature from the request headers.
  const signature = headers().get("stripe-signature");
  let event;
  // Verify the Stripe webhook signature to ensure the request is genuine.
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    // If signature verification fails, log the error and return a 400 response.
    console.error(`Webhook signature verification failed. ${err.message}`);
    return NextResponse.json({ error: err.message }, { status: 400 });
  }
  try {
    // Handle the different types of Stripe webhook events.
    switch (event.type) {
      case "checkout.session.completed": {
        // Handle when a checkout session is successfully completed.
        const stripeObject: Stripe.Checkout.Session = event.data
          .object as Stripe.Checkout.Session;

        // Find the associated checkout session.
        const session = await findCheckoutSession(stripeObject.id);
        const customerId = session?.customer;
        const priceId = session?.line_items?.data[0]?.price.id;
        const userId = stripeObject.client_reference_id;

        // Match the price ID to a plan defined in the configuration file.
        const plan = configFile.stripe.plans.find((p) => p.priceId === priceId);
        if (!plan) break;

        // Retrieve customer details from Stripe.
        const customer = (await stripe.customers.retrieve(
          customerId as string
        )) as Stripe.Customer;

        let user: User;

        // Check if a user exists with the provided user ID.
        if (userId) {
          user = await prisma.user.findFirst({ where: { id: +userId } });
        }
        // If no user ID is provided, try finding the user by their email.
        else if (customer.email) {
          user = await prisma.user.findFirst({
            where: { email: customer.email },
          });

          // If no user is found, create a new user with the customer's email and name.
          if (!user)
            user = await prisma.user.create({
              data: { email: customer.email, name: customer.name },
            });
        } else {
          // If neither a user ID nor an email is available, throw an error.
          throw new Error("No user found");
        }

        // Update the user's record with the customer ID, price ID, and grant access.
        await prisma.user.update({
          where: { id: +userId },
          data: { customerId: customerId as string, priceId, hasAccess: true },
        });
        break;
      }

      case "checkout.session.expired": {
        // Handle when a checkout session expires (without being completed).
        break;
      }

      case "customer.subscription.updated": {
        // Handle when a customer's subscription is updated.
        break;
      }

      case "customer.subscription.deleted": {
        // Handle when a customer's subscription is deleted or canceled.
        const stripeObject: Stripe.Subscription = event.data
          .object as Stripe.Subscription;

        // Retrieve the subscription from Stripe.
        const subscription = await stripe.subscriptions.retrieve(
          stripeObject.id
        );

        // Find the user by the customer ID.
        const user = await prisma.user.findFirst({
          where: { customerId: subscription.customer as string },
        });

        // Update the user's record to revoke access.
        await prisma.user.update({
          where: { id: user.id },
          data: { hasAccess: false },
        });
        break;
      }

      case "invoice.paid": {
        // Handle when an invoice is successfully paid.
        const stripeObject: Stripe.Invoice = event.data
          .object as Stripe.Invoice;

        // Find the user by the customer ID.
        const user = await prisma.user.findFirst({
          where: { customerId: stripeObject.customer.toString() },
        });

        // If the invoice's price ID matches the user's current price ID, grant access.
        if (user.priceId !== stripeObject.lines.data[0].price.id) break;
        await prisma.user.update({
          where: { id: user.id },
          data: { hasAccess: true },
        });
        break;
      }

      case "invoice.payment_failed":
        // Handle when an invoice payment fails.
        break;

      default:
      // Handle other event types not explicitly mentioned.
    }
  } catch (e) {
    // Log any errors that occur during the processing of the webhook event.
    console.error("stripe error: ", e.message);
  }

  // Return a 200 response to acknowledge receipt of the webhook event.
  return NextResponse.json({});
}

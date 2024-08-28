import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { createCheckout } from "@/libs/stripe";
import prisma from "@/libs/prisma";

// This function creates a Stripe Checkout Session for either a one-time payment or a subscription.
// It is invoked by the <ButtonCheckout /> component.
// By default, user authentication is not required, but if authenticated, their email and/or credit card information will be prefilled in the Checkout.

export async function POST(req: NextRequest) {
  const body = await req.json();

  if (!body.priceId) {
    return NextResponse.json(
      {
        error: "Price ID is required",
      },
      {
        status: 400,
      }
    );
  } else if (!body.successUrl || !body.cancelUrl) {
    return NextResponse.json(
      {
        error: "Success and cancel URLs are required",
      },
      {
        status: 400,
      }
    );
  } else if (!body.mode) {
    return NextResponse.json(
      {
        error:
          "Mode is required (either 'payment' for one-time payments or 'subscription' for recurring subscription)",
      },
      {
        status: 400,
      }
    );
  }

  try {
    const session = await getServerSession(authOptions);

    // Retrieve the user from the database using the ID from the session.
    const user = await prisma.user.findFirst({
      where: {
        id: Number(session.user.id),
      },
    });

    // Destructure the necessary parameters from the request body.
    const { priceId, mode, successUrl, cancelUrl } = body;

    // Create a Stripe Checkout Session and get the session URL.
    const stripeSessionURL = await createCheckout({
      priceId, // ID of the price (product) to be paid for.
      mode, // Mode of payment, either 'payment' for one-time or 'subscription'.
      successUrl, // URL to redirect the user to upon successful payment.
      cancelUrl, // URL to redirect the user to if they cancel the payment.
      clientReferenceId: user?.id?.toString(), // User ID to associate with the session
      user, // Pass the user object for pre-filling the Checkout form.
      // Optional: Pass a coupon ID if the user has one.
      // couponId: body.couponId,
    });

    return NextResponse.json({
      url: stripeSessionURL,
    });
  } catch (e) {
    console.error(e);

    return NextResponse.json(
      {
        error: e?.message,
      },
      {
        status: 500,
      }
    );
  }
}

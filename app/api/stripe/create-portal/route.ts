import { NextResponse, NextRequest } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/libs/next-auth";
import { createCustomerPortal } from "@/libs/stripe";
import prisma from "@/libs/prisma";

// This function handles creating a Stripe Customer Portal session for managing billing and subscriptions.
// The user must be authenticated and have an existing Stripe customer ID.

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);

  if (session) {
    try {
      const body = await req.json();
      const { id } = session.user;

      // Retrieve the user from the database using the ID from the session.
      const user = await prisma.user.findUnique({
        where: {
          id: Number(id),
        },
      });

      if (!user?.customerId) {
        return NextResponse.json(
          {
            error:
              "You don't have a billing account yet. Make a purchase first.",
          },
          {
            status: 400,
          }
        );
      } else if (!body.returnUrl) {
        return NextResponse.json(
          {
            error: "Return URL is required",
          },
          {
            status: 400,
          }
        );
      }

      // Create a Stripe Customer Portal session and get the portal URL.
      const stripePortalUrl = await createCustomerPortal({
        customerId: user.customerId, // Pass the Stripe customer ID.
        returnUrl: body.returnUrl, // Pass the return URL for redirecting the user after they finish in the portal.
      });

      return NextResponse.json({
        url: stripePortalUrl,
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
  } else {
    return NextResponse.json(
      {
        error: "Not signed in",
      },
      {
        status: 401,
      }
    );
  }
}

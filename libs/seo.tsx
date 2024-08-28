import type { Metadata } from "next";
import config from "@/config";

// Function to generate SEO tags based on the provided metadata
export const getSEOTags = ({
  title,
  description,
  keywords,
  openGraph,
  canonicalUrlRelative,
  extraTags,
}: Metadata & {
  canonicalUrlRelative?: string; // Optional relative canonical URL
  extraTags?: Record<string, any>; // Optional additional tags
} = {}) => {
  return {
    title: title || config.appName, // Fallback to app name if title is not provided
    description: description || config.appDescription, // Fallback to app description if not provided
    keywords: keywords || [config.appName], // Default keywords to the app name
    applicationName: config.appName, // Set the application name
    metadataBase: new URL(
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/" // Use localhost in development
        : `https://${config.domainName}/` // Use production domain in other environments
    ),
    openGraph: {
      title: openGraph?.title || config.appName, // OpenGraph title
      description: openGraph?.description || config.appDescription, // OpenGraph description
      url: openGraph?.url || `https://${config.domainName}/`, // OpenGraph URL
      siteName: openGraph?.title || config.appName, // OpenGraph site name
      // Uncomment and modify if using images in OpenGraph
      // images: [
      //   {
      //     url: `https://${config.domainName}/share.png`,
      //     width: 1200,
      //     height: 660,
      //   },
      // ],
      locale: "en_US", // Locale for OpenGraph
      type: "website", // Type of OpenGraph content
    },
    twitter: {
      title: openGraph?.title || config.appName, // Twitter card title
      description: openGraph?.description || config.appDescription, // Twitter card description
      card: "summary_image", // Twitter card type
      creator: "@dennis_babych", // Twitter creator handle
    },
    ...(canonicalUrlRelative && {
      alternates: { canonical: canonicalUrlRelative }, // Add canonical URL if provided
    }),
    ...extraTags, // Spread additional tags if provided
  };
};

// Function to render JSON-LD schema tags for the application
export const renderSchemaTags = () => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "http://schema.org", // JSON-LD context
          "@type": "SoftwareApplication", // Schema type
          name: config.appName, // Application name
          description: config.appDescription, // Application description
          image: `https://${config.domainName}/icon.png`, // Application image URL
          url: `https://${config.domainName}/`, // Application URL
          author: {
            "@type": "Person", // Author type
            name: "Dennis Babych", // Author name
          },
          datePublished: "2023-08-01", // Date of publication
          applicationCategory: "EducationalApplication", // Category of the application
          aggregateRating: {
            "@type": "AggregateRating", // Rating type
            ratingValue: "4.8", // Average rating value
            ratingCount: "12", // Number of ratings
          },
          offers: [
            {
              "@type": "Offer", // Offer type
              price: "9.00", // Price of the application
              priceCurrency: "USD", // Currency of the price
            },
          ],
        }),
      }}
    ></script>
  );
};

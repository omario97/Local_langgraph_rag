import ButtonAccount from "@/components/ButtonAccount";

// This page is only accessible to authenticated users.
// It is wrapped with the LayoutPrivate component to enforce access control.
// See https://docs.microsaasfast.me/private-page/
export default async function Dashboard() {
  return (
    <main className="min-h-screen p-8 pb-24">
      <section className="max-w-xl mx-auto space-y-8">
        <ButtonAccount />
        <h1 className="text-3xl md:text-4xl font-extrabold text-white">
          Private Page
        </h1>
      </section>
    </main>
  );
}

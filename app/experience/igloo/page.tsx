import { PageHeader } from "@/components/page-header";
import { PageLayout } from "@/components/page-layout";
import { Large, Lead } from "@/components/ui/typography";
import React from "react";

export const metadata = {
  title: "Igloo | christiandam.xyz",
  description: "Lead Product Designer at Igloo.",
};

export default function IglooPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader
        title="Igloo"
        subtitle="Lead Product Designer · Aug. 2024 to present"
      />

      <section className="mt-10">
        <Lead className="mb-1">Role</Lead>
        <Large className="font-normal">
          I&apos;m designing rental and financial platforms for the Scandinavian
          market. End-to-end product design across multiple products,
          collaborating directly with engineering and executives. Shaping
          product strategy with the CEO and lead engineers as we expand into new
          markets.
        </Large>
      </section>
      <section className="mt-10">
        <Lead className="mb-1">Projects</Lead>
        <ul className="ml-6 list-disc [&>li]:mt-2 text-lg">
          <li>
            Implement and maintain our design system{" "}
            <strong className="font-semibold">Auora</strong>. Built for
            scalability across multiple products, languages, and markets.
          </li>
          <li>
            Draft product strategy, roadmap and launch to enter Igloo&apos;s first
            market expansion.
          </li>
          <li>
            Led end-to-end redesign of Igloo&apos;s main rental platform,
            boosting user experience and key commercial metrics metrics.
          </li>
          <li>
            Design and collaborate on new financial products, including a
            personal self-serviced loan offering flow.
          </li>
          <li>
            Design enterprise solutions for property managers to streamline
            rental processes.
          </li>
          <li>AML and KYC compliance flows for internal and enterprise use.</li>
          <li>
            Support chat design for customer service, enhancing user support
            experience.
          </li>
          <li>Tenant profile and registry</li>
        </ul>
      </section>
    </PageLayout>
  );
}

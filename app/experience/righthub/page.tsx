import { PageHeader } from "@/components/page-header";
import { PageLayout } from "@/components/page-layout";
import { Large, Lead } from "@/components/ui/typography";
import React from "react";

export const metadata = {
  title: "Righthub | christiandam.xyz",
  description: "Lead Product Designer at Righthub.",
};

export default function RighthubPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader
        title="Righthub"
        subtitle="Lead Product Designer · Jul. 2022 - Aug. 2024"
      />

      <section className="mt-10">
        <Lead className="mb-1">Role</Lead>
        <Large className="font-normal">
          Led design of the core IP portfolio platform and sub-products for IP
          management and brand protection following Righthub&apos;s acquisition
          of Rightly. Built and maintained the design system in Figma. Ensured
          close collaboration with users and customers. Promoted design culture
          through reviews, documentation, and alignment across product, design,
          and development.
        </Large>
      </section>
      <section className="mt-10">
        <Lead className="mb-1">Projects</Lead>
        <ul className="ml-6 list-disc [&>li]:mt-2 text-lg">
          <li>
            Led design of the core IP portfolio platform for trademark and brand
            protection management.
          </li>
          <li>
            Built and maintained the design system in Figma, ensuring
            consistency across all products.
          </li>
          <li>
            Designed sub-products for IP management workflows and brand
            protection tools.
          </li>
          <li>
            Promoted design culture through reviews, documentation, and
            cross-functional alignment.
          </li>
          <li>
            Ensured close collaboration with users and customers through regular
            feedback sessions.
          </li>
        </ul>
      </section>
    </PageLayout>
  );
}

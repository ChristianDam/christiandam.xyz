import { PageHeader } from "@/components/page-header";
import { PageLayout } from "@/components/page-layout";
import { Large, Lead } from "@/components/ui/typography";
import React from "react";

export const metadata = {
  title: "Rightly | christiandam.xyz",
  description: "UX Designer at Rightly (acquired by Righthub).",
};

export default function RightlyPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader
        title="Rightly"
        subtitle="UX Designer · Jun. 2021 - Aug. 2022"
      />

      <section className="mt-10">
        <Lead className="mb-1">Role</Lead>
        <Large className="font-normal">
          Joined as first in-house designer at startup stage. Conducted user
          research and facilitated workshops to align on product vision.
          Translated business goals into product strategy, UX flows, and UI
          designs. Collaborated closely with developers and founders to build a
          strong product culture.
        </Large>
      </section>
      <section className="mt-10">
        <Lead className="mb-1">Projects</Lead>
        <ul className="ml-6 list-disc [&>li]:mt-2 text-lg">
          <li>
            Established design foundations as the first in-house designer at
            startup stage.
          </li>
          <li>
            Conducted user research and facilitated workshops to align on
            product vision.
          </li>
          <li>
            Translated business goals into product strategy, UX flows, and UI
            designs.
          </li>
          <li>
            Built a strong product culture in close collaboration with
            developers and founders.
          </li>
          <li>
            Designed core product features that contributed to the acquisition
            by Righthub.
          </li>
        </ul>
      </section>
    </PageLayout>
  );
}

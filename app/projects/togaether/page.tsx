import { PageHeader } from "@/components/page-header";
import { PageLayout } from "@/components/page-layout";
import { H3, InlineCode, P } from "@/components/ui/typography";
import Image from "next/image";
import React from "react";

export const metadata = {
  title: "Togaether | christiandam.xyz",
  description: "A social app for friends who want to move together.",
};

export default function TogaetherPage(): React.ReactElement {
  return (
    <PageLayout>
      <PageHeader
        title="Togaether"
        subtitle="A social app for friends not advertisers."
      />

      <section className="space-y-8 mt-10">
        <div>
          <H3 className="mb-1">Why</H3>
          <P className="mb-">
            People want to see their friends more, but coordination is
            exhausting. Group chats devolve into chaos, Facebook Events feel too
            formal, and weeks pass without making real plans. The friction
            between &ldquo;we should do something&rdquo; and actually gathering
            is stealing time from meaningful relationships and years start to
            blur together.
          </P>
          <br />
          <P>
            Current social apps make this worse: They&apos;re built for
            attention and advertisers, not for the people using them.
            Information technologies have divided us more than united us. We
            need tools that bring people together in real life, not trap them in
            feeds designed to maximize engagement.
          </P>
        </div>
        <div>
          <H3 className="mb-1">Idea</H3>

          <P className="mb-2">
            We want to build an app that is optimized for taking action towards
            spending time with friends. An app that makes it easy to suggest,
            plan, and commit to activities together. An app that prioritizes
            real-world connections over digital distractions.
          </P>
          <InlineCode>
            This project is in its early stages and we are exploring directions.
          </InlineCode>
        </div>
      </section>
      <section className="py-8 space-y-8">
        <Image
          src="/togaether-web.jpg"
          alt="Togaether web application"
          width={1920}
          height={1080}
          className="rounded-lg"
        />
        <Image
          src="/togaether-mobile.jpg"
          alt="Togaether mobile application"
          width={1920}
          height={1080}
          className="rounded-lg"
        />
      </section>
    </PageLayout>
  );
}

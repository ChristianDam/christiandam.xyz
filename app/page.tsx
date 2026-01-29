import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { H1, Muted, P, Small } from "@/components/ui/typography";
import { Github, Linkedin, Page, Send } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import LatestRun from "../components/latest-run";
import Weather from "../components/weather";
import YearCountdown from "../components/year-countdown";

export default async function Home(): Promise<React.ReactElement> {
  return (
    <main className="container max-w-screen-lg mx-auto px-4 py-20">
      <section className="flex flex-col max-w-screen-md mx-auto">
        <Image
          src="/portrait-me.jpg"
          alt="Portrait of Christian"
          width={96}
          height={96}
          className="w-24 h-24 mb-4 rounded-md"
          priority
        />
        <H1 className="font-semibold">Hi there, I&#39;m Christian Dam.</H1>
        <H1 className="text-muted-foreground font-medium">
          I craft digital products and experiences.
        </H1>

        <div className="mt-6 items-center flex gap-2 flex-wrap">
          <Button className="rounded-full" asChild>
            <a href="mailto:christian.dam1995@gmail.com">
              <Send strokeWidth={2} />
              Contact me
            </a>
          </Button>
          <Button variant="outline" className="rounded-full">
            <Github strokeWidth={2} className="text-muted-foreground" />
            <Link
              href="https://github.com/christiandam"
              target="_blank"
              rel="noopener noreferrer"
            >
              GitHub
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full">
            <Linkedin strokeWidth={2} className="text-muted-foreground" />
            <Link
              href="https://www.linkedin.com/in/christian-dam/"
              target="_blank"
              rel="noopener noreferrer"
            >
              LinkedIn
            </Link>
          </Button>
          <Button variant="outline" className="rounded-full">
            <Page strokeWidth={2} className="text-muted-foreground" />
            <Link href="/CV.pdf" target="_blank" rel="noopener noreferrer">
              Resume
            </Link>
          </Button>
        </div>
      </section>
      <section>
        <BentoGrid className="mt-16">
          <BentoGridItem colSpan={2} variant="ghost">
            <Card className="h-full">
              <CardHeader>
                <CardTitle>Experience</CardTitle>
              </CardHeader>
              <CardContent className="max-h-80 overflow-y-auto scrollbar-none space-y-6">
                <div className="space-y-2">
                  <P className="font-semibold">
                    Igloo{" "}
                    <Muted className="inline font-normal">
                      Lead Product Designer
                    </Muted>
                  </P>
                  <P>
                    Leading end-to-end redesign of Igloo&apos;s prop and fintech
                    platform in Iceland. Setting product strategy with CEO and
                    translating business objectives into design priorities.
                    Preparing products for international expansion by
                    researching integrations, partnerships, and regulatory
                    requirements. Leading design work while facilitating reviews
                    and managing team workflows.
                  </P>
                  <Small className="text-muted-foreground/70">
                    Aug. 2024 to Present — Aarhus (Remote)
                  </Small>
                </div>

                <div className="space-y-2">
                  <P className="font-semibold">
                    Righthub{" "}
                    <Muted className="inline font-normal">
                      Lead Product Designer
                    </Muted>
                  </P>
                  <Muted>
                    Led design of the core legal tech platform and sub-products
                    focused on IP management and brand protection following
                    Righthub&apos;s acquisition of Rightly. Built and
                    implemented design system in Figma. Promoted design culture
                    through design reviews, documentation, and facilitating
                    alignment between product, design, and development teams.
                  </Muted>
                  <Small className="text-muted-foreground/70">
                    Jul. 2022 - Aug. 2024 — Aarhus (occasionally London)
                  </Small>
                </div>

                <div className="space-y-2">
                  <P className="font-semibold">
                    Righly{" "}
                    <Muted className="inline font-normal">UX Designer</Muted>
                  </P>
                  <Muted>
                    Joined as first in-house designer at startup stage.
                    Conducted user research and facilitated workshops to align
                    on product vision. Translated business goals into product
                    strategy, creating UX flows and UI designs. Collaborated
                    closely with developers on implementation.
                  </Muted>
                  <Small className="text-muted-foreground/70">
                    Jun. 2021 - Aug. 2022 — Aarhus
                  </Small>
                </div>

                <div className="space-y-2">
                  <P className="font-semibold">
                    Aarhus University{" "}
                    <Muted className="inline font-normal">
                      Teaching Assistant
                    </Muted>
                  </P>
                  <Muted>
                    Guided group projects, discussed course theory, and graded
                    papers across two courses. Supported bachelor students in
                    Fundamental IT Product Development and Master&apos;s
                    students in Social and Aesthetic Interaction Design.
                  </Muted>
                  <Small className="text-muted-foreground/70">
                    Aug. 2019 to Jan. 2021 — Aarhus
                  </Small>
                </div>
              </CardContent>
            </Card>
          </BentoGridItem>
          <BentoGridItem colSpan={2} variant="ghost">
            <Weather />
          </BentoGridItem>
          <BentoGridItem colSpan={2} variant="ghost">
            <LatestRun />
          </BentoGridItem>
          <BentoGridItem colSpan={4} variant="ghost">
            <YearCountdown />
          </BentoGridItem>
        </BentoGrid>
      </section>
    </main>
  );
}

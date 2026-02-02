import Experience from "@/components/experience";
import { Button } from "@/components/ui/button";
import { H1, P } from "@/components/ui/typography";
import { Github, Linkedin, Page, Send } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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
      <section className="max-w-screen-md mx-auto my-10">
        <P className="font-medium">
          Design shapes how we think and who we become. It should make people
          capable, not dependent. Craft comes from empathy, knowledge,
          enthusiasm, and care. I believe we can do better together.{" "}
        </P>
        <Experience />
      </section>
    </main>
  );
}

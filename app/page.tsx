import Experience from "@/components/experience";
import Projects from "@/components/projects";
import { Button } from "@/components/ui/button";
import { H1 } from "@/components/ui/typography";
import { Github, Linkedin, Page, Send } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default async function Home(): Promise<React.ReactElement> {
  return (
    <main className="container max-w-screen-lg mx-auto py-20 space-y-10">
      <section className="flex flex-col max-w-screen-md px-4">
        <Image
          src="/portrait-me.jpg"
          alt="Portrait of Christian"
          width={112}
          height={112}
          className="w-28 h-28 mb-4 rounded-md"
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
      <Experience />
      <Projects />
    </main>
  );
}

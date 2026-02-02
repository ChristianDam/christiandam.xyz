import { H1, P } from "@/components/ui/typography";
import { ArrowLeft } from "iconoir-react";
import Link from "next/link";
import { Button } from "./ui/button";

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <section className="mb-4">
      <Link href="/" passHref className="-ml-3 mb-4 inline-block">
        <Button variant="ghost">
          <ArrowLeft strokeWidth={2} />
          <P className="font-semibold">Back</P>
        </Button>
      </Link>
      <H1 className="font-bold text-5xl mb-4">{title}</H1>
      {subtitle && (
        <P className="text-lg leading-tight text-muted-foreground">
          {subtitle}
        </P>
      )}
    </section>
  );
}

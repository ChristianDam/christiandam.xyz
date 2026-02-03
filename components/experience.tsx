import { Large, P } from "@/components/ui/typography";
import { ArrowUpRight } from "iconoir-react";
import Link from "next/link";

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
  url?: string;
}

function ExperienceItem({ company, role, period, url }: ExperienceItemProps) {
  const content = (
    <div className="flex flex-col space-y-0 group px-4 hover:bg-secondary py-2 rounded-lg">
      <div className="flex justify-between items-center">
        <P className="font-semibold">{role}</P>
        <div className="relative flex items-center">
          <P className={`text-muted-foreground transition-transform duration-200 ${url ? "group-hover:-translate-x-5" : ""}`}>{period}</P>
          {url && (
            <ArrowUpRight
              strokeWidth={2}
              className="absolute right-0 w-4 h-4 text-muted-foreground opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            />
          )}
        </div>
      </div>
      <P className="text-muted-foreground leading-none">{company}</P>
    </div>
  );

  if (url) {
    const isExternal = url.startsWith("http");
    return (
      <Link
        href={url}
        {...(isExternal && { target: "_blank", rel: "noopener noreferrer" })}
      >
        {content}
      </Link>
    );
  }

  return content;
}

const experiences: ExperienceItemProps[] = [
  {
    company: "Igloo",
    role: "Lead Product Designer",
    period: "Current",
    url: "/experience/igloo",
  },
  {
    company: "Righthub",
    role: "Lead Product Designer",
    period: "2022",
    url: "/experience/righthub",
  },
  {
    company: "Rightly (acquired by Righthub)",
    role: "UX Designer",
    period: "2021",
    url: "/experience/rightly",
  },
  {
    company: "Aarhus University",
    role: "Teaching Assistant",
    period: "2019",
  },
  {
    company: "Aarhus University",
    role: "Master's, IT Product Development",
    period: "2019",
    url: "https://masters.au.dk/itproductdevelopment",
  },
  {
    company: "Aarhus University",
    role: "Bachelor, IT Product Development",
    period: "2016",
    url: "https://bachelor.au.dk/itproduktudvikling?gad_campaignid=12086488748&gbraid=0AAAAABp5VhN96aFCcgki5BkX6pYp27NXO",
  },
];

export default function Experience() {
  return (
    <section>
      <Large className="font-medium text-muted-foreground mb-1.5 px-4">
        Experience
      </Large>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.company} {...experience} />
      ))}
    </section>
  );
}

Experience.Item = ExperienceItem;

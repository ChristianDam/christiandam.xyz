import { Large, P } from "@/components/ui/typography";
import { ArrowUpRight } from "iconoir-react";
import Link from "next/link";

interface ProjectItemProps {
  name: string;
  description: string;
  year: string;
  url?: string;
}

function ProjectItem({ name, description, year, url }: ProjectItemProps) {
  const content = (
    <div className="flex flex-col space-y-0 group px-4 hover:bg-secondary py-2 rounded-lg">
      <div className="flex justify-between items-center">
        <P className="font-semibold">{name}</P>
        <div className="relative flex items-center">
          <P className={`text-muted-foreground transition-transform duration-200 ${url ? "group-hover:-translate-x-5" : ""}`}>{year}</P>
          {url && (
            <ArrowUpRight
              strokeWidth={2}
              className="absolute right-0 w-4 h-4 text-muted-foreground opacity-0 translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            />
          )}
        </div>
      </div>
      <P className="text-muted-foreground leading-none">{description}</P>
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

const projects: ProjectItemProps[] = [
  {
    name: "Togaether",
    description: "A social app for friends not advertisers",
    year: "Work in progress",
    url: "/projects/togaether",
  },
  {
    name: "things I like",
    description: "Collection of random things I like",
    year: "Work in progress",
    url: "https://www.figma.com/board/sR6O0u0o7In222FWjCA2RI/things-i-like?node-id=0-1&t=hPtryY7fxmatrJql-1",
  },
  {
    name: "T.Hue",
    description:
      "Exploring tangible interfaces for smart home lighting control",
    year: "2021",
    url: "https://chdam.notion.site/T-Hue-0a74940e42a642329ce1fc6134266576",
  },
  {
    name: "Rethinking the glucose monitor",
    description: "Designing for dignity and everyday comfort in diabetes care",
    year: "2019",
    url: "https://chdam.notion.site/Rethinking-the-glucose-monitor-7ca036200c6648bf988b6925030a0b62",
  },
];

export default function Projects() {
  return (
    <section>
      <Large className="font-medium text-muted-foreground mb-1.5 px-4">
        Projects
      </Large>
      {projects.map((project) => (
        <ProjectItem key={project.name} {...project} />
      ))}
    </section>
  );
}

Projects.Item = ProjectItem;

import { Large, P } from "@/components/ui/typography";
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
        <P className="text-muted-foreground">{year}</P>
      </div>
      <P className="text-muted-foreground leading-none">{description}</P>
    </div>
  );

  if (url) {
    return (
      <Link href={url} target="_blank" rel="noopener noreferrer">
        {content}
      </Link>
    );
  }

  return content;
}

const projects: ProjectItemProps[] = [
  {
    name: "Togaether",
    description: "Brief description of the project",
    year: "2024",
    url: "https://example.com",
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

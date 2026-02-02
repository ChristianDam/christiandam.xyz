import { Large, P } from "@/components/ui/typography";

interface ExperienceItemProps {
  company: string;
  role: string;
  period: string;
}

function ExperienceItem({ company, role, period }: ExperienceItemProps) {
  return (
    <div className="flex flex-col space-y-0 mb-4">
      <div className="flex justify-between items-center">
        <P className="font-semibold">{role}</P>
        <P className="text-muted-foreground">{period}</P>
      </div>
      <P className="text-muted-foreground leading-none">{company}</P>
    </div>
  );
}

const experiences: ExperienceItemProps[] = [
  {
    company: "Igloo",
    role: "Lead Product Designer",
    period: "Current",
  },
  {
    company: "Righthub",
    role: "Lead Product Designer",
    period: "2022",
  },
  {
    company: "Rightly",
    role: "UX Designer",
    period: "2021",
  },
  {
    company: "Aarhus University",
    role: "Teaching Assistant",
    period: "2019",
  },
];

export default function Experience() {
  return (
    <div className="py-10">
      <Large className="font-medium text-muted-foreground mb-2">
        Experience
      </Large>
      {experiences.map((experience) => (
        <ExperienceItem key={experience.company} {...experience} />
      ))}
    </div>
  );
}

Experience.Item = ExperienceItem;

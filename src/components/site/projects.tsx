import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PLACEHOLDER_PROJECTS = [
  {
    title: "Placeholder project one",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
  {
    title: "Placeholder project two",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
  {
    title: "Placeholder project three",
    description: "Placeholder project description — replace once content is ready.",
    tags: ["Tag"],
  },
];

export function Projects() {
  return (
    <section id="projects" className="mx-auto w-full max-w-4xl px-6 py-16">
      <h2 className="font-heading text-2xl font-semibold tracking-tight">
        Projects
      </h2>
      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        {PLACEHOLDER_PROJECTS.map((project) => (
          <Card key={project.title}>
            <CardHeader>
              <CardTitle>{project.title}</CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary">
                  {tag}
                </Badge>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

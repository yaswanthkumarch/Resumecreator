import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2, Link as LinkIcon } from "lucide-react";
import { useResume, Project } from "@/contexts/ResumeContext";

export function ProjectsForm() {
  const { resumeData, dispatch } = useResume();
  const { projects } = resumeData;

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      title: "",
      description: "",
      technologies: [],
      link: "",
      github: "",
      startDate: "",
      endDate: "",
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };

  const updateProject = (id: string, field: string, value: any) => {
    dispatch({
      type: "UPDATE_PROJECT",
      payload: { id, data: { [field]: value } },
    });
  };

  const deleteProject = (id: string) => {
    dispatch({ type: "DELETE_PROJECT", payload: id });
  };

  const updateTechnologies = (id: string, techString: string) => {
    const technologies = techString
      .split(",")
      .map((tech) => tech.trim())
      .filter(Boolean);
    updateProject(id, "technologies", technologies);
  };

  return (
    <div className="w-full overflow-x-auto">
      <Card className="animate-fade-in min-w-[320px] max-w-5xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Projects
            <Button onClick={addProject} size="sm" variant="outline" className="flex items-center space-x-1">
              <Plus className="h-4 w-4" />
              <span>Add Project</span>
            </Button>
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {projects.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              No projects added yet. Click "Add Project" to showcase your work.
            </p>
          ) : (
            projects.map((project) => (
              <section
                key={project.id}
                className="border rounded-lg p-6 space-y-6 shadow-sm hover:shadow-md transition-shadow"
                aria-label={`Project ${project.title || project.id}`}
              >
                <header className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{project.title || "New Project"}</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteProject(project.id)}
                    className="text-destructive hover:text-destructive/90"
                    aria-label={`Delete project ${project.title || project.id}`}
                  >
                    <Trash2 className="h-5 w-5" />
                  </Button>
                </header>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor={`title-${project.id}`}>Project Title *</Label>
                    <Input
                      id={`title-${project.id}`}
                      value={project.title}
                      onChange={(e) => updateProject(project.id, "title", e.target.value)}
                      placeholder="E-commerce Platform"
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`technologies-${project.id}`}>Technologies Used</Label>
                    <Input
                      id={`technologies-${project.id}`}
                      value={project.technologies.join(", ")}
                      onChange={(e) => updateTechnologies(project.id, e.target.value)}
                      placeholder="React, Node.js, MongoDB"
                      className="mt-1"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      Separate technologies with commas
                    </p>
                  </div>

                  <div className="md:col-span-2">
                    <Label htmlFor={`description-${project.id}`}>Description *</Label>
                    <Textarea
                      id={`description-${project.id}`}
                      value={project.description}
                      onChange={(e) => updateProject(project.id, "description", e.target.value)}
                      placeholder="Describe your project..."
                      rows={4}
                      className="mt-1"
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor={`startDate-${project.id}`}>Start Date</Label>
                    <Input
                      id={`startDate-${project.id}`}
                      type="month"
                      value={project.startDate}
                      onChange={(e) => updateProject(project.id, "startDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`endDate-${project.id}`}>End Date</Label>
                    <Input
                      id={`endDate-${project.id}`}
                      type="month"
                      value={project.endDate}
                      onChange={(e) => updateProject(project.id, "endDate", e.target.value)}
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor={`link-${project.id}`}>Live Demo URL</Label>
                    <div className="relative mt-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id={`link-${project.id}`}
                        value={project.link || ""}
                        onChange={(e) => updateProject(project.id, "link", e.target.value)}
                        placeholder="https://example.com"
                        className="pl-10"
                        type="url"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor={`github-${project.id}`}>GitHub Repo</Label>
                    <div className="relative mt-1">
                      <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                      <Input
                        id={`github-${project.id}`}
                        value={project.github || ""}
                        onChange={(e) => updateProject(project.id, "github", e.target.value)}
                        placeholder="https://github.com/user/repo"
                        className="pl-10"
                        type="url"
                      />
                    </div>
                  </div>
                </div>
              </section>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}

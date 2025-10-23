import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";

import { AI_OPTIONS } from "@/constants";

import type { ImgPreviewSidebarType } from "@/types/all-types";

import { InfoIcon, SparklesIcon } from "lucide-react";
import { PromptEditor } from "./PromptEditor";
import { FileInfo } from "./FileInfo";

export const ImgPreviewSidebar = ({
  file,
  selectedTransforms,
  prompts,
  handleToggle,
  handlePromptChange,
}: ImgPreviewSidebarType) => {
  return (
    <Tabs defaultValue="ai" className="flex flex-col h-full">
      <TabsList className="grid grid-cols-2 w-full mb-4">
        <TabsTrigger value="ai">
          <SparklesIcon />
          AI Tools
        </TabsTrigger>
        <TabsTrigger value="info">
          <InfoIcon />
          Info
        </TabsTrigger>
      </TabsList>

      <TabsContent value="ai" className="flex flex-col gap-6">
        <div className="space-y-4 rounded-xl border p-4 bg-muted/40">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            Quick Ai Tools
          </h3>
          {AI_OPTIONS.map(({ id, label }) => (
            <div key={id} className="flex items-center justify-between">
              <Label htmlFor={id} className="text-sm">
                {label}
              </Label>

              <Switch
                id={id}
                checked={selectedTransforms.includes(id)}
                onCheckedChange={() => handleToggle(id)}
              />
            </div>
          ))}
        </div>
        <div className="space-y-4 rounded-xl border p-4 bg-muted/40">
          <h3 className="text-sm font-semibold text-muted-foreground mb-2">
            ✨ Edit with Prompts
          </h3>

          <PromptEditor
            id="change-bg"
            label="Change Background"
            placeholder="Describe the new background"
            value={prompts["change-bg"] || ""}
            onChange={(value: string) => handlePromptChange("change-bg", value)}
            onApply={() => handleToggle("e-changebg", prompts["change-bg"])}
          />
          <PromptEditor
            id="edit-img"
            label="Edit Image"
            placeholder="Describe the edits..."
            value={prompts["edit-img"] || ""}
            onChange={(value: string) => handlePromptChange("edit-img", value)}
            onApply={() => handleToggle("e-edit", prompts["edit-img"])}
          />
        </div>
      </TabsContent>

      <TabsContent value="info">
        <FileInfo file={file} />
      </TabsContent>
    </Tabs>
  );
};

import React from "react";
import { Button } from "@/components/ui/button";
import { RefreshCw, Save } from "lucide-react";

export default function SettingsHeader({ onReset, onSave }) {
  return (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground mt-1">
          Configure system preferences and AI parameters
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" className="gap-2" onClick={onReset}>
          <RefreshCw className="h-4 w-4" />
          Reset to Default
        </Button>
        <Button
          className="gap-2 bg-[#0088cc] hover:bg-[#0077b3] text-white"
          onClick={onSave}
        >
          <Save className="h-4 w-4" />
          Save Changes
        </Button>
      </div>
    </div>
  );
}

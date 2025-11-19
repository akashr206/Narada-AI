import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function IntegrationSettings({
  ehrSystem,
  setEhrSystem,
  apiKey,
  setApiKey,
  syncInterval,
  setSyncInterval,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Integration Settings</CardTitle>
        <CardDescription>
          Configure external system connections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label>EHR System</Label>
          <Select value={ehrSystem} onValueChange={setEhrSystem}>
            <SelectTrigger>
              <SelectValue placeholder="Select EHR system" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="epic">Epic</SelectItem>
              <SelectItem value="cerner">Cerner</SelectItem>
              <SelectItem value="meditech">Meditech</SelectItem>
              <SelectItem value="allscripts">Allscripts</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label>API Key</Label>
          <Input
            type="password"
            value={apiKey}
            onChange={(e) => setApiKey(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            API key for external integrations
          </p>
        </div>

        <div className="space-y-2">
          <Label>Sync Interval (minutes)</Label>
          <Input
            type="number"
            value={syncInterval}
            onChange={(e) => setSyncInterval(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            How often to sync with external systems
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

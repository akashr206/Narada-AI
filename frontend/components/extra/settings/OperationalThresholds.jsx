import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OperationalThresholds({
  patientLoad,
  setPatientLoad,
  criticalSupply,
  setCriticalSupply,
  maxWaitTime,
  setMaxWaitTime,
  autoReorderPoint,
  setAutoReorderPoint,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Operational Thresholds</CardTitle>
        <CardDescription>
          Set trigger points for automated actions and alerts
        </CardDescription>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label>Patient Load Threshold</Label>
          <Input
            type="number"
            value={patientLoad}
            onChange={(e) => setPatientLoad(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Trigger staff adjustment at this capacity
          </p>
        </div>
        <div className="space-y-2">
          <Label>Critical Supply Level</Label>
          <Input
            type="number"
            value={criticalSupply}
            onChange={(e) => setCriticalSupply(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Alert when supplies drop below this level
          </p>
        </div>
        <div className="space-y-2">
          <Label>Max Wait Time (minutes)</Label>
          <Input
            type="number"
            value={maxWaitTime}
            onChange={(e) => setMaxWaitTime(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Trigger flow optimization at this wait time
          </p>
        </div>
        <div className="space-y-2">
          <Label>Auto-Reorder Point</Label>
          <Input
            type="number"
            value={autoReorderPoint}
            onChange={(e) => setAutoReorderPoint(e.target.value)}
          />
          <p className="text-xs text-muted-foreground">
            Automatically reorder at this inventory level
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

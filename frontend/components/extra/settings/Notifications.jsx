import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function Notifications({
  notificationsEnabled,
  setNotificationsEnabled,
  criticalAlerts,
  setCriticalAlerts,
  notificationMethod,
  setNotificationMethod,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notifications</CardTitle>
        <CardDescription>
          Manage alert and notification preferences
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Enable Notifications</Label>
            <p className="text-sm text-muted-foreground">
              Receive system alerts and updates
            </p>
          </div>
          <Switch
            checked={notificationsEnabled}
            onCheckedChange={setNotificationsEnabled}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Critical Alerts</Label>
            <p className="text-sm text-muted-foreground">
              Always notify for critical situations
            </p>
          </div>
          <Switch
            checked={criticalAlerts}
            onCheckedChange={setCriticalAlerts}
          />
        </div>

        <div className="space-y-2">
          <Label>Notification Method</Label>
          <Select
            value={notificationMethod}
            onValueChange={setNotificationMethod}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select notification method" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="email">Email Only</SelectItem>
              <SelectItem value="sms">SMS Only</SelectItem>
              <SelectItem value="push notifications">
                Push Notifications Only
              </SelectItem>
              <SelectItem value="dashboard">Dashboard Only</SelectItem>
              <SelectItem value="all">All Methods</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
}

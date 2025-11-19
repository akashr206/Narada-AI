import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

export default function AiConfiguration({
  aiEnabled,
  setAiEnabled,
  autoApprove,
  setAutoApprove,
  confidenceThreshold,
  setConfidenceThreshold,
  learningRate,
  setLearningRate,
  riskTolerance,
  setRiskTolerance,
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>AI Configuration</CardTitle>
        <CardDescription>
          Control AI automation behavior and decision-making parameters
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Enable AI Automation</Label>
            <p className="text-sm text-muted-foreground">
              Allow AI to make autonomous decisions
            </p>
          </div>
          <Switch checked={aiEnabled} onCheckedChange={setAiEnabled} />
        </div>

        <div className="flex items-center justify-between">
          <div className="space-y-0.5">
            <Label className="text-base">Auto-Approve Low-Risk Decisions</Label>
            <p className="text-sm text-muted-foreground">
              Automatically execute decisions with high confidence
            </p>
          </div>
          <Switch checked={autoApprove} onCheckedChange={setAutoApprove} />
        </div>

        <div className="space-y-4">
          <div className="flex justify-between">
            <Label className="text-base">
              Confidence Threshold ({confidenceThreshold}%)
            </Label>
          </div>
          <p className="text-sm text-muted-foreground">
            Minimum confidence level required for auto-approval
          </p>
          <Slider
            value={confidenceThreshold}
            onValueChange={setConfidenceThreshold}
            max={100}
            step={1}
            className="w-full"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label>Learning Rate</Label>
            <Select value={learningRate} onValueChange={setLearningRate}>
              <SelectTrigger>
                <SelectValue placeholder="Select learning rate" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="slow">Slow</SelectItem>
                <SelectItem value="moderate">Moderate</SelectItem>
                <SelectItem value="fast">Fast</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label>Risk Tolerance</Label>
            <Select value={riskTolerance} onValueChange={setRiskTolerance}>
              <SelectTrigger>
                <SelectValue placeholder="Select risk tolerance" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="conservative">Conservative</SelectItem>
                <SelectItem value="balanced">Balanced</SelectItem>
                <SelectItem value="aggressive">Aggressive</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

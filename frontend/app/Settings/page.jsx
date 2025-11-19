"use client";

import React, { useState } from "react";
import SettingsHeader from "@/components/extra/settings/SettingsHeader";
import AiConfiguration from "@/components/extra/settings/AiConfiguration";
import OperationalThresholds from "@/components/extra/settings/OperationalThresholds";
import Notifications from "@/components/extra/settings/Notifications";
import IntegrationSettings from "@/components/extra/settings/IntegrationSettings";

export default function SettingsPage() {
    // State for AI Configuration
    const [aiEnabled, setAiEnabled] = useState(true);
    const [autoApprove, setAutoApprove] = useState(false);
    const [confidenceThreshold, setConfidenceThreshold] = useState([75]);
    const [learningRate, setLearningRate] = useState("moderate");
    const [riskTolerance, setRiskTolerance] = useState("balanced");

    // State for Operational Thresholds
    const [patientLoad, setPatientLoad] = useState(85);
    const [criticalSupply, setCriticalSupply] = useState(20);
    const [maxWaitTime, setMaxWaitTime] = useState(30);
    const [autoReorderPoint, setAutoReorderPoint] = useState(30);

    // State for Notifications
    const [notificationsEnabled, setNotificationsEnabled] = useState(true);
    const [criticalAlerts, setCriticalAlerts] = useState(true);
    const [notificationMethod, setNotificationMethod] = useState("all");

    // State for Integration Settings
    const [ehrSystem, setEhrSystem] = useState("epic");
    const [apiKey, setApiKey] = useState("****************");
    const [syncInterval, setSyncInterval] = useState(5);

    const handleReset = () => {
        console.log("Reset to default");
        // Add reset logic here
    };

    const handleSave = () => {
        console.log("Save changes");
        // Add save logic here
    };

    return (
        <div className="p-6 space-y-6 max-w-[1600px] mx-auto">
            <SettingsHeader onReset={handleReset} onSave={handleSave} />

            <AiConfiguration
                aiEnabled={aiEnabled}
                setAiEnabled={setAiEnabled}
                autoApprove={autoApprove}
                setAutoApprove={setAutoApprove}
                confidenceThreshold={confidenceThreshold}
                setConfidenceThreshold={setConfidenceThreshold}
                learningRate={learningRate}
                setLearningRate={setLearningRate}
                riskTolerance={riskTolerance}
                setRiskTolerance={setRiskTolerance}
            />

            <OperationalThresholds
                patientLoad={patientLoad}
                setPatientLoad={setPatientLoad}
                criticalSupply={criticalSupply}
                setCriticalSupply={setCriticalSupply}
                maxWaitTime={maxWaitTime}
                setMaxWaitTime={setMaxWaitTime}
                autoReorderPoint={autoReorderPoint}
                setAutoReorderPoint={setAutoReorderPoint}
            />

            <Notifications
                notificationsEnabled={notificationsEnabled}
                setNotificationsEnabled={setNotificationsEnabled}
                criticalAlerts={criticalAlerts}
                setCriticalAlerts={setCriticalAlerts}
                notificationMethod={notificationMethod}
                setNotificationMethod={setNotificationMethod}
            />

            <IntegrationSettings
                ehrSystem={ehrSystem}
                setEhrSystem={setEhrSystem}
                apiKey={apiKey}
                setApiKey={setApiKey}
                syncInterval={syncInterval}
                setSyncInterval={setSyncInterval}
            />
        </div>
    );
}

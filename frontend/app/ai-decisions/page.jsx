'use client';

import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Brain } from 'lucide-react';
import { Button } from '../../components/ui/button'
import { Badge } from '../../components/ui/badge'
import { Card } from '../../components/ui/card'


const AIDecisionLog = () => {
  const decisions = [
    {
      id: 1,
      title: "Reallocated 3 nurses from Ward A to Emergency Department",
      timestamp: "2024-01-15 14:23:00",
      status: "SUCCESS",
      category: "Staff Allocation",
      reasoning: "Predicted 40% increase in ER admissions based on local event patterns and historical data. Current ER staff utilization at 92%.",
      confidence: 94,
      impact: "Reduced ER wait time by 18 minutes, prevented bottleneck"
    },
    {
      id: 2,
      title: "Initiated emergency order for Type O- blood (15 units)",
      timestamp: "2024-01-15 13:45:00",
      status: "SUCCESS",
      category: "Inventory Management",
      reasoning: "Current stock at critical level (8 units). Surgical schedule shows 4 high-risk procedures in next 12 hours. Average usage: 2.3 units/procedure.",
      confidence: 89,
      impact: "Prevented potential surgery delays, maintained safety margin"
    },
    {
      id: 3,
      title: "Delayed non-urgent admissions by 2 hours",
      timestamp: "2024-01-15 12:10:00",
      status: "PENDING",
      category: "Patient Flow",
      reasoning: "ICU capacity at 95%. Two critical patients incoming from ER. Risk assessment indicates need for buffer capacity.",
      confidence: 87,
      impact: "Maintaining critical care capacity for emergencies"
    },
    {
      id: 4,
      title: "Suggested cross-training program for Ward B staff",
      timestamp: "2024-01-15 10:15:00",
      status: "PENDING",
      category: "Staff Allocation",
      reasoning: "Recurring capacity mismatches detected. Ward B frequently understaffed during evening shifts while Ward C overstaffed.",
      confidence: 78,
      impact: "Long-term optimization - awaiting administrator approval"
    },
    {
      id: 5,
      title: "Rescheduled equipment maintenance to minimize disruption",
      timestamp: "2024-01-15 09:30:00",
      status: "SUCCESS",
      category: "Operations",
      reasoning: "Predictive analysis shows low surgery volume window tomorrow 2-4 PM. Current schedule conflicts with peak usage.",
      confidence: 92,
      impact: "Zero disruption to patient care, equipment compliance maintained"
    }
  ];

  const stats = {
    successRate: 94,
    totalDecisions: 1247
  };

  const getStatusColor = (status) => {
    switch(status) {
      case 'SUCCESS': 
        return 'bg-green-50 dark:bg-green-950 text-green-700 dark:text-green-200';
      case 'PENDING': 
        return 'bg-amber-50 dark:bg-amber-950 text-amber-700 dark:text-amber-200';
      default: 
        return 'bg-gray-50 dark:bg-gray-900 text-gray-700 dark:text-gray-200';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'SUCCESS': 
        return <CheckCircle size={18} className="text-green-500 dark:text-green-400 flex-shrink-0" />;
      case 'PENDING': 
        return <Clock size={18} className="text-amber-500 dark:text-amber-400 flex-shrink-0" />;
      default: 
        return <AlertCircle size={18} className="text-gray-500 dark:text-gray-400 flex-shrink-0" />;
    }
  };

  const DecisionCard = ({ decision }) => (
    <Card className="bg-white dark:bg-gray-900 border-1 border-gray-400 dark:border-gray-800  hover:shadow-md dark:hover:shadow-lg dark:hover:shadow-blue-900/20 transition-shadow">
      <div className="p-3 sm:p-4 md:p-6 space-y-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-start gap-3 sm:gap-4">
          <div className="flex items-start gap-3 flex-1 min-w-0">
            {getStatusIcon(decision.status)}
            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base break-words line-clamp-2">
                {decision.title}
              </h3>
              <p className="text-xs sm:text-sm text-gray-500 dark:text-gray-400 mt-1">
                {decision.timestamp}
              </p>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 sm:flex-nowrap">
            <Badge variant="outline" className={`text-xs font-medium whitespace-nowrap ${getStatusColor(decision.status)}`}>
              {decision.status}
            </Badge>
            <Badge variant="outline" className="text-xs font-medium bg-blue-50 dark:bg-gray-900 text-blue-700 dark:text-blue-200 border-1-blue-200 dark:border-1-blue-800 whitespace-nowrap">
              {decision.category}
            </Badge>
          </div>
        </div>

        {/* Content Sections */}
        <div className="space-y-3 sm:space-y-4">
          {/* Reasoning */}
          <div>
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
              Reasoning
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
              {decision.reasoning}
            </p>
          </div>

          {/* Confidence Bar */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300">
                Confidence Level
              </h4>
              <span className="text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400">
                {decision.confidence}%
              </span>
            </div>
            <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 overflow-hidden">
              <div 
                className="bg-blue-500 dark:bg-blue-500 h-full transition-all duration-500"
                style={{ width: `${decision.confidence}%` }}
              />
            </div>
          </div>

          {/* Impact Section */}
          <div className="bg-blue-50 dark:bg-slate-950/30 rounded-lg p-3 sm:p-4 border-1 border-1-blue-100 dark:border-1-gray-900">
            <h4 className="text-xs sm:text-sm font-semibold text-gray-700 dark:text-gray-300 mb-1">
              Impact
            </h4>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400">
              {decision.impact}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2 pt-2 sm:gap-3">
            <Button 
              variant="outline" 
              className="text-xs sm:text-sm h-9 sm:h-10 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-1-gray-300 dark:border-1-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Approve
            </Button>
            <Button 
              variant="outline" 
              className="text-xs sm:text-sm h-9 sm:h-10 bg-white dark:bg-slate-800 text-gray-700 dark:text-gray-200 border-1-gray-300 dark:border-1-gray-600 hover:bg-gray-50 dark:hover:bg-slate-700"
            >
              Override
            </Button>
            <Button 
              variant="ghost" 
              className="text-xs sm:text-sm h-9 sm:h-10 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-950/20 sm:ml-auto"
            >
              View Details
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-950 transition-colors">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-gray-50 dark:bg-gray-950 border-1-b border-1-gray-200 dark:border-1-slate-800 transition-colors">
        <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 sm:gap-6">
            <div className="min-w-0">
              <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-1 truncate">
                AI Decision Log
              </h1>
              <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-400">
                Real-time autonomous decisions and their outcomes
              </p>
            </div>

            {/* Stats */}
            <div className="flex items-center gap-4 sm:gap-6 flex-shrink-0">
              <div className="text-center sm:text-right">
                <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-end mb-1">
                  <TrendingUp size={16} className="text-green-500 dark:text-green-400 flex-shrink-0" />
                  <span className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.successRate}%
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Success Rate</p>
              </div>

              <div className="h-8 sm:h-10 w-px bg-gray-300 dark:bg-gray-700"></div>

              <div className="text-center sm:text-right">
                <div className="flex items-center gap-1 sm:gap-2 justify-center sm:justify-end mb-1">
                  <Brain size={16} className="text-blue-500 dark:text-blue-400 flex-shrink-0" />
                  <span className="text-lg sm:text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                    {stats.totalDecisions.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400">Total Decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6">
        <div className="space-y-2 sm:space-y-3 md:space-y-4">
          {decisions.map(decision => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIDecisionLog;

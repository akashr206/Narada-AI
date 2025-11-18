'use client'
import React, { useState } from 'react';
import { TrendingUp, AlertCircle, CheckCircle, Clock, Brain, ThumbsUp, ThumbsDown } from 'lucide-react';

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
      case 'SUCCESS': return 'bg-green-100 text-green-700';
      case 'PENDING': return 'bg-yellow-100 text-yellow-700';
      default: return 'bg-gray-100 text-gray-700';
    }
  };

  const getStatusIcon = (status) => {
    switch(status) {
      case 'SUCCESS': return <CheckCircle size={20} className="text-green-500" />;
      case 'PENDING': return <Clock size={20} className="text-yellow-500" />;
      default: return <AlertCircle size={20} className="text-gray-500" />;
    }
  };

  const DecisionCard = ({ decision }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 sm:p-6 hover:shadow-md transition-shadow">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between mb-4 gap-3">
        <div className="flex items-start gap-3 flex-1">
          {getStatusIcon(decision.status)}
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 mb-1 text-sm sm:text-base break-words">{decision.title}</h3>
            <p className="text-xs sm:text-sm text-gray-500">{decision.timestamp}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 flex-wrap ml-8 sm:ml-0">
          <span className={`px-2 sm:px-3 py-1 rounded text-xs font-medium ${getStatusColor(decision.status)}`}>
            {decision.status}
          </span>
          <span className="px-2 sm:px-3 py-1 rounded text-xs font-medium bg-blue-100 text-blue-700">
            {decision.category}
          </span>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-2">Reasoning</h4>
          <p className="text-xs sm:text-sm text-gray-600">{decision.reasoning}</p>
        </div>

        <div>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-xs sm:text-sm font-medium text-gray-700">Confidence Level</h4>
            <span className="text-xs sm:text-sm font-semibold text-blue-600">{decision.confidence}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-500 h-2 rounded-full transition-all"
              style={{ width: `${decision.confidence}%` }}
            ></div>
          </div>
        </div>

        <div className="bg-blue-50 rounded-lg p-3 sm:p-4">
          <h4 className="text-xs sm:text-sm font-medium text-gray-700 mb-1">Impact</h4>
          <p className="text-xs sm:text-sm text-gray-600">{decision.impact}</p>
        </div>

        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3 pt-2">
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors">
            <ThumbsUp size={16} />
            Approve
          </button>
          <button className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 text-xs sm:text-sm font-medium transition-colors">
            <ThumbsDown size={16} />
            Override
          </button>
          <button className="sm:ml-auto text-xs sm:text-sm font-medium text-blue-600 hover:text-blue-700 py-2">
            View Details
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sticky Header */}
      <div className="sticky top-0 z-10 bg-white border-b border-gray-200 shadow-sm">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-1 sm:mb-2">AI Decision Log</h1>
              <p className="text-sm sm:text-base text-gray-600">Real-time autonomous decisions and their outcomes</p>
            </div>
            <div className="flex items-center gap-4 sm:gap-6">
              <div className="text-center sm:text-right">
                <div className="flex items-center gap-2 justify-center sm:justify-end mb-1">
                  <TrendingUp size={18} className="text-green-500 sm:w-5 sm:h-5" />
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.successRate}%</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Success Rate</p>
              </div>
              <div className="w-px h-10 sm:h-12 bg-gray-300"></div>
              <div className="text-center sm:text-right">
                <div className="flex items-center gap-2 justify-center sm:justify-end mb-1">
                  <Brain size={18} className="text-blue-500 sm:w-5 sm:h-5" />
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">{stats.totalDecisions.toLocaleString()}</span>
                </div>
                <p className="text-xs sm:text-sm text-gray-600">Total Decisions</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scrollable Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="space-y-3 sm:space-y-4">
          {decisions.map(decision => (
            <DecisionCard key={decision.id} decision={decision} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AIDecisionLog;
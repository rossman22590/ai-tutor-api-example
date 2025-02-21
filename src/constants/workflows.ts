// src/constants/workflows.ts
'use client';

import React from 'react';
import { Workflow, WorkflowId } from '@/types';
import { 
  FaGlobe, 
  FaBriefcase, 
  FaChartLine, 
  FaBullseye, 
  FaUsers, 
  FaHandshake, 
  FaCogs 
} from 'react-icons/fa';

const createIcon = (Icon: React.ComponentType<React.SVGProps<SVGSVGElement>>, color: string) => {
  return React.createElement(Icon, { className: color });
};

export const WORKFLOWS: Workflow[] = [
  {
    id: 'website-content' as WorkflowId,
    name: 'Website Content Generator',
    icon: createIcon(FaGlobe, "text-blue-400"),
    description: 'Create engaging website content',
    fields: [
      { name: 'urldomain', label: 'URL Domain', type: 'text' },
      { name: 'websiteapge', label: 'Website Page', type: 'text' },
      { name: 'keyword', label: 'Keyword', type: 'text' },
      { name: 'intent', label: 'Intent', type: 'text' },
      { name: 'objective', label: 'Objective', type: 'text' },
      { name: 'outboundlinks', label: 'Outbound Links', type: 'text' },
      { name: 'internallinks', label: 'Internal Links', type: 'text' },
      { name: 'images', label: 'Images', type: 'text' }
    ]
  },
  {
    id: 'executive-summary' as WorkflowId,
    name: 'Executive Summary',
    icon: createIcon(FaBriefcase, "text-purple-400"),
    description: 'Generate comprehensive business summaries',
    fields: [
      { name: 'BusinessPlan', label: 'Business Plan', type: 'text' },
      { name: 'ProductName', label: 'Product Name', type: 'text' },
      { name: 'CompanyName', label: 'Company Name', type: 'text' },
      { name: 'MissionStatement', label: 'Mission Statement', type: 'textarea' },
      { name: 'BusinessObjectives', label: 'Business Objectives', type: 'textarea' },
      { name: 'BusinessOverview', label: 'Business Overview', type: 'textarea' },
      { name: 'MarketNeeds', label: 'Market Needs', type: 'textarea' },
      { name: 'UniqueSellingProposition', label: 'Unique Selling Proposition', type: 'textarea' },
      { name: 'objective', label: 'Objective', type: 'textarea' }
    ]
  },
  {
    id: 'market-analysis',
    name: 'Market Analysis',
    icon: createIcon(FaChartLine, "text-green-400"),
    description: 'Analyze market trends and opportunities',
    fields: [
      { name: 'MarketAnalysis', label: 'Market Analysis', type: 'textarea' },
      { name: 'IndustryOverview', label: 'Industry Overview', type: 'textarea' },
      { name: 'TargetMarket', label: 'Target Market', type: 'textarea' },
      { name: 'CompetitiveAnalysis', label: 'Competitive Analysis', type: 'textarea' },
      { name: 'Business', label: 'Business', type: 'text' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'googleorganic', label: 'Google Organic', type: 'text' },
      { name: 'products', label: 'Products', type: 'text' },
      { name: 'services', label: 'Services', type: 'text' }
    ]
  },
  {
    id: 'product-line',
    name: 'Product Line Summary',
    icon: createIcon(FaBullseye, "text-red-400"),
    description: 'Detail your product offerings',
    fields: [
      { name: 'ExecutiveSummary', label: 'Executive Summary', type: 'textarea' },
      { name: 'ProductDescription', label: 'Product Description', type: 'textarea' },
      { name: 'CompanyName', label: 'Company Name', type: 'text' },
      { name: 'FeaturesandBenefits', label: 'Features and Benefits', type: 'textarea' },
      { name: 'customer', label: 'Customer', type: 'text' },
      { name: 'ProductLifecycle', label: 'Product Lifecycle', type: 'textarea' },
      { name: 'customerjourney', label: 'Customer Journey', type: 'textarea' },
      { name: 'Customerlifetimevalue', label: 'Customer Lifetime Value', type: 'textarea' },
      { name: 'BusinessOverview', label: 'Business Overview', type: 'textarea' },
      { name: 'MarketNeeds', label: 'Market Needs', type: 'textarea' },
      { name: 'UniqueSellingProposition', label: 'Unique Selling Proposition', type: 'textarea' }
    ]
  },
  {
    id: 'market-strategy',
    name: 'Marketing Strategy',
    icon: createIcon(FaUsers, "text-yellow-400"),
    description: 'Develop comprehensive marketing strategies',
    fields: [
      { name: 'MarketingStrategy', label: 'Marketing Strategy', type: 'textarea' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'IndustryOverview', label: 'Industry Overview', type: 'textarea' },
      { name: 'Demographic', label: 'Demographic', type: 'textarea' },
      { name: 'TargetMarket', label: 'Target Market', type: 'textarea' },
      { name: 'digitalmarketing', label: 'Digital Marketing', type: 'textarea' },
      { name: 'socialmediamarketing', label: 'Social Media Marketing', type: 'textarea' },
      { name: 'contentStrategy', label: 'Content Strategy', type: 'textarea' },
      { name: 'emailmarketing', label: 'Email Marketing', type: 'textarea' },
      { name: 'organicsearch', label: 'Organic Search', type: 'textarea' },
      { name: 'AIsearch', label: 'AI Search', type: 'textarea' },
      { name: 'idealcustomers', label: 'Ideal Customers', type: 'textarea' },
      { name: 'customerjourney', label: 'Customer Journey', type: 'textarea' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'platforms', label: 'Platforms', type: 'text' },
      { name: 'googleorganic', label: 'Google Organic', type: 'text' },
      { name: 'products', label: 'Products', type: 'text' },
      { name: 'services', label: 'Services', type: 'text' }
    ]
  },
  {
    id: 'sales-strategy',
    name: 'Sales Strategy',
    icon: createIcon(FaHandshake, "text-indigo-400"),
    description: 'Plan your sales approach',
    fields: [
      { name: 'Salesgoals', label: 'Sales Goals', type: 'textarea' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'IndustryOverview', label: 'Industry Overview', type: 'textarea' },
      { name: 'Demographic', label: 'Demographic', type: 'textarea' },
      { name: 'TargetMarket', label: 'Target Market', type: 'textarea' },
      { name: 'digitalmarketing', label: 'Digital Marketing', type: 'textarea' },
      { name: 'socialmediamarketing', label: 'Social Media Marketing', type: 'textarea' },
      { name: 'contentStrategy', label: 'Content Strategy', type: 'textarea' },
      { name: 'emailmarketing', label: 'Email Marketing', type: 'textarea' },
      { name: 'organicsearch', label: 'Organic Search', type: 'textarea' },
      { name: 'AIsearch', label: 'AI Search', type: 'textarea' },
      { name: 'idealcustomers', label: 'Ideal Customers', type: 'textarea' },
      { name: 'customerjourney', label: 'Customer Journey', type: 'textarea' },
      { name: 'city', label: 'City', type: 'text' },
      { name: 'LongTermSalesgoals', label: 'Long Term Sales Goals', type: 'textarea' },
      { name: 'MidTermSalesgoals', label: 'Mid Term Sales Goals', type: 'textarea' },
      { name: 'ShortTermSalesgoals', label: 'Short Term Sales Goals', type: 'textarea' },
      { name: 'leadgenerationsystems', label: 'Lead Generation Systems', type: 'textarea' },
      { name: 'marketing', label: 'Marketing', type: 'textarea' },
      { name: 'networking', label: 'Networking', type: 'textarea' },
      { name: 'benchmarks', label: 'Benchmarks', type: 'textarea' },
      { name: 'timeframe', label: 'Timeframe', type: 'text' },
      { name: 'monthly', label: 'Monthly', type: 'text' },
      { name: 'quarterly', label: 'Quarterly', type: 'text' },
      { name: 'annually', label: 'Annually', type: 'text' },
      { name: 'twoyears', label: 'Two Years', type: 'text' },
      { name: 'SystematizeStandardOperatingProcedures', label: 'Systematize Standard Operating Procedures', type: 'textarea' },
      { name: 'marketingchannels', label: 'Marketing Channels', type: 'textarea' }
    ]
  },
  {
    id: 'operations-plan',
    name: 'Operations Plan',
    icon: createIcon(FaCogs, "text-teal-400"),
    description: 'Structure your business operations',
    fields: [
      { name: 'OperationsPlan', label: 'Operations Plan', type: 'textarea' },
      { name: 'company', label: 'Company', type: 'text' },
      { name: 'state', label: 'State', type: 'text' },
      { name: 'IndustryOverview', label: 'Industry Overview', type: 'textarea' },
      { name: 'Demographic', label: 'Demographic', type: 'textarea' },
      { name: 'TargetMarket', label: 'Target Market', type: 'textarea' },
      { name: 'Workflows', label: 'Workflows', type: 'textarea' },
      { name: 'leadgeneration', label: 'Lead Generation', type: 'textarea' },
      { name: 'contentcreation', label: 'Content Creation', type: 'textarea' },
      { name: 'digitalplatforms', label: 'Digital Platforms', type: 'textarea' },
      { name: 'digitalmarketing', label: 'Digital Marketing', type: 'textarea' },
      { name: 'website', label: 'Website', type: 'text' },
      { name: 'socialmedia', label: 'Social Media', type: 'text' },
      { name: 'contentStrategy', label: 'Content Strategy', type: 'textarea' },
      { name: 'emailmarketing', label: 'Email Marketing', type: 'textarea' },
      { name: 'organicsearch', label: 'Organic Search', type: 'textarea' },
      { name: 'AIsearch', label: 'AI Search', type: 'textarea' },
      { name: 'idealcustomers', label: 'Ideal Customers', type: 'textarea' },
      { name: 'customerjourney', label: 'Customer Journey', type: 'textarea' },
      { name: 'SystematizeStandardOperatingProcedures', label: 'Systematize Standard Operating Procedures', type: 'textarea' },
      { name: 'idealclients', label: 'Ideal Clients', type: 'textarea' }
    ]
  }
];export const WORKFLOW_MAPPINGS: Record<WorkflowId, string> = {
    'website-content': 'wf_p2wq82lst0zv8ai4xzqngg9c',
    'executive-summary': 'wf_rnt83hja65v396tfacrkc90v',
    'market-analysis': 'wf_l16fob3uhzbla275dliwa7xw',
    'product-line': 'wf_dqdzodpzkeygaozu6axhesmb',
    'market-strategy': 'wf_acuyc5g9m7srgizvmx24b5ke',
    'sales-strategy': 'wf_kairwr8n4qqd8fvnvpq9z4sk',
    'operations-plan': 'wf_xuj87kcpg5oeia7qudl2m2l6'
  };

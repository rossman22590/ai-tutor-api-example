// src/types/index.ts
import { ReactNode } from 'react';

export type WorkflowId = 
  | 'website-content'
  | 'executive-summary'
  | 'market-analysis'
  | 'product-line'
  | 'market-strategy'
  | 'sales-strategy'
  | 'operations-plan';

export interface Field {
  name: string;
  label: string;
  type: 'text' | 'textarea';
}

export interface Workflow {
  id: WorkflowId;
  name: string;
  icon: ReactNode;
  description: string;
  fields: Field[];
}

export interface FormData {
  [key: string]: string;
}

export interface ApiSuccessResponse {
  success: true;
  result: string;
  workflow_id?: string;
  run_id?: string;
}

export interface ApiErrorResponse {
  success: false;
  error: string;
}

export type ApiResponse = ApiSuccessResponse | ApiErrorResponse;

export interface WorkflowRequest {
  workflowId: WorkflowId;
  formData: FormData;
}

export interface LoadingState {
  isLoading: boolean;
  message?: string;
}

export interface ErrorState {
  hasError: boolean;
  message?: string;
}

export const WORKFLOW_MAPPINGS: Record<WorkflowId, string> = {
  'website-content': 'wf_p2wq82lst0zv8ai4xzqngg9c',
  'executive-summary': 'wf_rnt83hja65v396tfacrkc90v',
  'market-analysis': 'wf_l16fob3uhzbla275dliwa7xw',
  'product-line': 'wf_dqdzodpzkeygaozu6axhesmb',
  'market-strategy': 'wf_acuyc5g9m7srgizvmx24b5ke',
  'sales-strategy': 'wf_kairwr8n4qqd8fvnvpq9z4sk',
  'operations-plan': 'wf_xuj87kcpg5oeia7qudl2m2l6'
};

export interface EnvVariables {
  AITUTOR_API_KEY: string;
  NEXT_PUBLIC_WEBSITE_CONTENT: string;
  NEXT_PUBLIC_EX_SUM: string;
  NEXT_PUBLIC_MARKET_ANALYSIS: string;
  NEXT_PUBLIC_EX_SUM_PRODCUT_LINE: string;
  NEXT_PUBLIC_EX_SUM_MARKET_STRATEGY: string;
  NEXT_PUBLIC_EX_SUM_SALES_STRATEGY: string;
  NEXT_PUBLIC_EX_SUM_OPERATIONS_PLAN: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: Record<string, string>;
}

export interface WorkflowSelectorProps {
  selectedWorkflow: Workflow;
  onWorkflowChange: (workflow: Workflow) => void;
}

export interface FormFieldProps {
  field: Field;
  value: string;
  onChange: (name: string, value: string) => void;
  error?: string;
}

export interface ResultDisplayProps {
  result: ApiSuccessResponse;
  onClose?: () => void;
}

export interface WorkflowState {
  selected: Workflow;
  formData: FormData;
  loading: LoadingState;
  error: ErrorState;
  result: ApiSuccessResponse | null;
}

export interface WorkflowAction {
  type: string;
  payload?: any;
}

export type ValidationFunction = (data: FormData) => ValidationResult;

export type WorkflowHandler = (data: FormData) => Promise<ApiResponse>;

export interface WorkflowConfig {
  id: WorkflowId;
  validate: ValidationFunction;
  handle: WorkflowHandler;
}

export interface ApiConfig {
  baseUrl: string;
  apiKey: string;
  timeout: number;
}

export type ResponseTransformer = (response: ApiResponse) => any;

export type ErrorHandler = (error: Error) => void;

export type WorkflowMapping = typeof WORKFLOW_MAPPINGS;

export interface FieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  custom?: (value: string) => boolean;
}

export interface FieldConfig extends Field {
  validation?: FieldValidation;
}

export interface ThemeConfig {
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    text: string;
    error: string;
    success: string;
  };
  fonts: {
    heading: string;
    body: string;
  };
}

export interface AnalyticsEvent {
  category: string;
  action: string;
  label?: string;
  value?: number;
}

export interface CacheConfig {
  ttl: number;
  maxSize: number;
}

export interface RateLimitConfig {
  maxRequests: number;
  windowMs: number;
}

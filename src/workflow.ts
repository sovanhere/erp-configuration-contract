import { z } from "zod";

export const documentTypes = [
  "purchase_order",
  "goods_receipt",
  "sales_order",
  "stock_issue",
  "stock_transfer",
  "stock_adjustment",
  "inventory_posting"
] as const;

export const canonicalDocumentStatuses = [
  "DRAFT",
  "PENDING_APPROVAL",
  "APPROVED",
  "RELEASED",
  "CONFIRMED",
  "ALLOCATED",
  "PARTIAL",
  "PARTIALLY_SHIPPED",
  "SHIPPED",
  "POSTED",
  "CLOSED",
  "CANCELLED",
  "REVERSED"
] as const;

export const conditionKeys = [
  "always",
  "document.amount_gte",
  "document.fully_received",
  "document.fully_fulfilled",
  "transfer.is_interwarehouse",
  "approval.is_complete"
] as const;

export const effectKeys = [
  "purchase.submit",
  "purchase.record_approval",
  "purchase.create_receipt",
  "receipt.post",
  "sales.confirm",
  "sales.allocate",
  "sales.create_issue",
  "sales.produced",
  "sales.dispatch",
  "sales.cancel",
  "sales.submit",
  "sales.approve",
  "sales.mark_produced",
  "sales.mark_dispatched",
  "sales.complete",
  "issue.post",
  "issue.customer_return",
  "transfer.dispatch",
  "transfer.receive",
  "adjustment.post",
  "inventory.reverse",
  "outbox.emit"
] as const;

export const inputSchemaKeys = [
  "none",
  "purchase.approve",
  "purchase.create_receipt",
  "sales.allocate",
  "sales.create_issue",
  "sales.produced",
  "sales.dispatch",
  "inventory.reverse"
] as const;

export const workflowPermissions = [
  "purchase.create",
  "purchase.approve",
  "purchase.approve.level1",
  "purchase.approve.level2",
  "receipt.create",
  "receipt.post",
  "inventory.adjust",
  "inventory.transfer",
  "sales.create",
  "sales.confirm",
  "sales.allocate",
  "sales.issue",
  "sales.approve",
  "production.mark_produced",
  "sales.dispatch"
] as const;

const stableKey = z.string().regex(/^[a-z][a-z0-9_.-]{1,127}$/);

export const conditionReferenceSchema = z.object({
  key: z.enum(conditionKeys),
  args: z.record(z.string(), z.unknown()).default({})
});

export const effectReferenceSchema = z.object({
  key: z.enum(effectKeys),
  args: z.record(z.string(), z.unknown()).default({})
});

export const lifecycleStateSchema = z.object({
  key: stableKey,
  label: z.string().min(1).max(160),
  canonicalStatus: z.enum(canonicalDocumentStatuses),
  terminal: z.boolean().default(false)
});

const transitionBranchSchema = z.object({
  when: conditionReferenceSchema.optional(),
  to: stableKey,
  effects: z.array(effectReferenceSchema).default([])
});

export const approvalPolicySchema = z.object({
  allowRequesterApproval: z.boolean().default(false),
  allowSameApproverAcrossLevels: z.boolean().default(false),
  /** Minimum number of distinct approve actions required before approval.is_complete is true. */
  requiredApprovers: z.number().int().min(1).default(1)
});

export const lifecycleTransitionSchema = z.object({
  key: stableKey,
  actionKey: stableKey,
  from: z.array(stableKey).min(1),
  permission: z.enum(workflowPermissions),
  inputSchema: z.enum(inputSchemaKeys).default("none"),
  approvalPolicy: approvalPolicySchema.optional(),
  guards: z.array(conditionReferenceSchema).default([]),
  branches: z.array(transitionBranchSchema).min(1)
});

export const lifecycleDefinitionSchema = z.object({
  stableKey,
  documentType: z.enum(documentTypes),
  version: z.number().int().positive(),
  initialState: stableKey,
  states: z.array(lifecycleStateSchema).min(2),
  transitions: z.array(lifecycleTransitionSchema).default([])
});

export const workflowNodeSchema = z.object({
  key: stableKey,
  type: z.enum(["action", "approval", "branch", "wait_for_event", "complete"]),
  actionKey: stableKey.optional(),
  eventType: stableKey.optional(),
  repeatable: z.boolean().default(false),
  inProgressStateKey: stableKey.optional(),
  completedStateKey: stableKey.optional()
});

export const workflowEdgeSchema = z.object({
  from: stableKey,
  to: stableKey,
  when: conditionReferenceSchema.optional()
});

export const processWorkflowSchema = z.object({
  stableKey,
  version: z.number().int().positive(),
  triggerEvent: stableKey,
  startNode: stableKey,
  nodes: z.array(workflowNodeSchema).min(1),
  edges: z.array(workflowEdgeSchema).default([])
});

export type DocumentType = (typeof documentTypes)[number];
export type CanonicalDocumentStatus = (typeof canonicalDocumentStatuses)[number];
export type ConditionReference = z.infer<typeof conditionReferenceSchema>;
export type EffectReference = z.infer<typeof effectReferenceSchema>;
export type LifecycleDefinition = z.infer<typeof lifecycleDefinitionSchema>;
export type LifecycleTransition = z.infer<typeof lifecycleTransitionSchema>;
export type ProcessWorkflowDefinition = z.infer<typeof processWorkflowSchema>;

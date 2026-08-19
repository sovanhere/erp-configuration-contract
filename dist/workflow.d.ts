import { z } from "zod";
/**
 * Single source of truth for workflow/lifecycle enums and schemas.
 * Ported verbatim from backend src/shared/workflow/contract.ts.
 * Both the backend and the frontend template builder must import
 * from this package instead of re-declaring these values.
 */
export declare const documentTypes: readonly ["purchase_order", "goods_receipt", "sales_order", "stock_issue", "stock_transfer", "stock_adjustment", "inventory_posting"];
export declare const canonicalDocumentStatuses: readonly ["DRAFT", "PENDING_APPROVAL", "APPROVED", "RELEASED", "CONFIRMED", "ALLOCATED", "PARTIAL", "PARTIALLY_SHIPPED", "SHIPPED", "POSTED", "CLOSED", "CANCELLED", "REVERSED"];
export declare const conditionKeys: readonly ["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"];
export declare const effectKeys: readonly ["purchase.submit", "purchase.record_approval", "purchase.create_receipt", "receipt.post", "sales.confirm", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "sales.cancel", "sales.submit", "sales.approve", "sales.mark_produced", "sales.mark_dispatched", "sales.complete", "issue.post", "issue.customer_return", "transfer.dispatch", "transfer.receive", "adjustment.post", "inventory.reverse", "outbox.emit"];
export declare const inputSchemaKeys: readonly ["none", "purchase.approve", "purchase.create_receipt", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "inventory.reverse"];
export declare const workflowPermissions: readonly ["purchase.create", "purchase.approve", "purchase.approve.level1", "purchase.approve.level2", "receipt.create", "receipt.post", "inventory.adjust", "inventory.transfer", "sales.create", "sales.confirm", "sales.allocate", "sales.issue", "sales.approve", "production.mark_produced", "sales.dispatch"];
/** stableKey allows dots and hyphens (workflow/lifecycle keys), unlike the base `key` schema. */
export declare const stableKey: z.ZodString;
export declare const conditionReferenceSchema: z.ZodObject<{
    key: z.ZodEnum<{
        always: "always";
        "document.amount_gte": "document.amount_gte";
        "document.fully_received": "document.fully_received";
        "document.fully_fulfilled": "document.fully_fulfilled";
        "transfer.is_interwarehouse": "transfer.is_interwarehouse";
        "approval.is_complete": "approval.is_complete";
    }>;
    args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const effectReferenceSchema: z.ZodObject<{
    key: z.ZodEnum<{
        "purchase.submit": "purchase.submit";
        "purchase.record_approval": "purchase.record_approval";
        "purchase.create_receipt": "purchase.create_receipt";
        "receipt.post": "receipt.post";
        "sales.confirm": "sales.confirm";
        "sales.allocate": "sales.allocate";
        "sales.create_issue": "sales.create_issue";
        "sales.produced": "sales.produced";
        "sales.dispatch": "sales.dispatch";
        "sales.cancel": "sales.cancel";
        "sales.submit": "sales.submit";
        "sales.approve": "sales.approve";
        "sales.mark_produced": "sales.mark_produced";
        "sales.mark_dispatched": "sales.mark_dispatched";
        "sales.complete": "sales.complete";
        "issue.post": "issue.post";
        "issue.customer_return": "issue.customer_return";
        "transfer.dispatch": "transfer.dispatch";
        "transfer.receive": "transfer.receive";
        "adjustment.post": "adjustment.post";
        "inventory.reverse": "inventory.reverse";
        "outbox.emit": "outbox.emit";
    }>;
    args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, z.core.$strip>;
export declare const lifecycleStateSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    canonicalStatus: z.ZodEnum<{
        DRAFT: "DRAFT";
        PENDING_APPROVAL: "PENDING_APPROVAL";
        APPROVED: "APPROVED";
        RELEASED: "RELEASED";
        CONFIRMED: "CONFIRMED";
        ALLOCATED: "ALLOCATED";
        PARTIAL: "PARTIAL";
        PARTIALLY_SHIPPED: "PARTIALLY_SHIPPED";
        SHIPPED: "SHIPPED";
        POSTED: "POSTED";
        CLOSED: "CLOSED";
        CANCELLED: "CANCELLED";
        REVERSED: "REVERSED";
    }>;
    terminal: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const approvalPolicySchema: z.ZodObject<{
    allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
    allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
    requiredApprovers: z.ZodDefault<z.ZodNumber>;
}, z.core.$strip>;
export declare const lifecycleTransitionSchema: z.ZodObject<{
    key: z.ZodString;
    actionKey: z.ZodString;
    from: z.ZodArray<z.ZodString>;
    permission: z.ZodEnum<{
        "receipt.post": "receipt.post";
        "sales.confirm": "sales.confirm";
        "sales.allocate": "sales.allocate";
        "sales.dispatch": "sales.dispatch";
        "sales.approve": "sales.approve";
        "purchase.approve": "purchase.approve";
        "purchase.create": "purchase.create";
        "purchase.approve.level1": "purchase.approve.level1";
        "purchase.approve.level2": "purchase.approve.level2";
        "receipt.create": "receipt.create";
        "inventory.adjust": "inventory.adjust";
        "inventory.transfer": "inventory.transfer";
        "sales.create": "sales.create";
        "sales.issue": "sales.issue";
        "production.mark_produced": "production.mark_produced";
    }>;
    inputSchema: z.ZodDefault<z.ZodEnum<{
        "purchase.create_receipt": "purchase.create_receipt";
        "sales.allocate": "sales.allocate";
        "sales.create_issue": "sales.create_issue";
        "sales.produced": "sales.produced";
        "sales.dispatch": "sales.dispatch";
        "inventory.reverse": "inventory.reverse";
        none: "none";
        "purchase.approve": "purchase.approve";
    }>>;
    approvalPolicy: z.ZodOptional<z.ZodObject<{
        allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
        allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
        requiredApprovers: z.ZodDefault<z.ZodNumber>;
    }, z.core.$strip>>;
    guards: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodEnum<{
            always: "always";
            "document.amount_gte": "document.amount_gte";
            "document.fully_received": "document.fully_received";
            "document.fully_fulfilled": "document.fully_fulfilled";
            "transfer.is_interwarehouse": "transfer.is_interwarehouse";
            "approval.is_complete": "approval.is_complete";
        }>;
        args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>>>;
    branches: z.ZodArray<z.ZodObject<{
        when: z.ZodOptional<z.ZodObject<{
            key: z.ZodEnum<{
                always: "always";
                "document.amount_gte": "document.amount_gte";
                "document.fully_received": "document.fully_received";
                "document.fully_fulfilled": "document.fully_fulfilled";
                "transfer.is_interwarehouse": "transfer.is_interwarehouse";
                "approval.is_complete": "approval.is_complete";
            }>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>;
        to: z.ZodString;
        effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<{
                "purchase.submit": "purchase.submit";
                "purchase.record_approval": "purchase.record_approval";
                "purchase.create_receipt": "purchase.create_receipt";
                "receipt.post": "receipt.post";
                "sales.confirm": "sales.confirm";
                "sales.allocate": "sales.allocate";
                "sales.create_issue": "sales.create_issue";
                "sales.produced": "sales.produced";
                "sales.dispatch": "sales.dispatch";
                "sales.cancel": "sales.cancel";
                "sales.submit": "sales.submit";
                "sales.approve": "sales.approve";
                "sales.mark_produced": "sales.mark_produced";
                "sales.mark_dispatched": "sales.mark_dispatched";
                "sales.complete": "sales.complete";
                "issue.post": "issue.post";
                "issue.customer_return": "issue.customer_return";
                "transfer.dispatch": "transfer.dispatch";
                "transfer.receive": "transfer.receive";
                "adjustment.post": "adjustment.post";
                "inventory.reverse": "inventory.reverse";
                "outbox.emit": "outbox.emit";
            }>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const lifecycleDefinitionSchema: z.ZodObject<{
    stableKey: z.ZodString;
    documentType: z.ZodEnum<{
        purchase_order: "purchase_order";
        goods_receipt: "goods_receipt";
        sales_order: "sales_order";
        stock_issue: "stock_issue";
        stock_transfer: "stock_transfer";
        stock_adjustment: "stock_adjustment";
        inventory_posting: "inventory_posting";
    }>;
    version: z.ZodNumber;
    initialState: z.ZodString;
    states: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        canonicalStatus: z.ZodEnum<{
            DRAFT: "DRAFT";
            PENDING_APPROVAL: "PENDING_APPROVAL";
            APPROVED: "APPROVED";
            RELEASED: "RELEASED";
            CONFIRMED: "CONFIRMED";
            ALLOCATED: "ALLOCATED";
            PARTIAL: "PARTIAL";
            PARTIALLY_SHIPPED: "PARTIALLY_SHIPPED";
            SHIPPED: "SHIPPED";
            POSTED: "POSTED";
            CLOSED: "CLOSED";
            CANCELLED: "CANCELLED";
            REVERSED: "REVERSED";
        }>;
        terminal: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    transitions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        actionKey: z.ZodString;
        from: z.ZodArray<z.ZodString>;
        permission: z.ZodEnum<{
            "receipt.post": "receipt.post";
            "sales.confirm": "sales.confirm";
            "sales.allocate": "sales.allocate";
            "sales.dispatch": "sales.dispatch";
            "sales.approve": "sales.approve";
            "purchase.approve": "purchase.approve";
            "purchase.create": "purchase.create";
            "purchase.approve.level1": "purchase.approve.level1";
            "purchase.approve.level2": "purchase.approve.level2";
            "receipt.create": "receipt.create";
            "inventory.adjust": "inventory.adjust";
            "inventory.transfer": "inventory.transfer";
            "sales.create": "sales.create";
            "sales.issue": "sales.issue";
            "production.mark_produced": "production.mark_produced";
        }>;
        inputSchema: z.ZodDefault<z.ZodEnum<{
            "purchase.create_receipt": "purchase.create_receipt";
            "sales.allocate": "sales.allocate";
            "sales.create_issue": "sales.create_issue";
            "sales.produced": "sales.produced";
            "sales.dispatch": "sales.dispatch";
            "inventory.reverse": "inventory.reverse";
            none: "none";
            "purchase.approve": "purchase.approve";
        }>>;
        approvalPolicy: z.ZodOptional<z.ZodObject<{
            allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
            allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
            requiredApprovers: z.ZodDefault<z.ZodNumber>;
        }, z.core.$strip>>;
        guards: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<{
                always: "always";
                "document.amount_gte": "document.amount_gte";
                "document.fully_received": "document.fully_received";
                "document.fully_fulfilled": "document.fully_fulfilled";
                "transfer.is_interwarehouse": "transfer.is_interwarehouse";
                "approval.is_complete": "approval.is_complete";
            }>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>>;
        branches: z.ZodArray<z.ZodObject<{
            when: z.ZodOptional<z.ZodObject<{
                key: z.ZodEnum<{
                    always: "always";
                    "document.amount_gte": "document.amount_gte";
                    "document.fully_received": "document.fully_received";
                    "document.fully_fulfilled": "document.fully_fulfilled";
                    "transfer.is_interwarehouse": "transfer.is_interwarehouse";
                    "approval.is_complete": "approval.is_complete";
                }>;
                args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, z.core.$strip>>;
            to: z.ZodString;
            effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
                key: z.ZodEnum<{
                    "purchase.submit": "purchase.submit";
                    "purchase.record_approval": "purchase.record_approval";
                    "purchase.create_receipt": "purchase.create_receipt";
                    "receipt.post": "receipt.post";
                    "sales.confirm": "sales.confirm";
                    "sales.allocate": "sales.allocate";
                    "sales.create_issue": "sales.create_issue";
                    "sales.produced": "sales.produced";
                    "sales.dispatch": "sales.dispatch";
                    "sales.cancel": "sales.cancel";
                    "sales.submit": "sales.submit";
                    "sales.approve": "sales.approve";
                    "sales.mark_produced": "sales.mark_produced";
                    "sales.mark_dispatched": "sales.mark_dispatched";
                    "sales.complete": "sales.complete";
                    "issue.post": "issue.post";
                    "issue.customer_return": "issue.customer_return";
                    "transfer.dispatch": "transfer.dispatch";
                    "transfer.receive": "transfer.receive";
                    "adjustment.post": "adjustment.post";
                    "inventory.reverse": "inventory.reverse";
                    "outbox.emit": "outbox.emit";
                }>;
                args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, z.core.$strip>>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const workflowNodeSchema: z.ZodObject<{
    key: z.ZodString;
    type: z.ZodEnum<{
        action: "action";
        approval: "approval";
        branch: "branch";
        wait_for_event: "wait_for_event";
        complete: "complete";
    }>;
    actionKey: z.ZodOptional<z.ZodString>;
    eventType: z.ZodOptional<z.ZodString>;
    repeatable: z.ZodDefault<z.ZodBoolean>;
    inProgressStateKey: z.ZodOptional<z.ZodString>;
    completedStateKey: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const workflowEdgeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    when: z.ZodOptional<z.ZodObject<{
        key: z.ZodEnum<{
            always: "always";
            "document.amount_gte": "document.amount_gte";
            "document.fully_received": "document.fully_received";
            "document.fully_fulfilled": "document.fully_fulfilled";
            "transfer.is_interwarehouse": "transfer.is_interwarehouse";
            "approval.is_complete": "approval.is_complete";
        }>;
        args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const processWorkflowSchema: z.ZodObject<{
    stableKey: z.ZodString;
    version: z.ZodNumber;
    triggerEvent: z.ZodString;
    startNode: z.ZodString;
    nodes: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        type: z.ZodEnum<{
            action: "action";
            approval: "approval";
            branch: "branch";
            wait_for_event: "wait_for_event";
            complete: "complete";
        }>;
        actionKey: z.ZodOptional<z.ZodString>;
        eventType: z.ZodOptional<z.ZodString>;
        repeatable: z.ZodDefault<z.ZodBoolean>;
        inProgressStateKey: z.ZodOptional<z.ZodString>;
        completedStateKey: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
    edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        when: z.ZodOptional<z.ZodObject<{
            key: z.ZodEnum<{
                always: "always";
                "document.amount_gte": "document.amount_gte";
                "document.fully_received": "document.fully_received";
                "document.fully_fulfilled": "document.fully_fulfilled";
                "transfer.is_interwarehouse": "transfer.is_interwarehouse";
                "approval.is_complete": "approval.is_complete";
            }>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export type DocumentType = (typeof documentTypes)[number];
export type CanonicalDocumentStatus = (typeof canonicalDocumentStatuses)[number];
export type ConditionKey = (typeof conditionKeys)[number];
export type EffectKey = (typeof effectKeys)[number];
export type InputSchemaKey = (typeof inputSchemaKeys)[number];
export type WorkflowPermission = (typeof workflowPermissions)[number];
export type LifecycleDefinition = z.infer<typeof lifecycleDefinitionSchema>;
export type ProcessWorkflow = z.infer<typeof processWorkflowSchema>;
export type LifecycleTransition = z.infer<typeof lifecycleTransitionSchema>;
export type ApprovalPolicy = z.infer<typeof approvalPolicySchema>;

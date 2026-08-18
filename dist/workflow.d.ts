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
    key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
    args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
    args: Record<string, unknown>;
}, {
    key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
    args?: Record<string, unknown> | undefined;
}>;
export declare const effectReferenceSchema: z.ZodObject<{
    key: z.ZodEnum<["purchase.submit", "purchase.record_approval", "purchase.create_receipt", "receipt.post", "sales.confirm", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "sales.cancel", "sales.submit", "sales.approve", "sales.mark_produced", "sales.mark_dispatched", "sales.complete", "issue.post", "issue.customer_return", "transfer.dispatch", "transfer.receive", "adjustment.post", "inventory.reverse", "outbox.emit"]>;
    args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
}, "strip", z.ZodTypeAny, {
    key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
    args: Record<string, unknown>;
}, {
    key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
    args?: Record<string, unknown> | undefined;
}>;
export declare const lifecycleStateSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    canonicalStatus: z.ZodEnum<["DRAFT", "PENDING_APPROVAL", "APPROVED", "RELEASED", "CONFIRMED", "ALLOCATED", "PARTIAL", "PARTIALLY_SHIPPED", "SHIPPED", "POSTED", "CLOSED", "CANCELLED", "REVERSED"]>;
    terminal: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    key: string;
    label: string;
    canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
    terminal: boolean;
}, {
    key: string;
    label: string;
    canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
    terminal?: boolean | undefined;
}>;
export declare const approvalPolicySchema: z.ZodObject<{
    allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
    allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
    /** Minimum number of distinct approve actions required before approval.is_complete is true. */
    requiredApprovers: z.ZodDefault<z.ZodNumber>;
}, "strip", z.ZodTypeAny, {
    allowRequesterApproval: boolean;
    allowSameApproverAcrossLevels: boolean;
    requiredApprovers: number;
}, {
    allowRequesterApproval?: boolean | undefined;
    allowSameApproverAcrossLevels?: boolean | undefined;
    requiredApprovers?: number | undefined;
}>;
export declare const lifecycleTransitionSchema: z.ZodObject<{
    key: z.ZodString;
    actionKey: z.ZodString;
    from: z.ZodArray<z.ZodString, "many">;
    permission: z.ZodEnum<["purchase.create", "purchase.approve", "purchase.approve.level1", "purchase.approve.level2", "receipt.create", "receipt.post", "inventory.adjust", "inventory.transfer", "sales.create", "sales.confirm", "sales.allocate", "sales.issue", "sales.approve", "production.mark_produced", "sales.dispatch"]>;
    inputSchema: z.ZodDefault<z.ZodEnum<["none", "purchase.approve", "purchase.create_receipt", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "inventory.reverse"]>>;
    approvalPolicy: z.ZodOptional<z.ZodObject<{
        allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
        allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
        /** Minimum number of distinct approve actions required before approval.is_complete is true. */
        requiredApprovers: z.ZodDefault<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        allowRequesterApproval: boolean;
        allowSameApproverAcrossLevels: boolean;
        requiredApprovers: number;
    }, {
        allowRequesterApproval?: boolean | undefined;
        allowSameApproverAcrossLevels?: boolean | undefined;
        requiredApprovers?: number | undefined;
    }>>;
    guards: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
        args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args: Record<string, unknown>;
    }, {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args?: Record<string, unknown> | undefined;
    }>, "many">>;
    branches: z.ZodArray<z.ZodObject<{
        when: z.ZodOptional<z.ZodObject<{
            key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        }, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        }>>;
        to: z.ZodString;
        effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<["purchase.submit", "purchase.record_approval", "purchase.create_receipt", "receipt.post", "sales.confirm", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "sales.cancel", "sales.submit", "sales.approve", "sales.mark_produced", "sales.mark_dispatched", "sales.complete", "issue.post", "issue.customer_return", "transfer.dispatch", "transfer.receive", "adjustment.post", "inventory.reverse", "outbox.emit"]>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args: Record<string, unknown>;
        }, {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args?: Record<string, unknown> | undefined;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        to: string;
        effects: {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args: Record<string, unknown>;
        }[];
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        } | undefined;
    }, {
        to: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        } | undefined;
        effects?: {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args?: Record<string, unknown> | undefined;
        }[] | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    key: string;
    actionKey: string;
    from: string[];
    permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
    inputSchema: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve";
    guards: {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args: Record<string, unknown>;
    }[];
    branches: {
        to: string;
        effects: {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args: Record<string, unknown>;
        }[];
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        } | undefined;
    }[];
    approvalPolicy?: {
        allowRequesterApproval: boolean;
        allowSameApproverAcrossLevels: boolean;
        requiredApprovers: number;
    } | undefined;
}, {
    key: string;
    actionKey: string;
    from: string[];
    permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
    branches: {
        to: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        } | undefined;
        effects?: {
            key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
            args?: Record<string, unknown> | undefined;
        }[] | undefined;
    }[];
    inputSchema?: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve" | undefined;
    approvalPolicy?: {
        allowRequesterApproval?: boolean | undefined;
        allowSameApproverAcrossLevels?: boolean | undefined;
        requiredApprovers?: number | undefined;
    } | undefined;
    guards?: {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args?: Record<string, unknown> | undefined;
    }[] | undefined;
}>;
export declare const lifecycleDefinitionSchema: z.ZodObject<{
    stableKey: z.ZodString;
    documentType: z.ZodEnum<["purchase_order", "goods_receipt", "sales_order", "stock_issue", "stock_transfer", "stock_adjustment", "inventory_posting"]>;
    version: z.ZodNumber;
    initialState: z.ZodString;
    states: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        canonicalStatus: z.ZodEnum<["DRAFT", "PENDING_APPROVAL", "APPROVED", "RELEASED", "CONFIRMED", "ALLOCATED", "PARTIAL", "PARTIALLY_SHIPPED", "SHIPPED", "POSTED", "CLOSED", "CANCELLED", "REVERSED"]>;
        terminal: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
        terminal: boolean;
    }, {
        key: string;
        label: string;
        canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
        terminal?: boolean | undefined;
    }>, "many">;
    transitions: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        actionKey: z.ZodString;
        from: z.ZodArray<z.ZodString, "many">;
        permission: z.ZodEnum<["purchase.create", "purchase.approve", "purchase.approve.level1", "purchase.approve.level2", "receipt.create", "receipt.post", "inventory.adjust", "inventory.transfer", "sales.create", "sales.confirm", "sales.allocate", "sales.issue", "sales.approve", "production.mark_produced", "sales.dispatch"]>;
        inputSchema: z.ZodDefault<z.ZodEnum<["none", "purchase.approve", "purchase.create_receipt", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "inventory.reverse"]>>;
        approvalPolicy: z.ZodOptional<z.ZodObject<{
            allowRequesterApproval: z.ZodDefault<z.ZodBoolean>;
            allowSameApproverAcrossLevels: z.ZodDefault<z.ZodBoolean>;
            /** Minimum number of distinct approve actions required before approval.is_complete is true. */
            requiredApprovers: z.ZodDefault<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            allowRequesterApproval: boolean;
            allowSameApproverAcrossLevels: boolean;
            requiredApprovers: number;
        }, {
            allowRequesterApproval?: boolean | undefined;
            allowSameApproverAcrossLevels?: boolean | undefined;
            requiredApprovers?: number | undefined;
        }>>;
        guards: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        }, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        }>, "many">>;
        branches: z.ZodArray<z.ZodObject<{
            when: z.ZodOptional<z.ZodObject<{
                key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
                args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args: Record<string, unknown>;
            }, {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args?: Record<string, unknown> | undefined;
            }>>;
            to: z.ZodString;
            effects: z.ZodDefault<z.ZodArray<z.ZodObject<{
                key: z.ZodEnum<["purchase.submit", "purchase.record_approval", "purchase.create_receipt", "receipt.post", "sales.confirm", "sales.allocate", "sales.create_issue", "sales.produced", "sales.dispatch", "sales.cancel", "sales.submit", "sales.approve", "sales.mark_produced", "sales.mark_dispatched", "sales.complete", "issue.post", "issue.customer_return", "transfer.dispatch", "transfer.receive", "adjustment.post", "inventory.reverse", "outbox.emit"]>;
                args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
            }, "strip", z.ZodTypeAny, {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args: Record<string, unknown>;
            }, {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args?: Record<string, unknown> | undefined;
            }>, "many">>;
        }, "strip", z.ZodTypeAny, {
            to: string;
            effects: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args: Record<string, unknown>;
            }[];
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args: Record<string, unknown>;
            } | undefined;
        }, {
            to: string;
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args?: Record<string, unknown> | undefined;
            } | undefined;
            effects?: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args?: Record<string, unknown> | undefined;
            }[] | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        key: string;
        actionKey: string;
        from: string[];
        permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
        inputSchema: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve";
        guards: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        }[];
        branches: {
            to: string;
            effects: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args: Record<string, unknown>;
            }[];
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args: Record<string, unknown>;
            } | undefined;
        }[];
        approvalPolicy?: {
            allowRequesterApproval: boolean;
            allowSameApproverAcrossLevels: boolean;
            requiredApprovers: number;
        } | undefined;
    }, {
        key: string;
        actionKey: string;
        from: string[];
        permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
        branches: {
            to: string;
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args?: Record<string, unknown> | undefined;
            } | undefined;
            effects?: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args?: Record<string, unknown> | undefined;
            }[] | undefined;
        }[];
        inputSchema?: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve" | undefined;
        approvalPolicy?: {
            allowRequesterApproval?: boolean | undefined;
            allowSameApproverAcrossLevels?: boolean | undefined;
            requiredApprovers?: number | undefined;
        } | undefined;
        guards?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        }[] | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    stableKey: string;
    documentType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "stock_transfer" | "stock_adjustment" | "inventory_posting";
    version: number;
    initialState: string;
    states: {
        key: string;
        label: string;
        canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
        terminal: boolean;
    }[];
    transitions: {
        key: string;
        actionKey: string;
        from: string[];
        permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
        inputSchema: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve";
        guards: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        }[];
        branches: {
            to: string;
            effects: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args: Record<string, unknown>;
            }[];
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args: Record<string, unknown>;
            } | undefined;
        }[];
        approvalPolicy?: {
            allowRequesterApproval: boolean;
            allowSameApproverAcrossLevels: boolean;
            requiredApprovers: number;
        } | undefined;
    }[];
}, {
    stableKey: string;
    documentType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "stock_transfer" | "stock_adjustment" | "inventory_posting";
    version: number;
    initialState: string;
    states: {
        key: string;
        label: string;
        canonicalStatus: "DRAFT" | "PENDING_APPROVAL" | "APPROVED" | "RELEASED" | "CONFIRMED" | "ALLOCATED" | "PARTIAL" | "PARTIALLY_SHIPPED" | "SHIPPED" | "POSTED" | "CLOSED" | "CANCELLED" | "REVERSED";
        terminal?: boolean | undefined;
    }[];
    transitions?: {
        key: string;
        actionKey: string;
        from: string[];
        permission: "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.dispatch" | "sales.approve" | "purchase.approve" | "purchase.create" | "purchase.approve.level1" | "purchase.approve.level2" | "receipt.create" | "inventory.adjust" | "inventory.transfer" | "sales.create" | "sales.issue" | "production.mark_produced";
        branches: {
            to: string;
            when?: {
                key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
                args?: Record<string, unknown> | undefined;
            } | undefined;
            effects?: {
                key: "purchase.submit" | "purchase.record_approval" | "purchase.create_receipt" | "receipt.post" | "sales.confirm" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "sales.cancel" | "sales.submit" | "sales.approve" | "sales.mark_produced" | "sales.mark_dispatched" | "sales.complete" | "issue.post" | "issue.customer_return" | "transfer.dispatch" | "transfer.receive" | "adjustment.post" | "inventory.reverse" | "outbox.emit";
                args?: Record<string, unknown> | undefined;
            }[] | undefined;
        }[];
        inputSchema?: "purchase.create_receipt" | "sales.allocate" | "sales.create_issue" | "sales.produced" | "sales.dispatch" | "inventory.reverse" | "none" | "purchase.approve" | undefined;
        approvalPolicy?: {
            allowRequesterApproval?: boolean | undefined;
            allowSameApproverAcrossLevels?: boolean | undefined;
            requiredApprovers?: number | undefined;
        } | undefined;
        guards?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        }[] | undefined;
    }[] | undefined;
}>;
export declare const workflowNodeSchema: z.ZodObject<{
    key: z.ZodString;
    type: z.ZodEnum<["action", "approval", "branch", "wait_for_event", "complete"]>;
    actionKey: z.ZodOptional<z.ZodString>;
    eventType: z.ZodOptional<z.ZodString>;
    repeatable: z.ZodDefault<z.ZodBoolean>;
    inProgressStateKey: z.ZodOptional<z.ZodString>;
    completedStateKey: z.ZodOptional<z.ZodString>;
}, "strip", z.ZodTypeAny, {
    key: string;
    type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
    repeatable: boolean;
    actionKey?: string | undefined;
    eventType?: string | undefined;
    inProgressStateKey?: string | undefined;
    completedStateKey?: string | undefined;
}, {
    key: string;
    type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
    actionKey?: string | undefined;
    eventType?: string | undefined;
    repeatable?: boolean | undefined;
    inProgressStateKey?: string | undefined;
    completedStateKey?: string | undefined;
}>;
export declare const workflowEdgeSchema: z.ZodObject<{
    from: z.ZodString;
    to: z.ZodString;
    when: z.ZodOptional<z.ZodObject<{
        key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
        args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    }, "strip", z.ZodTypeAny, {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args: Record<string, unknown>;
    }, {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args?: Record<string, unknown> | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    to: string;
    from: string;
    when?: {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args: Record<string, unknown>;
    } | undefined;
}, {
    to: string;
    from: string;
    when?: {
        key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
        args?: Record<string, unknown> | undefined;
    } | undefined;
}>;
export declare const processWorkflowSchema: z.ZodObject<{
    stableKey: z.ZodString;
    version: z.ZodNumber;
    triggerEvent: z.ZodString;
    startNode: z.ZodString;
    nodes: z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        type: z.ZodEnum<["action", "approval", "branch", "wait_for_event", "complete"]>;
        actionKey: z.ZodOptional<z.ZodString>;
        eventType: z.ZodOptional<z.ZodString>;
        repeatable: z.ZodDefault<z.ZodBoolean>;
        inProgressStateKey: z.ZodOptional<z.ZodString>;
        completedStateKey: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
        repeatable: boolean;
        actionKey?: string | undefined;
        eventType?: string | undefined;
        inProgressStateKey?: string | undefined;
        completedStateKey?: string | undefined;
    }, {
        key: string;
        type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
        actionKey?: string | undefined;
        eventType?: string | undefined;
        repeatable?: boolean | undefined;
        inProgressStateKey?: string | undefined;
        completedStateKey?: string | undefined;
    }>, "many">;
    edges: z.ZodDefault<z.ZodArray<z.ZodObject<{
        from: z.ZodString;
        to: z.ZodString;
        when: z.ZodOptional<z.ZodObject<{
            key: z.ZodEnum<["always", "document.amount_gte", "document.fully_received", "document.fully_fulfilled", "transfer.is_interwarehouse", "approval.is_complete"]>;
            args: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        }, "strip", z.ZodTypeAny, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        }, {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        to: string;
        from: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        } | undefined;
    }, {
        to: string;
        from: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        } | undefined;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    stableKey: string;
    version: number;
    triggerEvent: string;
    startNode: string;
    nodes: {
        key: string;
        type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
        repeatable: boolean;
        actionKey?: string | undefined;
        eventType?: string | undefined;
        inProgressStateKey?: string | undefined;
        completedStateKey?: string | undefined;
    }[];
    edges: {
        to: string;
        from: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args: Record<string, unknown>;
        } | undefined;
    }[];
}, {
    stableKey: string;
    version: number;
    triggerEvent: string;
    startNode: string;
    nodes: {
        key: string;
        type: "action" | "approval" | "branch" | "wait_for_event" | "complete";
        actionKey?: string | undefined;
        eventType?: string | undefined;
        repeatable?: boolean | undefined;
        inProgressStateKey?: string | undefined;
        completedStateKey?: string | undefined;
    }[];
    edges?: {
        to: string;
        from: string;
        when?: {
            key: "always" | "document.amount_gte" | "document.fully_received" | "document.fully_fulfilled" | "transfer.is_interwarehouse" | "approval.is_complete";
            args?: Record<string, unknown> | undefined;
        } | undefined;
    }[] | undefined;
}>;
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

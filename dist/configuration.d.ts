import { z } from "zod";
export declare const measurementCategories: readonly ["mass", "length", "area", "volume", "count", "time", "temperature"];
export declare const propertyScopes: readonly ["product", "sku_forming", "sku_only", "lot", "serial", "handling_unit", "transaction"];
export declare const relationshipModes: readonly ["independent_actual", "fixed_conversion", "proportional_handling_unit", "actual_measurement", "handling_unit_state"];
export declare const uomSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<{
        mass: "mass";
        length: "length";
        area: "area";
        volume: "volume";
        count: "count";
        time: "time";
        temperature: "temperature";
    }>;
    standardToBaseFactor: z.ZodString;
}, z.core.$strip>;
export declare const propertySchema: z.ZodObject<{
    stableKey: z.ZodString;
    label: z.ZodString;
    entityType: z.ZodEnum<{
        purchase_order: "purchase_order";
        goods_receipt: "goods_receipt";
        sales_order: "sales_order";
        stock_issue: "stock_issue";
        product: "product";
        lot: "lot";
        handling_unit: "handling_unit";
        sku: "sku";
        party: "party";
        warehouse: "warehouse";
        location: "location";
        purchase_order_line: "purchase_order_line";
        goods_receipt_line: "goods_receipt_line";
        sales_order_line: "sales_order_line";
        transfer: "transfer";
        adjustment: "adjustment";
    }>;
    dataType: z.ZodEnum<{
        boolean: "boolean";
        date: "date";
        short_text: "short_text";
        long_text: "long_text";
        integer: "integer";
        decimal: "decimal";
        datetime: "datetime";
        single_select: "single_select";
        multi_select: "multi_select";
        entity_reference: "entity_reference";
        measurement: "measurement";
    }>;
    measurementCategory: z.ZodOptional<z.ZodEnum<{
        mass: "mass";
        length: "length";
        area: "area";
        volume: "volume";
        count: "count";
        time: "time";
        temperature: "temperature";
    }>>;
    appliesToPartyRoles: z.ZodOptional<z.ZodArray<z.ZodString>>;
    rules: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    reportable: z.ZodDefault<z.ZodBoolean>;
    active: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const dimensionSchema: z.ZodObject<{
    stableKey: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<{
        mass: "mass";
        length: "length";
        area: "area";
        volume: "volume";
        count: "count";
        time: "time";
        temperature: "temperature";
    }>;
    baseUomCode: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<{
        handling_unit_state: "handling_unit_state";
        availability_control: "availability_control";
        reservable: "reservable";
        informational: "informational";
        derived: "derived";
        pricing: "pricing";
    }>>;
    integerOnly: z.ZodDefault<z.ZodBoolean>;
    inputScale: z.ZodDefault<z.ZodNumber>;
    storageScale: z.ZodDefault<z.ZodNumber>;
    roundingMode: z.ZodDefault<z.ZodEnum<{
        HALF_UP: "HALF_UP";
        HALF_EVEN: "HALF_EVEN";
        DOWN: "DOWN";
        UP: "UP";
    }>>;
    relationship: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<{
            independent_actual: "independent_actual";
            fixed_conversion: "fixed_conversion";
            proportional_handling_unit: "proportional_handling_unit";
            actual_measurement: "actual_measurement";
            handling_unit_state: "handling_unit_state";
        }>;
        sourceDimensionKey: z.ZodOptional<z.ZodString>;
        factor: z.ZodOptional<z.ZodString>;
        actualRequired: z.ZodDefault<z.ZodBoolean>;
        tolerance: z.ZodOptional<z.ZodString>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const productTypeSchema: z.ZodObject<{
    stableKey: z.ZodString;
    name: z.ZodString;
    stocked: z.ZodDefault<z.ZodBoolean>;
    purchasable: z.ZodDefault<z.ZodBoolean>;
    sellable: z.ZodDefault<z.ZodBoolean>;
    consumable: z.ZodDefault<z.ZodBoolean>;
    producible: z.ZodDefault<z.ZodBoolean>;
    skuPattern: z.ZodOptional<z.ZodString>;
    trackingPolicy: z.ZodObject<{
        lot: z.ZodDefault<z.ZodBoolean>;
        serial: z.ZodDefault<z.ZodBoolean>;
        handlingUnit: z.ZodDefault<z.ZodBoolean>;
        expiry: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>;
    valuationMethod: z.ZodDefault<z.ZodEnum<{
        MOVING_AVERAGE: "MOVING_AVERAGE";
        FIFO: "FIFO";
    }>>;
    properties: z.ZodDefault<z.ZodArray<z.ZodObject<{
        propertyKey: z.ZodString;
        scope: z.ZodEnum<{
            product: "product";
            sku_forming: "sku_forming";
            sku_only: "sku_only";
            lot: "lot";
            serial: "serial";
            handling_unit: "handling_unit";
            transaction: "transaction";
        }>;
        required: z.ZodDefault<z.ZodBoolean>;
        skuAxisOrder: z.ZodOptional<z.ZodNumber>;
    }, z.core.$strip>>>;
    quantityDimensions: z.ZodArray<z.ZodObject<{
        stableKey: z.ZodString;
        name: z.ZodString;
        category: z.ZodEnum<{
            mass: "mass";
            length: "length";
            area: "area";
            volume: "volume";
            count: "count";
            time: "time";
            temperature: "temperature";
        }>;
        baseUomCode: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<{
            handling_unit_state: "handling_unit_state";
            availability_control: "availability_control";
            reservable: "reservable";
            informational: "informational";
            derived: "derived";
            pricing: "pricing";
        }>>;
        integerOnly: z.ZodDefault<z.ZodBoolean>;
        inputScale: z.ZodDefault<z.ZodNumber>;
        storageScale: z.ZodDefault<z.ZodNumber>;
        roundingMode: z.ZodDefault<z.ZodEnum<{
            HALF_UP: "HALF_UP";
            HALF_EVEN: "HALF_EVEN";
            DOWN: "DOWN";
            UP: "UP";
        }>>;
        relationship: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<{
                independent_actual: "independent_actual";
                fixed_conversion: "fixed_conversion";
                proportional_handling_unit: "proportional_handling_unit";
                actual_measurement: "actual_measurement";
                handling_unit_state: "handling_unit_state";
            }>;
            sourceDimensionKey: z.ZodOptional<z.ZodString>;
            factor: z.ZodOptional<z.ZodString>;
            actualRequired: z.ZodDefault<z.ZodBoolean>;
            tolerance: z.ZodOptional<z.ZodString>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare function assertSkuPatternValid(pattern?: string | null): string | null;
export declare const roleDefinitionSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString>>;
}, z.core.$strip>;
export declare const partyRoleSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
}, z.core.$strip>;
export declare const locationTypeSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    allowedParentTypes: z.ZodDefault<z.ZodArray<z.ZodString>>;
    stockEligible: z.ZodDefault<z.ZodBoolean>;
    allowsChildren: z.ZodDefault<z.ZodBoolean>;
}, z.core.$strip>;
export declare const inventoryConfigurationSchema: z.ZodDefault<z.ZodObject<{
    valuationCurrency: z.ZodDefault<z.ZodString>;
    allowedValuationMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<{
        MOVING_AVERAGE: "MOVING_AVERAGE";
        FIFO: "FIFO";
    }>>>;
    defaultValuationMethod: z.ZodDefault<z.ZodEnum<{
        MOVING_AVERAGE: "MOVING_AVERAGE";
        FIFO: "FIFO";
    }>>;
    requireExplicitForeignExchange: z.ZodDefault<z.ZodBoolean>;
    ownerPolicy: z.ZodDefault<z.ZodObject<{
        partyOwnership: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    reservationPolicy: z.ZodDefault<z.ZodObject<{
        firstClassApi: z.ZodDefault<z.ZodBoolean>;
        automaticExpiry: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    stockStatuses: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        available: z.ZodBoolean;
    }, z.core.$strip>>>;
}, z.core.$strip>>;
export declare const configurationDraftSchema: z.ZodObject<{
    formatVersion: z.ZodLiteral<2>;
    registryContractVersion: z.ZodLiteral<1>;
    template: z.ZodObject<{
        key: z.ZodString;
        version: z.ZodNumber;
    }, z.core.$strip>;
    terminology: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        singular: z.ZodString;
        plural: z.ZodString;
    }, z.core.$strip>>>;
    enabledModules: z.ZodArray<z.ZodEnum<{
        inventory: "inventory";
        sales: "sales";
        catalog: "catalog";
        warehousing: "warehousing";
        parties: "parties";
        procurement: "procurement";
        production: "production";
        replenishment: "replenishment";
        reporting: "reporting";
    }>>;
    roles: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString>>;
    }, z.core.$strip>>>;
    partyRoles: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
    }, z.core.$strip>>>;
    locationTypes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        allowedParentTypes: z.ZodDefault<z.ZodArray<z.ZodString>>;
        stockEligible: z.ZodDefault<z.ZodBoolean>;
        allowsChildren: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>>;
    inventory: z.ZodDefault<z.ZodObject<{
        valuationCurrency: z.ZodDefault<z.ZodString>;
        allowedValuationMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<{
            MOVING_AVERAGE: "MOVING_AVERAGE";
            FIFO: "FIFO";
        }>>>;
        defaultValuationMethod: z.ZodDefault<z.ZodEnum<{
            MOVING_AVERAGE: "MOVING_AVERAGE";
            FIFO: "FIFO";
        }>>;
        requireExplicitForeignExchange: z.ZodDefault<z.ZodBoolean>;
        ownerPolicy: z.ZodDefault<z.ZodObject<{
            partyOwnership: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>;
        reservationPolicy: z.ZodDefault<z.ZodObject<{
            firstClassApi: z.ZodDefault<z.ZodBoolean>;
            automaticExpiry: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>>;
        stockStatuses: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            available: z.ZodBoolean;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    sales: z.ZodDefault<z.ZodObject<{
        fulfilmentMode: z.ZodDefault<z.ZodEnum<{
            none: "none";
            inventory: "inventory";
        }>>;
        pricingPolicy: z.ZodDefault<z.ZodObject<{
            source: z.ZodDefault<z.ZodLiteral<"sku_price">>;
            allowSalesPriceOverride: z.ZodDefault<z.ZodBoolean>;
            maxOverridePercent: z.ZodDefault<z.ZodString>;
            overridePermission: z.ZodDefault<z.ZodString>;
            allowDiscount: z.ZodDefault<z.ZodBoolean>;
            maxDiscountPercent: z.ZodDefault<z.ZodString>;
            discountPermission: z.ZodDefault<z.ZodString>;
        }, z.core.$strip>>;
        taxMode: z.ZodDefault<z.ZodLiteral<"exclusive">>;
        taxRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            rate: z.ZodString;
            components: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                rate: z.ZodString;
            }, z.core.$strip>>;
        }, z.core.$strip>>>;
    }, z.core.$strip>>;
    uoms: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        category: z.ZodEnum<{
            mass: "mass";
            length: "length";
            area: "area";
            volume: "volume";
            count: "count";
            time: "time";
            temperature: "temperature";
        }>;
        standardToBaseFactor: z.ZodString;
    }, z.core.$strip>>;
    properties: z.ZodArray<z.ZodObject<{
        stableKey: z.ZodString;
        label: z.ZodString;
        entityType: z.ZodEnum<{
            purchase_order: "purchase_order";
            goods_receipt: "goods_receipt";
            sales_order: "sales_order";
            stock_issue: "stock_issue";
            product: "product";
            lot: "lot";
            handling_unit: "handling_unit";
            sku: "sku";
            party: "party";
            warehouse: "warehouse";
            location: "location";
            purchase_order_line: "purchase_order_line";
            goods_receipt_line: "goods_receipt_line";
            sales_order_line: "sales_order_line";
            transfer: "transfer";
            adjustment: "adjustment";
        }>;
        dataType: z.ZodEnum<{
            boolean: "boolean";
            date: "date";
            short_text: "short_text";
            long_text: "long_text";
            integer: "integer";
            decimal: "decimal";
            datetime: "datetime";
            single_select: "single_select";
            multi_select: "multi_select";
            entity_reference: "entity_reference";
            measurement: "measurement";
        }>;
        measurementCategory: z.ZodOptional<z.ZodEnum<{
            mass: "mass";
            length: "length";
            area: "area";
            volume: "volume";
            count: "count";
            time: "time";
            temperature: "temperature";
        }>>;
        appliesToPartyRoles: z.ZodOptional<z.ZodArray<z.ZodString>>;
        rules: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        reportable: z.ZodDefault<z.ZodBoolean>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, z.core.$strip>>;
    productTypes: z.ZodArray<z.ZodObject<{
        stableKey: z.ZodString;
        name: z.ZodString;
        stocked: z.ZodDefault<z.ZodBoolean>;
        purchasable: z.ZodDefault<z.ZodBoolean>;
        sellable: z.ZodDefault<z.ZodBoolean>;
        consumable: z.ZodDefault<z.ZodBoolean>;
        producible: z.ZodDefault<z.ZodBoolean>;
        skuPattern: z.ZodOptional<z.ZodString>;
        trackingPolicy: z.ZodObject<{
            lot: z.ZodDefault<z.ZodBoolean>;
            serial: z.ZodDefault<z.ZodBoolean>;
            handlingUnit: z.ZodDefault<z.ZodBoolean>;
            expiry: z.ZodDefault<z.ZodBoolean>;
        }, z.core.$strip>;
        valuationMethod: z.ZodDefault<z.ZodEnum<{
            MOVING_AVERAGE: "MOVING_AVERAGE";
            FIFO: "FIFO";
        }>>;
        properties: z.ZodDefault<z.ZodArray<z.ZodObject<{
            propertyKey: z.ZodString;
            scope: z.ZodEnum<{
                product: "product";
                sku_forming: "sku_forming";
                sku_only: "sku_only";
                lot: "lot";
                serial: "serial";
                handling_unit: "handling_unit";
                transaction: "transaction";
            }>;
            required: z.ZodDefault<z.ZodBoolean>;
            skuAxisOrder: z.ZodOptional<z.ZodNumber>;
        }, z.core.$strip>>>;
        quantityDimensions: z.ZodArray<z.ZodObject<{
            stableKey: z.ZodString;
            name: z.ZodString;
            category: z.ZodEnum<{
                mass: "mass";
                length: "length";
                area: "area";
                volume: "volume";
                count: "count";
                time: "time";
                temperature: "temperature";
            }>;
            baseUomCode: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<{
                handling_unit_state: "handling_unit_state";
                availability_control: "availability_control";
                reservable: "reservable";
                informational: "informational";
                derived: "derived";
                pricing: "pricing";
            }>>;
            integerOnly: z.ZodDefault<z.ZodBoolean>;
            inputScale: z.ZodDefault<z.ZodNumber>;
            storageScale: z.ZodDefault<z.ZodNumber>;
            roundingMode: z.ZodDefault<z.ZodEnum<{
                HALF_UP: "HALF_UP";
                HALF_EVEN: "HALF_EVEN";
                DOWN: "DOWN";
                UP: "UP";
            }>>;
            relationship: z.ZodOptional<z.ZodObject<{
                mode: z.ZodEnum<{
                    independent_actual: "independent_actual";
                    fixed_conversion: "fixed_conversion";
                    proportional_handling_unit: "proportional_handling_unit";
                    actual_measurement: "actual_measurement";
                    handling_unit_state: "handling_unit_state";
                }>;
                sourceDimensionKey: z.ZodOptional<z.ZodString>;
                factor: z.ZodOptional<z.ZodString>;
                actualRequired: z.ZodDefault<z.ZodBoolean>;
                tolerance: z.ZodOptional<z.ZodString>;
            }, z.core.$strip>>;
        }, z.core.$strip>>;
    }, z.core.$strip>>;
    lifecycles: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
    workflows: z.ZodArray<z.ZodObject<{
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
    }, z.core.$strip>>;
}, z.core.$strip>;
export type ConfigurationDraft = z.infer<typeof configurationDraftSchema>;
export type PartyRoleConfiguration = z.infer<typeof partyRoleSchema>;
export type ProductTypeConfiguration = z.infer<typeof productTypeSchema>;
export type QuantityDimensionConfiguration = z.infer<typeof dimensionSchema>;
export type LocationTypeConfiguration = z.infer<typeof locationTypeSchema>;
export interface CompiledConfiguration extends ConfigurationDraft {
    compiledAt: string;
    checksum: string;
    indexes: {
        productTypeByKey: Record<string, number>;
        propertyByKey: Record<string, number>;
        uomByCode: Record<string, number>;
        lifecycleByKey: Record<string, number>;
        workflowByKey: Record<string, number>;
    };
}

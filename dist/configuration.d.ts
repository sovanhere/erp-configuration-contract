import { z } from "zod";
/**
 * Single source of truth for the master-data / catalog configuration draft
 * contract. Ported verbatim from backend
 * src/modules/configuration/configuration-contract.ts.
 *
 * IMPORTANT: this file previously existed as a hand-duplicated copy in the
 * frontend (src/lib/template-types.ts). That duplication is what caused the
 * regex/enum drift documented in the Phase 0 audit (UOM code format, key
 * format, missing skuPattern/serial-dimension/property-count checks, and
 * untyped workflow condition/effect/permission strings). Both repos must
 * import from here going forward — do not re-declare these values locally.
 */
export declare const measurementCategories: readonly ["mass", "length", "area", "volume", "count", "time", "temperature"];
export declare const propertyScopes: readonly ["product", "sku_forming", "sku_only", "lot", "serial", "handling_unit", "transaction"];
export declare const relationshipModes: readonly ["independent_actual", "fixed_conversion", "proportional_handling_unit", "actual_measurement", "handling_unit_state"];
export declare const propertyEntityTypes: readonly ["product", "sku", "lot", "handling_unit", "party", "warehouse", "location", "purchase_order", "purchase_order_line", "goods_receipt", "goods_receipt_line", "sales_order", "sales_order_line", "stock_issue", "transfer", "adjustment"];
export declare const propertyDataTypes: readonly ["short_text", "long_text", "integer", "decimal", "boolean", "date", "datetime", "single_select", "multi_select", "entity_reference", "measurement"];
export declare const valuationMethods: readonly ["MOVING_AVERAGE", "FIFO"];
export declare const enabledModuleKeys: readonly ["catalog", "warehousing", "parties", "inventory", "procurement", "sales", "production", "replenishment", "reporting"];
/** Base config-entity key: property, product type, role, location type. NOT for UOM codes or workflow/lifecycle keys — those have their own formats below. */
export declare const key: z.ZodString;
export declare const decimalString: z.ZodString;
/** UOM codes are uppercase and must start with a letter — distinct from `key`. */
export declare const uomCode: z.ZodString;
export declare const uomSchema: z.ZodObject<{
    code: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>;
    standardToBaseFactor: z.ZodString;
}, "strip", z.ZodTypeAny, {
    code: string;
    name: string;
    category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
    standardToBaseFactor: string;
}, {
    code: string;
    name: string;
    category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
    standardToBaseFactor: string;
}>;
export declare const propertySchema: z.ZodObject<{
    stableKey: z.ZodString;
    label: z.ZodString;
    entityType: z.ZodEnum<["product", "sku", "lot", "handling_unit", "party", "warehouse", "location", "purchase_order", "purchase_order_line", "goods_receipt", "goods_receipt_line", "sales_order", "sales_order_line", "stock_issue", "transfer", "adjustment"]>;
    dataType: z.ZodEnum<["short_text", "long_text", "integer", "decimal", "boolean", "date", "datetime", "single_select", "multi_select", "entity_reference", "measurement"]>;
    measurementCategory: z.ZodOptional<z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>>;
    rules: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
    reportable: z.ZodDefault<z.ZodBoolean>;
    active: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    label: string;
    stableKey: string;
    entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
    dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
    rules: Record<string, unknown>;
    reportable: boolean;
    active: boolean;
    measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
}, {
    label: string;
    stableKey: string;
    entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
    dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
    measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
    rules?: Record<string, unknown> | undefined;
    reportable?: boolean | undefined;
    active?: boolean | undefined;
}>;
export declare const dimensionSchema: z.ZodObject<{
    stableKey: z.ZodString;
    name: z.ZodString;
    category: z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>;
    baseUomCode: z.ZodString;
    roles: z.ZodArray<z.ZodEnum<["availability_control", "reservable", "informational", "derived", "pricing", "handling_unit_state"]>, "many">;
    integerOnly: z.ZodDefault<z.ZodBoolean>;
    inputScale: z.ZodDefault<z.ZodNumber>;
    storageScale: z.ZodDefault<z.ZodNumber>;
    roundingMode: z.ZodDefault<z.ZodEnum<["HALF_UP", "HALF_EVEN", "DOWN", "UP"]>>;
    relationship: z.ZodOptional<z.ZodObject<{
        mode: z.ZodEnum<["independent_actual", "fixed_conversion", "proportional_handling_unit", "actual_measurement", "handling_unit_state"]>;
        sourceDimensionKey: z.ZodOptional<z.ZodString>;
        factor: z.ZodOptional<z.ZodString>;
        actualRequired: z.ZodDefault<z.ZodBoolean>;
        tolerance: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
        actualRequired: boolean;
        sourceDimensionKey?: string | undefined;
        factor?: string | undefined;
        tolerance?: string | undefined;
    }, {
        mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
        sourceDimensionKey?: string | undefined;
        factor?: string | undefined;
        actualRequired?: boolean | undefined;
        tolerance?: string | undefined;
    }>>;
}, "strip", z.ZodTypeAny, {
    stableKey: string;
    name: string;
    category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
    baseUomCode: string;
    roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
    integerOnly: boolean;
    inputScale: number;
    storageScale: number;
    roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
    relationship?: {
        mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
        actualRequired: boolean;
        sourceDimensionKey?: string | undefined;
        factor?: string | undefined;
        tolerance?: string | undefined;
    } | undefined;
}, {
    stableKey: string;
    name: string;
    category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
    baseUomCode: string;
    roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
    integerOnly?: boolean | undefined;
    inputScale?: number | undefined;
    storageScale?: number | undefined;
    roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
    relationship?: {
        mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
        sourceDimensionKey?: string | undefined;
        factor?: string | undefined;
        actualRequired?: boolean | undefined;
        tolerance?: string | undefined;
    } | undefined;
}>;
/** skuPattern must additionally compile as a valid regex — enforce with assertSkuPatternValid() below in code that can't rely on Zod's .refine alone (kept separate for clearer error codes matching the backend's sku_pattern_invalid). */
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
    }, "strip", z.ZodTypeAny, {
        lot: boolean;
        serial: boolean;
        handlingUnit: boolean;
        expiry: boolean;
    }, {
        lot?: boolean | undefined;
        serial?: boolean | undefined;
        handlingUnit?: boolean | undefined;
        expiry?: boolean | undefined;
    }>;
    valuationMethod: z.ZodDefault<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>>;
    properties: z.ZodDefault<z.ZodArray<z.ZodObject<{
        propertyKey: z.ZodString;
        scope: z.ZodEnum<["product", "sku_forming", "sku_only", "lot", "serial", "handling_unit", "transaction"]>;
        required: z.ZodDefault<z.ZodBoolean>;
        skuAxisOrder: z.ZodOptional<z.ZodNumber>;
    }, "strip", z.ZodTypeAny, {
        propertyKey: string;
        scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
        required: boolean;
        skuAxisOrder?: number | undefined;
    }, {
        propertyKey: string;
        scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
        required?: boolean | undefined;
        skuAxisOrder?: number | undefined;
    }>, "many">>;
    quantityDimensions: z.ZodArray<z.ZodObject<{
        stableKey: z.ZodString;
        name: z.ZodString;
        category: z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>;
        baseUomCode: z.ZodString;
        roles: z.ZodArray<z.ZodEnum<["availability_control", "reservable", "informational", "derived", "pricing", "handling_unit_state"]>, "many">;
        integerOnly: z.ZodDefault<z.ZodBoolean>;
        inputScale: z.ZodDefault<z.ZodNumber>;
        storageScale: z.ZodDefault<z.ZodNumber>;
        roundingMode: z.ZodDefault<z.ZodEnum<["HALF_UP", "HALF_EVEN", "DOWN", "UP"]>>;
        relationship: z.ZodOptional<z.ZodObject<{
            mode: z.ZodEnum<["independent_actual", "fixed_conversion", "proportional_handling_unit", "actual_measurement", "handling_unit_state"]>;
            sourceDimensionKey: z.ZodOptional<z.ZodString>;
            factor: z.ZodOptional<z.ZodString>;
            actualRequired: z.ZodDefault<z.ZodBoolean>;
            tolerance: z.ZodOptional<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            actualRequired: boolean;
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            tolerance?: string | undefined;
        }, {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            actualRequired?: boolean | undefined;
            tolerance?: string | undefined;
        }>>;
    }, "strip", z.ZodTypeAny, {
        stableKey: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        baseUomCode: string;
        roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
        integerOnly: boolean;
        inputScale: number;
        storageScale: number;
        roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
        relationship?: {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            actualRequired: boolean;
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            tolerance?: string | undefined;
        } | undefined;
    }, {
        stableKey: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        baseUomCode: string;
        roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
        integerOnly?: boolean | undefined;
        inputScale?: number | undefined;
        storageScale?: number | undefined;
        roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
        relationship?: {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            actualRequired?: boolean | undefined;
            tolerance?: string | undefined;
        } | undefined;
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    stableKey: string;
    name: string;
    stocked: boolean;
    purchasable: boolean;
    sellable: boolean;
    consumable: boolean;
    producible: boolean;
    trackingPolicy: {
        lot: boolean;
        serial: boolean;
        handlingUnit: boolean;
        expiry: boolean;
    };
    valuationMethod: "MOVING_AVERAGE" | "FIFO";
    properties: {
        propertyKey: string;
        scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
        required: boolean;
        skuAxisOrder?: number | undefined;
    }[];
    quantityDimensions: {
        stableKey: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        baseUomCode: string;
        roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
        integerOnly: boolean;
        inputScale: number;
        storageScale: number;
        roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
        relationship?: {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            actualRequired: boolean;
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            tolerance?: string | undefined;
        } | undefined;
    }[];
    skuPattern?: string | undefined;
}, {
    stableKey: string;
    name: string;
    trackingPolicy: {
        lot?: boolean | undefined;
        serial?: boolean | undefined;
        handlingUnit?: boolean | undefined;
        expiry?: boolean | undefined;
    };
    quantityDimensions: {
        stableKey: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        baseUomCode: string;
        roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
        integerOnly?: boolean | undefined;
        inputScale?: number | undefined;
        storageScale?: number | undefined;
        roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
        relationship?: {
            mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
            sourceDimensionKey?: string | undefined;
            factor?: string | undefined;
            actualRequired?: boolean | undefined;
            tolerance?: string | undefined;
        } | undefined;
    }[];
    stocked?: boolean | undefined;
    purchasable?: boolean | undefined;
    sellable?: boolean | undefined;
    consumable?: boolean | undefined;
    producible?: boolean | undefined;
    skuPattern?: string | undefined;
    valuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
    properties?: {
        propertyKey: string;
        scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
        required?: boolean | undefined;
        skuAxisOrder?: number | undefined;
    }[] | undefined;
}>;
export declare function assertSkuPatternValid(pattern: string | undefined): string | null;
export declare const roleDefinitionSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
}, "strip", z.ZodTypeAny, {
    key: string;
    label: string;
    permissions: string[];
}, {
    key: string;
    label: string;
    permissions?: string[] | undefined;
}>;
export declare const locationTypeSchema: z.ZodObject<{
    key: z.ZodString;
    label: z.ZodString;
    allowedParentTypes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    stockEligible: z.ZodDefault<z.ZodBoolean>;
    allowsChildren: z.ZodDefault<z.ZodBoolean>;
}, "strip", z.ZodTypeAny, {
    key: string;
    label: string;
    allowedParentTypes: string[];
    stockEligible: boolean;
    allowsChildren: boolean;
}, {
    key: string;
    label: string;
    allowedParentTypes?: string[] | undefined;
    stockEligible?: boolean | undefined;
    allowsChildren?: boolean | undefined;
}>;
export declare const defaultLocationTypes: ({
    key: string;
    label: string;
    allowedParentTypes: string[];
    stockEligible: true;
    allowsChildren: true;
} | {
    key: string;
    label: string;
    allowedParentTypes: string[];
    stockEligible: false;
    allowsChildren: true;
} | {
    key: string;
    label: string;
    allowedParentTypes: string[];
    stockEligible: true;
    allowsChildren: false;
})[];
export declare const inventoryConfigurationSchema: z.ZodDefault<z.ZodObject<{
    valuationCurrency: z.ZodDefault<z.ZodString>;
    allowedValuationMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>, "many">>;
    defaultValuationMethod: z.ZodDefault<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>>;
    requireExplicitForeignExchange: z.ZodDefault<z.ZodBoolean>;
    ownerPolicy: z.ZodDefault<z.ZodObject<{
        partyOwnership: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        partyOwnership: boolean;
    }, {
        partyOwnership?: boolean | undefined;
    }>>;
    reservationPolicy: z.ZodDefault<z.ZodObject<{
        firstClassApi: z.ZodDefault<z.ZodBoolean>;
        automaticExpiry: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        firstClassApi: boolean;
        automaticExpiry: boolean;
    }, {
        firstClassApi?: boolean | undefined;
        automaticExpiry?: boolean | undefined;
    }>>;
    stockStatuses: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        available: z.ZodBoolean;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        available: boolean;
    }, {
        key: string;
        label: string;
        available: boolean;
    }>, "many">>;
}, "strip", z.ZodTypeAny, {
    valuationCurrency: string;
    allowedValuationMethods: ("MOVING_AVERAGE" | "FIFO")[];
    defaultValuationMethod: "MOVING_AVERAGE" | "FIFO";
    requireExplicitForeignExchange: boolean;
    ownerPolicy: {
        partyOwnership: boolean;
    };
    reservationPolicy: {
        firstClassApi: boolean;
        automaticExpiry: boolean;
    };
    stockStatuses: {
        key: string;
        label: string;
        available: boolean;
    }[];
}, {
    valuationCurrency?: string | undefined;
    allowedValuationMethods?: ("MOVING_AVERAGE" | "FIFO")[] | undefined;
    defaultValuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
    requireExplicitForeignExchange?: boolean | undefined;
    ownerPolicy?: {
        partyOwnership?: boolean | undefined;
    } | undefined;
    reservationPolicy?: {
        firstClassApi?: boolean | undefined;
        automaticExpiry?: boolean | undefined;
    } | undefined;
    stockStatuses?: {
        key: string;
        label: string;
        available: boolean;
    }[] | undefined;
}>>;
export declare const configurationDraftSchema: z.ZodObject<{
    formatVersion: z.ZodLiteral<2>;
    registryContractVersion: z.ZodLiteral<1>;
    template: z.ZodObject<{
        key: z.ZodString;
        version: z.ZodNumber;
    }, "strip", z.ZodTypeAny, {
        key: string;
        version: number;
    }, {
        key: string;
        version: number;
    }>;
    terminology: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodObject<{
        singular: z.ZodString;
        plural: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        singular: string;
        plural: string;
    }, {
        singular: string;
        plural: string;
    }>>>;
    enabledModules: z.ZodArray<z.ZodEnum<["catalog", "warehousing", "parties", "inventory", "procurement", "sales", "production", "replenishment", "reporting"]>, "many">;
    roles: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        permissions: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        permissions: string[];
    }, {
        key: string;
        label: string;
        permissions?: string[] | undefined;
    }>, "many">>;
    locationTypes: z.ZodDefault<z.ZodArray<z.ZodObject<{
        key: z.ZodString;
        label: z.ZodString;
        allowedParentTypes: z.ZodDefault<z.ZodArray<z.ZodString, "many">>;
        stockEligible: z.ZodDefault<z.ZodBoolean>;
        allowsChildren: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        key: string;
        label: string;
        allowedParentTypes: string[];
        stockEligible: boolean;
        allowsChildren: boolean;
    }, {
        key: string;
        label: string;
        allowedParentTypes?: string[] | undefined;
        stockEligible?: boolean | undefined;
        allowsChildren?: boolean | undefined;
    }>, "many">>;
    inventory: z.ZodDefault<z.ZodObject<{
        valuationCurrency: z.ZodDefault<z.ZodString>;
        allowedValuationMethods: z.ZodDefault<z.ZodArray<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>, "many">>;
        defaultValuationMethod: z.ZodDefault<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>>;
        requireExplicitForeignExchange: z.ZodDefault<z.ZodBoolean>;
        ownerPolicy: z.ZodDefault<z.ZodObject<{
            partyOwnership: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            partyOwnership: boolean;
        }, {
            partyOwnership?: boolean | undefined;
        }>>;
        reservationPolicy: z.ZodDefault<z.ZodObject<{
            firstClassApi: z.ZodDefault<z.ZodBoolean>;
            automaticExpiry: z.ZodDefault<z.ZodBoolean>;
        }, "strip", z.ZodTypeAny, {
            firstClassApi: boolean;
            automaticExpiry: boolean;
        }, {
            firstClassApi?: boolean | undefined;
            automaticExpiry?: boolean | undefined;
        }>>;
        stockStatuses: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            available: z.ZodBoolean;
        }, "strip", z.ZodTypeAny, {
            key: string;
            label: string;
            available: boolean;
        }, {
            key: string;
            label: string;
            available: boolean;
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        valuationCurrency: string;
        allowedValuationMethods: ("MOVING_AVERAGE" | "FIFO")[];
        defaultValuationMethod: "MOVING_AVERAGE" | "FIFO";
        requireExplicitForeignExchange: boolean;
        ownerPolicy: {
            partyOwnership: boolean;
        };
        reservationPolicy: {
            firstClassApi: boolean;
            automaticExpiry: boolean;
        };
        stockStatuses: {
            key: string;
            label: string;
            available: boolean;
        }[];
    }, {
        valuationCurrency?: string | undefined;
        allowedValuationMethods?: ("MOVING_AVERAGE" | "FIFO")[] | undefined;
        defaultValuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
        requireExplicitForeignExchange?: boolean | undefined;
        ownerPolicy?: {
            partyOwnership?: boolean | undefined;
        } | undefined;
        reservationPolicy?: {
            firstClassApi?: boolean | undefined;
            automaticExpiry?: boolean | undefined;
        } | undefined;
        stockStatuses?: {
            key: string;
            label: string;
            available: boolean;
        }[] | undefined;
    }>>;
    sales: z.ZodDefault<z.ZodObject<{
        fulfilmentMode: z.ZodDefault<z.ZodEnum<["none", "inventory"]>>;
        pricingPolicy: z.ZodDefault<z.ZodObject<{
            source: z.ZodDefault<z.ZodLiteral<"sku_price">>;
            allowSalesPriceOverride: z.ZodDefault<z.ZodBoolean>;
            maxOverridePercent: z.ZodDefault<z.ZodString>;
            overridePermission: z.ZodDefault<z.ZodString>;
            allowDiscount: z.ZodDefault<z.ZodBoolean>;
            maxDiscountPercent: z.ZodDefault<z.ZodString>;
            discountPermission: z.ZodDefault<z.ZodString>;
        }, "strip", z.ZodTypeAny, {
            source: "sku_price";
            allowSalesPriceOverride: boolean;
            maxOverridePercent: string;
            overridePermission: string;
            allowDiscount: boolean;
            maxDiscountPercent: string;
            discountPermission: string;
        }, {
            source?: "sku_price" | undefined;
            allowSalesPriceOverride?: boolean | undefined;
            maxOverridePercent?: string | undefined;
            overridePermission?: string | undefined;
            allowDiscount?: boolean | undefined;
            maxDiscountPercent?: string | undefined;
            discountPermission?: string | undefined;
        }>>;
        taxMode: z.ZodDefault<z.ZodLiteral<"exclusive">>;
        taxRules: z.ZodDefault<z.ZodArray<z.ZodObject<{
            key: z.ZodString;
            label: z.ZodString;
            rate: z.ZodString;
            components: z.ZodArray<z.ZodObject<{
                key: z.ZodString;
                rate: z.ZodString;
            }, "strip", z.ZodTypeAny, {
                key: string;
                rate: string;
            }, {
                key: string;
                rate: string;
            }>, "many">;
        }, "strip", z.ZodTypeAny, {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }, {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }>, "many">>;
    }, "strip", z.ZodTypeAny, {
        fulfilmentMode: "none" | "inventory";
        pricingPolicy: {
            source: "sku_price";
            allowSalesPriceOverride: boolean;
            maxOverridePercent: string;
            overridePermission: string;
            allowDiscount: boolean;
            maxDiscountPercent: string;
            discountPermission: string;
        };
        taxMode: "exclusive";
        taxRules: {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }[];
    }, {
        fulfilmentMode?: "none" | "inventory" | undefined;
        pricingPolicy?: {
            source?: "sku_price" | undefined;
            allowSalesPriceOverride?: boolean | undefined;
            maxOverridePercent?: string | undefined;
            overridePermission?: string | undefined;
            allowDiscount?: boolean | undefined;
            maxDiscountPercent?: string | undefined;
            discountPermission?: string | undefined;
        } | undefined;
        taxMode?: "exclusive" | undefined;
        taxRules?: {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }[] | undefined;
    }>>;
    uoms: z.ZodArray<z.ZodObject<{
        code: z.ZodString;
        name: z.ZodString;
        category: z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>;
        standardToBaseFactor: z.ZodString;
    }, "strip", z.ZodTypeAny, {
        code: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        standardToBaseFactor: string;
    }, {
        code: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        standardToBaseFactor: string;
    }>, "many">;
    properties: z.ZodArray<z.ZodObject<{
        stableKey: z.ZodString;
        label: z.ZodString;
        entityType: z.ZodEnum<["product", "sku", "lot", "handling_unit", "party", "warehouse", "location", "purchase_order", "purchase_order_line", "goods_receipt", "goods_receipt_line", "sales_order", "sales_order_line", "stock_issue", "transfer", "adjustment"]>;
        dataType: z.ZodEnum<["short_text", "long_text", "integer", "decimal", "boolean", "date", "datetime", "single_select", "multi_select", "entity_reference", "measurement"]>;
        measurementCategory: z.ZodOptional<z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>>;
        rules: z.ZodDefault<z.ZodRecord<z.ZodString, z.ZodUnknown>>;
        reportable: z.ZodDefault<z.ZodBoolean>;
        active: z.ZodDefault<z.ZodBoolean>;
    }, "strip", z.ZodTypeAny, {
        label: string;
        stableKey: string;
        entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
        dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
        rules: Record<string, unknown>;
        reportable: boolean;
        active: boolean;
        measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
    }, {
        label: string;
        stableKey: string;
        entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
        dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
        measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
        rules?: Record<string, unknown> | undefined;
        reportable?: boolean | undefined;
        active?: boolean | undefined;
    }>, "many">;
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
        }, "strip", z.ZodTypeAny, {
            lot: boolean;
            serial: boolean;
            handlingUnit: boolean;
            expiry: boolean;
        }, {
            lot?: boolean | undefined;
            serial?: boolean | undefined;
            handlingUnit?: boolean | undefined;
            expiry?: boolean | undefined;
        }>;
        valuationMethod: z.ZodDefault<z.ZodEnum<["MOVING_AVERAGE", "FIFO"]>>;
        properties: z.ZodDefault<z.ZodArray<z.ZodObject<{
            propertyKey: z.ZodString;
            scope: z.ZodEnum<["product", "sku_forming", "sku_only", "lot", "serial", "handling_unit", "transaction"]>;
            required: z.ZodDefault<z.ZodBoolean>;
            skuAxisOrder: z.ZodOptional<z.ZodNumber>;
        }, "strip", z.ZodTypeAny, {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required: boolean;
            skuAxisOrder?: number | undefined;
        }, {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required?: boolean | undefined;
            skuAxisOrder?: number | undefined;
        }>, "many">>;
        quantityDimensions: z.ZodArray<z.ZodObject<{
            stableKey: z.ZodString;
            name: z.ZodString;
            category: z.ZodEnum<["mass", "length", "area", "volume", "count", "time", "temperature"]>;
            baseUomCode: z.ZodString;
            roles: z.ZodArray<z.ZodEnum<["availability_control", "reservable", "informational", "derived", "pricing", "handling_unit_state"]>, "many">;
            integerOnly: z.ZodDefault<z.ZodBoolean>;
            inputScale: z.ZodDefault<z.ZodNumber>;
            storageScale: z.ZodDefault<z.ZodNumber>;
            roundingMode: z.ZodDefault<z.ZodEnum<["HALF_UP", "HALF_EVEN", "DOWN", "UP"]>>;
            relationship: z.ZodOptional<z.ZodObject<{
                mode: z.ZodEnum<["independent_actual", "fixed_conversion", "proportional_handling_unit", "actual_measurement", "handling_unit_state"]>;
                sourceDimensionKey: z.ZodOptional<z.ZodString>;
                factor: z.ZodOptional<z.ZodString>;
                actualRequired: z.ZodDefault<z.ZodBoolean>;
                tolerance: z.ZodOptional<z.ZodString>;
            }, "strip", z.ZodTypeAny, {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                actualRequired: boolean;
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                tolerance?: string | undefined;
            }, {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                actualRequired?: boolean | undefined;
                tolerance?: string | undefined;
            }>>;
        }, "strip", z.ZodTypeAny, {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly: boolean;
            inputScale: number;
            storageScale: number;
            roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                actualRequired: boolean;
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }, {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly?: boolean | undefined;
            inputScale?: number | undefined;
            storageScale?: number | undefined;
            roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                actualRequired?: boolean | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }>, "many">;
    }, "strip", z.ZodTypeAny, {
        stableKey: string;
        name: string;
        stocked: boolean;
        purchasable: boolean;
        sellable: boolean;
        consumable: boolean;
        producible: boolean;
        trackingPolicy: {
            lot: boolean;
            serial: boolean;
            handlingUnit: boolean;
            expiry: boolean;
        };
        valuationMethod: "MOVING_AVERAGE" | "FIFO";
        properties: {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required: boolean;
            skuAxisOrder?: number | undefined;
        }[];
        quantityDimensions: {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly: boolean;
            inputScale: number;
            storageScale: number;
            roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                actualRequired: boolean;
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }[];
        skuPattern?: string | undefined;
    }, {
        stableKey: string;
        name: string;
        trackingPolicy: {
            lot?: boolean | undefined;
            serial?: boolean | undefined;
            handlingUnit?: boolean | undefined;
            expiry?: boolean | undefined;
        };
        quantityDimensions: {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly?: boolean | undefined;
            inputScale?: number | undefined;
            storageScale?: number | undefined;
            roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                actualRequired?: boolean | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }[];
        stocked?: boolean | undefined;
        purchasable?: boolean | undefined;
        sellable?: boolean | undefined;
        consumable?: boolean | undefined;
        producible?: boolean | undefined;
        skuPattern?: string | undefined;
        valuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
        properties?: {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required?: boolean | undefined;
            skuAxisOrder?: number | undefined;
        }[] | undefined;
    }>, "many">;
    lifecycles: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
    workflows: z.ZodArray<z.ZodObject<{
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
    }>, "many">;
}, "strip", z.ZodTypeAny, {
    inventory: {
        valuationCurrency: string;
        allowedValuationMethods: ("MOVING_AVERAGE" | "FIFO")[];
        defaultValuationMethod: "MOVING_AVERAGE" | "FIFO";
        requireExplicitForeignExchange: boolean;
        ownerPolicy: {
            partyOwnership: boolean;
        };
        reservationPolicy: {
            firstClassApi: boolean;
            automaticExpiry: boolean;
        };
        stockStatuses: {
            key: string;
            label: string;
            available: boolean;
        }[];
    };
    sales: {
        fulfilmentMode: "none" | "inventory";
        pricingPolicy: {
            source: "sku_price";
            allowSalesPriceOverride: boolean;
            maxOverridePercent: string;
            overridePermission: string;
            allowDiscount: boolean;
            maxDiscountPercent: string;
            discountPermission: string;
        };
        taxMode: "exclusive";
        taxRules: {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }[];
    };
    roles: {
        key: string;
        label: string;
        permissions: string[];
    }[];
    properties: {
        label: string;
        stableKey: string;
        entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
        dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
        rules: Record<string, unknown>;
        reportable: boolean;
        active: boolean;
        measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
    }[];
    formatVersion: 2;
    registryContractVersion: 1;
    template: {
        key: string;
        version: number;
    };
    terminology: Record<string, {
        singular: string;
        plural: string;
    }>;
    enabledModules: ("catalog" | "warehousing" | "parties" | "inventory" | "procurement" | "sales" | "production" | "replenishment" | "reporting")[];
    locationTypes: {
        key: string;
        label: string;
        allowedParentTypes: string[];
        stockEligible: boolean;
        allowsChildren: boolean;
    }[];
    uoms: {
        code: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        standardToBaseFactor: string;
    }[];
    productTypes: {
        stableKey: string;
        name: string;
        stocked: boolean;
        purchasable: boolean;
        sellable: boolean;
        consumable: boolean;
        producible: boolean;
        trackingPolicy: {
            lot: boolean;
            serial: boolean;
            handlingUnit: boolean;
            expiry: boolean;
        };
        valuationMethod: "MOVING_AVERAGE" | "FIFO";
        properties: {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required: boolean;
            skuAxisOrder?: number | undefined;
        }[];
        quantityDimensions: {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly: boolean;
            inputScale: number;
            storageScale: number;
            roundingMode: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP";
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                actualRequired: boolean;
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }[];
        skuPattern?: string | undefined;
    }[];
    lifecycles: {
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
    }[];
    workflows: {
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
    }[];
}, {
    properties: {
        label: string;
        stableKey: string;
        entityType: "purchase_order" | "goods_receipt" | "sales_order" | "stock_issue" | "product" | "lot" | "handling_unit" | "sku" | "party" | "warehouse" | "location" | "purchase_order_line" | "goods_receipt_line" | "sales_order_line" | "transfer" | "adjustment";
        dataType: "boolean" | "integer" | "date" | "short_text" | "long_text" | "decimal" | "datetime" | "single_select" | "multi_select" | "entity_reference" | "measurement";
        measurementCategory?: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature" | undefined;
        rules?: Record<string, unknown> | undefined;
        reportable?: boolean | undefined;
        active?: boolean | undefined;
    }[];
    formatVersion: 2;
    registryContractVersion: 1;
    template: {
        key: string;
        version: number;
    };
    enabledModules: ("catalog" | "warehousing" | "parties" | "inventory" | "procurement" | "sales" | "production" | "replenishment" | "reporting")[];
    uoms: {
        code: string;
        name: string;
        category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
        standardToBaseFactor: string;
    }[];
    productTypes: {
        stableKey: string;
        name: string;
        trackingPolicy: {
            lot?: boolean | undefined;
            serial?: boolean | undefined;
            handlingUnit?: boolean | undefined;
            expiry?: boolean | undefined;
        };
        quantityDimensions: {
            stableKey: string;
            name: string;
            category: "length" | "mass" | "area" | "volume" | "count" | "time" | "temperature";
            baseUomCode: string;
            roles: ("handling_unit_state" | "availability_control" | "reservable" | "informational" | "derived" | "pricing")[];
            integerOnly?: boolean | undefined;
            inputScale?: number | undefined;
            storageScale?: number | undefined;
            roundingMode?: "HALF_UP" | "HALF_EVEN" | "DOWN" | "UP" | undefined;
            relationship?: {
                mode: "independent_actual" | "fixed_conversion" | "proportional_handling_unit" | "actual_measurement" | "handling_unit_state";
                sourceDimensionKey?: string | undefined;
                factor?: string | undefined;
                actualRequired?: boolean | undefined;
                tolerance?: string | undefined;
            } | undefined;
        }[];
        stocked?: boolean | undefined;
        purchasable?: boolean | undefined;
        sellable?: boolean | undefined;
        consumable?: boolean | undefined;
        producible?: boolean | undefined;
        skuPattern?: string | undefined;
        valuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
        properties?: {
            propertyKey: string;
            scope: "product" | "sku_forming" | "sku_only" | "lot" | "serial" | "handling_unit" | "transaction";
            required?: boolean | undefined;
            skuAxisOrder?: number | undefined;
        }[] | undefined;
    }[];
    lifecycles: {
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
    }[];
    workflows: {
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
    }[];
    inventory?: {
        valuationCurrency?: string | undefined;
        allowedValuationMethods?: ("MOVING_AVERAGE" | "FIFO")[] | undefined;
        defaultValuationMethod?: "MOVING_AVERAGE" | "FIFO" | undefined;
        requireExplicitForeignExchange?: boolean | undefined;
        ownerPolicy?: {
            partyOwnership?: boolean | undefined;
        } | undefined;
        reservationPolicy?: {
            firstClassApi?: boolean | undefined;
            automaticExpiry?: boolean | undefined;
        } | undefined;
        stockStatuses?: {
            key: string;
            label: string;
            available: boolean;
        }[] | undefined;
    } | undefined;
    sales?: {
        fulfilmentMode?: "none" | "inventory" | undefined;
        pricingPolicy?: {
            source?: "sku_price" | undefined;
            allowSalesPriceOverride?: boolean | undefined;
            maxOverridePercent?: string | undefined;
            overridePermission?: string | undefined;
            allowDiscount?: boolean | undefined;
            maxDiscountPercent?: string | undefined;
            discountPermission?: string | undefined;
        } | undefined;
        taxMode?: "exclusive" | undefined;
        taxRules?: {
            key: string;
            label: string;
            rate: string;
            components: {
                key: string;
                rate: string;
            }[];
        }[] | undefined;
    } | undefined;
    roles?: {
        key: string;
        label: string;
        permissions?: string[] | undefined;
    }[] | undefined;
    terminology?: Record<string, {
        singular: string;
        plural: string;
    }> | undefined;
    locationTypes?: {
        key: string;
        label: string;
        allowedParentTypes?: string[] | undefined;
        stockEligible?: boolean | undefined;
        allowsChildren?: boolean | undefined;
    }[] | undefined;
}>;
export type ConfigurationDraft = z.infer<typeof configurationDraftSchema>;
export type UnitOfMeasure = z.infer<typeof uomSchema>;
export type PropertyDefinition = z.infer<typeof propertySchema>;
export type ProductType = z.infer<typeof productTypeSchema>;
export type QuantityDimension = z.infer<typeof dimensionSchema>;
export type RoleDefinition = z.infer<typeof roleDefinitionSchema>;
export type LocationType = z.infer<typeof locationTypeSchema>;
export type InventoryConfiguration = z.infer<typeof inventoryConfigurationSchema>;
export type MeasurementCategory = (typeof measurementCategories)[number];
export type PropertyScope = (typeof propertyScopes)[number];
export type PropertyEntityType = (typeof propertyEntityTypes)[number];
export type PropertyDataType = (typeof propertyDataTypes)[number];
export type ValuationMethod = (typeof valuationMethods)[number];
export type ModuleKey = (typeof enabledModuleKeys)[number];

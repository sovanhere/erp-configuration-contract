import { z } from "zod";
import { lifecycleDefinitionSchema, processWorkflowSchema } from "./workflow.js";
export const measurementCategories = ["mass", "length", "area", "volume", "count", "time", "temperature"];
export const propertyScopes = ["product", "sku_forming", "sku_only", "lot", "serial", "handling_unit", "transaction"];
export const relationshipModes = [
    "independent_actual",
    "fixed_conversion",
    "proportional_handling_unit",
    "actual_measurement",
    "handling_unit_state"
];
const key = z.string().regex(/^[a-z][a-z0-9_]{1,127}$/);
const decimalString = z.string().regex(/^-?(?:0|[1-9]\d*)(?:\.\d+)?$/);
export const uomSchema = z.object({
    code: z.string().regex(/^[A-Z][A-Z0-9_]{0,31}$/),
    name: z.string().min(1).max(100),
    category: z.enum(measurementCategories),
    standardToBaseFactor: decimalString
});
export const propertySchema = z.object({
    stableKey: key,
    label: z.string().min(1).max(200),
    entityType: z.enum([
        "product",
        "sku",
        "lot",
        "handling_unit",
        "party",
        "warehouse",
        "location",
        "purchase_order",
        "purchase_order_line",
        "goods_receipt",
        "goods_receipt_line",
        "sales_order",
        "sales_order_line",
        "stock_issue",
        "transfer",
        "adjustment"
    ]),
    dataType: z.enum(["short_text", "long_text", "integer", "decimal", "boolean", "date", "datetime", "single_select", "multi_select", "entity_reference", "measurement"]),
    measurementCategory: z.enum(measurementCategories).optional(),
    rules: z.record(z.string(), z.unknown()).default({}),
    reportable: z.boolean().default(false),
    active: z.boolean().default(true)
});
const relationshipSchema = z.object({
    mode: z.enum(relationshipModes),
    sourceDimensionKey: key.optional(),
    factor: decimalString.optional(),
    actualRequired: z.boolean().default(false),
    tolerance: decimalString.optional()
});
export const dimensionSchema = z.object({
    stableKey: key,
    name: z.string().min(1).max(160),
    category: z.enum(measurementCategories),
    baseUomCode: z.string().min(1).max(32),
    roles: z.array(z.enum(["availability_control", "reservable", "informational", "derived", "pricing", "handling_unit_state"])).min(1),
    integerOnly: z.boolean().default(false),
    inputScale: z.number().int().min(0).max(12).default(6),
    storageScale: z.number().int().min(0).max(12).default(12),
    roundingMode: z.enum(["HALF_UP", "HALF_EVEN", "DOWN", "UP"]).default("HALF_UP"),
    relationship: relationshipSchema.optional()
});
const propertyAssignmentSchema = z.object({
    propertyKey: key,
    scope: z.enum(propertyScopes),
    required: z.boolean().default(false),
    skuAxisOrder: z.number().int().min(1).optional()
});
export const productTypeSchema = z.object({
    stableKey: key,
    name: z.string().min(1).max(200),
    stocked: z.boolean().default(true),
    purchasable: z.boolean().default(false),
    sellable: z.boolean().default(false),
    consumable: z.boolean().default(false),
    producible: z.boolean().default(false),
    skuPattern: z.string().max(512).optional(),
    trackingPolicy: z.object({
        lot: z.boolean().default(false),
        serial: z.boolean().default(false),
        handlingUnit: z.boolean().default(false),
        expiry: z.boolean().default(false)
    }),
    valuationMethod: z.enum(["MOVING_AVERAGE", "FIFO"]).default("MOVING_AVERAGE"),
    properties: z.array(propertyAssignmentSchema).default([]),
    quantityDimensions: z.array(dimensionSchema).min(1)
});
export function assertSkuPatternValid(pattern) {
    if (!pattern)
        return null;
    try {
        new RegExp(pattern, "u");
        return null;
    }
    catch {
        return "sku_pattern_invalid";
    }
}
export const roleDefinitionSchema = z.object({
    key,
    label: z.string().min(1).max(160),
    permissions: z.array(z.string().min(1).max(160)).default([])
});
export const locationTypeSchema = z.object({
    key,
    label: z.string().min(1).max(160),
    allowedParentTypes: z.array(key).default([]),
    stockEligible: z.boolean().default(false),
    allowsChildren: z.boolean().default(false)
});
const defaultLocationTypes = [
    { key: "warehouse", label: "Warehouse", allowedParentTypes: [], stockEligible: false, allowsChildren: true },
    { key: "default", label: "Default Location", allowedParentTypes: ["warehouse"], stockEligible: true, allowsChildren: true },
    { key: "zone", label: "Zone", allowedParentTypes: ["warehouse", "default"], stockEligible: false, allowsChildren: true },
    { key: "bin", label: "Bin", allowedParentTypes: ["warehouse", "default", "zone"], stockEligible: true, allowsChildren: false },
    { key: "virtual", label: "Virtual Location", allowedParentTypes: ["warehouse"], stockEligible: true, allowsChildren: false }
];
const salesConfigurationSchema = z.object({
    fulfilmentMode: z.enum(["none", "inventory"]).default("inventory"),
    pricingPolicy: z.object({
        source: z.literal("sku_price").default("sku_price"),
        allowSalesPriceOverride: z.boolean().default(false),
        maxOverridePercent: decimalString.default("0"),
        overridePermission: z.string().default("sales.price.override"),
        allowDiscount: z.boolean().default(false),
        maxDiscountPercent: decimalString.default("0"),
        discountPermission: z.string().default("sales.discount.approve")
    }).default({ source: "sku_price", allowSalesPriceOverride: false, maxOverridePercent: "0", overridePermission: "sales.price.override", allowDiscount: false, maxDiscountPercent: "0", discountPermission: "sales.discount.approve" }),
    taxMode: z.literal("exclusive").default("exclusive"),
    taxRules: z.array(z.object({
        key,
        label: z.string().min(1).max(160),
        rate: decimalString,
        components: z.array(z.object({ key, rate: decimalString })).min(1)
    })).default([])
}).default({ fulfilmentMode: "inventory", pricingPolicy: { source: "sku_price", allowSalesPriceOverride: false, maxOverridePercent: "0", overridePermission: "sales.price.override", allowDiscount: false, maxDiscountPercent: "0", discountPermission: "sales.discount.approve" }, taxMode: "exclusive", taxRules: [] });
export const inventoryConfigurationSchema = z.object({
    valuationCurrency: z.string().regex(/^[A-Z]{3}$/).default("USD"),
    allowedValuationMethods: z.array(z.enum(["MOVING_AVERAGE", "FIFO"])).min(1).default(["MOVING_AVERAGE", "FIFO"]),
    defaultValuationMethod: z.enum(["MOVING_AVERAGE", "FIFO"]).default("MOVING_AVERAGE"),
    requireExplicitForeignExchange: z.boolean().default(true),
    ownerPolicy: z.object({ partyOwnership: z.boolean().default(true) }).default({ partyOwnership: true }),
    reservationPolicy: z.object({ firstClassApi: z.boolean().default(true), automaticExpiry: z.boolean().default(false) }).default({ firstClassApi: true, automaticExpiry: false }),
    stockStatuses: z.array(z.object({ key, label: z.string().min(1).max(160), available: z.boolean() })).min(2).default([
        { key: "available", label: "Available", available: true },
        { key: "in_transit", label: "In transit", available: false },
        { key: "on_hold", label: "On hold", available: false }
    ])
}).default({
    valuationCurrency: "USD", allowedValuationMethods: ["MOVING_AVERAGE", "FIFO"], defaultValuationMethod: "MOVING_AVERAGE",
    requireExplicitForeignExchange: true, ownerPolicy: { partyOwnership: true },
    reservationPolicy: { firstClassApi: true, automaticExpiry: false },
    stockStatuses: [{ key: "available", label: "Available", available: true }, { key: "in_transit", label: "In transit", available: false }, { key: "on_hold", label: "On hold", available: false }]
});
export const configurationDraftSchema = z.object({
    formatVersion: z.literal(2),
    registryContractVersion: z.literal(1),
    template: z.object({ key, version: z.number().int().positive() }),
    terminology: z.record(z.string(), z.object({ singular: z.string(), plural: z.string() })).default({}),
    enabledModules: z.array(z.enum(["catalog", "warehousing", "parties", "inventory", "procurement", "sales", "production", "replenishment", "reporting"])),
    roles: z.array(roleDefinitionSchema).default([]),
    locationTypes: z.array(locationTypeSchema).min(2).default([...defaultLocationTypes]),
    inventory: inventoryConfigurationSchema,
    sales: salesConfigurationSchema,
    uoms: z.array(uomSchema),
    properties: z.array(propertySchema),
    productTypes: z.array(productTypeSchema),
    lifecycles: z.array(lifecycleDefinitionSchema),
    workflows: z.array(processWorkflowSchema)
});
// sync-pipeline verification #1

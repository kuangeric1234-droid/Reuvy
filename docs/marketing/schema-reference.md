# Ruevii — data-model reference (real tables, columns & naming)

_Authored 2026-06-02. This is the **exact** schema behind the features. Column names and enum values here are literal; copy them verbatim when building product-UI mockups for the marketing site._

---

## Universal naming rules (memorise — they trip everyone up)

| Rule | Detail |
|---|---|
| **Money is integer cents** | Every money column ends `_cents` and is an `integer` (e.g. `total_cents`, `price_cents`, `amount_cents`). **Exceptions:** `services.price`, `products.retail_price`/`our_cost` are in **dollars** (legacy). GST is inclusive: `gst_cents = round(total_cents / 11)`. |
| **Clients PK is `client_uuid`** | NOT `id`. Every FK to a client is `client_uuid`. Never `.eq('id', …)` on clients. `client_code` (e.g. `DEMO-001`) is a human-facing code, auto-assigned by trigger. |
| **`clinic_id` everywhere** | Every tenant table has `clinic_id uuid NOT NULL`. It's the tenant boundary + RLS key. |
| **Timestamps are ISO strings** | `created_at`, `updated_at`, `*_at` are `timestamptz` → serialized as ISO strings in TS. |
| **Enums are SCREAMING_SNAKE** | Status/type values are uppercase string literals (`COMPLETED`, `NOT_BOOKED`), not numbers. |
| **`properties jsonb`** | Clients & leads carry a free-form `properties: Record<string,string>` (form-derived + custom fields), key = snake_case label. |

---

## Clients — table `clients` (PK `client_uuid`)

```
client_uuid (PK) · client_code · full_name · phone · email
division · category_id · status · notes · staff_alert
date_of_birth · gender · referral_source · address_line1 · suburb · postcode · state
preferred_availability (jsonb) · properties (jsonb)
lifecycle_stage · last_treatment_at · inactive_due_at
stripe_customer_id · xero_contact_id
ai_summary_text · ai_summary_generated_at · assigned_staff_id · auth_user_id
clinic_id · created_at · updated_at
```
- **status** (`ClientStatus`): `ACTIVE` · `INACTIVE` · `COMPLETED`
- **division** (`Division`): `SKIN` · `DMD`
- **gender** (`ClientGender`): `FEMALE` · `MALE` · `NON_BINARY` · `PREFER_NOT_TO_SAY`
- **referral_source**: `WALK_IN` · `FRIEND_REFERRAL` · `INSTAGRAM` · `GOOGLE` · `OTHER`
- **state** (`AustralianState`): `VIC NSW QLD SA WA TAS ACT NT`

---

## Leads — table `leads` (PK `id`)

```
id (PK) · source · full_name · phone · email · lead_date
concerns · status · appointment_date · assigned_staff_id
ai_score · ai_score_tier · ai_score_reasoning · ai_next_action · ai_scored_at
division · category_id · skin_concerns (text[]) · last_contacted_at
properties (jsonb) · client_uuid · clinic_id · created_at · updated_at
```
- **status** (`LeadStatus`): `NOT_BOOKED` · `OFFERED` · `BOOKED` · `CLOG_SET` · `CONSULT_PURCHASED` · `COMPLETED` · `CANCELLED` · `EXPIRED`
- **source** (`LeadSource`): `PURCHASED_CONSULT` · `DISCOVERY_CALL`
- **division** (`LeadDivision`): `DMD` · `SKIN` · `BOTH`

---

## Services & Products

**`services`** (PK `id`) — *price in DOLLARS*
```
id · name · short_code · category_id · price · active · notes
duration_minutes · gst_applicable · bookable_online · online_description · is_addon
delivery_mode ('IN_PERSON'|'VIDEO'|'BOTH') · image_url
clinic_id · created_at · updated_at
```

**`products`** (PK `id`) — *retail_price/our_cost in DOLLARS*
```
id · name · short_code · barcode_id · category · retail_price · our_cost · active · notes
reorder_point · reorder_quantity · preferred_supplier_id · clinic_id
```
- **products.category** (`ProductCategory`): `SKINCARE SUNSCREEN MASK MAKEUP HAIR PEELING OTHER`

---

## Appointments — table `appointments` (PK `id`)

```
id · clinic_id · resource_id · client_uuid · lead_id · service_id
title · status · starts_at · ends_at · notes · cancellation_reason
ai_noshow_risk · ai_noshow_tier · ai_noshow_reasoning · ai_noshow_factors (text[])
noshow_fee_charged_at · stripe_noshow_payment_intent_id
created_by · created_at · updated_at
```
- **status** (`AppointmentStatus`): `pending` · `confirmed` · `arrived` · `in_progress` · `completed` · `not_cleared` · `cancelled` · `no_show` · `rescheduled` · `early_cancel` · `late_cancel`  ⚠️ **lowercase**, unlike most enums.
- Appointments hang off **`resources`** (a bookable staff/room/equipment), not `staff` directly.

---

## Sales / POS

**`sales`** (PK `id`)
```
id · sale_number · clinic_id · client_uuid · status · sale_date · payment_method
subtotal_cents · gst_cents · total_cents · wallet_credit_used_cents
paid_at · paid_by · created_by · notes
```
- **status** (`SaleStatus`): `COMPLETED` · `RETURNED` · `VOIDED` · `PAYMENT_PLAN`

**`sale_line_items`** (PK `id`)
```
sale_id · clinic_id · item_type · item_name · reference_id
unit_price_cents · quantity · discount_cents · tax_cents · amount_paid_cents
```
- **item_type** (`LineItemType`): `PRODUCT SERVICE DEPOSIT FEE ACCOUNT_PAYMENT CREDIT_ADJUSTMENT`

**`sale_payments`** (PK `id`) — split-tender ledger
```
id · sale_id · clinic_id · amount_cents · method · received_at · received_by
```
- **method** (`SalePaymentMethod`): `EFT_POS · BANK_TRANSFER · CASH · WALLET · CARD_ON_FILE · GIFT_CARD · OTHER`

---

## Payment plans

**`payment_plans`** (one per sale): `sale_id · total_cents · deposit_cents · installment_count · frequency · start_date · status`
- **frequency**: `WEEKLY FORTNIGHTLY MONTHLY` · **status**: `ACTIVE PAUSED COMPLETED CANCELLED`

**`payment_plan_installments`**: `plan_id · sequence · due_date · amount_cents · status`
- **status** (`InstallmentStatus`): `SCHEDULED PAID OVERDUE WAIVED`

---

## Memberships

**`membership_templates`**: `name · description · price_cents · billing_period · duration_months · signup_fee_cents · included_allowance (jsonb) · sessions_per_cycle · stripe_price_id · active`
- **billing_period**: `MONTHLY QUARTERLY YEARLY`

**`client_memberships`**: `client_uuid · template_id · status · started_at · current_period_start · current_period_end · next_billing_at · price_cents_at_enrol`
- **status**: `ACTIVE PAUSED CANCELLED`

---

## Conversations OS (messaging)

**`conversations`**
```
id · clinic_id · lead_id · client_uuid · anon_name · anon_phone · contact_type · channel
inbox_id · assigned_to · status · is_unread · tags (text[])
last_message_at · last_message_preview · last_message_direction
```
- **contact_type**: `lead` · `client` · `anon` · **channel**: `sms email phone webchat instagram facebook` · **status**: `open` · `closed` (⚠️ lowercase)

**`messages`**
```
id · clinic_id · conversation_id · author_type · author_staff_id · body
message_type · channel · direction · provider_sid · status · scheduled_for · created_at
```
- **author_type**: `staff contact automation system`
- **message_type**: `sms email internal_note system_event call_log payment_request payment_received automation`
- **direction**: `inbound outbound internal` · **status**: `queued sent delivered failed read`

**`call_logs`**: `clinic_id · conversation_id · twilio_call_sid · direction · from_number · to_number · duration_seconds · resolution_status · transcript · ai_summary · started_at · ended_at`
- **direction**: `inbound outbound missed` · **resolution_status**: `resolved unresolved`

**`payment_requests`** (pay-in-thread): `clinic_id · conversation_id · message_id · client_uuid · amount_cents · description · status · stripe_checkout_session_id · stripe_payment_intent_id`
- **status**: `PENDING VIEWED PAID EXPIRED CANCELLED`

---

## Gift cards — `gift_cards`

- **status** (`GiftCardStatus`): `ACTIVE · EXPIRED · VOIDED · REDEEMED_FULLY`. Balance tracked in `_cents`.

---

## Staff & Clinics

**`staff`**: `auth_user_id · full_name · initials · email · role · active · is_bookable · has_calendar · accepts_online_bookings · calendar_pin_hash · avatar_url`
- **role** (`StaffRole`): `admin · therapist · nurse · reception · marketing`

**`clinics`** (the tenant): `name · slug · timezone · email · phone · website · business_name · abn · gst_registered · brand_primary_color · brand_accent_color · brand_background_color · stripe_account_id · subscription_plan · subscription_status`
- **subscription_plan**: `FREE PRO ENTERPRISE PAUSED`

---

## How to use for the marketing site

Use these **real column names and enum values** so screenshots look like the actual app:

- **Client card** → `full_name`, `client_code` ("DEMO-001"), `status` pill `ACTIVE`, `division` `SKIN`
- **Sale row** → `sale_number`, `total_cents` rendered as `$x,xxx.xx`, `status` `COMPLETED`
- **Inbox thread** → `message_type` `sms`, `direction` `inbound`/`outbound`, `channel` `sms`
- **Appointment row** → `starts_at`, `status` `confirmed`/`completed` (lowercase!), `title`
- **Membership card** → `billing_period` `MONTHLY`, `price_cents` formatted, `next_billing_at`

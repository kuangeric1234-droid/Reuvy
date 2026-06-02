"use client";

import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

const SECTIONS: LegalSection[] = [
  {
    id: "who-we-are",
    label: "Who we are",
    body: (
      <>
        <p>
          Ruevii is operated by <strong>Ruevii Pty Ltd</strong> (ACN 000 000 000), an Australian
          proprietary company with its principal place of business in Sydney, New South Wales.
          Ruevii provides a software-as-a-service practice management platform purpose-built for
          Australian cosmetic, injectable and aesthetics clinics.
        </p>
        <p>
          This Privacy Policy explains how we handle <strong>personal information</strong> and
          <strong> sensitive information</strong> (including health information) under the
          Privacy Act 1988 (Cth), the Australian Privacy Principles (APPs) and the Notifiable Data
          Breaches scheme. It applies to information we collect from clinic operators, their staff,
          their patients, prospects, applicants and visitors to ruevii.com.
        </p>
        <p>
          Where a Ruevii customer (a clinic) loads patient records into the platform, the clinic is
          the <strong>APP entity</strong> responsible for that information and Ruevii acts as their
          processor under a written Data Processing Agreement. This policy describes Ruevii&apos;s own
          practices; clinics should also publish their own patient-facing privacy notice.
        </p>
      </>
    ),
  },
  {
    id: "what-we-collect",
    label: "What we collect",
    body: (
      <>
        <p>
          We collect the minimum information needed to provide and improve the service. The
          categories we collect fall into three buckets:
        </p>
        <ul>
          <li>
            <strong>Account &amp; operator information</strong> — names, work email, mobile,
            AHPRA registration number where relevant, role, clinic name, ABN, billing address and
            payment details for the clinic&apos;s subscription.
          </li>
          <li>
            <strong>Clinic content (patient data)</strong> — patient demographics, consent forms,
            treatment notes, before/after photos, prescription and S4 dispensing records, billing
            history and any other information your staff enter into the platform. This is
            <strong> sensitive information</strong> within the meaning of APP 3.
          </li>
          <li>
            <strong>Usage &amp; device data</strong> — IP address, browser type, pages viewed,
            feature interactions, crash reports and security event logs. We do not build cross-site
            advertising profiles and we do not sell personal information.
          </li>
        </ul>
        <p>
          We collect information directly from you when you create an account, configure the
          platform or contact support. We may also receive information from third parties you
          authorise (for example, a referring clinic, an SSO provider, or a payment processor
          confirming a transaction).
        </p>
      </>
    ),
  },
  {
    id: "how-we-use-it",
    label: "How we use it",
    body: (
      <>
        <p>
          We use personal information only for the purposes set out below, all of which are
          consistent with the primary purpose of providing a clinical practice management platform:
        </p>
        <ul>
          <li>To provision, authenticate and operate your Ruevii workspace.</li>
          <li>To enable bookings, communications, payments, dispensing logs and reporting.</li>
          <li>To deliver service updates, security alerts and onboarding guidance.</li>
          <li>To respond to support requests and investigate incidents.</li>
          <li>To detect, prevent and respond to fraud, abuse and security threats.</li>
          <li>To meet legal, accounting, tax and regulatory obligations.</li>
          <li>To improve product quality through aggregated, de-identified analytics.</li>
        </ul>
        <p>
          We do <strong>not</strong> use clinic content (patient records, photos, consent forms or
          treatment notes) to train general-purpose machine learning models. Where AI features are
          enabled inside a clinic&apos;s workspace, the model only processes that workspace&apos;s data
          for the duration of the request and does not retain it for training.
        </p>
        <p>
          If we ever propose to use personal information for a secondary purpose that you would not
          reasonably expect, we will seek your consent first.
        </p>
      </>
    ),
  },
  {
    id: "how-we-share-it",
    label: "How we share it",
    body: (
      <>
        <p>
          We share personal information only with the limited categories of vetted service
          providers needed to run the platform. Each is bound by a written contract that limits use
          to the services we have engaged them for and requires confidentiality, encryption in
          transit, and breach notification.
        </p>
        <ul>
          <li>
            <strong>Hosting &amp; infrastructure</strong> — Amazon Web Services (Sydney,
            ap-southeast-2). Primary storage of all patient records, photos and audit logs.
          </li>
          <li>
            <strong>Payments</strong> — Stripe Payments Australia Pty Ltd. Processes card and
            direct-debit transactions; we do not store full card numbers on our servers.
          </li>
          <li>
            <strong>SMS &amp; voice</strong> — Twilio Inc. and Twilio Australia. Used for
            appointment reminders, two-factor codes, AI receptionist call routing and clinic-to-patient
            messaging.
          </li>
          <li>
            <strong>Transactional email</strong> — Postmark / AWS SES. Used for system emails,
            receipts and password resets.
          </li>
          <li>
            <strong>Product analytics &amp; error monitoring</strong> — PostHog (EU/AU hosted) and
            Sentry. Configured with PII scrubbing and short retention windows.
          </li>
          <li>
            <strong>Identity &amp; SSO</strong> — WorkOS / Google / Microsoft, only if your clinic
            enables single sign-on.
          </li>
        </ul>
        <p>
          We will also disclose personal information where we are required or authorised to do so
          by Australian law — for example, in response to a valid subpoena, AHPRA notification or
          ATO request. We will narrow the scope of any disclosure to what the law actually
          requires.
        </p>
      </>
    ),
  },
  {
    id: "your-rights",
    label: "Your rights under the APPs",
    body: (
      <>
        <p>
          Under the Australian Privacy Principles you have specific rights in relation to the
          personal information we hold about you. We will respond to verified requests within 30
          days at no charge:
        </p>
        <ul>
          <li>
            <strong>Access (APP 12)</strong> — ask for a copy of the personal information we hold.
          </li>
          <li>
            <strong>Correction (APP 13)</strong> — ask us to correct information that is inaccurate,
            out of date, incomplete or misleading.
          </li>
          <li>
            <strong>Anonymity &amp; pseudonymity (APP 2)</strong> — interact with us without
            identifying yourself where lawful and practical.
          </li>
          <li>
            <strong>Withdraw consent</strong> — withdraw any consent you previously gave us, on a
            forward-looking basis.
          </li>
          <li>
            <strong>Complain</strong> — lodge a privacy complaint with us, and escalate it to the
            Office of the Australian Information Commissioner (OAIC) if you are not satisfied.
          </li>
        </ul>
        <p>
          For clinic content, the clinic is the APP entity. We will direct patient requests back to
          the clinic and assist the clinic with fulfilment as their processor.
        </p>
      </>
    ),
  },
  {
    id: "data-residency",
    label: "Data residency",
    body: (
      <>
        <p>
          All clinic content, patient records, photos and audit logs are stored in
          <strong> AWS&apos;s Sydney region (ap-southeast-2)</strong>. Production data is not replicated
          to overseas regions, and there is no nightly offsite copy outside Australia.
        </p>
        <p>
          A small number of operational sub-processors may receive limited metadata outside
          Australia (for example, Stripe in the US for payment authorisation, or Twilio for routing
          an outbound SMS). In each case we contract on Australia-aligned standard terms and the
          data shared is the minimum necessary for the service.
        </p>
        <p>
          Backups are encrypted at rest with AES-256 and held in Sydney, with copies stored in a
          separate availability zone within the same region for disaster recovery.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    label: "Retention",
    body: (
      <>
        <p>
          We keep personal information only as long as we have a lawful basis to do so. Our default
          retention windows are:
        </p>
        <ul>
          <li>
            <strong>Account &amp; billing records</strong> — 7 years after account closure, to meet
            Australian Taxation Office and corporate record-keeping requirements.
          </li>
          <li>
            <strong>Clinic content</strong> — retained for the life of the subscription and for 30
            days after termination, during which the clinic can export a full archive. After 30
            days the data is permanently destroyed unless the clinic asks us to honour the longer
            AHPRA-recommended medical record retention window (typically 7 years for adults; up to
            age 25 for minors).
          </li>
          <li>
            <strong>Security logs</strong> — 12 months in hot storage, 24 months in cold storage.
          </li>
          <li>
            <strong>Support correspondence</strong> — 24 months from last contact.
          </li>
        </ul>
        <p>
          When a retention window ends, data is deleted using cryptographic erasure and the
          underlying storage is overwritten on its next lifecycle cycle.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    label: "Contact / DPO",
    body: (
      <>
        <p>
          We have appointed an internal Data Protection Officer (DPO) to oversee privacy compliance
          and respond to requests. You can reach the DPO at:
        </p>
        <p>
          <strong>privacy@ruevii.com</strong>
          <br />
          Ruevii Pty Ltd — Privacy Office
          <br />
          Level 5, 100 Harris Street, Pyrmont NSW 2009, Australia
        </p>
        <p>
          We aim to acknowledge every privacy request within two business days and resolve it
          within 30 days. If you are not satisfied with our response, you can refer the matter to
          the <strong>Office of the Australian Information Commissioner</strong> at oaic.gov.au or
          by phoning 1300 363 992.
        </p>
        <p>
          Material changes to this policy will be notified by email to account administrators at
          least 14 days before they take effect, and an archive of previous versions will be
          available on request.
        </p>
      </>
    ),
  },
];

export function PrivacyContent() {
  return (
    <LegalPageLayout
      eyebrow="Privacy"
      headlinePrimary="Your patients trust you."
      headlineSecondary="So we hold your data accordingly."
      subhead={
        <>
          How Ruevii Pty Ltd collects, uses, stores and shares personal information under the
          Privacy Act 1988 (Cth) and the Australian Privacy Principles. Written for the people who
          actually read these — clinic owners, lawyers and patients with a good question.
        </>
      }
      lastUpdated="2026-06-01"
      sections={SECTIONS}
      closing={{
        primary: "Calm software,",
        secondary: "compliant by default.",
      }}
    />
  );
}

export default PrivacyContent;

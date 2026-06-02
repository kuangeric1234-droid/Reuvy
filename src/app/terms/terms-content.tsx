"use client";

import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

const SECTIONS: LegalSection[] = [
  {
    id: "acceptance",
    label: "Acceptance",
    body: (
      <>
        <p>
          These Terms of Service (the &ldquo;<strong>Terms</strong>&rdquo;) form a binding
          agreement between <strong>Ruevii Pty Ltd</strong> (ACN 000 000 000) (&ldquo;
          <strong>Ruevii</strong>&rdquo;, &ldquo;<strong>we</strong>&rdquo;, &ldquo;
          <strong>us</strong>&rdquo;) and the entity or person that subscribes to the Ruevii
          platform (the &ldquo;<strong>Customer</strong>&rdquo;, &ldquo;<strong>you</strong>&rdquo;).
        </p>
        <p>
          By creating an account, clicking &ldquo;I agree&rdquo;, or accessing the platform, you
          accept these Terms on behalf of your clinic. If you are signing up on behalf of an
          organisation, you confirm that you have authority to bind it.
        </p>
        <p>
          If you do not agree to these Terms, do not access or use the platform. We may update
          these Terms from time to time as set out in the &ldquo;Changes&rdquo; section below.
        </p>
      </>
    ),
  },
  {
    id: "account",
    label: "Account",
    body: (
      <>
        <p>
          To use the platform you must create an account and provide accurate clinic details,
          including (where applicable) the AHPRA registration of your principal practitioner. You
          are responsible for keeping your sign-in credentials confidential and for all activity
          that occurs under your account.
        </p>
        <p>
          You agree to enable multi-factor authentication for every administrator, to grant access
          only to staff who need it, and to revoke access promptly when a staff member leaves your
          clinic. We are not liable for losses arising from your failure to control account access.
        </p>
        <p>
          Account holders must be at least 18 years old and must operate, or be employed by, a
          health-services business lawfully established in Australia.
        </p>
      </>
    ),
  },
  {
    id: "subscription-billing",
    label: "Subscription & billing",
    body: (
      <>
        <p>
          The platform is offered on a monthly recurring subscription, charged in
          <strong> Australian dollars (AUD)</strong> and <strong>inclusive of GST</strong> where
          applicable. Your plan, price and any add-ons are described on your order form or in the
          billing area of your workspace.
        </p>
        <p>
          Fees are billed in advance on the same calendar day each month. We will attempt to charge
          your registered payment method automatically. If a charge fails, we will retry over 7
          days and notify your account administrators by email. After 14 days of non-payment we
          may suspend access; after 30 days we may terminate the subscription.
        </p>
        <p>
          We may change prices on at least 30 days&apos; notice by email. Price changes take effect on
          your next renewal date — you can choose to cancel before the new price applies. All fees
          are non-refundable except where required by Australian Consumer Law.
        </p>
      </>
    ),
  },
  {
    id: "acceptable-use",
    label: "Acceptable use",
    body: (
      <>
        <p>You agree not to use the platform to:</p>
        <ul>
          <li>Upload content that is unlawful, defamatory, infringing or harmful.</li>
          <li>
            Conduct any clinical activity that contravenes the Health Practitioner Regulation
            National Law (Australia) or AHPRA&apos;s guidance — including async prescribing of
            schedule 4 cosmetic injectables.
          </li>
          <li>
            Reverse engineer, decompile or attempt to derive source code from any part of the
            platform.
          </li>
          <li>
            Scrape, mirror or build a competing product using the platform&apos;s outputs or
            documentation.
          </li>
          <li>
            Interfere with the platform&apos;s security, integrity or availability — including by
            running unauthorised penetration tests.
          </li>
          <li>
            Send unsolicited bulk communications or use the platform to harass patients or staff.
          </li>
        </ul>
        <p>
          Suspected violations may be investigated and, if confirmed, will result in suspension or
          termination of access without refund.
        </p>
      </>
    ),
  },
  {
    id: "customer-data",
    label: "Customer data (you own it)",
    body: (
      <>
        <p>
          <strong>You own your data.</strong> All patient records, photos, treatment notes, consent
          forms and other content uploaded to or generated within your workspace remain your
          property. You grant us a non-exclusive, royalty-free licence to host, transmit and
          process that content solely to provide the platform to you.
        </p>
        <p>
          You may export your data at any time using the in-product export tool. On termination,
          you will have at least 30 days to download a full archive before we permanently destroy
          the data in accordance with our retention schedule.
        </p>
        <p>
          We do not use your customer data to train general-purpose machine-learning models, and we
          do not sell or commercialise it. Where AI features are enabled in your workspace, they
          process only your workspace&apos;s data and do not retain it for training.
        </p>
      </>
    ),
  },
  {
    id: "confidentiality",
    label: "Confidentiality",
    body: (
      <>
        <p>
          Each party agrees to keep the other&apos;s confidential information confidential, to use it
          only for the purpose of performing this agreement and to protect it with at least the
          same level of care as it uses for its own confidential information of similar
          sensitivity.
        </p>
        <p>
          Confidential information does not include information that is, or becomes, publicly
          available through no breach of these Terms; was rightfully known before disclosure; is
          received lawfully from a third party; or is independently developed without reference to
          the disclosing party&apos;s information.
        </p>
        <p>
          The confidentiality obligations survive termination of these Terms for a period of five
          years, except in respect of personal information and trade secrets, where they survive
          indefinitely.
        </p>
      </>
    ),
  },
  {
    id: "warranties",
    label: "Warranties & disclaimers",
    body: (
      <>
        <p>
          We warrant that we will provide the platform with reasonable care and skill, that the
          platform will materially conform to the documentation, and that we will use industry
          standard measures to protect the security of your data.
        </p>
        <p>
          To the maximum extent permitted by Australian law, all other warranties, conditions and
          representations — express, implied, statutory or otherwise — are excluded. The platform
          is supplied on an &ldquo;as is&rdquo; basis. We do not warrant that operation of the
          platform will be uninterrupted or error-free, or that all defects will be corrected.
        </p>
        <p>
          Nothing in these Terms excludes, restricts or modifies any consumer guarantee,
          right or remedy that you have under the Australian Consumer Law where such exclusion
          would be void. To the extent we can limit our liability for breach of such a guarantee,
          our liability is limited at our election to re-supplying the platform or refunding the
          fees you paid for it.
        </p>
      </>
    ),
  },
  {
    id: "limitation-of-liability",
    label: "Limitation of liability",
    body: (
      <>
        <p>
          To the maximum extent permitted by law, neither party will be liable to the other for
          any loss of profits, loss of revenue, loss of goodwill, loss of anticipated savings, loss
          of business opportunity or any indirect, incidental, special or consequential damages,
          arising out of or in connection with these Terms — whether in contract, tort (including
          negligence), under statute or otherwise.
        </p>
        <p>
          Subject to the consumer-guarantee carve-out above, each party&apos;s aggregate liability for
          all claims arising under these Terms in any twelve-month period is capped at the total
          fees paid by the Customer to Ruevii in that period.
        </p>
        <p>
          These limitations apply even if a remedy fails of its essential purpose, and reflect the
          allocation of risk in the parties&apos; bargain.
        </p>
      </>
    ),
  },
  {
    id: "termination",
    label: "Termination",
    body: (
      <>
        <p>
          You may terminate your subscription at any time from the billing area of your workspace.
          Termination takes effect at the end of your then-current billing month; fees for that
          month are not refunded.
        </p>
        <p>
          We may suspend or terminate your access immediately if you materially breach these Terms,
          fail to pay an undisputed invoice for more than 30 days, or use the platform in a way
          that creates a legal or security risk for us or our other customers.
        </p>
        <p>
          On termination, your right to access the platform ends, all outstanding fees become
          immediately payable, and we will make a full export of your data available for at least
          30 days before permanent deletion.
        </p>
      </>
    ),
  },
  {
    id: "governing-law",
    label: "Governing law",
    body: (
      <>
        <p>
          These Terms are governed by the laws of the State of <strong>New South Wales,
          Australia</strong>. Each party irrevocably submits to the exclusive jurisdiction of the
          courts of New South Wales and the courts competent to hear appeals from them.
        </p>
        <p>
          Before commencing court proceedings (other than for urgent injunctive relief), the
          parties agree to attempt in good faith to resolve any dispute by senior-executive
          negotiation and, failing that, by mediation administered by the Resolution Institute in
          Sydney.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    label: "Changes",
    body: (
      <>
        <p>
          We may update these Terms from time to time. If we make a material change, we will give
          your account administrators at least <strong>30 days&apos; notice by email</strong> before
          the change takes effect, and we will post the updated Terms on this page with a new
          &ldquo;Last updated&rdquo; date.
        </p>
        <p>
          Your continued use of the platform after a change takes effect constitutes acceptance of
          the updated Terms. If you do not accept a change, your sole remedy is to terminate the
          subscription before the change takes effect, in which case we will refund any
          pre-paid fees for the period after termination.
        </p>
        <p>
          Archived versions of these Terms are kept on file and are available on request from
          legal@ruevii.com.
        </p>
      </>
    ),
  },
];

export function TermsContent() {
  return (
    <LegalPageLayout
      eyebrow="Terms of Service"
      headlinePrimary="The plain-English version,"
      headlineSecondary="with the lawyerly version intact."
      subhead={
        <>
          These Terms govern your subscription to Ruevii — billing in AUD, customer data ownership,
          acceptable use and what happens if either party walks away. Read alongside our Privacy
          Policy and Security Commitment.
        </>
      }
      lastUpdated="2026-06-01"
      sections={SECTIONS}
      closing={{
        primary: "Practical software,",
        secondary: "fair commercial terms.",
      }}
    />
  );
}

export default TermsContent;

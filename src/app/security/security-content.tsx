"use client";

import Link from "next/link";
import { LegalPageLayout, type LegalSection } from "@/components/legal-page-layout";

const SECTIONS: LegalSection[] = [
  {
    id: "how-we-protect",
    label: "How we protect your data",
    body: (
      <>
        <p>
          Security is a first-class product surface at Ruevii, not a checkbox. We design the
          platform from the assumption that the data inside it — patient records, before-and-after
          photos, S4 dispensing logs, consent forms — is among the most sensitive any clinic will
          ever hold. Our controls reflect that.
        </p>
        <p>
          Every layer of the stack is built on three principles: <strong>least privilege</strong>
          {" "}(no person or service gets access it doesn&apos;t need), <strong>defence in
          depth</strong> (no single control is the last line) and <strong>audit by default</strong>
          {" "}(every meaningful action is logged, immutably).
        </p>
        <p>
          Our security program is reviewed quarterly by an internal committee chaired by the CTO,
          and at least annually by an independent third party. The summary below reflects the
          controls in production today; the controls evolve continuously and we publish material
          changes in our changelog.
        </p>
      </>
    ),
  },
  {
    id: "encryption",
    label: "Encryption",
    body: (
      <>
        <p>
          All data at rest is encrypted with <strong>AES-256-GCM</strong>. Encryption keys are
          managed in AWS KMS with separate keys per data class (clinical, photos, billing, audit
          logs) and automatic rotation. Database storage volumes, S3 buckets, EBS volumes and
          backup snapshots are encrypted at the storage layer.
        </p>
        <p>
          All data in transit is encrypted with <strong>TLS 1.3</strong> using modern cipher
          suites. We enforce HSTS with a 12-month max-age, including subdomains and preload, and we
          do not accept TLS connections below 1.2 anywhere in the stack. Internal service-to-service
          traffic also runs over mTLS within an AWS VPC.
        </p>
        <p>
          Patient photos receive an additional envelope of per-object encryption using a key
          derived per workspace, so that even a misconfigured bucket-level grant cannot expose
          another clinic&apos;s images.
        </p>
      </>
    ),
  },
  {
    id: "access-controls",
    label: "Access controls",
    body: (
      <>
        <p>
          Access to production systems is restricted to a small, named subset of Ruevii engineers
          on a need-to-have basis, authenticated via SSO with hardware-backed MFA (FIDO2). We do
          not use shared accounts and we do not allow password-only access to any production
          system.
        </p>
        <p>
          Access is granted just-in-time through a request/approval workflow that is logged to the
          immutable audit trail. Standing access to customer clinical data is granted to zero
          engineers — when access is needed for a support escalation, it is broker-approved,
          time-bounded and visible to the customer in the audit log of their workspace.
        </p>
        <p>
          Within a customer workspace, role-based access controls let clinic administrators
          restrict who can view photos, view financials, dispense schedule 4 drugs, refund a
          transaction or export records. Every change to a role is logged.
        </p>
      </>
    ),
  },
  {
    id: "audit-logging",
    label: "Audit logging",
    body: (
      <>
        <p>
          Every meaningful clinical and financial action — viewing a patient record, signing a
          consent form, dispensing a schedule 4 drug, issuing a refund, exporting data — is written
          to an append-only audit log. The log is cryptographically hash-chained so that
          tampering with any entry invalidates the chain.
        </p>
        <p>
          Customers can view and export their own audit log from inside the workspace at any time,
          including the source IP, user agent and the specific record acted on. We retain audit logs
          for at least seven years in line with AHPRA-recommended record retention.
        </p>
        <p>
          For an end-to-end view of how the audit trail integrates with the rest of our
          AHPRA-aligned workflow, see our <Link href="/compliance">compliance overview</Link>.
        </p>
      </>
    ),
  },
  {
    id: "soc-2",
    label: "SOC 2 (in progress)",
    body: (
      <>
        <p>
          Ruevii is currently undergoing a <strong>SOC 2 Type II</strong> examination across the
          Security, Availability and Confidentiality trust services criteria, with an Australian-
          and US-aligned auditor. Our observation window opened in Q1 2026 and we expect the
          Type II report to be available to customers under NDA in Q4 2026.
        </p>
        <p>
          In the meantime, we operate the SOC 2 control set as if we were already audited: written
          policies, evidence collection in a control monitoring platform (Vanta), quarterly
          internal reviews and remediation tickets tracked to closure. Customers preparing their
          own SOC 2 or ISO 27001 audit can request our current control matrix and policy pack
          under NDA.
        </p>
      </>
    ),
  },
  {
    id: "hipaa-phi",
    label: "HIPAA-grade PHI handling",
    body: (
      <>
        <p>
          Although Ruevii operates under Australian privacy law rather than HIPAA, we have
          deliberately built our patient-information handling to <strong>HIPAA-grade</strong>{" "}
          technical safeguards. That means strong access control, audit controls, integrity
          controls, person/entity authentication and transmission security as defined in the HIPAA
          Security Rule are all implemented end-to-end.
        </p>
        <p>
          Photos, treatment notes and any free-text fields that may contain identifying patient
          information are treated as PHI throughout the pipeline — never logged in plaintext,
          never sent to a third party that does not have a written processing agreement, and never
          included in product analytics events.
        </p>
        <p>
          For customers operating in cross-border partnerships, we can sign a written PHI handling
          schedule that mirrors the HIPAA Business Associate Agreement terms.
        </p>
      </>
    ),
  },
  {
    id: "ahpra-alignment",
    label: "AHPRA alignment",
    body: (
      <>
        <p>
          Beyond generic security, Ruevii is engineered to make AHPRA-aligned practice the path of
          least resistance. Treatments cannot be booked or charged without a documented consultation
          and signed consent. The S4 drug register reconciles automatically against prescribers and
          patients. The audit trail is admissible evidence of the clinical record at any later
          notification.
        </p>
        <p>
          Our compliance posture — including how we handle async prescribing prohibitions, mandatory
          face-to-face consults, and PHI residency — is documented in our{" "}
          <Link href="/compliance">AHPRA compliance brief</Link>.
        </p>
        <p>
          We work closely with AHPRA-experienced legal counsel and update our workflows whenever
          guidance is reissued. Where guidance changes, customers receive in-product notices and an
          email summarising the impact.
        </p>
      </>
    ),
  },
  {
    id: "penetration-testing",
    label: "Penetration testing",
    body: (
      <>
        <p>
          Ruevii engages an independent, CREST-certified penetration testing firm to run a
          <strong> full external assessment at least annually</strong>, and a focused assessment
          after every material change to the authentication, payments or PHI pipelines. The scope
          includes web application, API, mobile clients and supporting cloud configuration.
        </p>
        <p>
          High and critical findings are tracked to remediation with hard SLAs (24 hours for
          critical, 7 days for high) and re-tested before the engagement closes. An executive
          summary of the latest assessment is available to customers and prospects under NDA.
        </p>
        <p>
          We also run continuous automated scanning — SAST on every pull request, dependency
          vulnerability monitoring, daily DAST scans against staging — to catch regressions between
          formal pen-tests.
        </p>
      </>
    ),
  },
  {
    id: "incident-response",
    label: "Incident response",
    body: (
      <>
        <p>
          Ruevii operates a documented incident response plan with named roles, severity
          definitions, and timed obligations. A 24/7 on-call rotation triages alerts within 15
          minutes; severity 1 incidents page the engineering leadership team automatically.
        </p>
        <p>
          In the event of a security incident that is likely to result in serious harm to an
          affected individual, Ruevii will notify affected customers within 72 hours and will
          notify the Office of the Australian Information Commissioner under the Notifiable Data
          Breaches scheme within the timeframes required by law. Every incident is followed by a
          written post-mortem shared with affected customers.
        </p>
        <p>
          We test the plan with a full tabletop exercise twice a year and a live failover exercise
          annually.
        </p>
      </>
    ),
  },
  {
    id: "responsible-disclosure",
    label: "Responsible disclosure",
    body: (
      <>
        <p>
          We welcome security research on the Ruevii platform conducted in good faith and within
          the bounds of our responsible disclosure policy. If you believe you have found a
          vulnerability, please email <strong>security@ruevii.com</strong> with the details and
          reproduction steps — PGP key on request.
        </p>
        <p>
          We commit to acknowledging your report within two business days, providing a status update
          within five business days, and crediting you in our hall of fame on resolution unless you
          prefer to remain anonymous. We do not pursue legal action against researchers acting in
          good faith and within the policy.
        </p>
        <p>
          The policy permits testing only against accounts you own, prohibits social engineering of
          Ruevii staff or customers, and excludes denial-of-service testing without prior written
          authorisation.
        </p>
      </>
    ),
  },
];

export function SecurityContent() {
  return (
    <LegalPageLayout
      eyebrow="Security"
      headlinePrimary="Security is a product surface,"
      headlineSecondary="not a checkbox."
      subhead={
        <>
          How Ruevii protects clinic and patient data — encryption, access controls, audit logging,
          SOC 2 (in progress), HIPAA-grade PHI handling, AHPRA alignment, penetration testing and
          incident response.
        </>
      }
      lastUpdated="2026-06-01"
      sections={SECTIONS}
      closing={{
        primary: "Calm software,",
        secondary: "serious security underneath.",
      }}
    />
  );
}

export default SecurityContent;

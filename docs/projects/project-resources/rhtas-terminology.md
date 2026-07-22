# RHTAS Console - Terminology and Concepts Guide

This guide explains the core concepts, terminology, and relationships used in the RHTAS (Red Hat Trusted Artifact Signer) Console in simple terms. Think of this as a beginner's guide to understanding software supply chain security.

---

## Table of Contents
1. [Core Concepts](#core-concepts)
2. [The Big Picture](#the-big-picture)
3. [Detailed Terminology](#detailed-terminology)
4. [How It All Works Together](#how-it-all-works-together)
5. [Common Workflows](#common-workflows)

---

## Core Concepts

### What is RHTAS?

RHTAS (Red Hat Trusted Artifact Signer) is a system that helps you verify that software hasn't been tampered with. Think of it like a high-tech seal of authenticity for software packages and container images.

**Why do we need this?**
- To know WHO signed/created the software
- To know WHEN it was signed
- To ensure the software HASN'T BEEN CHANGED since it was signed
- To prove these facts even if the original signer disappears

---

## The Big Picture

Imagine you're receiving a sealed package in the mail. You want to know:
1. **Who sent it?** (Identity)
2. **Is the seal intact?** (Integrity)
3. **Can I trust the sender?** (Trust)
4. **Do I have proof it really came from them?** (Non-repudiation)

RHTAS provides this for software using several interconnected systems:

```
┌─────────────────────────────────────────────────────────────┐
│                        SIGSTORE                             │
│  (The umbrella project for software signing & verification) │
└─────────────────────────────────────────────────────────────┘
                              │
           ┌──────────────────┼──────────────────┐
           │                  │                  │
           ▼                  ▼                  ▼
      ┌────────┐         ┌────────┐        ┌────────┐
      │ Fulcio │         │ Rekor  │        │  TUF   │
      │  (CA)  │         │  (Log) │        │(Trust) │
      └────────┘         └────────┘        └────────┘
           │                  │                  │
           │                  │                  │
           └──────────────────┼──────────────────┘
                              │
                              ▼
                    ┌──────────────────┐
                    │   Your Artifact  │
                    │  (verified ✓)    │
                    └──────────────────┘
```

---

## Detailed Terminology

### 1. Sigstore

**What it is:** An open-source project that provides a complete system for signing and verifying software.

**Simple explanation:** Think of Sigstore as a "notary public" for software. Just like a notary verifies and records important documents, Sigstore verifies and records software signatures.

**Components:**
- Fulcio (issues certificates)
- Rekor (keeps a permanent record)
- TUF (manages trust)

---

### 2. TUF (The Update Framework)

**What it is:** A framework for securely distributing and updating trusted information.

**Simple explanation:** Imagine a secure vault that stores "who to trust" information. TUF makes sure that when you ask "can I trust this certificate?" you're getting the real answer, not one from an attacker.

**Key concepts:**
- **Root metadata:** The "master key" that starts the chain of trust
- **Targets:** Files that TUF protects (like public keys and certificates)
- **Versions:** TUF tracks versions to prevent rollback attacks
- **Expiration:** Trust information has expiration dates to stay fresh

**In RHTAS Console:**
- Stores Fulcio certificates
- Stores Rekor public keys
- Ensures you're using trusted, up-to-date verification information

---

### 3. Rekor (Transparency Log)

**What it is:** A tamper-proof public log of software signatures and attestations.

**Simple explanation:** Think of Rekor as a giant, public ledger (like a blockchain) that records every time someone signs software. Once something is written in this ledger, it can't be erased or changed.

**Why it matters:**
- **Transparency:** Everyone can see all signatures
- **Accountability:** Signers can't deny they signed something
- **Timestamp:** Proves WHEN something was signed
- **Immutability:** Records can't be deleted or modified

**Key components:**
- **Log entry:** A single record in the transparency log
- **Log index:** The position of an entry in the log
- **Integrated time:** When the entry was added to the log
- **Inclusion proof:** Mathematical proof that an entry is really in the log
- **UUID:** Unique identifier for each log entry

**Real-world analogy:** Like a newspaper archive - once today's newspaper is published, you can't change what was printed. Rekor does this for software signatures.

---

### 4. Fulcio (Certificate Authority)

**What it is:** A certificate authority that issues short-lived signing certificates.

**Simple explanation:** Fulcio is like a government office that issues ID cards. But instead of physical IDs, it issues digital certificates that prove who you are when signing software.

**How it works:**
1. You prove your identity (using Google, GitHub, etc.)
2. Fulcio issues you a certificate (valid for ~15 minutes)
3. You use that certificate to sign your software
4. The certificate expires automatically

**Why short-lived?**
- No need to manage/revoke certificates
- Reduced risk if a certificate is compromised
- Combined with Rekor for long-term verification

**Certificate components:**
- **Subject Alternative Name (SAN):** Your identity (like your email)
- **Issuer:** Who verified your identity (like "accounts.google.com")
- **Certificate chain:** The path of trust from root → intermediate → your certificate

---

### 5. Artifacts

**What it is:** The software you want to sign or verify.

**Types of artifacts:**
- **Container images:** Docker/OCI images
- **Files:** Any binary or text file
- **SBOMs:** Software Bill of Materials (list of components)

**Artifact identity:**
- **Digest:** A unique fingerprint (hash) of the artifact
- **Hash algorithm:** Usually SHA-256
- **URI/Reference:** Where the artifact lives (like `docker.io/library/nginx:latest`)

---

### 6. Signatures vs. Attestations

These are two different ways to vouch for software:

#### Signatures

**What it is:** Proof that someone approved/released this specific artifact.

**Simple explanation:** Like a wax seal on a letter - proves the sender's identity and that the letter wasn't opened.

**Contains:**
- Who signed it (from their certificate)
- When it was signed
- A cryptographic signature

#### Attestations

**What it is:** Statements about how an artifact was built or what it contains.

**Simple explanation:** Like a manufacturing certificate that says "this car was built in this factory, on this date, with these parts." It's metadata ABOUT the artifact.

**Common types:**
- **Build attestation:** How/where the software was built
- **SBOM attestation:** What components/libraries are inside
- **Vulnerability scan:** What security issues exist

**Format:** Usually follows the in-toto specification

---

### 7. In-toto

**What it is:** A framework for securing the software supply chain.

**Simple explanation:** In-toto is like a detailed travel log for software. It tracks every step in the software creation process - who wrote code, who reviewed it, who built it, who tested it.

**Key components:**
- **Statement:** A claim about an artifact
- **Subject:** The artifact being described
- **Predicate:** The actual claim/metadata
- **Predicate Type:** What kind of claim (build info, test results, etc.)

**Example in-toto statement:**
```
"I (the builder) claim that artifact X was built using these tools, in this environment, at this time"
```

---

### 8. Bundles

**What it is:** A package containing everything needed to verify a signature.

**Simple explanation:** Think of a bundle like a complete evidence package in a court case. It has the signature, the certificate that signed it, proof it's in the transparency log, and more.

**Contents:**
- The signature
- The signing certificate
- Certificate chain
- Rekor log entry
- Timestamps
- Verification materials

**Why bundles?**
- Self-contained verification
- No need to fetch data from multiple sources
- Portable and complete

---

### 9. OCI (Open Container Initiative)

**What it is:** Standards for container formats and registries.

**Simple explanation:** OCI is like the standardized shipping container for software. Just as physical shipping containers have standard sizes, OCI defines how to package and distribute software containers.

**Key concepts:**
- **OCI image:** A container image following OCI standards
- **Registry:** Where container images are stored (like Docker Hub)
- **Manifest:** A file describing what's in the container
- **Digest:** Unique identifier for an image version

**Example reference:** `quay.io/example/app:latest`
- `quay.io` = registry
- `example/app` = repository
- `latest` = tag
- `sha256:abc123...` = digest (the real identifier)

---

### 10. Verification Concepts

#### Certificate Chain

**What it is:** A series of certificates that establish trust.

**Simple explanation:** Like a chain of recommendations. "Alice trusts Bob, Bob trusts Charlie, Charlie trusts Dave" - so Alice can trust Dave through the chain.

**Structure:**
1. **Root certificate:** The ultimate source of trust (self-signed)
2. **Intermediate certificate(s):** Middle certificates
3. **Leaf certificate:** The actual signing certificate

**Verification:** Each certificate is signed by the one above it.

#### Certificate Transparency (CT Log)

**What it is:** A public log of all certificates issued.

**Simple explanation:** Like Rekor, but specifically for certificates. Ensures certificate authorities can't issue fake certificates secretly.

#### Inclusion Proof

**What it is:** Cryptographic proof that a specific entry exists in Rekor.

**Simple explanation:** Imagine a library book with a unique checksum. The inclusion proof shows that this book's checksum really does appear in the library's catalog, using a special mathematical trick (Merkle tree) that makes it impossible to fake.

**How it works:**
- Rekor uses a Merkle tree (a tree of hashes)
- The inclusion proof provides a path through the tree
- Anyone can verify the math checks out

---

### 11. Authentication & Identity

#### OIDC (OpenID Connect)

**What it is:** A way to verify your identity using existing accounts.

**Simple explanation:** Like "Sign in with Google" - you prove who you are using an account you already have.

**In Fulcio:**
- You authenticate with GitHub, Google, Microsoft, etc.
- Fulcio extracts your verified email
- That email goes into your signing certificate

#### Subject Alternative Name (SAN)

**What it is:** A field in a certificate that contains your identity.

**Simple explanation:** Like the "name" field on an ID card, but in a certificate.

**Common values:**
- Email address (jdoe@example.com)
- Domain name (example.com)

---

### 12. DSSE (Dead Simple Signing Envelope)

**What it is:** A simple, standardized format for signatures.

**Simple explanation:** DSSE is like a standard envelope format for digital signatures. Instead of everyone creating their own custom signature formats, DSSE provides one simple, secure way to wrap a signature around any content.

**Structure:**
- **Payload:** The actual data being signed (base64-encoded)
- **PayloadType:** What kind of data (e.g., "application/vnd.in-toto+json")
- **Signatures:** One or more signatures over the payload

---

### 13. Trust Configuration

**What it is:** The set of trusted authorities and keys used for verification.

**Simple explanation:** Your "trust settings" - which certificate authorities you trust, which transparency logs you use, etc.

**Components in RHTAS:**
- **Fulcio CA certificates:** Which certificate authorities can issue signing certs
- **Rekor public keys:** Which transparency logs you trust
- **TUF root:** How to securely get/update this information

---

## How It All Works Together

### Signing Workflow

```
1. Developer wants to sign a container image
                    │
                    ▼
2. Developer authenticates with OIDC (e.g., Google)
                    │
                    ▼
3. Fulcio issues a short-lived certificate
   - Certificate SAN = developer's email
   - Certificate issuer = accounts.google.com
                    │
                    ▼
4. Developer signs the image with this certificate
   - Creates a signature
   - Creates an attestation (optional)
                    │
                    ▼
5. Signature + certificate sent to Rekor
   - Rekor adds an entry to the transparency log
   - Returns log entry + proof
                    │
                    ▼
6. Everything packaged into a "bundle"
   - Signature
   - Certificate chain
   - Rekor entry
   - Stored with/alongside the image
```

### Verification Workflow

```
1. User wants to verify a container image
                    │
                    ▼
2. Fetch the verification bundle
   - Can be attached to the image
   - Or provided separately
                    │
                    ▼
3. Get trust configuration from TUF
   - Trusted Fulcio CA certificates
   - Trusted Rekor public keys
                    │
                    ▼
4. Verify the certificate chain
   - Leaf cert signed by intermediate
   - Intermediate signed by root
   - Root is trusted (from TUF)
                    │
                    ▼
5. Verify the signature
   - Use public key from certificate
   - Check signature matches artifact digest
                    │
                    ▼
6. Verify Rekor entry
   - Check entry exists in log
   - Verify inclusion proof
   - Check timestamp
                    │
                    ▼
7. Check identity constraints (optional)
   - Certificate SAN matches expected identity
   - OIDC issuer matches expected issuer
                    │
                    ▼
8. Return verification result
   ✓ Verified: All checks passed
   ✗ Failed: One or more checks failed
```

---

## Common Workflows

### 1. Verify a Container Image

**Goal:** Make sure a container image is authentic and unmodified.

**Steps:**
1. Provide the image reference (e.g., `quay.io/example/app:v1.0.0`)
2. Optionally specify identity expectations (who should have signed it)
3. System fetches the image digest
4. System fetches associated signatures/attestations
5. System verifies using TUF-trusted roots
6. Returns detailed verification results

**What you learn:**
- Is the signature valid? ✓/✗
- Who signed it? (email address from certificate)
- When was it signed? (timestamp from Rekor)
- What attestations exist? (build info, SBOM, etc.)

### 2. Check Transparency Log Entry

**Goal:** Look up a specific record in Rekor.

**Steps:**
1. Provide the UUID of the Rekor entry
2. System fetches the entry from Rekor
3. Returns the entry details and verification data

**What you learn:**
- What was signed
- When it was added to the log
- Cryptographic proofs of inclusion

### 3. Get Trust Configuration

**Goal:** Find out which certificate authorities and logs are trusted.

**Steps:**
1. System connects to TUF repository
2. Fetches current trusted root metadata
3. Extracts Fulcio CAs and Rekor public keys
4. Returns the trust configuration

**What you learn:**
- Which Fulcio CAs are trusted
- Which Rekor logs are trusted
- When this information expires

---

## Key Relationships Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                     YOUR ARTIFACT                           │
│              (container image or file)                      │
└─────────────────────────────────────────────────────────────┘
                         │
                         │ is signed with
                         ▼
              ┌──────────────────────┐
              │   SIGNING BUNDLE     │
              ├──────────────────────┤
              │ • Signature          │◄─────┐
              │ • Certificate        │      │
              │ • Certificate Chain  │      │
              │ • Rekor Entry        │      │
              │ • Timestamp          │      │
              └──────────────────────┘      │
                         │                  │
         ┌───────────────┼──────────────┐   │
         │               │              │   │
         ▼               ▼              ▼   │
    ┌────────┐      ┌────────┐    ┌──────┐ │
    │ Fulcio │      │ Rekor  │    │ OIDC │ │
    │   CA   │      │  Log   │    │ Auth │─┘
    └────────┘      └────────┘    └──────┘
         │               │
         │               │
         └───────┬───────┘
                 │
                 │ trust rooted in
                 ▼
           ┌──────────┐
           │   TUF    │
           │ (Trust)  │
           └──────────┘
                 │
                 │ contains
                 ▼
        ┌─────────────────┐
        │ • Root Metadata │
        │ • Targets       │
        │ • CA Certs      │
        │ • Public Keys   │
        └─────────────────┘
```

---

## Glossary Quick Reference

| Term | Simple Definition |
|------|------------------|
| **Artifact** | Software you want to sign or verify (image, file, etc.) |
| **Attestation** | A signed statement about an artifact (build info, SBOM, etc.) |
| **Bundle** | Package containing signature + certificate + Rekor entry + proofs |
| **Certificate Chain** | Series of certificates establishing trust (root → intermediate → leaf) |
| **CT Log** | Certificate Transparency log (public record of certificates) |
| **Digest** | Unique fingerprint/hash of an artifact |
| **DSSE** | Standard envelope format for signatures |
| **Fulcio** | Certificate authority that issues signing certificates |
| **Inclusion Proof** | Cryptographic proof an entry exists in Rekor |
| **In-toto** | Framework for supply chain attestations |
| **OCI** | Container image standard |
| **OIDC** | Authentication using existing accounts (Google, GitHub, etc.) |
| **Rekor** | Public transparency log for signatures |
| **SAN** | Subject Alternative Name (identity in certificate) |
| **Signature** | Cryptographic proof someone approved an artifact |
| **Sigstore** | Umbrella project (Fulcio + Rekor + TUF) |
| **TUF** | Framework for securely distributing trust information |
| **UUID** | Unique identifier for a Rekor entry |

---

## Additional Resources

- **Sigstore Documentation**: https://docs.sigstore.dev/
- **TUF Specification**: https://theupdateframework.io/
- **In-toto Specification**: https://in-toto.io/
- **OCI Specification**: https://opencontainers.org/

---

## FAQ

**Q: Why do we need all of this complexity?**
A: Software supply chain attacks are increasing. This system ensures you can trust software by verifying WHO made it, WHEN they made it, and that it HASN'T BEEN CHANGED. Each component solves a specific security problem.

**Q: What's the difference between a signature and an attestation?**
A: A signature says "I approve this artifact." An attestation says "Here are facts about this artifact (how it was built, what's in it, etc.)." Both are signed, but attestations carry more information.

**Q: Why are Fulcio certificates short-lived?**
A: Traditional certificates need to be revoked if compromised, which is complex. Short-lived certificates (15 minutes) just expire naturally. The Rekor log provides proof of when signing happened.

**Q: What happens if Rekor goes down?**
A: Rekor entries are included in verification bundles, so you can verify artifacts even if Rekor is offline. The bundle contains everything needed.

**Q: Do I need to run my own Fulcio/Rekor/TUF?**
A: Not necessarily. You can use the public Sigstore infrastructure (sigstore.dev), or run your own for private/internal use.

**Q: How do I know TUF hasn't been compromised?**
A: TUF uses a "root of trust" that you obtain once (securely, offline if needed). All updates are verified against this root, making it very difficult to compromise.

---

*This guide is maintained as part of the RHTAS Console project. For questions or corrections, please open an issue.*

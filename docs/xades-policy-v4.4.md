# XAdES-EPES signature policy (v4.4): resolution notes

Status: fixed on branch `fix/xades-policy-v44` (from upstream `a8afe2e96826f9d341b19d219b5f6653cd87e6fa`).
Verified 2026-10-13 against Hacienda's published documents. This is a conformance fix to the
documented policy block; it is **not** evidence of acceptance by the Hacienda validator. Sandbox
acceptance must still be observed with real sandbox credentials.

## What Anexo 2 (v4.4) requires

`ANEXOS Y ESTRUCTURAS_V4.4.pdf` (ATV, `docs/esquemas/2024/v4.4/`, SHA-256 base64
`Lja9EQG7yruzkaseyP/DdzuTAxNBx9mKBaXQ8Ih9QwU=`), pages 84 and 87, the v4.4 signature example:

```xml
<xades:SignaturePolicyIdentifier>
  <xades:SignaturePolicyId>
    <xades:SigPolicyId>
      <xades:Identifier>https://cdn.comprobanteselectronicos.go.cr/xml-schemas/Resoluci%C3%B3n_General_sobre_disposiciones_t%C3%A9cnicas_comprobantes_electr%C3%B3nicos_para_efectos_tributarios.pdf</xades:Identifier>
    </xades:SigPolicyId>
    <xades:SigPolicyHash>
      <ds:DigestMethod Algorithm="http://www.w3.org/2001/04/xmlenc#sha256"/>
      <ds:DigestValue>DWxin1xWOeI8OuWQXazh4VjLWAaCLAA954em7DMh0h8=</ds:DigestValue>
    </xades:SigPolicyHash>
  </xades:SignaturePolicyId>
</xades:SignaturePolicyIdentifier>
```

## Identifier: `xml-schemas`, not `xmlschemas`

The URL wraps across a line in the PDF (`…go.cr/xml-` / `schemas/Resoluci…`). Earlier notes in this
repository read the wrap as a soft hyphen and recorded `/xmlschemas/` as the literal identifier (which
returns HTTP 403). The identifier was not normalized because the 403 URL fails. Three independent
observations establish the hyphen as part of the URL:

1. In the PDF content stream the `-` is its own text item, emitted the same way in the prose (p. 84)
   and in every signature example (pp. 87, 89, 92, 94). On p. 64 the v4.4 namespace table prints
   `https://cdn.comprobanteselectronicos.go.cr/xml-schemas/v4.4/facturaElectronica` (the official
   namespace, also used by the vendored XSDs) with the same glyph and no line wrap.
2. The document served at the hyphenated URL (HTTP 200, `application/pdf`, 163479 bytes) has
   SHA-256 base64 `DWxin1xWOeI8OuWQXazh4VjLWAaCLAA954em7DMh0h8=`, exactly the published
   `SigPolicyHash`. The ATV copy (`docs/esquemas/2024/v4.4/<same name>`) is byte-identical, and so is
   the vendored `schemas/2024/v4.4/Resolucion_General_…pdf`.
3. The unhyphenated URL returns HTTP 403 `application/xml` (corroborating only).

## Defects fixed

- **Superseded policy.** The signer used the v4.1 identifier (DGT-R-48-2016 on tribunet) and its
  SHA-1 digest. It now uses the v4.4 identifier and SHA-256 digest above. The v4.1 values remain
  exported as deprecated `XADES_POLICY_V41_*` constants for identifying old signatures only.
- **Published digest was never emitted.** `xadesjs` (2.6.8) uses a precomputed policy digest only
  when it is passed as `policy.digestValue`. The SDK passed it as `policy.hash.value`, which
  `xadesjs` ignores; it then digested the canonicalized `<xades:Identifier>` element instead. So
  `SigPolicyHash/DigestValue` did not carry the policy-document digest (with v4.1 or v4.4 values).
  A regression test now asserts the emitted `DigestMethod`, `DigestValue` and `Identifier`.
- **Qualifier.** The SDK emitted `Qualifier="OIDAsURN"` on a URL identifier. The Anexo 2 example
  has no `Qualifier`; it is now omitted.

Unchanged and still to be confirmed by sandbox acceptance: RSA-SHA256 `SignatureMethod`, SHA-256
reference digests, inclusive C14N and the `enveloped` transform (the Anexo example uses exclusive
C14N with an XPath transform; both are standard XMLDSig, and the Anexo text does not mandate one).

## Tests

`packages/sdk/src/signing/signer.spec.ts` › `signature policy`: identifier and digest values,
agreement with `schemas/manifest.json#policy`, no v4.1/SHA-1 policy, RSA-SHA256 + SHA-256
references, cryptographic verification of the produced signature, tamper detection and no
`Qualifier`. `src/__testing__/manifest.spec.ts` keeps checking that the digest is the SHA-256 of
the vendored policy PDF. These run with a self-signed test certificate; they prove structure and
cryptographic validity, not institutional acceptance.

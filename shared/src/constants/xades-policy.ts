/**
 * XAdES-EPES signing policy constants.
 *
 * These values are required when generating XAdES-EPES digital signatures
 * for Hacienda electronic documents.
 *
 * The policy block follows Anexo 2 of `ANEXOS Y ESTRUCTURAS_V4.4.pdf` (v4.4
 * signature example, `xades:SignaturePolicyIdentifier`): the identifier is the
 * URL of the policy PDF and the digest is the Base64 SHA-256 of that PDF. See
 * `packages/sdk/schemas/manifest.json#policy` and `docs/xades-policy-v4.4.md`
 * for the provenance of each value.
 */

/** XAdES-EPES policy identifier (Anexo 2, v4.4). */
export const XADES_POLICY_URI =
  "https://cdn.comprobanteselectronicos.go.cr/xml-schemas/Resoluci%C3%B3n_General_sobre_disposiciones_t%C3%A9cnicas_comprobantes_electr%C3%B3nicos_para_efectos_tributarios.pdf" as const;

/** XAdES-EPES policy hash (SHA-256 of the policy PDF, Base64-encoded). */
export const XADES_POLICY_HASH = "DWxin1xWOeI8OuWQXazh4VjLWAaCLAA954em7DMh0h8=" as const;

/** XAdES-EPES policy hash algorithm. */
export const XADES_POLICY_HASH_ALGORITHM = "http://www.w3.org/2001/04/xmlenc#sha256" as const;

/** WebCrypto name of {@link XADES_POLICY_HASH_ALGORITHM}. */
export const XADES_POLICY_HASH_NAME = "SHA-256" as const;

/**
 * Superseded v4.1 policy (DGT-R-48-2016 PDF on tribunet, SHA-1 digest).
 * Kept only so integrators can identify signatures produced by SDK <= 0.4.1.
 *
 * @deprecated Use {@link XADES_POLICY_URI} / {@link XADES_POLICY_HASH}.
 */
export const XADES_POLICY_V41_URI =
  "https://tribunet.hacienda.go.cr/docs/esquemas/2016/v4.1/Resolucion_Comprobantes_Electronicos_DGT-R-48-2016.pdf" as const;

/** @deprecated See {@link XADES_POLICY_V41_URI}. */
export const XADES_POLICY_V41_HASH = "Ohixl6upD6av8N7pEvDABhEL6hM=" as const;

/** XML canonicalization method for XAdES signatures. */
export const XADES_CANONICALIZATION_METHOD =
  "http://www.w3.org/TR/2001/REC-xml-c14n-20010315" as const;

/** Signing algorithm: RSA with SHA-256. */
export const XADES_SIGNATURE_ALGORITHM =
  "http://www.w3.org/2001/04/xmldsig-more#rsa-sha256" as const;

/** Digest algorithm for reference digests. */
export const XADES_DIGEST_ALGORITHM = "http://www.w3.org/2001/04/xmlenc#sha256" as const;

# Fork notes (Yen-US/hacienda-cr)

Maintained fork of [DojoCodingLabs/hacienda-cr](https://github.com/DojoCodingLabs/hacienda-cr)
(MIT, see `LICENSE`; upstream copyright and license notices are retained unchanged).

- Base: upstream `main` at `a8afe2e96826f9d341b19d219b5f6653cd87e6fa` (2026-10-13).
- Remote layout: `origin` = this fork, `upstream` = DojoCodingLabs/hacienda-cr.
- Upstream changes are reviewed and merged deliberately; there are no automatic upstream syncs.
- This fork contains SDK fixes only. Consumers pin an exact commit and the packed tarball hash.

## Changes on top of upstream

| Version           | Change                                                                                      | Notes                       |
| ----------------- | ------------------------------------------------------------------------------------------- | --------------------------- |
| 0.4.1-presencia.1 | XAdES-EPES policy aligned with Anexo 2 v4.4; policy digest actually emitted; no `Qualifier` | `docs/xades-policy-v4.4.md` |

## Packaging

The SDK imports `@dojocoding/hacienda-shared` (the policy constants live there). Both packages carry
the same prerelease version and must be installed together, e.g. from tarballs produced by
`pnpm --filter @dojocoding/hacienda-shared pack` and `pnpm --filter @dojocoding/hacienda-sdk pack`.
The SDK depends on the exact shared prerelease, so an install that cannot resolve the forked shared
package fails instead of silently using the unfixed upstream constants.

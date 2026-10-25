'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

/**
 * CSV Page Import Manager — replaces the default list view of the
 * import-batches collection inside the Payload admin panel.
 *
 * Workflow: upload → validated preview (row-level errors and warnings) →
 * import valid rows as DRAFT pages → review & approve each page → publish.
 * Imported pages are never published automatically.
 */

type RowIssue = {
  severity: 'error' | 'warning'
  field?: string
  message: string
}

type PreviewRow = {
  rowNumber: number
  slug: string
  pageTitle: string
  pageType: string
  city: string
  state: string
  issues: RowIssue[]
}

type BatchSummary = {
  id: number | string
  filename: string
  status: string
  rowCount: number | null
  validRowCount: number | null
  errorRowCount: number | null
  createdAt: string
}

type UploadResponse = {
  batch: BatchSummary
  rows: PreviewRow[]
  fileIssues: RowIssue[]
}

type ImportReport = {
  createdCount: number
  updatedCount: number
  skippedCount: number
  invalidCount: number
  failedCount: number
}

type ImportResponse = {
  batch: BatchSummary
  report: ImportReport
  failures: { row: number; slug: string; error: string }[]
  reviewUrl: string
}

type Phase = 'idle' | 'uploading' | 'preview' | 'importing' | 'report'

const api = async <T,>(url: string, init?: RequestInit): Promise<T> => {
  const res = await fetch(url, { credentials: 'same-origin', ...init })
  const data = (await res.json().catch(() => ({}))) as T & { error?: string }
  if (!res.ok) {
    throw new Error(data?.error || `Request failed (${res.status})`)
  }
  return data
}

const ImportManagerView = () => {
  const [phase, setPhase] = useState<Phase>('idle')
  const [error, setError] = useState<string | null>(null)
  const [upload, setUpload] = useState<UploadResponse | null>(null)
  const [importResult, setImportResult] = useState<ImportResponse | null>(null)
  const [history, setHistory] = useState<BatchSummary[]>([])
  const [historyLoading, setHistoryLoading] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const loadHistory = useCallback(async () => {
    setHistoryLoading(true)
    try {
      const data = await api<{ docs: BatchSummary[] }>(
        '/api/import-batches?sort=-createdAt&limit=10&depth=0',
      )
      setHistory(data.docs ?? [])
    } catch {
      setHistory([])
    } finally {
      setHistoryLoading(false)
    }
  }, [])

  useEffect(() => {
    // Initial data load — showing the loading state synchronously is the
    // intended behaviour here.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    void loadHistory()
  }, [loadHistory])

  const handleFile = async (file: File) => {
    setError(null)
    setImportResult(null)
    setPhase('uploading')

    const body = new FormData()
    body.append('file', file)

    try {
      const data = await api<UploadResponse>('/api/imports/upload', { method: 'POST', body })
      setUpload(data)
      setPhase('preview')
      void loadHistory()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed.')
      setPhase('idle')
    }
  }

  const runImport = async () => {
    if (!upload) return
    setError(null)
    setPhase('importing')

    try {
      const data = await api<ImportResponse>(`/api/imports/${upload.batch.id}/import`, {
        method: 'POST',
      })
      setImportResult(data)
      setPhase('report')
      void loadHistory()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Import failed.')
      setPhase('preview')
    }
  }

  const reset = () => {
    setPhase('idle')
    setUpload(null)
    setImportResult(null)
    setError(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const validRows = upload?.rows.filter((row) => !row.issues.some((i) => i.severity === 'error')) ?? []
  const errorRows = upload?.rows.filter((row) => row.issues.some((i) => i.severity === 'error')) ?? []

  return (
    <div className="eparv-im">
      <style>{`
        .eparv-im { padding: 24px; font-family: inherit; max-width: 1100px; }
        .eparv-im h2 { margin: 0 0 4px; font-size: 24px; }
        .eparv-im .sub { color: #666; margin-bottom: 20px; }
        .eparv-im .card { border: 1px solid #e2e2e2; border-radius: 8px; padding: 20px; margin-bottom: 20px; background: #fff; }
        .eparv-im .steps { color: #555; font-size: 13px; margin-bottom: 18px; line-height: 1.7; }
        .eparv-im .row { display: flex; gap: 12px; align-items: center; flex-wrap: wrap; }
        .eparv-im button { cursor: pointer; border-radius: 6px; border: 1px solid #ccc; background: #f6f6f6; padding: 8px 16px; font-size: 14px; }
        .eparv-im button.primary { background: #0f766e; border-color: #0f766e; color: #fff; }
        .eparv-im button:disabled { opacity: 0.5; cursor: not-allowed; }
        .eparv-im .error { background: #fef2f2; border: 1px solid #fecaca; color: #991b1b; padding: 10px 14px; border-radius: 6px; margin-bottom: 14px; }
        .eparv-im .issue-error { color: #b91c1c; font-size: 12.5px; }
        .eparv-im .issue-warning { color: #a16207; font-size: 12.5px; }
        .eparv-im table { width: 100%; border-collapse: collapse; font-size: 13px; margin-top: 12px; }
        .eparv-im th, .eparv-im td { text-align: left; padding: 8px 10px; border-bottom: 1px solid #eee; vertical-align: top; }
        .eparv-im th { background: #fafafa; font-weight: 600; }
        .eparv-im .badge { display: inline-block; border-radius: 10px; padding: 2px 10px; font-size: 12px; }
        .eparv-im .badge.ok { background: #dcfce7; color: #166534; }
        .eparv-im .badge.warn { background: #fef9c3; color: #854d0e; }
        .eparv-im .badge.bad { background: #fee2e2; color: #991b1b; }
        .eparv-im .counts { display: flex; gap: 20px; flex-wrap: wrap; margin: 8px 0; }
        .eparv-im .counts div { font-size: 13px; color: #444; }
        .eparv-im .counts b { display: block; font-size: 22px; color: #111; }
        .eparv-im a { color: #0f766e; }
      `}</style>

      <h2>CSV Page Import Manager</h2>
      <p className="sub">
        Bulk-create location landing pages from a CSV file. Imports always create <b>draft</b> pages
        with approval status <b>Pending</b> — a reviewer must approve each page before it can be
        published. Published pages with an existing slug are never overwritten.
      </p>

      {error && <div className="error">{error}</div>}

      {phase === 'idle' || phase === 'uploading' ? (
        <div className="card">
          <div className="steps">
            <b>How it works</b>
            <br />
            1. Upload a CSV (max 5 MB, 500 rows) — download the{' '}
            {/* API download route, not an internal page */}
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a href="/api/imports/template">CSV template</a> for the required columns.
            <br />
            2. Review the validation preview — fix row errors and re-upload if needed.
            <br />
            3. Import valid rows as draft pages.
            <br />
            4. Review and approve each page in the Pages collection, then publish.
          </div>
          <div className="row">
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv,text/csv"
              disabled={phase === 'uploading'}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) void handleFile(file)
              }}
            />
            {phase === 'uploading' && <span>Validating file…</span>}
          </div>
        </div>
      ) : null}

      {phase === 'preview' && upload ? (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Validation preview — {upload.batch.filename}</h3>

          {upload.fileIssues.map((issue, i) => (
            <div key={i} className={issue.severity === 'error' ? 'issue-error' : 'issue-warning'}>
              {issue.severity === 'error' ? '✕' : '⚠'} {issue.message}
            </div>
          ))}

          <div className="counts">
            <div>
              <b>{upload.batch.rowCount ?? 0}</b>rows
            </div>
            <div>
              <b style={{ color: '#166534' }}>{validRows.length}</b>valid
            </div>
            <div>
              <b style={{ color: '#991b1b' }}>{errorRows.length}</b>with errors
            </div>
          </div>

          {upload.rows.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Slug</th>
                  <th>Title</th>
                  <th>Type</th>
                  <th>Result</th>
                </tr>
              </thead>
              <tbody>
                {upload.rows.map((row) => {
                  const hasError = row.issues.some((i) => i.severity === 'error')
                  const hasWarning = row.issues.some((i) => i.severity === 'warning')
                  return (
                    <tr key={row.rowNumber}>
                      <td>{row.rowNumber}</td>
                      <td>{row.slug}</td>
                      <td>{row.pageTitle}</td>
                      <td>{row.pageType || 'standard'}</td>
                      <td>
                        <span
                          className={`badge ${hasError ? 'bad' : hasWarning ? 'warn' : 'ok'}`}
                          style={{ marginBottom: 4 }}
                        >
                          {hasError ? 'blocked' : hasWarning ? 'warnings' : 'valid'}
                        </span>
                        {row.issues.map((issue, i) => (
                          <div key={i} className={`issue-${issue.severity}`}>
                            {issue.field ? `${issue.field}: ` : ''}
                            {issue.message}
                          </div>
                        ))}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          )}

          <div className="row" style={{ marginTop: 16 }}>
            <button
              className="primary"
              onClick={() => void runImport()}
              disabled={validRows.length === 0}
            >
              Import {validRows.length} valid row{validRows.length === 1 ? '' : 's'} as drafts
            </button>
            <button onClick={reset}>Start over</button>
          </div>
        </div>
      ) : null}

      {phase === 'report' && importResult ? (
        <div className="card">
          <h3 style={{ marginTop: 0 }}>Import report</h3>
          <div className="counts">
            <div>
              <b style={{ color: '#166534' }}>{importResult.report.createdCount}</b>created
            </div>
            <div>
              <b>{importResult.report.updatedCount}</b>updated (existing drafts)
            </div>
            <div>
              <b>{importResult.report.skippedCount}</b>skipped (published)
            </div>
            <div>
              <b style={{ color: '#991b1b' }}>{importResult.report.invalidCount}</b>invalid
            </div>
            <div>
              <b style={{ color: '#991b1b' }}>{importResult.report.failedCount}</b>failed
            </div>
          </div>

          {importResult.failures.length > 0 && (
            <table>
              <thead>
                <tr>
                  <th>Row</th>
                  <th>Slug</th>
                  <th>Error</th>
                </tr>
              </thead>
              <tbody>
                {importResult.failures.map((failure, i) => (
                  <tr key={i}>
                    <td>{failure.row}</td>
                    <td>{failure.slug}</td>
                    <td className="issue-error">{failure.error}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          <p>
            All imported pages are drafts with approval status <b>Pending</b>.{' '}
            <a href={importResult.reviewUrl}>Review and approve them in the Pages collection</a>,
            then publish each approved page.
          </p>
          <div className="row">
            <button className="primary" onClick={reset}>
              Import another file
            </button>
          </div>
        </div>
      ) : null}

      <div className="card">
        <h3 style={{ marginTop: 0 }}>Import history</h3>
        {historyLoading ? (
          <span>Loading…</span>
        ) : history.length === 0 ? (
          <span>No imports yet.</span>
        ) : (
          <table>
            <thead>
              <tr>
                <th>File</th>
                <th>Status</th>
                <th>Rows</th>
                <th>Valid</th>
                <th>Errors</th>
                <th>Uploaded</th>
              </tr>
            </thead>
            <tbody>
              {history.map((batch) => (
                <tr key={batch.id}>
                  <td>{batch.filename}</td>
                  <td>
                    <span
                      className={`badge ${batch.status === 'imported' ? 'ok' : batch.status === 'validated' ? 'warn' : 'bad'}`}
                    >
                      {batch.status}
                    </span>
                  </td>
                  <td>{batch.rowCount ?? '—'}</td>
                  <td>{batch.validRowCount ?? '—'}</td>
                  <td>{batch.errorRowCount ?? '—'}</td>
                  <td>{new Date(batch.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

export default ImportManagerView

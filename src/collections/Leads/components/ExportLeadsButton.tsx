'use client'

import React from 'react'

/**
 * "Export CSV" action shown above the Leads list view in the admin panel.
 * Calls the /api/exports/leads endpoint with the same credentials as the
 * admin session and triggers a file download.
 */
const ExportLeadsButton = () => {
  const [busy, setBusy] = React.useState(false)

  const handleExport = async () => {
    setBusy(true)
    try {
      const res = await fetch('/api/exports/leads', { credentials: 'same-origin' })
      if (!res.ok) {
        throw new Error(`Export failed (${res.status})`)
      }
      const blob = await res.blob()
      const url = URL.createObjectURL(blob)
      const link = document.createElement('a')
      link.href = url
      link.download = `eparv-leads-export-${new Date().toISOString().slice(0, 10)}.csv`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      URL.revokeObjectURL(url)
    } catch (error) {
      alert(error instanceof Error ? error.message : 'Export failed')
    } finally {
      setBusy(false)
    }
  }

  return (
    <button
      type="button"
      className="export-leads-button"
      onClick={handleExport}
      disabled={busy}
      style={{
        cursor: busy ? 'wait' : 'pointer',
        border: '1px solid var(--theme-elevation-150)',
        background: 'var(--theme-elevation-100)',
        borderRadius: '0.4rem',
        padding: '0.5rem 1rem',
        fontSize: '0.9rem',
      }}
    >
      {busy ? 'Exporting…' : 'Export CSV'}
    </button>
  )
}

export default ExportLeadsButton

import React from 'react'

/**
 * Visible banner shown wherever content is flagged as demo data in the CMS.
 * Keeps unverified specifications, prices and dealership information clearly
 * marked until real data is supplied.
 */
export const DemoNotice: React.FC<{ className?: string }> = ({ className }) => (
  <div
    role="note"
    className={`border border-warning bg-warning/30 text-foreground rounded-md px-4 py-3 text-sm ${className ?? ''}`}
  >
    <strong>Demo data:</strong> the details on this page are placeholder content for development
    and review. Specifications, prices and availability are not verified — final content will be
    published once confirmed.
  </div>
)

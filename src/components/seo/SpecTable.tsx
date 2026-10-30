import React from 'react'
import type { EparvModel } from '@/data/models'

interface SpecTableProps {
  model: EparvModel
  className?: string
  caption?: string
}

export const SpecTable: React.FC<SpecTableProps> = ({
  model,
  className = '',
  caption,
}) => {
  const rows: { label: string; value: string | null }[] = [
    {
      label: 'Motor Power & Type',
      value: model.motorPowerW ? `${model.motorPowerW}W (${model.motorType})` : null,
    },
    {
      label: 'Peak Motor Torque',
      value: model.motorTorqueNm ? `${model.motorTorqueNm} Nm` : null,
    },
    {
      label: 'Battery Specification',
      value:
        model.batteryVoltageV && model.batteryCapacityAh
          ? `${model.batteryVoltageV}V, ${model.batteryCapacityAh}Ah (${model.batteryCapacityWh} Wh)`
          : null,
    },
    {
      label: 'Charging Time',
      value: model.chargeTimeHours ? `${model.chargeTimeHours} Hours (5A Wall Socket)` : null,
    },
    {
      label: 'Pedal Assist Range (PAS)',
      value: model.rangePasKm ? `Up to ${model.rangePasKm} km per charge` : null,
    },
    {
      label: 'Pure Throttle Range',
      value: model.rangeThrottleKm ? `Up to ${model.rangeThrottleKm} km per charge` : null,
    },
    {
      label: 'Top Governed Speed',
      value: model.topSpeedKmh ? `${model.topSpeedKmh} km/h (CMVR compliant)` : null,
    },
    {
      label: 'Braking System',
      value: model.brakes,
    },
    {
      label: 'Suspension / Fork',
      value: model.fork,
    },
    {
      label: 'Frame & Chassis',
      value: model.frameMaterial,
    },
    {
      label: 'Wheel & Tyre Size',
      value: `${model.wheelSizeInches} — ${model.tyres}`,
    },
    {
      label: 'Kerb Weight',
      value: model.weightKg ? `${model.weightKg} kg` : null,
    },
    {
      label: 'Maximum Payload',
      value: model.payloadKg ? `${model.payloadKg} kg` : null,
    },
    {
      label: 'Factory Finish Colour',
      value: model.colour,
    },
    {
      label: 'Warranty Coverage',
      value: [
        model.warrantyFrameMonths ? `Frame: ${model.warrantyFrameMonths / 12} Yrs` : null,
        model.warrantyMotorMonths ? `Motor: ${model.warrantyMotorMonths} Mos` : null,
        model.warrantyBatteryMonths ? `Battery: ${model.warrantyBatteryMonths} Mos` : null,
      ]
        .filter(Boolean)
        .join(' | ') || null,
    },
  ]

  // Filter out any specs that are null (per rule: Unknown = null, hidden if null)
  const visibleRows = rows.filter((r) => r.value !== null)

  return (
    <div className={`overflow-x-auto rounded-2xl border border-border bg-card my-8 shadow-sm ${className}`}>
      <table className="w-full text-left text-xs sm:text-sm">
        {caption && (
          <caption className="p-4 text-left font-bold text-base sm:text-lg text-foreground border-b border-border bg-muted/30">
            {caption}
          </caption>
        )}
        <tbody className="divide-y divide-border">
          {visibleRows.map((row, idx) => (
            <tr
              key={idx}
              className={idx % 2 === 0 ? 'bg-background' : 'bg-muted/15 hover:bg-muted/30 transition-colors'}
            >
              <th scope="row" className="p-3.5 sm:p-4 font-semibold text-muted-foreground w-1/3 min-w-[140px]">
                {row.label}
              </th>
              <td className="p-3.5 sm:p-4 font-medium text-foreground">
                {row.value}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {model.rangeTestNote && (
        <div className="p-3 bg-muted/40 border-t border-border text-[11px] text-muted-foreground italic">
          * {model.rangeTestNote}
        </div>
      )}
    </div>
  )
}

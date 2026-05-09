import type { SVGProps } from "react"

type ShipIconProps = Omit<SVGProps<SVGSVGElement>, "width" | "height"> & {
  size?: number | string
}

export function ShipIcon({ size = 18, ...props }: ShipIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      {...props}
    >
      <path
        d="M3 11.5L12 4l9 7.5-1.6 6.2a2 2 0 0 1-1.94 1.5H6.54a2 2 0 0 1-1.94-1.5L3 11.5Z"
        fill="currentColor"
        fillOpacity="0.12"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M12 4v15.2"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M12 6.5L4.8 12l1.4 5.4 5.8-3.6V6.5Z"
        fill="currentColor"
        opacity="0.35"
      />
    </svg>
  )
}

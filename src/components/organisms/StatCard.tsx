import { ReactNode } from 'react'
import Link from 'next/link'

export const StatCard = ({
  title,
  children,
  href,
}: {
  title: string
  href?: string
  children: ReactNode
}) => {
  const Comp = href ? Link : 'div'
  return (
    <Comp href={href || '/'} className="p-4 border rounded-lg shadow-lg">
      <div className="text-lg">{title}</div>
      <div className="text-2xl font-bold">{children}</div>
    </Comp>
  )
}

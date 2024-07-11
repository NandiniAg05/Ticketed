import Link from 'next/link'
import { cn } from '@/utils/styles'

export interface IBrandProps {}

export const Brand = () => {
  return (
    <div className="mb-2">
      <Link href="/" className={cn('underline-offset-4')}>
        <img src="logo.png" alt="Ticketed!" className="max-w-[15%]" />
      </Link>
    </div>
  )
}

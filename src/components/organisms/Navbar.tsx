import { Sidebar } from './Sidebar'
import { Brand } from '../molecules/Brand'
import { Container } from '../ui/container'
import { UserButton } from '@clerk/nextjs'

export interface INavbarProps {}

export const Navbar = () => {
  return (
    <nav className="sticky top-2 w-full h-12 border-2 border-white border-y bg-white/40 backdrop-blur backdrop-filter">
      <Container>
        <div className="flex items-center justify-between">
          <Brand />
          <div className="flex flex-row">
            <UserButton />
            <Sidebar />
          </div>
        </div>
      </Container>
    </nav>
  )
}

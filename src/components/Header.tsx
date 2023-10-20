import { MenuIcon } from 'lucide-react'
import Link from 'next/link'
import { pagesPath } from '~/utils/$path'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'

export const Header: React.FC = () => {
  return (
    <header className="flex justify-center h-[48px] border-b">
      <div className="flex items-center px-4 h-full w-full max-w-7xl">
        <span className="text-lg font-bold mr-5">Frourio Playground</span>
        <ul className="h-full">
          <li className="h-full">
            <Link href={pagesPath.human.$url()} className="flex items-center w-full h-full hover:opacity-60">
              メンバー
            </Link>
          </li>
        </ul>
        <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <MenuIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem>
                <Link href={pagesPath.human.$url()} className="w-full h-full">
                  メンバー
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}

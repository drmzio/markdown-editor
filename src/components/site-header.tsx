import Link from 'next/link'
import { Code, Edit3, Menu } from 'lucide-react'

import { siteConfig } from '@/config/site'
import { Icons } from '@/components/icons'
import { MainNav } from '@/components/main-nav'
import { ThemeToggle } from '@/components/theme-toggle'
import { Button, buttonVariants } from '@/components/ui/button'

export function SiteHeader() {
  return (
    <header className="ui-header sticky top-0 z-40 w-full border-b border-b-neutral-200 bg-white dark:border-b-neutral-700 dark:bg-neutral-900">
      <div className="ui-container mx-auto w-full max-w-full px-4">
        <div className="ui-toolbar flex h-16 items-center">
          {/*<MainNav items={siteConfig.mainNav} />*/}
          <div className="mr-auto flex-1">
            <Button variant="outline" size="sm" className="w-9">
              <Menu className="h-4 w-4 text-neutral-500" />
              <span className="sr-only">Menu</span>
            </Button>
          </div>
          <div className="mx-auto shrink-0">
            <nav className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="min-w-[100px]">
                <Edit3 className="mr-2 h-4 w-4 text-neutral-500" />
                Write
              </Button>
              <Button variant="outline" size="sm" className="min-w-[100px]">
                <Code className="mr-2 h-4 w-4 text-neutral-500" />
                Output
              </Button>
            </nav>
          </div>
          <div className="ml-auto flex-1">
            <nav className="flex items-center justify-end space-x-2">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'text-neutral-700 dark:text-neutral-400',
                  })}
                >
                  <Icons.gitHub className="h-5 w-5" />
                  <span className="sr-only">GitHub</span>
                </div>
              </Link>
              <Link
                href={siteConfig.links.twitter}
                target="_blank"
                rel="noreferrer"
              >
                <div
                  className={buttonVariants({
                    size: 'sm',
                    variant: 'ghost',
                    className: 'text-neutral-700 dark:text-neutral-400',
                  })}
                >
                  <Icons.twitter className="h-5 w-5 fill-current" />
                  <span className="sr-only">Twitter</span>
                </div>
              </Link>
              <ThemeToggle />
            </nav>
          </div>
        </div>
      </div>
    </header>
  )
}

'use client'

import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'

export default function LanguageSwitcher() {
    const pathname = usePathname()
    const searchParams = useSearchParams()
    const params = searchParams ? `?${searchParams.toString()}` : ''

    return (
        <div className="flex items-center gap-2">
            <Link
                href={`${pathname}${params}`}
                locale="ru"
                className="text-sm font-medium hover:underline"
            >
                RU
            </Link>
            <span>/</span>
            <Link
                href={`${pathname}${params}`}
                locale="en"
                className="text-sm font-medium hover:underline"
            >
                EN
            </Link>
        </div>
    )
}

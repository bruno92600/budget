import { CurrencyComboBox } from '@/components/CurrencyComboBox'
import Logo from '@/components/Logo'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { currentUser } from '@clerk/nextjs/server'

import Link from 'next/link'
import { redirect } from 'next/navigation'
import React from 'react'

async function page() {

    const user = await currentUser()

    if (!user) {
        redirect("/sign-in")
    }

  return (
    <div className='container flex max-w-2xl flex-col items-center justify-between gap-4'>
        <div className="">
        <h1 className="text-center text-3xl">
            Bienvenue, <span className="ml-2 font-bold">{user.firstName}! 🤟🏼</span>
        </h1>
        <h2 className="mt-4 text-center text-base text-muted-foreground">
        Commençons par configurer votre devise
        </h2>
        <h3 className="mt-2 text-center text-sm text-muted-foreground">
            Vous pouvez configurer votre devise à tout moment
        </h3>
        </div>
        <Separator />
        <Card className='w-full'>
            <CardHeader>
                <CardTitle>Devise</CardTitle>
                <CardDescription>Définissez votre devise par défaut pour les transactions</CardDescription>
            </CardHeader>
            <CardContent>
                <CurrencyComboBox />
            </CardContent>
        </Card>
        <Separator />
        <Button className='w-full' asChild>
            <Link href={"/"}>
            J&apos;ai fini! Emmène-moi à l&apos;accueil
            </Link>
        </Button>
        <div className="mt-8">
            <Logo />
        </div>
    </div>
  )
}

export default page
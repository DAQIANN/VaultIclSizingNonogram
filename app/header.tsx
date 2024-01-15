"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Card, Title, Text } from '@tremor/react';
import VaultLogo from "../images/VaultImage.png"

export default function Header() {
    return (
        <div className="z-10 w-full items-center font-mono text-sm lg:flex pl-5 pt-5">
            <Image
                className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
                src={VaultLogo}
                alt="Vault Logo"
                width={180}
                height={37}
                priority
            />
            <Title> ICL Sizing Nomogram</Title>
        </div>
    );
}
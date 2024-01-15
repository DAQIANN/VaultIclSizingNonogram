"use client";

import Image from 'next/image'
import Link from 'next/link'
import { Card, Title, Text } from '@tremor/react';
import VaultLogo from "../images/VaultImage.png"

export default function Header() {
    return (
        <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
            <Text>From Eyelabs AI</Text>
        </div>
    );
}``
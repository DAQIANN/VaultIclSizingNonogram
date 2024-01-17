"use client";

import Image from 'next/image'
import Link from 'next/link'
import SurgeonTable from "./table"
import { Card, Title, Text, Table,
  TableHead,
  TableRow,
  TableHeaderCell,
  TableBody,
  TableCell,
  Flex
} from '@tremor/react';
import {Input} from "@nextui-org/react";
import VaultLogo from "../images/VaultImage.png"
import { useState } from 'react';


interface Surgeon {
  id:number,
  name:string,
  patient:string,
  email:string,
}

export default function Home() {
  let testSurgeons = [
    {
      id:1,
      name:"test",
      email:"test@gmail.com",
      patient:"anothertest"
    }
  ]
  const inputSurgeons = testSurgeons as Surgeon[];
  
  const [nameInput, setNameInput] = useState("")
  function handleInputChange(value:string) {
    console.log(value)
  }
  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
        <Title>Welcome to Eyelab AI's ICL Sizing Nonogram Service</Title>
      </div>
      <div className="z-10 w-full max-w-3xl items-center font-mono text-sm lg:flex pt-5">
        <Card className="max-w-xl mx-auto">
          <Flex alignItems="center" justifyContent="between">
            <Text className="text-base items-center justify-center text-gray-700 font-medium">Basic Information</Text>
          </Flex>
          <div className="lg:flex pt-5">
            <label htmlFor="name" className="label">
              Surgeon Name: 
            </label>
            <input name="name"
              id="name" 
              style={{
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
              onChange = {(event)=> handleInputChange(event.target.value)} 
            />
          </div>
          <div className="lg:flex pt-5">
            <label htmlFor="patientname" className="label">
              Patient Name: 
            </label>
            <input name="name"
              id="name" 
              className="..."
              style={{
                backgroundColor: '#f0f0f0',
                border: '1px solid #ccc',
                borderRadius: '8px',
              }}
              onChange = {(event)=> handleInputChange(event.target.value)} 
            />
          </div>
        </Card>
      </div>
      <div className="z-10 w-full items-center font-mono text-sm lg:flex pt-5">
        <Card>
          <SurgeonTable surgeons={inputSurgeons} />
        </Card>
        <div className="pt-20 pr-5"> </div>
        <div className="pl-5"> </div>
        <Card>
          <SurgeonTable surgeons={inputSurgeons} />
        </Card>
      </div>
    </main>
  )
}

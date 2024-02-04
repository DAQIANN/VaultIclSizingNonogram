"use client";

import Image from 'next/image';
import Link from 'next/link';
import SurgeonTable from "./table";
import {
    Card, Title, Text, Table,
    TableHead,
    TableRow,
    TableHeaderCell,
    TableBody,
    TableCell,
    Flex,
} from '@tremor/react';
import { Menu, Listbox, Transition } from '@headlessui/react';
import { CheckIcon, ChevronUpDownIcon } from '@heroicons/react/20/solid'
import VaultLogo from "../images/VaultImage.png";
import { Fragment, useState } from 'react';
import { FaCheck, FaTimes } from 'react-icons/fa'
import FileUploader from './FileUploader'
import Results from './results'
import { urlToHttpOptions } from 'url';

interface Surgeon {
    id: number,
    name: string,
    patient: string,
    email: string,
}

interface ContainerProps {
    children: React.ReactNode
}

const sexes = [
    { value: 'Female' },
    { value: 'Male' },
]

const ethnicities = [
    { value: 'American Indian/Alaska Native' },
    { value: 'Asian' },
    { value: 'Black/African American' },
    { value: 'Hispanic/Latino' },
    { value: 'Native Hawaiian/Other Pacific Islander' },
    { value: 'White' }
]

const methodology = [
    { value: 'AS-OCT' },
    { value: 'UBM' }
]

const Container = ({ children }: ContainerProps) => (
    <div className="flex flex-col items-center justify-between gap-4 min-h-60 bg-gray-200 w-full max-w-2xl py-10 px-4 rounded-xl h-fit">
        {children}
    </div>
)

export default function Home() {
    const [surgeonNameInput, setSurgeonNameInput] = useState("");
    const [patientNameInput, setPatientNameInput] = useState("");
    const [dateOfBirthInput, setDateOfBirthInput] = useState("");
    const [sexInput, setSexInput] = useState(sexes[0]);
    const [ethnicitiesInput, setEthnicitiesInput] = useState(ethnicities[0]);
    const [rightEyeImage, setRightEyeImage] = useState("");
    const [leftEyeImage, setLeftEyeImage] = useState("");
    const [rightEyeMethod, setRightEyeMethod] = useState(methodology[0]);
    const [leftEyeMethod, setLeftEyeMethod] = useState(methodology[0]);
    const [position, setPosition] = useState("");
    const [results, setResults] = useState(<Text></Text>);

    const getResults = () => {
        if (rightEyeImage == "" && leftEyeImage == "") {
            setResults(<Text>Please submit images!</Text>)
        } else {
            setResults(<Text>This is the result!</Text>);
        }
    };

    const fileUploadHandler = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent default form submission behavior

        const formData = new FormData();
        console.log(event);
        // formData.append('file', event.target.file.files[0]); // Get the selected file from the input element

        fetch(url, {
            method: 'POST',
            body: formData,
            mode: 'no-cors',
        }).then((response) => {
            // Handle response
        }).catch((error) => {
            throw new Error('An error occurred while uploading the file. Server response: ${response.statusText}');
        });
    };

    const handleResponse = (responseData: JSON) => {
        console.log("Respoinse from server:", responseData);
    }
    // const url = "https://eyelabapi-guiea4z3.b4a.run/upload";
    const url = "http://localhost:5001/"
    return (
        <main className="flex min-h-screen flex-col items-center p-24">
            <div className="z-10 w-full items-center justify-center font-mono text-sm lg:flex">
                <Title>Welcome to VAULT: ICL Sizing Nomogram</Title>
            </div>
            <div className="z-10 w-full max-w-3xl items-center font-mono text-sm lg:flex pt-5">
                <Card className="max-w-xl mx-auto">
                    <Flex alignItems="center" justifyContent="between">
                        <Text className="text-base items-center justify-center text-gray-700 font-medium">Basic Information (Optional)</Text>
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
                            onChange={(event) => setSurgeonNameInput(event.target.value)}
                        />
                    </div>
                    <div className="lg:flex pt-5">
                        <label htmlFor="patientname" className="label">
                            Patient Name:
                        </label>
                        <input name="name"
                            id="name"
                            style={{
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                            onChange={(event) => setPatientNameInput(event.target.value)}
                        />
                    </div>
                    <div className="lg:flex pt-5">
                        <label htmlFor="patientname" className="label">
                            Date of Birth (MM/DD/YYYY):
                        </label>
                        <input name="name"
                            id="name"
                            style={{
                                backgroundColor: '#f0f0f0',
                                border: '1px solid #ccc',
                                borderRadius: '8px',
                            }}
                            onChange={(event) => setDateOfBirthInput(event.target.value)}
                        />
                    </div>
                    <div className="lg:flex pt-5">
                        <label htmlFor="patientname" className="label">
                            Please Select a Sex:
                        </label>
                        <Listbox value={sexInput} onChange={setSexInput}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{sexInput.value}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" style={{ zIndex: 3 }}>
                                        {sexes.map((sex, sexIdx) => (
                                            <Listbox.Option
                                                key={sexIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={sex}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {sex.value}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="lg:flex pt-5">
                        <label htmlFor="patientname" className="label">
                            Please Select an Ethnicity:
                        </label>
                        <Listbox value={ethnicitiesInput} onChange={setEthnicitiesInput}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{ethnicitiesInput.value}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" style={{ zIndex: 2 }}>
                                        {ethnicities.map((ethnicity, ethnicityIdx) => (
                                            <Listbox.Option
                                                key={ethnicityIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={ethnicity}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {ethnicity.value}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                </Card>
            </div>
            <div className="z-10 w-full items-center font-mono text-sm lg:flex pt-5" style={{ zIndex: 1 }}>
                <Card>
                    <Flex className="items-center justify-center" alignItems="center" justifyContent="between">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-green-900 md:text-3xl lg:text-3xl">RIGHT EYE</h1>
                    </Flex>
                    <Flex alignItems="center" justifyContent="between">
                        <Text className="text-base items-center justify-center text-gray-700 font-medium">Please Select a Methodology and Input Images (Required)</Text>
                    </Flex>
                    <div className="lg:flex pt-5 justify-center relative">
                        <Listbox value={rightEyeMethod} onChange={setRightEyeMethod}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{rightEyeMethod.value}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" style={{ zIndex: 2 }}>
                                        {methodology.map((method, methodIdx) => (
                                            <Listbox.Option
                                                key={methodIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={method}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {method.value}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="lg:flex pt-5 justify-center relative">
                        <Container>
                            <h1 className="text-2xl font-bold">Upload Images</h1>
                            <FileUploader
                                url={url + 'right_upload'}
                                acceptedFileTypes={[
                                    "image/png",
                                    "image/jpeg",
                                ]}
                                allowMultiple={true}
                                maxFileSize={100}
                                label="Max File Size: 100MB (multiple)"
                                labelAlt="Accepted File Types: png, jpeg"
                                onResponse={handleResponse}
                            />
                        </Container>
                    </div>
                </Card>
                <div className="pt-20 pr-5"> </div>
                <div className="pl-5"> </div>
                <Card>
                    <Flex className="items-center justify-center" alignItems="center" justifyContent="between">
                        <h1 className="mb-4 text-3xl font-extrabold leading-none tracking-tight text-blue-900 md:text-3xl lg:text-3xl">LEFT EYE</h1>
                    </Flex>
                    <Flex alignItems="center" justifyContent="between">
                        <Text className="text-base items-center justify-center text-gray-700 font-medium">Please Select a Methodology and Input Images (Required)</Text>
                    </Flex>
                    <div className="lg:flex pt-5 justify-center relative">
                        <Listbox value={leftEyeMethod} onChange={setLeftEyeMethod}>
                            <div className="relative mt-1">
                                <Listbox.Button className="relative w-full cursor-default rounded-lg bg-gray-100 py-2 pl-3 pr-10 text-left border border-gray-300 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white/75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                                    <span className="block truncate">{leftEyeMethod.value}</span>
                                    <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                                        <ChevronUpDownIcon
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </span>
                                </Listbox.Button>
                                <Transition
                                    as={Fragment}
                                    leave="transition ease-in duration-100"
                                    leaveFrom="opacity-100"
                                    leaveTo="opacity-0"
                                >
                                    <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm" style={{ zIndex: 2 }}>
                                        {methodology.map((method, methodIdx) => (
                                            <Listbox.Option
                                                key={methodIdx}
                                                className={({ active }) =>
                                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                                                    }`
                                                }
                                                value={method}
                                            >
                                                {({ selected }) => (
                                                    <>
                                                        <span
                                                            className={`block truncate ${selected ? 'font-medium' : 'font-normal'
                                                                }`}
                                                        >
                                                            {method.value}
                                                        </span>
                                                        {selected ? (
                                                            <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        ) : null}
                                                    </>
                                                )}
                                            </Listbox.Option>
                                        ))}
                                    </Listbox.Options>
                                </Transition>
                            </div>
                        </Listbox>
                    </div>
                    <div className="lg:flex pt-5 justify-center relative">
                        <Container>
                            <h1 className="text-2xl font-bold">Upload Images</h1>
                            <FileUploader
                                url={url + 'left_eye'}
                                acceptedFileTypes={[
                                    "image/png",
                                    "image/jpeg",
                                ]}
                                allowMultiple={true}
                                maxFileSize={100}
                                label="Max File Size: 100MB (multiple)"
                                labelAlt="Accepted File Types: png, jpeg"
                                onResponse={handleResponse}
                            />
                        </Container>
                    </div>
                </Card>
            </div>
            <div className="pt-10"></div>
            <div>
                <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px' }} onClick={getResults}>
                    Results
                </button>
            </div>
            <div>
                {results}
            </div>
        </main>
    )
}

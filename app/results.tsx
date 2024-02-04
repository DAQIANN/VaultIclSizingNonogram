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

const Results = () => {
    const [results, setResults] = useState(<Text></Text>);

    const getResults = () => {
        setResults(<Text>This is the result!</Text>);
    };

    return (
        <div>
            <button style={{ backgroundColor: 'red', color: 'white', padding: '10px 20px', borderRadius: '5px' }} onClick={getResults}>
                Results
            </button>
            {results}
        </div>
    );
};

export default Results;
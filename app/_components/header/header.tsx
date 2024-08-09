import Image from "next/image";
import { OlympicsLogo, OlympicsLogoAnimated } from '@/public/index.js';
import './header.scss';

export default function Header() {
    return (
        <header>
            <Image src={OlympicsLogoAnimated} width={100} alt="a"/>
        </header>
    )
}
import Image from "next/image";
import { OlympicsLogoAnimated } from '@/images';
import './header.scss';

export default function Header() {
    return (
        <header>
            <Image src={OlympicsLogoAnimated} width={80} alt="Olympcis logo"/>
        </header>
    )
}
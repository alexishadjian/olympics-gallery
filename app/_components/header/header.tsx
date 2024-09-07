import Image from "next/image";
import { OlympicsLogoAnimated } from '@/images';
import './header.scss';

export default function Header() {
    return (
        <header className="wrapper">
            <Image src={OlympicsLogoAnimated} width={80} alt="Olympcis logo" draggable={false}/>
        </header>
    )
}
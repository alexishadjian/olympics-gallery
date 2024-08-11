import './footer.scss';
import Link from "next/link";

export default function Footer() {
    return (
        <footer className="gap-s">
            <p className="text">28 août 2024</p>
            <p className="text">__ 8 septembre 2024</p>
            <Link href="https://www.instagram.com/paris2024" className="flex center link" target="_blank">
                <svg xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  strokeWidth="1.5"  strokeLinecap="round"  strokeLinejoin="round">
                    <path d="M4 4m0 4a4 4 0 0 1 4 -4h8a4 4 0 0 1 4 4v8a4 4 0 0 1 -4 4h-8a4 4 0 0 1 -4 -4z" />
                    <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                    <path d="M16.5 7.5l0 .01" />
                </svg>
            </Link>
        </footer>
    )
}
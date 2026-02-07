'use client';

import Link from "next/link";
import { usePathname } from "next/navigation"
import styles from '../styles/navbar.module.css'


export function Navbar(){
    const pathname = usePathname()
    const inLanding = pathname === '/';
    const inNewCV = pathname.startsWith('/newCV');

    return(
        <nav className={styles.nav}>
            <Link href='/'><span className={styles.logo}><h2 className={styles.Fast}>Fast</h2><h2 className={styles.CV}>CV</h2></span></Link>
            
            {inLanding && <Link style={{cursor: 'pointer'}} href="/newCV">
                                <button className={styles.sTryItButton}>Try it</button>
                          </Link>}
            {inNewCV && <Link style={{cursor: 'pointer'}} href="/">
                                <button className={styles.sBackButton}>Back</button>
                          </Link>}
        </nav>
    )
}

import { useContext } from 'react'
import styles from './styles.module.scss'
import Link from 'next/link'

import { FiLogOut } from 'react-icons/fi'

import { AuthContext } from '../../contexts/AuthContext'

export function Header() {

    const { signOut } = useContext(AuthContext)

    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <Link href="/dashboard">
                    <img src="/logo.svg" width={190} height={60} />
                </Link>


                <nav className={styles.menuNav}>

                    <Link href="/">
                        <span>Home</span>
                    </Link>
                    <Link href="/category">
                        <span>Categoria</span>
                    </Link>

                    <Link href="/product">
                        <span>Cardapio</span>
                    </Link>

                    <Link href="/dayResults">
                        <span>Resumo do Dia</span>
                    </Link>

                    <Link href="/monthResults">
                        <span>Resumo do Mês</span>
                    </Link>
 
 
                    <button onClick={signOut}>
                        <FiLogOut color="#FFF" size={24} />
                    </button>
                </nav>

            </div>
        </header>
    )

}
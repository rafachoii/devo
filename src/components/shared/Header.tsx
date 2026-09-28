import devo_logo from '../../assets/devo_logo.png';
import { Link } from 'react-router-dom';

export function Header() {
    return (
        <header className="w-full pt-12 pb-4 flex justify-center items-center">
            <Link to={'/'}>
                <img
                    src={devo_logo}
                    alt="devo"
                    className="w-[67px] h-[24px] object-contain block cursor-pointer"
                />
            </Link>
        </header>
    );
}
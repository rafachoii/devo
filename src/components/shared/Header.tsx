import devo_logo from '../../assets/devo_logo.png';

export function Header() {
    return (
        <header className="w-full pt-12 pb-4 flex justify-center items-center">
            <img 
                src={devo_logo} 
                alt="devo" 
                className="w-[67px] h-[24px] object-contain block" 
            />
        </header>
    );
}
const Header = (props : { title : string }) => {
    return (
        <div className="bg-blue-500 py-6 pl-8 font-bold text-white text-2xl">
            {props.title}
        </div>
    )
}

export default Header;